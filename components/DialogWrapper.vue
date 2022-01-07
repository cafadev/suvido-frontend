<template>
  <div>
    <slot name="activator" v-bind="{ on: { click: openDialog } }"></slot>
    <div v-if="dialog" class="fixed z-10 bg-blue-400 bg-opacity-40 inset-0 overflow-y-auto">
      <div class="flex items-center justify-center min-h-screen min-w-screen px-4 animate__animated animate__zoomIn">
        
        <slot></slot>

      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'DialogWrapper',

  props: {
    value: {
      type: Boolean,
      required: true
    }
  },

  data() {
    return {
      dialog: this.value
    }
  },

  watch: {
    dialog() {
      this.$emit('input', this.dialog)
    },

    value() {
      this.dialog = this.value
    }
  },

  methods: {
    openDialog() {
      this.dialog = true
    }
  }
})
</script>