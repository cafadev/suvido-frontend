<template>
  <div  class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
    <section class="p-4 text-2xl bg-green-400">
      <h3 class="text-center text-white">Create your account</h3>
    </section>

    <form class="grid grid-rows-2 gap-4 p-4">
      <div>
        <span class="font-medium mb-2">Your name</span>
        <input v-model="form.first_name" type="text" class="border rounded w-full px-4 py-4">
      </div>

      <div>
        <span class="font-medium mb-2">Email</span>
        <input v-model="form.email" type="text" class="border rounded w-full px-4 py-4">
      </div>

      <div>
        <span class="font-medium mb-2">Password</span>
        <input v-model="form.password" type="password" class="border rounded w-full px-4 py-4">
      </div>
      
      <div>
        <span class="font-medium mb-2">Confirm password</span>
        <input v-model="form.re_password" type="password" class="border rounded w-full px-4 py-4">
      </div>
    </form>

    <section class="p-4">
      <button
        @click="create"
        type="button"
        class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-400 text-base font-medium text-white hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400 sm:w-auto sm:text-sm font-bold"
      >
        <span v-if="!loading">Create account</span>
        <div v-else class="flex justify-center items-center">
          <div style="border-top-color:transparent" class="w-4 h-4 border-4 border-white border-solid rounded-full animate-spin"></div>
        </div>
      </button>
      <button
        @click="cancel"
        type="button"
        class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm font-bold"
      >
        No, thanks
      </button>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'LoginForm',

  data() {
    return {
      loading: false,
      form: {
        first_name: '',
        email: '',
        password: ''
      }
    }
  },

  methods: {
    create() {
      this.toggleLoading()
      this.$axios.post('users/', this.form).then((response) => {
        console.log(response.data)
      })
      .finally(() => this.toggleLoading())
    },

    cancel() {
      this.$emit('cancel')
    },

    toggleLoading() {
      this.loading = !this.loading
    }
  }
})
</script>