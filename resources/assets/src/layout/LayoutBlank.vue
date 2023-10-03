<template>
  <div class="router-transitions">
    <router-view></router-view>
    <BlockUI message="" :html="html" class="hide" id="div-loading" />
  </div>
</template>

<script>

import Vue from 'vue'
import BlockUI from 'vue-blockui'

Vue.use(BlockUI)

export default {
  name: 'app-layout-blank',
  data: () => ({
    html: `
      <div class="sk-fold sk-primary mx-auto mb-4"><div class="sk-fold-cube"></div><div class="sk-fold-cube"></div><div class="sk-fold-cube"></div><div class="sk-fold-cube"></div></div>
      <h5 class="text-center mb-0">LOADING...</h5>`
  })
}
</script>
