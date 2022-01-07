<template>
  <section>
    <div class="grid grid-cols-1 text-left divide-y divide-slate-300">
      <article
        v-for="video in videos"
        :key="video.id"
        @click="click(video)"
        class="grid grid-cols-1 sm:grid-cols-3 gap-3 py-8 text-blue-400 cursor-pointer hover:bg-indigo-100 px-4 transition-all"
      >
        <figure>
          <img :src="video.thumbnail">
        </figure>

        <div class="flex flex-wrap flex-col justify-between col-span-2">
          <div>
            <p class="font-bold truncate">{{ video.title }}</p>
            <p class="text-gray-600">{{ video.url }}</p>
          </div>
          <div class="py-4">
            <p class="text-gray-600">Channel: {{ video.channel }}</p>
            <p class="text-gray-600">Duración: {{ videoDurationInMinutes(video) }}</p>
          </div>
          <a :href="video.url" target="_blank" rel="noopener noreferrer" class="text-xl text-orange-400">
            <i class="mdi mdi-open-in-new" />
          </a>
        </div>
      </article>
    </div>
  </section>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { Video } from '@/interfaces'

export default Vue.extend({
  name: 'VideosList',

  props: {
    videos: {
      type: Array as PropType<Video[]>,
      default: () => []
    }
  },

  methods: {
    click(video: Video) {
      this.$emit('click', video)
    },

    videoDurationInMinutes({ duration }: Video) {
      const seconds = duration || 0
      const minutes = (seconds / 60).toFixed(0)
      return seconds < 60 ? `${seconds} seconds` : `${minutes} minutes`
    }
  }
})
</script>


