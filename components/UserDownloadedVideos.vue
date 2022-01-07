<template>
   <div
    class="inline-block transition duration-1000 align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full"
  >
    <section class="p-4 text-2xl bg-green-400">
      <h3 class="text-center text-white">Mis videos descargados</h3>
    </section>

    <section class="grid grid-rows-2 gap-4 p-4 max-h-96 overflow-y-auto">
      <videos-list :videos="videos" />
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Video } from '@/interfaces'

export default Vue.extend({
  name: 'UserDownloadedVideos',

  data() {
    return {
      videos: [] as Video[]
    }
  },

  created() {
    this.getUserDownloadedVideos()
  },

  methods: {
    getUserDownloadedVideos() {
      this.$axios.$get('videos/me/').then((data: Video[]) => {
        this.videos = data
      })
    }
  }
})
</script>