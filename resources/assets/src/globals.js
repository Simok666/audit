import Vue from 'vue'
import layoutHelpers from '@/layout/helpers.js'
import themeSettings from '@/vendor/libs/theme-settings/theme-settings.js'
import BootstrapVue from 'bootstrap-vue'
import Notifications from 'vue-notification'
import moment from 'moment'

Vue.use(BootstrapVue)
Vue.use(Notifications)

export default function () {
  return {
    // Public url
    publicUrl: process.env.BASE_URL,

    //delete status
    detailClauseAudit: [],

    // Layout helpers
    layoutHelpers,

    // Theme settings
    themeSettings,

    // Check for RTL layout
    get isRtlMode () {
      return document.documentElement.getAttribute('dir') === 'rtl' ||
             document.body.getAttribute('dir') === 'rtl'
    },

    // Check if IE
    get isIEMode () {
      return typeof document['documentMode'] === 'number'
    },

    // Check if IE10
    get isIE10Mode () {
      return this.isIEMode && document['documentMode'] === 10
    },

    // Layout navbar color
    get layoutNavbarBg () {
      return this.themeSettings.getOption('navbarBg') || 'navbar-theme'
    },

    // Layout sidenav color
    get layoutSidenavBg () {
      return this.themeSettings.getOption('sidenavBg') || 'sidenav-theme'
    },

    // Layout footer color
    get layoutFooterBg () {
      return this.themeSettings.getOption('footerBg') || 'footer-theme'
    },

    // Animate scrollTop
    scrollTop (to, duration, element = document.scrollingElement || document.documentElement) {
      if (element.scrollTop === to) return
      const start = element.scrollTop
      const change = to - start
      const startDate = +new Date()

      // t = current time; b = start value; c = change in value; d = duration
      const easeInOutQuad = (t, b, c, d) => {
        t /= d / 2
        if (t < 1) return c / 2 * t * t + b
        t--
        return -c / 2 * (t * (t - 2) - 1) + b
      }

      const animateScroll = () => {
        const currentDate = +new Date()
        const currentTime = currentDate - startDate
        element.scrollTop = parseInt(easeInOutQuad(currentTime, start, change, duration))
        if (currentTime < duration) {
          requestAnimationFrame(animateScroll)
        } else {
          element.scrollTop = to
        }
      }

      animateScroll()
    },

    //-------- Extension Global Function & Variable --------//

    authHeader: {
      headers: {
        // Authorization: 'Bearer ' + window.localStorage.getItem('token')
        // 'X-CSRF-TOKEN' : document.querySelector('meta[name="csrf-token"]').getAttribute('content')
      }
    },

    logoutUser () {
      auth.logout()
    },

    showNotifCustom (gNotif,tNotif,txNotif) {
      this.$notify({
        group: gNotif,
        title: tNotif,
        text: txNotif,
      })
    },

    hideModalDelete () {
      this.$bvModal.hide('modals-delete')
    },

    deleteData (url, id, elmTable,rowId=null) {
      if(id!=0) {
        Vue.swal({
          title: 'Apa anda yakin?',
          text: "Data yang dihapus akan hilang",
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Delete',
          reverseButtons: true
        }).then((result) => {
          if (result.value) {
            var authToken = axios.post('/AdminVue/check-token', { Url: url })
            .then(({data}) => {
              return data.status
            })
            .catch(({response}) => {
              return false
            })

            authToken.then(function(status) {
              if( status == 200 ) {
                axios.post(url, {
                  Id: id,
                })
                .then( function (res) {

                  var resp = res.data

                  if(resp.status){
                    this.showNotifCustom('notifications-success','Success Message',resp.message)
                  }else{
                    this.showNotifCustom('notifications-danger','Error Message',resp.message)
                  }

                  this.statusDelete = true

                  if(elmTable == this.$parent){
                    location.reload()
                  }else{
                    elmTable.reload()
                  }

                }.bind(this))
                .catch( function (e) {
                  console.log(e)
                }.bind(this))
              } else if(status==406) {
                Vue.swal({
                  title:'Access Page', text:'Feature Access Not Allowed!'
                })
              } else {
                Vue.swal({
                  title:'Server Session', text:'User Data Expired!'
                }).then(function () {
                  auth.logout()
                })
              }
            }.bind(this))
          }
        })

      }
    },

    closeData (url, id, elmTable,rowId=null) {
      if(id!=0) {
        Vue.swal({
          title: 'Apa anda yakin?',
          text: "Ingin Close Data",
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Close',
          reverseButtons: true
        }).then((result) => {
          if (result.value) {
            axios.post(url, {
              Id: id,
            })
            .then( function (res) {

              var resp = res.data

              if(resp.status){
                this.showNotifCustom('notifications-success','Success Message',resp.message)
              }else{
                this.showNotifCustom('notifications-danger','Error Message',resp.message)
              }

              this.statusDelete = true

              if(elmTable == this.$parent){
                location.reload()
              }else{
                elmTable.reload()
              }

            }.bind(this))
            .catch( function (e) {
              console.log(e)
            }.bind(this))
          }
        })

      }
    },

    sendReminderData (url, id, elmTable,rowId=null) {
      if(id!=0) {
        Vue.swal({
          title: 'Apa anda yakin?',
          text: "Ingin Mengirim Reminder Data",
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#FFD950',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Send',
          reverseButtons: true
        }).then((result) => {
          if (result.value) {
            axios.post(url, {
              Id: id,
            })
            .then( function (res) {

              var resp = res.data

              if(resp.status){
                this.showNotifCustom('notifications-success','Success Message',resp.message)
              }else{
                this.showNotifCustom('notifications-danger','Error Message',resp.message)
              }

              this.statusDelete = true

              if(elmTable == this.$parent){
                location.reload()
              }else{
                elmTable.reload()
              }

            }.bind(this))
            .catch( function (e) {
              console.log(e)
            }.bind(this))
          }
        })

      }
    },

    deleteDataClause (url, id, elmTable,IdStandartAudit,detail) {
      if(id!=0) {
        Vue.swal({
          title: 'Apa anda yakin?',
          text: "Data yang dihapus akan hilang",
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Delete',
          reverseButtons: true
        }).then((result) => {
          if (result.value) {
            var authToken = axios.post('/AdminVue/check-token', { Url: url })
            .then(({data}) => {
              return data.status
            })
            .catch(({response}) => {
              return false
            })

            authToken.then(function(status) {
              if( status == 200 ) {
                axios.post(url, {
                  Id: id,
                })
                .then( function (res) {

                  var resp = res.data

                  if(resp.status){
                    this.showNotifCustom('notifications-success','Success Message',resp.message)
                  }else{
                    this.showNotifCustom('notifications-danger','Error Message',resp.message)
                  }

                  this.statusDelete = true

                  axios.post('/AdminVue/standart-audit-clause-getClauseEdit', {
                    Id:IdStandartAudit,
                  })
                  .then( function (res) {
                    var resp = res.data
                    this.detailClauseAudit = resp.data
                    this.opsParent = resp.parent
                  }.bind(this))
                  .catch( function (e) {
                    console.log(e)
                  }.bind(this))

                }.bind(this))
                .catch( function (e) {
                  console.log(e)
                }.bind(this))
              } else if(status==406) {
                Vue.swal({
                  title:'Access Page', text:'Feature Access Not Allowed!'
                })
              } else {
                Vue.swal({
                  title:'Server Session', text:'User Data Expired!'
                }).then(function () {
                  auth.logout()
                })
              }
            }.bind(this))
          }
        })

      }
    },

    publishData(url,id,elmTable){
      if(id!=0) {
        Vue.swal({
          title: 'Apa anda yakin?',
          text: "Ingin Send to Workflow Data",
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#32CD32',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Send',
          reverseButtons: true
        }).then((result) => {
          if (result.value) {
            var authToken = axios.post('/AdminVue/check-token', { Url: url })
            .then(({data}) => {
              return data.status
            })
            .catch(({response}) => {
              return false
            })
            authToken.then(function(status) {
              if( status == 200 ) {
                axios.post(url, {
                  Id: id,
                })
                .then( function (res) {

                  var resp = res.data

                  if(resp.status){
                    this.showNotifCustom('notifications-success','Success Message',resp.message)
                  }else{
                    this.showNotifCustom('notifications-danger','Error Message',resp.message)
                  }

                  elmTable.refresh()

                }.bind(this))
                .catch( function (e) {
                  console.log(e);
                }.bind(this))
              }else if(status==406) {
                Vue.swal({
                  title:'Access Page', text:'Feature Access Not Allowed!'
                })
              }else{
                Vue.swal({
                  title:'Server Session', text:'User Data Expired!'
                }).then(function () {
                  auth.logout()
                })
              }
            }.bind(this))
          }
        })

      }
    },

    appData(url,id,elmTable,status,ordinal){
      if(status == 1){
        var subtitleText = 'Ingin Approve Data'
        var confirmButtonColor = '#22bb33'
        var confirmButtonText = 'Approve'
      }else{
        var subtitleText = 'Ingin Reject Data'
        var confirmButtonColor = '#d33'
        var confirmButtonText = 'Reject'
      }
      Vue.swal({
        title: 'Apa anda yakin?',
        text: subtitleText,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: confirmButtonColor,
        cancelButtonColor: '#3085d6',
        confirmButtonText: confirmButtonText,
        reverseButtons: true
      }).then((result) => {
        if (result.value) {
          var authToken = axios.post('/AdminVue/check-token', { Url: url })
          .then(({data}) => {
            return data.status
          })
          .catch(({response}) => {
            return false
          })
          authToken.then(function(status) {
            if( status == 200 ) {
              axios.post(url, {
                Id: id,
                Status:status,
                Ordinal:ordinal
              })
              .then( function (res) {

                var resp = res.data

                if(resp.status){
                  this.showNotifCustom('notifications-success','Success Message',resp.message)
                }else{
                  this.showNotifCustom('notifications-danger','Error Message',resp.message)
                }

                if(elmTable == null) {
                  this.$router.push('/RoleAdmin/approval/data-approval-audit-plan')
                } else {
                  elmTable.refresh()
                }

              }.bind(this))
              .catch( function (e) {
                console.log(e);
              }.bind(this))
            }else if(status==406) {
              Vue.swal({
                title:'Access Page', text:'Feature Access Not Allowed!'
              })
            }else{
              Vue.swal({
                title:'Server Session', text:'User Data Expired!'
              }).then(function () {
                auth.logout()
              })
            }
          }.bind(this))
        }
      })
    },

    isNotifExist () {
      if(this.$route.params.isNotif){
        var isNotif = this.$route.params.isNotif
        // console.log("ISNOTIF :"+isNotif)
        if(isNotif){
            var gNotif = this.$route.params.gNotif
            var tNotif = this.$route.params.tNotif
            var txNotif = this.$route.params.txNotif
            this.showNotifCustom(gNotif,tNotif,txNotif)
        }
      }
    },
    isActionAccess () {
      if(this.$route.params.isNotif){
        var isNotif = this.$route.params.isNotif
        // console.log(isNotif)
        if(isNotif){
          var gNotif = this.$route.params.gNotif
          var tNotif = this.$route.params.tNotif
          var txNotif = this.$route.params.txNotif
          this.showNotifCustom(gNotif,tNotif,txNotif)
        }
      }
    },

    showLoading () {
      document.getElementById("div-loading").classList.remove('hide')
    },

    hideLoading () {
      setTimeout(()=> {
        document.getElementById("div-loading").classList.add('hide')
      },1000)
    },

    cssTable: {
      tableClass: 'vuetable table table-striped table-bordered',
      ascendingIcon: 'fas fa-sort-up',
      descendingIcon: 'fas fa-sort-down',
      handleIcon: 'fas fa-bars'
    },

    cssPagination: {
      wrapperClass: "pagination",
      activeClass: "btn-primary text-white",
      disabledClass: "disabled",
      pageClass: "btn page-link mr-1",
      linkClass: "btn page-link mr-1",
      icons: {
        first: 'fas fa-angle-double-left',
        prev: 'fas fa-angle-left',
        next: 'fas fa-angle-right',
        last: 'fas fa-angle-double-right',
      }
    },

    dateYmdMask: [/[1-9]/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/],

    datemyMask: [/[1-9]/, /\d/, '-', /\d/, /\d/,/\d/, /\d/],

    momentYear () {
      return moment().format('YYYY')
    },

    datePickerFormat: { year: 'numeric', month: 'numeric', day: 'numeric' }

  }
}
