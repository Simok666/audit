<template>
  <div id="app">
    <router-view/>
    <vue-progress-bar></vue-progress-bar>
  </div>
</template>

<style src="./style.scss" lang="scss"></style>
<style src="./styleCustom.css" lang="css"></style>

<script>

import axios from 'axios'

export default {
  name: 'app',
  metaInfo: {
    title: 'Home',
    titleTemplate: '%s | Audit Widatra'
  },
  updated () {
    // Remove loading state
    setTimeout(() => document.body.classList.remove('app-loading'), 1)
  },
  mounted () {
    //  [App.vue specific] When App.vue is finish loading finish the progress bar
    this.$Progress.finish()
  },
  created () {
    //  [App.vue specific] When App.vue is first loaded start the progress bar
    this.$Progress.start()
    //  hook the progress bar to start before we move router-view
    this.$router.beforeEach((to, from, next) => {
      //  does the page we want to go to have a meta.progress object
      if (to.meta.progress !== undefined) {
        let meta = to.meta.progress
        // parse meta tags
        this.$Progress.parseMeta(meta)
      }
      //  start the progress bar
      this.$Progress.start()
      //  continue to next page
      next()
    })
    //  hook the progress bar to finish after we've finished moving router-view
    this.$router.afterEach((to, from) => {
      //  finish the progress bar
      this.$Progress.finish()
    })

    axios.interceptors.request.use(config => {
      this.$Progress.start() // for every request start the progress
      // config.headers.Authorization = 'Bearer ' + window.localStorage.getItem('token')
      // axios.defaults.headers.common['X-CSRF-TOKEN'] = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
      return config
    })

    axios.interceptors.response.use(response => {
      this.$Progress.finish() // finish when a response is received
      return response
    }, error => {
      if( error.response.status == 419 ) {
        this.$swal({
          title:'Server Session', text:'User Session Data Expired!'
        }).then( function () {
          auth.logout()
        })
      } else {
        return Promise.reject(error);
      }
    })

  }
}
</script>
