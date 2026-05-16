<script setup>
import { ref, watch, onMounted } from 'vue'
import Popup from './components/Popup.vue'

const todos = ref([])
const newText = ref('')
const showPopup = ref(false)
const todoToDelete = ref(null)

onMounted(async () => {
  const saved = localStorage.getItem('todos')
  if (saved) {
    todos.value = JSON.parse(saved)
  } else {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos?userId=1')
    const data = await response.json()
    todos.value = data.slice(0, 5).map(item => ({
      id: item.id,
      text: item.title,
      done: item.completed
    }))
  }
})

watch(todos, (value) => {
  localStorage.setItem('todos', JSON.stringify(value))
}, { deep: true })

async function addTodo() {
  if (!newText.value.trim()) return
  const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: newText.value, completed: false, userId: 1 })
  })
  if (response.ok) {
    todos.value.push({ id: Date.now(), text: newText.value, done: false })
    newText.value = ''
  }
}

async function toggleDone(todo) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${todo.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: todo.text, completed: !todo.done, userId: 1 })
  })
  if (response.ok) {
    todo.done = !todo.done
  }
}

function askDelete(todo) {
  todoToDelete.value = todo
  showPopup.value = true
}

async function confirmDelete() {
  const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${todoToDelete.value.id}`, {
    method: 'DELETE'
  })
  if (response.ok) {
    todos.value = todos.value.filter(t => t.id !== todoToDelete.value.id)
  }
  showPopup.value = false
  todoToDelete.value = null
}
</script>

<template>
  <div class="app">
    <h1>To Do List</h1>
    <div class="add-form">
      <input v-model="newText" placeholder="Новая задача" @keyup.enter="addTodo" />
      <button @click="addTodo">Добавить</button>
    </div>
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        <input type="checkbox" :checked="todo.done" @change="toggleDone(todo)" />
        <span :class="{ done: todo.done }">{{ todo.text }}</span>
        <button @click="askDelete(todo)">Удалить</button>
      </li>
    </ul>
    <Popup :show="showPopup" @close="showPopup = false">
      <p>Удалить задачу "{{ todoToDelete?.text }}"?</p>
      <button @click="confirmDelete">Да, удалить</button>
    </Popup>
  </div>
</template>

<style scoped>
.app {
  max-width: 600px;
  margin: 40px auto;
  padding: 0 16px;
}
.add-form {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}
.add-form input {
  flex: 1;
  padding: 8px;
  font-size: 16px;
}
ul {
  list-style: none;
  padding: 0;
}
li {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 0;
  border-bottom: 1px solid #eee;
}
li span {
  flex: 1;
}
.done {
  text-decoration: line-through;
  color: #999;
}
</style>
