<template>
  <div class="layout-wrapper layout-2">
    <div class="layout-inner">
      <app-layout-sidenav />

      <div class="layout-container">
        <app-layout-navbar />

        <div class="layout-content">

          <notifications group="notifications-success" :duration="5000" animation-name="v-fade-left" position="bottom right">
            <template slot="body" slot-scope="props">
              <div class="media bg-success text-white p-3 mb-2" @click="props.close">
                <div class="media align-items-center w-100">
                  <div class="mr-3">
                    <i class="fas fa-check-square" style="font-size: 250%;"></i>
                  </div>
                  <div class="media-body">
                    <strong>{{ props.item.title }}</strong><br>
                    {{ props.item.text }}
                  </div>
                </div>
              </div>
            </template>
          </notifications>

          <notifications group="notifications-danger" :duration="5000" animation-name="v-fade-left" position="bottom right">
            <template slot="body" slot-scope="props">
              <div class="media bg-danger text-white p-3 mb-2" @click="props.close">
                <div class="media align-items-center w-100">
                  <div class="mr-3">
                    <i class="fas fa-window-close" style="font-size: 250%;"></i>
                  </div>
                  <div class="media-body">
                    <strong>{{ props.item.title }}</strong><br>
                    {{ props.item.text }}
                  </div>
                </div>
              </div>
            </template>
          </notifications>

          <div class="router-transitions container-fluid flex-grow-1 container-p-y">
            <router-view/>
            <!-- <keep-alive :include="cachedViews">
              <router-view :key="key" />
            </keep-alive> -->
            <BlockUI message="" :html="html" class="hide" id="div-loading" />
            <!-- <div class="hide" id="div-loading">
              <div class="overlay-loader"></div>
              <b-spinner label="Spinning" variant="primary" class="clip-loader" />
            </div> -->
          </div>

          <app-layout-footer />
        </div>
      </div>
    </div>
    <div class="layout-overlay" @click="closeSidenav"></div>
  </div>
</template>

<style src="@/vendor/libs/spinkit/spinkit.scss" lang="scss"></style>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style src="@/vendor/libs/vue-multiselect/vue-multiselect.scss" lang="scss"></style>

<script>

import Vue from 'vue'
import LayoutNavbar from './LayoutNavbar'
import LayoutSidenav from './LayoutSidenav'
import LayoutFooter from './LayoutFooter'
import BlockUI from 'vue-blockui'
import vueFilePond from 'vue-filepond';
import Multiselect from 'vue-multiselect'
import Datepicker from 'vuejs-datepicker'

// Import plugins
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type/dist/filepond-plugin-file-validate-type.esm';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.esm';

// Import styles
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';

// Create FilePond component
const FilePond = vueFilePond( FilePondPluginFileValidateType, FilePondPluginImagePreview );

Vue.use(BlockUI)
Vue.component('multiselect', Multiselect)
Vue.component('datepicker',Datepicker)

export default {
  name: 'app-layout-2',
  components: {
    'app-layout-navbar': LayoutNavbar,
    'app-layout-sidenav': LayoutSidenav,
    'app-layout-footer': LayoutFooter,
    FilePond
  },

  computed: {
    cachedViews () {
      return ''
    },
    key () {
      return this.$route.fullPath
    }
  },

  mounted () {
    this.layoutHelpers.init()
    this.layoutHelpers.update()
    this.layoutHelpers.setAutoUpdate(true)
  },

  beforeDestroy () {
    this.layoutHelpers.destroy()
  },

  data: () => ({
    html: `
      <div class="sk-fold sk-primary mx-auto mb-4"><div class="sk-fold-cube"></div><div class="sk-fold-cube"></div><div class="sk-fold-cube"></div><div class="sk-fold-cube"></div></div>
      <h5 class="text-center mb-0">LOADING...</h5>`
  }),

  methods: {
    closeSidenav () {
      this.layoutHelpers.setCollapsed(true)
    }
  }
}
</script>
