import Layout2 from '@/layout/Layout2'

export default [{
  path: '/RoleAdmin/audit',
  component: Layout2,
  meta: { middlewareAuth: true },
  children: [{
    path: 'data-audit-plan',
  	name: 'audit/data-audit-plan',
    component: () => import('@/components/backend/audit/audit-plan/index')
  },{
    path: 'form-audit-plan',
    name: 'audit/form-audit-plan',
    component: () => import('@/components/backend/audit/audit-plan/form')
  },{
    path: 'view-attachment-audit-plan',
    name: 'audit/view-attachment-audit-plan',
    component: () => import('@/components/backend/audit/audit-plan/view-attachment')
  },{
    path: 'show-auditee-audit-plan',
    name: 'audit/show-auditee-audit-plan',
    component: () => import('@/components/backend/audit/audit-plan/show-auditee')
  },{
    path: 'show-audit-plan',
    name: 'audit/show-audit-plan',
    component: () => import('@/components/backend/audit/audit-plan/show')
  },{
    path: 'data-auditor-report',
  	name: 'audit/data-auditor-report',
    component: () => import('@/components/backend/audit/auditor-report/index')
  },{
    path: 'form-auditor-report',
    name: 'audit/form-auditor-report',
    component: () => import('@/components/backend/audit/auditor-report/form')
  },{
    path: 'view-attachment-auditor-report',
    name: 'audit/view-attachment-auditor-report',
    component: () => import('@/components/backend/audit/auditor-report/view-attachment')
  },{
    path: 'show-auditor-report',
    name: 'audit/show-auditor-report',
    component: () => import('@/components/backend/audit/auditor-report/show')
  },{
    path: 'data-auditor-team',
  	name: 'audit/data-auditor-team',
    component: () => import('@/components/backend/audit/auditor-team/index')
  },{
    path: 'form-auditor-team',
    name: 'audit/form-auditor-team',
    component: () => import('@/components/backend/audit/auditor-team/form')
  },{
    path: 'view-attachment-auditor-team',
    name: 'audit/view-attachment-auditor-team',
    component: () => import('@/components/backend/audit/auditor-team/view-attachment')
  },{
    path: 'show-auditor-team',
    name: 'audit/show-auditor-team',
    component: () => import('@/components/backend/audit/auditor-team/show')
  },{
    path: 'data-plan-capa-report',
  	name: 'audit/data-plan-capa-report',
    component: () => import('@/components/backend/audit/plan-capa-report/index')
  },{
    path: 'form-plan-capa-report',
    name: 'audit/form-plan-capa-report',
    component: () => import('@/components/backend/audit/plan-capa-report/form')
  },{
    path: 'view-attachment-plan-capa-report',
    name: 'audit/view-attachment-plan-capa-report',
    component: () => import('@/components/backend/audit/plan-capa-report/view-attachment')
  },{
    path: 'show-plan-capa-report',
    name: 'audit/show-plan-capa-report',
    component: () => import('@/components/backend/audit/plan-capa-report/show')
  },{
    path: 'data-verification-capa-report',
  	name: 'audit/data-verification-capa-report',
    component: () => import('@/components/backend/audit/verification-capa-report/index')
  },{
    path: 'form-verification-capa-report',
    name: 'audit/form-verification-capa-report',
    component: () => import('@/components/backend/audit/verification-capa-report/form')
  },{
    path: 'show-verification-capa-report',
    name: 'audit/show-verification-capa-report',
    component: () => import('@/components/backend/audit/verification-capa-report/show')
  },{
    path: 'view-attachment-verification-capa-report',
    name: 'audit/view-attachment-verification-capa-report',
    component: () => import('@/components/backend/audit/verification-capa-report/view-attachment')
  }]
}]