import Layout2 from '@/layout/Layout2'
import LayoutBlank from '@/layout/LayoutBlank'

export default [{
  path: '/RoleAdmin',
  component: LayoutBlank,
  children: [{
    path: 'manage',
    name: 'main/login',
    component: () => import('@/components/backend/Login')
  },{
    path: 'forgot-password',
    name: 'main/forgot-password',
    component: () => import('@/components/backend/ForgotPassword')
  },{
    path: 'verification-code',
    name: 'main/verification-code',
    component: () => import('@/components/backend/VerificationCode')
  },{
    path: 'reset-password',
    name: 'main/reset-password',
    component: () => import('@/components/backend/ResetPassword')
  }]
},

{path: '/RoleAdmin/main',
  component: Layout2,
  meta: { middlewareAuth: true },
  children: [{
    path: 'dashboard',
    component: () => import('@/components/backend/main/Dashboardnew')
  }, {
    path: 'profile',
    name: 'main/profile',
    component: () => import('@/components/backend/main/profile/index')
  }, {
    path: 'form-profile',
    name: 'main/form-profile',
    component: () => import('@/components/backend/main/profile/form')
  }, {
    path: 'master-module',
    name: 'main/master-module',
    component: () => import('@/components/backend/main/master-module/index')
  }, {
    path: 'form-master-module',
    name: 'main/form-master-module',
    component: () => import('@/components/backend/main/master-module/form')
  }, {
    path: 'show-master-module',
    name: 'main/show-master-module',
    component: () => import('@/components/backend/main/master-module/show')
  },{
    path: 'history-data',
    name: 'histroy-data/index',
    component: () => import('@/components/backend/main/history-data/index')
  },{
    path: 'show-history-data',
    name: 'main/show-history-data',
    component: () => import('@/components/backend/main/history-data/show')
  },{
    path: 'manual-book',
    name: 'main/manual-book',
    component: () => import('@/components/backend/main/manual-book/index')
  },{
    path: 'form-manual-book',
    name: 'main/form-manual-book',
    component: () => import('@/components/backend/main/manual-book/form')
  }]
}]
