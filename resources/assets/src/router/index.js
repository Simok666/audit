import Vue from 'vue'
import Router from 'vue-router'
import Meta from 'vue-meta'
import NotFound from '@/components/NotFound'

import globals from '@/globals'

import mainRoutes from './main'
import masterRoutes from './master'
import auditRoutes from './audit'
import approvalRoutes from './approval'

Vue.use(Router)
Vue.use(Meta)

const ROUTES = [
  // Default route
  { path: '/RoleAdmin', redirect: '/RoleAdmin/manage' }
]
  .concat(mainRoutes)
  .concat(masterRoutes)
  .concat(auditRoutes)
  .concat(approvalRoutes)

// 404 Not Found page
ROUTES.push({
  path: '*',
  component: NotFound
})

const router = new Router({
  base: '/',
  mode: 'history',
  routes: ROUTES
})

router.afterEach(() => {
  // Remove initial splash screen
  const splashScreen = document.querySelector('.app-splash-screen')
  if (splashScreen) {
    setTimeout(function() { splashScreen.style.opacity = 0 },1000)
    setTimeout(() => splashScreen && splashScreen.parentNode.removeChild(splashScreen), 1500)
  }

  // On small screens collapse sidenav
  if (window.layoutHelpers && window.layoutHelpers.isSmallScreen() && !window.layoutHelpers.isCollapsed()) {
    setTimeout(() => window.layoutHelpers.setCollapsed(true, true), 10)
  }

  // Scroll to top of the page
  globals().scrollTop(0, 0)
})

router.beforeEach((to, from, next) => {
  // Set loading state
  document.body.classList.add('app-loading')

  if (to.matched.some(record => record.meta.middlewareAuth)) {
    var authToken = auth.checkToken(to.path)
    authToken.then(function(result) {
      // console.log(result)
      if (result===false && result!=200 && result!=406 ) {

        Vue.swal({
          title:'Server Session', text:'User Data Expired!'
        }).then(function () {
          auth.logout()
        })

        return
      } else if(result==406) {
        Vue.swal({
          title:'Access Page', text:'Page Access Not Allowed!'
        })
        setTimeout(()=>{ router.back() },1000)
      }
    })

  }

  // Add tiny timeout to finish page transition
  setTimeout(() => next(), 10)
})

export default router
