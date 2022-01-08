<template>
  <div>
    <h1 class="text-center text-6xl font-semibold text-white">SUVIDO</h1>
    <section class="flex justify-center mb-20">
      <input
        v-model="searchVideoUrl"
        @keyup.enter="searchVideo"
        class="w-full p-5 m-3 rounded-full outline-none focus:shadow-lg focus:shadow-orange-500/30 text-md md:text-2xl"
        type="text"
        placeholder="URL from youtube video"
      >
    </section>

    <div class="pt-10">
      <download-video-manager v-if="video.formats.length" @download="$emit('download')" :video="video" />
    </div>

    <progress-circles v-if="loading">
      <p class="font-bold">
        <span v-if="video.title">
          La descarga puede durar varios minutos dependiendo de la duración del video
          y tu velocidad de internet. Te avisaremos si la descarga se interrumpe.
        </span>
        <span v-if="!video.title">Buscando y recopilando información del video</span>
      </p>
    </progress-circles>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'SearchWrapper',

  props: {
    value: {
      type: String,
      default: () => ''
    }
  },

  data() {
    return {
      loading: false,
      isDropdownVisible: false,
      searchVideoUrl: this.value,
      video: {
        url: '',
        title: '',
        formats: [],
        thumbnail: '',
      }
    }
  },

  watch: {
    searchVideoUrl() {
      this.resetVideo()
    },

    value() {
      this.searchVideoUrl = this.value
      this.searchVideo()
    }
  },

  methods: {
    searchVideo() {
      this.toggleLoading()
      this.resetVideo()

      const params = { url: this.searchVideoUrl }

      this.$axios.get('videos/', { params }).then(response => {
        Object.assign(this.video, response.data)
      })
      .finally(() => this.toggleLoading())
    },

    resetVideo() {
      Object.assign(this.video, {
        url: '',
        title: '',
        formats: [],
        thumbnail: '',
      })
    },

    toggleLoading() {
      this.loading = !this.loading
    }
  }
})
</script>