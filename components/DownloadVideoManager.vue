<template>
  <div>
    <section v-if="!downloadingVideo" class="grid grid-cols-1 md:grid-cols-3 gap-4 justify-center py-8">
      <div class="flex justify-center">
        <img
          :src="video.thumbnail"
          class="row-span-1 md:row-span-2 shadow-lg w-64"
          alt=""
        >
      </div>
      <div class="grid grid-rows-2 md:col-span-2 md:grid-rows-none justify-center">
        <div>
          <h2 class="text-md md:text-xl text-center md:text-left font-medium">{{ video.title }}</h2>
          <div class="text-left text-gray-600 text-sm">
            <p class="my-2">Channel: {{ video.channel }}</p>
            <p class="my-2">Duration: {{ videoDurationInMinutes }}</p>
          </div>
        </div>
        <div class="flex justify-center md:flex-nowrap md:justify-start mt-5">
          <div class="flex md:items-end">
            <button
              @click="downloadResource"
              class="py-2 px-4 capitalize tracking-wide bg-blue-500 text-white font-medium rounded hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
            >
              Download
            </button>
          </div>
        
          <div class="flex md:items-end relative">
            <button @click="toggleDropdown" class="relative block bg-blue-400 rounded p-2 hover:bg-blue-700 focus:outline-none focus:bg-blue-700">
              <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
              </svg>
            </button>

            <div v-if="isDropdownVisible" class="absolute right-full mt-2 w-48 bg-white rounded-md overflow-hidden shadow-xl">
              <template v-for="(format, i) in video.formats">
                <a
                  :key="i"
                  @click="downloadResource(format)"
                  class="block px-4 py-2 text-sm text-gray-800 border-b hover:bg-gray-200"
                >
                  Quality
                  <span class="text-gray-600 font-extrabold">{{ format.quality }}</span>
                </a>
              </template>
            </div>
          </div>
        </div>
      </div>
    </section>

    <progress-circles v-else>
      <p class="text-center text-orange-400 font-bold mb-4">{{ downloadProgress }}</p>
      <p class="font-bold text-blue-400">
        <span>
          La descarga puede durar varios minutos dependiendo de la duración del video
          y tu velocidad de internet. Te avisaremos si la descarga se interrumpe.
        </span>
      </p>
    </progress-circles>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'VideoCard',

  props: {
    video: {
      type: Object,
      required: true,
    }
  },

  data() {
    return {
      isDropdownVisible: false,
      downloadingVideo: false,
      downloading: 0
    }
  },

  computed: {
    videoDurationInMinutes(): string {
      const seconds = this.video.duration || 0
      const minutes = (seconds / 60).toFixed(0)
      return seconds < 60 ? `${seconds} seconds` : `${minutes} minutes`
    },

    downloadProgress(): string {
      const mb = (this.downloading / 1000) / 1000
      return `${mb.toFixed(2)}MB`
    }
  },

  methods: {
    toggleDropdown() {
      this.isDropdownVisible = !this.isDropdownVisible
    },

    closeDropdown() {},

    downloadResource(format: { url: string, ext: string }) {
      this.toggleDropdown()
      this.downloadingVideo = true
      this.downloading = 0

      const setDownloading = ({ loaded }: { loaded: number }) => {
        this.downloading = loaded
      }

      this.$axios({
        url: 'videos/',
        method: 'POST',
        responseType: 'blob',
        data: { video_url: this.video.url, format_url: format.url },
        onDownloadProgress(progress) {
          setDownloading(progress)
        }
      })
      .then((response) => {
        const filename = `video.${format.ext}`

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');

        link.href = url;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();

        this.$emit('download')
      }).finally(() => {
        this.downloadingVideo = false
      });
    }
  },
})
</script>