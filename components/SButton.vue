<template>
  <button @click="$emit('click')" class="rounded cursor-pointer px-8 py-2 mr-5 font-bold transition-all">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'SButton',
})
</script>