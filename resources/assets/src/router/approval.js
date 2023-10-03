import Layout2 from '@/layout/Layout2'

export default [{
    path: '/RoleAdmin/approval',
    component: Layout2,
    meta: { middlewareAuth: true },
    children: [{
        path: 'data-approval-auditor-report',
        name: 'approval/data-auditor-report',
        component: () => import('@/components/backend/approval/auditor-report/index')
    },{
        path: 'view-attachment-approval-auditor-report',
        name: 'approval/view-attachment-approval-auditor-report',
        component: () => import('@/components/backend/approval/auditor-report/view-attachment')
    },{
        path: 'show-approval-auditor-report',
        name: 'approval/show-auditor-report',
        component: () => import('@/components/backend/approval/auditor-report/show')
    },{
        path: 'data-approval-plan-capa-report',
        name: 'approval/data-approval-plan-capa-report',
        component: () => import('@/components/backend/approval/plan-capa-report/index')
    },{
        path: 'view-attachment-approval-plan-capa-report',
        name: 'approval/view-attachment-approval-plan-capa-report',
        component: () => import('@/components/backend/approval/plan-capa-report/view-attachment')
    },{
        path: 'show-approval-plan-capa-report',
        name: 'approval/show-plan-capa-report',
        component: () => import('@/components/backend/approval/plan-capa-report/show')
    },{
        path: 'data-approval-verification-capa-report',
        name: 'approval/data-approval-verification-capa-report',
        component: () => import('@/components/backend/approval/verification-capa-report/index')
    },{
        path: 'show-approval-verification-capa-report',
        name: 'approval/show-verification-capa-report',
        component: () => import('@/components/backend/approval/verification-capa-report/show')
    },{
        path: 'data-approval-audit-plan',
        name: 'approval/data-approval-audit-plan',
        component: () => import('@/components/backend/approval/audit-plan/index')
    },{
        path: 'view-attachment-approval-audit-plan',
        name: 'approval/view-attachment-approval-audit-plan',
        component: () => import('@/components/backend/approval/audit-plan/view-attachment')
    },{
        path: 'show-auditee-approval-audit-plan',
        name: 'approval/show-auditee-approval-audit-plan',
        component: () => import('@/components/backend/approval/audit-plan/show-auditee')
    },{
        path: 'show-approval-audit-plan',
        name: 'approval/show-audit-plan',
        component: () => import('@/components/backend/approval/audit-plan/show')
    },{
        path: 'data-approval-auditor-team',
        name: 'approval/data-approval-auditor-team',
        component: () => import('@/components/backend/approval/auditor-team/index')
    },{
        path: 'view-attachment-approval-auditor-team',
        name: 'approval/view-attachment-approval-auditor-team',
        component: () => import('@/components/backend/approval/auditor-team/view-attachment')
    },{
        path: 'show-approval-auditor-team',
        name: 'approval/show-auditor-team',
        component: () => import('@/components/backend/approval/auditor-team/show')
    }]
}]