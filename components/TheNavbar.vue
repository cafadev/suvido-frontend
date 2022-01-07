<template>
  <nav>
    <ul v-if="!isLogged" class="flex justify-end items-center font-bold">
      <li>
        <dialog-wrapper v-model="loginDialog">
          <template #activator="{ on }">
            <button
              v-on="on"
              class="rounded text-white hover:text-green-100 border border-white hover:border-green-100 cursor-pointer px-8 py-2 mr-5 font-bold"
            >
              Login
            </button>
          </template>
          <login-form @cancel="loginDialog = false" />
        </dialog-wrapper>
      </li>
      <li>
        <dialog-wrapper v-model="signupDialog">
          <template #activator="{ on }">
            <button
              v-on="on"
              class="rounded text-white bg-orange-500 2xl:bg-orange-500 hover:bg-orange-500 focus:bg-orange-500 cursor-pointer shadow-lg shadow-orange-500/40 px-8 py-2 font-bold"
            >
              Sign up
            </button>
          </template>
          <register-form @cancel="signupDialog = false" />
        </dialog-wrapper>
      </li>
    </ul>

    <ul v-else class="flex justify-end items-center font-bold">
      <li>
        <button class="rounded-full hover:bg-orange-400/40 border border-white w-10 h-10">
          <i class="mdi mdi-logout text-white text-xl font-bold"></i>
        </button>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'

export default Vue.extend({
  name: 'TheHeader',

  data() {
    return {
      loginDialog: false,
      signupDialog: false
    }
  },

  computed: {
    ...mapGetters('auth', ['isLogged']),
  },

  methods: {
    openDialog() {}
  },
})
</script>