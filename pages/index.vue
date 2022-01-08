<template>
  <div class="bg-indigo-50 min-h-screen min-w-screen">

    <div class="rounded-full circle--lg circle-size--lg bg-blue-400 shadow-2xl shadow-blue-400"></div>
    <div class="rounded-full circle--md circle-size--md bg-orange-400 shadow-2xl shadow-orange-400 hidden xl:flex justify-center items-center">
      <div>
        <p class="text-4xl font-bold text-orange-700">+10k</p>
        <p class="text-xl font-bold text-orange-700">Downloads</p>
      </div>
    </div>
    <div class="rounded-full circle--sm circle-size--sm bg-blue-400 shadow-2xl shadow-blue-400 hidden md:flex"></div>
    
    <main x-data="app" class="container mx-auto text-center max-w-4xl px-6">
      <header class="pt-4 pb-20 px-10">
        <the-navbar />
      </header>

      <search-wrapper v-model="searchVideoUrl" />

      <div class="flex justify-center xl:hidden py-10">
        <div class="rounded-full w-60 h-60 bg-orange-400 shadow-2xl shadow-orange-400 justify-center items-center flex">
          <div>
            <p class="text-4xl font-bold text-orange-700">+10k</p>
            <p class="text-xl font-bold text-orange-700">Downloads</p>
          </div>
        </div>
      </div>

      <section class="pt-20 pb-10">
        <h2 class="text-xl text-orange-400 text-left font-semibold">Recent downloads</h2>
        <section class="flex py-8">
          <s-button
            @click="fetchAllDownloadedVideos"
            :class="allDownloadsListStyles"
          >
            TOP 10
          </s-button>
          <s-button
            v-if="isLogged"
            @click="fetchMyDownloadedVideos"
            :class="myDownloadsListStyles"
          >
            Mis descargas
          </s-button>
        </section>
        <videos-list @click="setSearchVideoUrl" :videos="videosList" />
      </section>
    </main>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions, mapGetters } from 'vuex'

import { Video } from '@/interfaces'

const LIST_TYPE = {
  'ALL_DOWNLOADS': 'ALL_DOWNLOADS',
  'MY_DOWNLOADS': 'MY_DOWNLOADS'
}

export default Vue.extend({
  data() {
    return {
      LIST_TYPE,
      searchVideoUrl: '',
      listType: LIST_TYPE.ALL_DOWNLOADS,
      rankingVideos: [] as Video[],
      myVideos: [] as Video[]
    }
  },

  async fetch() {
    await this.fetchAllDownloadedVideos()
  },

  created() {
    this.getLoggedUser()
  },

  computed: {
    ...mapGetters('auth', ['isLogged']),

    allDownloadsListStyles(): string {
      const active = 'bg-blue-400 text-white shadow-lg shadow-blue-400'
      const deactive = 'bg-transparent border border-blue-400 text-blue-400'

      return this.listType === LIST_TYPE.ALL_DOWNLOADS ? active : deactive
    },

    myDownloadsListStyles(): string {
      const active = 'border border-blue-400 text-white bg-blue-400 shadow-lg shadow-blue-400'
      const deactive = 'border border-blue-400 text-blue-400'

      return this.listType === LIST_TYPE.MY_DOWNLOADS ? active : deactive
    },

    videosList(): Video[] {
      return this.listType === LIST_TYPE.ALL_DOWNLOADS ? this.rankingVideos : this.myVideos
    }
  },

  methods: {
    ...mapActions('auth', ['getLoggedUser']),

    setSearchVideoUrl({ url }: Video) {
      this.searchVideoUrl = url
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },

    async fetchAllDownloadedVideos() {
      this.listType = LIST_TYPE.ALL_DOWNLOADS

      const rankingVideos = await this.$axios.$get(`ranking/`)

      if (process.env.NODE_ENV === 'development') {
        rankingVideos.forEach((video: Video) => {
          video.thumbnail = video.thumbnail.replace('backend:9000', 'localhost:9000')
        })
      }
      this.rankingVideos = rankingVideos
    },

    fetchMyDownloadedVideos() {
      this.listType = LIST_TYPE.MY_DOWNLOADS
      const params = {
        limit: 10
      }
      this.$axios.$get('videos/me/', { params }).then((data: { results: Video[]}) => {
        this.myVideos = data.results
      })
    }
  }
})
</script>