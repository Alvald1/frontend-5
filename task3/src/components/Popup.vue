<script setup>
defineProps({
  show: Boolean
})
defineEmits(['close'])
</script>

<template>
  <Teleport to="body">
    <div v-if="show" class="overlay" @click.self="$emit('close')">
      <div class="popup">
        <slot />
        <button @click="$emit('close')">Закрыть</button>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.popup {
  background: white;
  padding: 24px;
  border-radius: 8px;
  min-width: 300px;
}
.popup button {
  margin-top: 16px;
}
</style>
