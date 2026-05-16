<template>
  <div>
    <Clicker
      v-for="n in 100"
      :key="n"
      :amount="n"
      @button-clicked="() => alert(`Clicker ${n} clicked!`)"
    >
      <button>Click {{ n }}</button>
    </Clicker>
  </div>
</template>

<script setup>
import Clicker from './components/Clicker.vue'
</script>
