import Layout2 from '@/layout/Layout2'

export default [{
  path: '/RoleAdmin/master',
  component: Layout2,
  meta: { middlewareAuth: true },
  children: [{
    path: 'data-district',
  	name: 'master/data-district',
    component: () => import('@/components/backend/master/district/index')
  },{
    path: 'form-district',
    name: 'master/form-district',
    component: () => import('@/components/backend/master/district/form')
  },{
    path: 'show-district',
    name: 'master/show-district',
    component: () => import('@/components/backend/master/district/show')
  },{
    path: 'data-pos-code',
    name: 'master/data-pos-code',
    component: () => import('@/components/backend/master/pos-code/index')
  },{
    path: 'form-pos-code',
    name: 'master/form-pos-code',
    component: () => import('@/components/backend/master/pos-code/form')
  },{
    path: 'show-pos-code',
    name: 'master/show-pos-code',
    component: () => import('@/components/backend/master/pos-code/show')
  },{
    path: 'data-city',
    name: 'master/data-city',
    component: () => import('@/components/backend/master/city/index')
  },{
    path: 'form-city',
    name: 'master/form-city',
    component: () => import('@/components/backend/master/city/form')
  },{
    path: 'show-city',
    name: 'master/show-city',
    component: () => import('@/components/backend/master/city/show')
  },{
    path: 'data-province',
    name: 'master/data-province',
    component: () => import('@/components/backend/master/province/index')
  },{
    path: 'form-province',
    name: 'master/form-province',
    component: () => import('@/components/backend/master/province/form')
  },{
    path: 'show-province',
    name: 'master/show-province',
    component: () => import('@/components/backend/master/province/show')
  },{
    path: 'data-country',
    name: 'master/data-country',
    component: () => import('@/components/backend/master/country/index')
  },{
    path: 'form-country',
    name: 'master/form-country',
    component: () => import('@/components/backend/master/country/form')
  },{
    path: 'show-country',
    name: 'master/show-country',
    component: () => import('@/components/backend/master/country/show')
  },{
    path: 'data-division',
    name: 'master/data-division',
    component: () => import('@/components/backend/master/division/index')
  },{
    path: 'form-division',
    name: 'master/form-division',
    component: () => import('@/components/backend/master/division/form')
  },{
    path: 'show-division',
    name: 'master/show-division',
    component: () => import('@/components/backend/master/division/show')
  },{
    path: 'data-department',
    name: 'master/data-department',
    component: () => import('@/components/backend/master/department/index')
  },{
    path: 'form-department',
    name: 'master/form-department',
    component: () => import('@/components/backend/master/department/form')
  },{
    path: 'show-department',
    name: 'master/show-department',
    component: () => import('@/components/backend/master/department/show')
  },{
    path: 'data-position',
    name: 'master/data-position',
    component: () => import('@/components/backend/master/position/index')
  },{
    path: 'form-position',
    name: 'master/form-position',
    component: () => import('@/components/backend/master/position/form')
  },{
    path: 'data-user-employee',
    name: 'master/data-user-employee',
    component: () => import('@/components/backend/master/user-employee/index')
  },{
    path: 'form-user-employee',
    name: 'master/form-user-employee',
    component: () => import('@/components/backend/master/user-employee/form')
  },{
    path: 'show-user-employee',
    name: 'master/show-user-employee',
    component: () => import('@/components/backend/master/user-employee/show')
  },{
    path: 'data-user-access',
    name: 'master/data-user-access',
    component: () => import('@/components/backend/master/user-access/index')
  },{
    path: 'form-user-access',
    name: 'master/form-user-access',
    component: () => import('@/components/backend/master/user-access/form')
  },{
    path: 'show-user-access',
    name: 'master/show-user-access',
    component: () => import('@/components/backend/master/user-access/show')
  },{
    path: 'data-domain',
    name: 'master/data-domain',
    component: () => import('@/components/backend/master/domain/index')
  },{
    path: 'form-domain',
    name: 'master/form-domain',
    component: () => import('@/components/backend/master/domain/form')
  },{
    path: 'show-domain',
    name: 'master/show-domain',
    component: () => import('@/components/backend/master/domain/show')
  },{
    path: 'data-structure-auditor',
    name: 'master/data-structure-auditor',
    component: () => import('@/components/backend/master/structure-auditor/index')
  },{
    path: 'form-structure-auditor',
    name: 'master/form-structure-auditor',
    component: () => import('@/components/backend/master/structure-auditor/form')
  },{
    path: 'show-structure-auditor',
    name: 'master/show-structure-auditor',
    component: () => import('@/components/backend/master/structure-auditor/show')
  },{
    path: 'data-organizer-auditor',
    name: 'master/data-organizer-auditor',
    component: () => import('@/components/backend/master/organizer-auditor/index')
  },{
    path: 'form-organizer-auditor',
    name: 'master/form-organizer-auditor',
    component: () => import('@/components/backend/master/organizer-auditor/form')
  },{
    path: 'show-organizer-auditor',
    name: 'master/show-organizer-auditor',
    component: () => import('@/components/backend/master/organizer-auditor/show')
  },{
    path: 'data-standart-audit',
    name: 'master/data-standart-audit',
    component: () => import('@/components/backend/master/standart-audit/index')
  },{
    path: 'form-standart-audit',
    name: 'master/form-standart-audit',
    component: () => import('@/components/backend/master/standart-audit/form')
  },{
    path: 'show-standart-audit',
    name: 'master/show-standart-audit',
    component: () => import('@/components/backend/master/standart-audit/show')
  },{
    path: 'form-audit-clause',
    name: 'master/form-audit-clause',
    component: () => import('@/components/backend/master/standart-audit/form-clause')
  },{
    path: 'form-audit-clause-import',
    name: 'master/form-audit-clause-import',
    component: () => import('@/components/backend/master/standart-audit/form-import')
  },{
    path: 'show-audit-clause',
    name: 'master/show-audit-clause',
    component: () => import('@/components/backend/master/standart-audit/show-clause')
  },{
    path: 'view-attachment-standart-audit',
    name: 'master/view-attachment-standart-audit',
    component: () => import('@/components/backend/master/standart-audit/view-attachment')
  },{
    path: 'data-personel-auditor',
    name: 'master/data-personel-auditor',
    component: () => import('@/components/backend/master/personel-auditor/index')
  },{
    path: 'form-personel-auditor',
    name: 'master/form-personel-auditor',
    component: () => import('@/components/backend/master/personel-auditor/form')
  },{
    path: 'show-personel-auditor',
    name: 'master/show-personel-auditor',
    component: () => import('@/components/backend/master/personel-auditor/show')
  },{
    path: 'data-auditor-skill',
    name: 'master/data-auditor-skill',
    component: () => import('@/components/backend/master/auditor-skill/index')
  },{
    path: 'form-auditor-skill',
    name: 'master/form-auditor-skill',
    component: () => import('@/components/backend/master/auditor-skill/form')
  },{
    path: 'show-auditor-skill',
    name: 'master/show-auditor-skill',
    component: () => import('@/components/backend/master/auditor-skill/show')
  },{
    path: 'view-attachment-auditor-skill',
    name: 'master/view-attachment-auditor-skill',
    component: () => import('@/components/backend/master/auditor-skill/view-attachment')
  },{
    path: 'data-email-template',
    name: 'master/data-email-template',
    component: () => import('@/components/backend/master/email-template/index')
  },{
    path: 'form-email-template',
    name: 'master/form-email-template',
    component: () => import('@/components/backend/master/email-template/form')
  },{
    path: 'show-email-template',
    name: 'master/show-email-template',
    component: () => import('@/components/backend/master/email-template/show')
  },{
    path: 'data-glossary-of-terms',
    name: 'master/data-glossary-of-terms',
    component: () => import('@/components/backend/master/glossary-of-terms/index')
  },{
    path: 'form-glossary-of-terms',
    name: 'master/form-glossary-of-terms',
    component: () => import('@/components/backend/master/glossary-of-terms/form')
  },{
    path: 'form-audit-email-template',
    name: 'master/form-audit-email-template',
    component: () => import('@/components/backend/master/audit-email/form')
  },{
    path: 'data-audit-email-template',
    name: 'master/data-audit-email-template',
    component: () => import('@/components/backend/master/audit-email/index')
  },{
    path: 'show-glossary-of-terms',
    name: 'master/show-glossary-of-terms',
    component: () => import('@/components/backend/master/glossary-of-terms/show'),
    props: (route) => ({
      Id: route.query.Id,
    }),
  }]
}]
