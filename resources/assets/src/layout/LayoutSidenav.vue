<template>
  <sidenav :orientation="orientation" :class="curClasses">

    <!-- Brand demo (see src/demo.css) -->
    <div class="app-brand demo" v-if="orientation !== 'horizontal'">
      <span class="app-brand-logo demo bg-white" style="width: 45px; height: 45px;">
        <img :src="`${publicUrl}clouds/backend/files/images/logo-icon.png`" alt="Treenear" width="30px">
      </span>
      <router-link to="/RoleAdmin/main/dashboard" class="app-brand-text demo sidenav-text font-weight-normal ml-2">Audit</router-link>
      <a href="javascript:void(0)" class="layout-sidenav-toggle sidenav-link text-large ml-auto" @click="toggleSidenav()">
        <i class="ion ion-md-menu align-middle"></i>
      </a>
    </div>
    <div class="sidenav-divider mt-0" v-if="orientation !== 'horizontal'"></div>

    <!-- Links -->
    <div class="sidenav-inner" :class="{ 'py-1': orientation !== 'horizontal' }">

      <sidenav-router-link icon="ion ion-md-speedometer" to="/RoleAdmin/main/dashboard" :exact="true">Dashboard</sidenav-router-link>
      <sidenav-router-link icon="ion ion-md-person" to="/RoleAdmin/main/profile" :exact="true">Profile</sidenav-router-link>

      <sidenav-divider class="mb-1"/>

      <template v-for="val in accessMenu"> <template v-if="val.selected===true">

        <template v-if="val.children.length">
          <sidenav-menu :icon="val.icon" :active="isMenuActive(val.value)" :open="isMenuOpen(val.value)">
            <template slot="link-text">{{val.text}}</template>

            <template v-for="valSub in val.children"> <template v-if="valSub.selected===true">

              <template v-if="valSub.children.length">
                <sidenav-menu> <template slot="link-text">{{valSub.text}}</template>
                  <template v-for="valSubs in valSub.children"> <template v-if="valSubs.selected===true">
                    <sidenav-router-link :to="valSubs.value" :exact="true">{{valSubs.text}}</sidenav-router-link>
                  </template> </template>
                </sidenav-menu>
              </template>

              <sidenav-router-link v-else :to="valSub.value" :exact="true">{{valSub.text}}</sidenav-router-link>

            </template> </template>

          </sidenav-menu>
        </template>

        <template v-else-if="val.text=='Master Module'">
          <sidenav-divider class="mb-1"/>
          <sidenav-router-link :icon="val.icon" :to="val.value" :exact="true">{{val.text}}</sidenav-router-link>
        </template>

        <sidenav-router-link v-else :icon="val.icon" :to="val.value" :exact="true">{{val.text}}</sidenav-router-link>

      </template> </template>

      <div class="sidenav-item">
        <a href="javascript:void(0)" class="sidenav-link" v-on:click="confirmLogout">
          <i class="sidenav-icon ion ion-ios-log-out"></i> 
          <div>Logout</div>
        </a>
      </div>

    </div>
  </sidenav>
</template>

<script>
import { Sidenav, SidenavLink, SidenavRouterLink, SidenavMenu, SidenavHeader, SidenavBlock, SidenavDivider } from '@/vendor/libs/sidenav'

export default {
  name: 'app-layout-sidenav',
  components: {
    /* eslint-disable vue/no-unused-components */
    Sidenav,
    SidenavLink,
    SidenavRouterLink,
    SidenavMenu,
    SidenavHeader,
    SidenavBlock,
    SidenavDivider
    /* eslint-enable vue/no-unused-components */
  },

  props: {
    orientation: {
      type: String,
      default: 'vertical'
    }
  },

  computed: {
    curClasses () {
      let bg = this.layoutSidenavBg

      if (this.orientation === 'horizontal' && (bg.indexOf(' sidenav-dark') !== -1 || bg.indexOf(' sidenav-light') !== -1)) {
        bg = bg
          .replace(' sidenav-dark', '')
          .replace(' sidenav-light', '')
          .replace('-darker', '')
          .replace('-dark', '')
      }

      return `bg-${bg} ` + (
        this.orientation !== 'horizontal'
          ? 'layout-sidenav'
          : 'layout-sidenav-horizontal container-p-x flex-grow-0'
      )
    }
  },

  data () {
    return {
      accessMenu: []
    }
  },

  created () {
    this.reAccessMenu()
  },

  mounted () {
    
  },

  methods: {
    isMenuActive (url) {
      return this.$route.path.indexOf(url) === 0
    },

    isMenuOpen (url) {
      return this.$route.path.indexOf(url) === 0 && this.orientation !== 'horizontal'
    },

    toggleSidenav () {
      this.layoutHelpers.toggleCollapsed()
    },

    confirmLogout () {
      this.$swal({
        title: 'Apa anda yakin?',
        text: "Anda akan keluar dari halaman Admin",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Logout',
        reverseButtons: true
      }).then((result) => {
        if (result.value) {
          this.logoutUser()
        }
      })
    },

    reAccessMenu () {
      var menu = JSON.parse(window.localStorage.getItem('accessMenu'))

      if(menu==null) {
        axios.post('/AdminVue/auth-reaccess-menu', {
          
        })
        .then( function (res) {

          var resp = res.data
          window.localStorage.setItem('accessMenu', JSON.stringify(resp.accessMenu))
          this.accessMenu = resp.accessMenu

        }.bind(this))
        .catch( function (e) {
          console.log(e)
        }.bind(this))
      } else {
        this.accessMenu = menu
      }
    }

  }
}
</script>
