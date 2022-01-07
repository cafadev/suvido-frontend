<template>
  <div class="inline-block transition duration-1000 align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
    <section class="p-4 text-2xl bg-orange-400">
      <h3 class="text-center text-white">Login</h3>
    </section>

    <section class="grid grid-rows-2 gap-4 p-4">
      <div>
        <span class="font-medium mb-2">Email</span>
        <input v-model="form.username" type="text" class="border rounded w-full px-4 py-4">
      </div>

      <div>
        <span class="font-medium mb-2">Password</span>
        <input v-model="form.password" type="password" class="border rounded w-full px-4 py-4">
      </div>
    </section>

    <section class="p-4">
      <button
        @click="triggerLogin"
        type="button"
        class="font-bold w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-orange-400 text-base font-medium text-white hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400 sm:w-auto sm:text-sm"
      >
        Login
      </button>
      <button
        @click="cancel"
        type="button"
        class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
      >
        No, thanks
      </button>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex'


export default Vue.extend({
  name: 'LoginForm',

  data() {
    return {
      form: {
        username: '',
        password: '',
      }
    }
  },

  methods: {
    ...mapActions('auth', ['login']),

    triggerLogin() {
      this.login({
        ...this.form,
        client_id: 'zTmFKEvGOBynEietu7iU5zPOdKPS1T5bsVtb9YUB',
        client_secret: 'Tjr1wxf1zLrQNVPysLJxyPNWV6LwCCEgq8NtWTj8is8uSrCOsCydciBjFUYHZ4gqqiWEcIGt3aEa2Ff20HHWAwt6oYSFuqMWrYv1NYmYiOfARonsKz7FTZFs0hAu87HQ',
      })
    },

    cancel() {
      this.$emit('cancel')
    }
  }
})
</script>