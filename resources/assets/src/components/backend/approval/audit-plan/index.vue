<template> <div>

  <b-card header="View / Data Approval Audit Plan" header-tag="h4" class="mb-4">

  	<b-form inline class="mb-2 row">
      <div class="col-md-6">
          <b-form inline class="">
            <label class="form-label mr-sm-2">Show Data</label>
            <b-select v-model="vars.perPage" value="vars.perPage" :options="[10,25,50,100,1000]" />
          </b-form>
      </div>
      <div class="col-md-6">
          <!-- <b-dd variant="danger" class="float-right">
            <template v-slot:button-content>
              <i class="fas fa-print"></i> Export
            </template>
            <b-dropdown-item href="/AdminVue/distric-export-pdf" target="_blank">PDF</b-dropdown-item>
            <b-dd-item>Excel</b-dd-item>
          </b-dd> -->

          <!-- <b-btn @click="createData()" class="btn btn-success btn-md float-right mr-2">
              <i class="ion ion-md-add-circle"></i> Create Data
          </b-btn> -->
      </div>
	  </b-form>

	  <div class="table-responsive"> <vuetable ref="vuetable"
	    api-url="/AdminVue/data-approval-audit-plan"
      :http-options= "authHeader"
	    :fields="fields"
	    :css="cssTable"
	    :sort-order="sortOrder"
	    :multi-sort="false"
	    multi-sort-key="ctrl"
	    :per-page="vars.perPage"
	    pagination-path=""
	    @vuetable:pagination-data="onPaginationData"
	    :append-params="paramData"
      @vuetable:loading="showLoading()"
      @vuetable:loaded="hideLoading()"
	  >

      <template slot="tableHeader">
        <tr class="text-center">
          <th class="wd-50"></th>
          <th>
            <b-input v-model="paramData.search.adp__NoTrans" placeholder="IdAudit" v-on:keyup.enter="getFilters()" />
          </th>
          <th>
            <b-input v-model="paramData.search.adp__Purpose" placeholder="Purpose" v-on:keyup.enter="getFilters()" />
          </th>
          <th>
            <b-input v-model="paramData.search.adp__AuditScope" placeholder="Audit Scope" v-on:keyup.enter="getFilters()" />
          </th>
          <th>
            <masked-input type="text" class="form-control" placeholder="Bln-Thn"
              v-model="paramData.search.adp__AuditPeriode"
              v-on:keyup.enter="getFilters()"
              :guide="false"
              :mask="datemyMask" />
          </th>
          <th>
            <masked-input type="text" class="form-control" placeholder="Thn-Bln-Tgl"
              v-model="paramData.search.adp__OpeningMeeting"
              v-on:keyup.enter="getFilters()"
              :guide="false"
              :mask="dateYmdMask" />
          </th>
          <th>
            <masked-input type="text" class="form-control" placeholder="Thn-Bln-Tgl"
              v-model="paramData.search.adp__AuditExecutionStart"
              v-on:keyup.enter="getFilters()"
              :guide="false"
              :mask="dateYmdMask" />
          </th>
          <th>
            <masked-input type="text" class="form-control" placeholder="Thn-Bln-Tgl"
              v-model="paramData.search.adp__AuditExecutionDone"
              v-on:keyup.enter="getFilters()"
              :guide="false"
              :mask="dateYmdMask" />
          </th>
          <th>
            <masked-input type="text" class="form-control" placeholder="Thn-Bln-Tgl"
              v-model="paramData.search.dst__CloseMeeting"
              v-on:keyup.enter="getFilters()"
              :guide="false"
              :mask="dateYmdMask" />
          </th>
          <th></th>
          <th>
            <b-input v-model="paramData.search.adp__Objective" placeholder="Objective" v-on:keyup.enter="getFilters()" />
          </th>
          <th>
            <b-input v-model="paramData.search.adp__OrganizerAudit" placeholder="Organizer Audit" v-on:keyup.enter="getFilters()" />
          </th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
        </tr>
        <vuetable-row-header></vuetable-row-header>
      </template>

      <template slot="index" slot-scope="props">
          {{ props.rowIndex + 1}}
      </template>

      <template slot="AuditCriteria" slot-scope="props">
        {{getAuditCriteriaString(props.rowData.AuditCriteria)}}
      </template>

      <template slot="Status" slot-scope="props">
          <div v-if="props.rowData.Status == 1">
            Open
          </div>
          <div v-else>
            Close
          </div>
      </template>

      <template slot="EmpApproved" slot-scope="props">
          <div v-if="props.rowData.StatusApproved == 2">
            Approved by {{props.rowData.EmpApproved}}
          </div>
          <div v-if="props.rowData.StatusApproved == 3">
            Rejected by {{props.rowData.EmpApproved}}
          </div>
      </template>

      <template slot="AuditeeDepartment" slot-scope="props">
          <b-btn class="btn btn-outline-info btn-sm mr-1 mt-1"
          @click="viewAuditeeDepartment(props.rowData, props.rowIndex)" v-if="User.accessMenuDB[2].children[0].children[2].selected === true">
          <i class="ion ion-ios-eye"></i> Lihat Auditee
          </b-btn>
      </template>

      <template slot="Path" slot-scope="props">
          <div v-if="props.rowData.Path != ''">
            <b-btn class="btn btn-outline-danger btn-sm mr-1 mt-1"
            @click="viewAttachment(props.rowData, props.rowIndex)" v-if="User.accessMenuDB[2].children[0].children[3].selected === true">
            <i class="ion ion-md-attach"></i>
            </b-btn>
          </div>
      </template>

        <template slot="Actions" slot-scope="props">
            <div class="custom-actions" v-if="props.rowData.Actived == 1">
                <b-btn class="btn btn-outline-info btn-sm mr-sm-1"
                @click="onAction('view-item', props.rowData, props.rowIndex)">
                <i class="ion ion-ios-eye"></i> Show
                </b-btn>
                <b-btn class="btn btn-outline-secondary btn-sm mr-sm-1"
                @click="onAction('edit-item', props.rowData, props.rowIndex)">
                <i class="ion ion-md-create"></i> Edit
                </b-btn>
                <b-btn class="btn btn-outline-danger btn-sm mr-1 mt-1"
                @click="onAction('delete-item', props.rowData, props.rowField)">
                <i class="ion ion-md-trash"></i> Delete
                </b-btn>
            </div>
             <div class="custom-actions" v-else>
                <b-btn class="btn btn-outline-info btn-sm mr-sm-1"
                    @click="onAction('view-item', props.rowData, props.rowIndex)">
                    <i class="ion ion-ios-eye"></i> Show
                </b-btn>
            </div>
        </template>

	  	<template slot="actions" slot-scope="props">
        <div class="custom-actions" v-if="props.rowData.Actived == 1">
          <b-btn class="btn btn-outline-success btn-sm mr-1 mt-1"
            @click="onAction('publish-item', props.rowData, props.rowIndex)">
            <i class="ion ion-md-checkmark"></i> Send to Workflow
          </b-btn>
        </div>
        <div class="custom-actions" v-if="props.rowData.Actived == 2">
          <div v-if="props.rowData.StatusApproved == 1 && props.rowData.StatusApprovedEmp == 1">
            <b-btn class="btn btn-outline-success btn-sm mr-1 mt-1"
              @click="onAction('approve-item', props.rowData, props.rowIndex,2)" v-if="User.accessMenuDB[2].children[0].children[4].selected === true">
              <i class="ion ion-ios-create"></i> Approve
            </b-btn>
            <b-btn class="btn btn-outline-danger btn-sm mr-sm-1 mt-1"
                @click="onAction('reject-item', props.rowData, props.rowIndex,2)" v-if="User.accessMenuDB[2].children[0].children[5].selected === true">
                <i class="ion ion-md-warning"></i> Reject
            </b-btn>
          </div>
          <!-- <div v-if="props.rowData.StatusApproved == 2 && props.rowData.IdAuditSelection !== null">
            <a class="btn btn-xs btn-outline-success text-success" :href="'/AdminVue/audit-plan/'+props.rowData.id+'/exportJadwal'" target="_blank"> <i class="fas fa-print"></i> Export Jadwal</a>
            <a class="btn btn-xs btn-outline-success text-success" :href="'/AdminVue/audit-plan/'+props.rowData.id+'/exportTindakLanjut'" target="_blank"> <i class="fas fa-print"></i> Export Tindak Lanjut</a>
            <a class="btn btn-xs btn-outline-success text-success" :href="'/AdminVue/audit-plan/'+props.rowData.id+'/exportAnalisis'" target="_blank"> <i class="fas fa-print"></i> Export Analisis</a>
          </div> -->
        </div>
      </template>
	  	
	  </vuetable> </div>

    <div class="vuetable-footer">
      <vuetable-pagination-info ref="paginationInfo"
      ></vuetable-pagination-info>

      <vuetable-pagination ref="pagination"
          :css="cssPagination"
          @vuetable-pagination:change-page="onChangePage"
      ></vuetable-pagination>
    </div>

  </b-card>

</div> 
</template>


<script>

import Vue from 'vue'
import Vuetable from 'vuetable-2'
import VuetablePagination from 'vuetable-2/src/components/VuetablePagination'
import VuetablePaginationInfo from 'vuetable-2/src/components/VuetablePaginationInfo'
import VuetableRowHeader from 'vuetable-2/src/components/VuetableRowHeader'
import accounting from 'accounting'
import moment from 'moment'
import MaskedInput from 'vue-text-mask'
import ButtonAction from '@/components/backend/template/ButtonAction'

export default {
  name: 'index-distric',
  metaInfo: {
    title: 'Index Approval Audit Plan'
  },
  components: {
    Vuetable,
    VuetablePagination,
    VuetablePaginationInfo,
    VuetableRowHeader,
    MaskedInput
  },

  links: {
    pagination: {
      // pagination information
    }
  },

  data () { 
  	return {

  		fields: [
  			{
          name: 'index',
          title: '#',
          titleClass: 'text-center',
          dataClass: 'text-center wd-50'
        },
  			{
  				name: 'NoTrans',
  				sortField: 'adp.NoTrans',
  				title: 'Id Audit',
  				titleClass: 'text-center',
          dataClass: 'text-center'
  			},
  			{
  				name: 'Purpose',
  				sortField: 'adp.Purpose',
  				title: 'Purpose',
  				titleClass: 'text-center',
          dataClass: 'text-center'
  			},
  			{
          name: 'AuditScope',
          sortField: 'adp.AuditScope',
          title: 'Audit Scope',
          titleClass: 'text-center',
          dataClass: 'text-center',
        },
        {
          name: 'AuditPeriode',
          sortField: 'adp.AuditPeriode',
          title: 'Audit Periode',
          titleClass: 'text-center',
          dataClass: 'text-center',
          formatter: this.formatDateMY
        },
        {
          name: 'OpeningMeeting',
          sortField: 'adp.OpeningMeeting',
          title: 'Opening Meeting',
          titleClass: 'text-center',
          dataClass: 'text-center',
          formatter: this.formatDate
        },
        {
          name: 'AuditExecutionStart',
          sortField: 'adp.AuditExecutionStart',
          title: 'Audit Execution (Start)',
          titleClass: 'text-center',
          dataClass: 'text-center',
          formatter: this.formatDate
        },
        {
          name: 'AuditExecutionDone',
          sortField: 'adp.AuditExecutionDone',
          title: 'Audit Execution (Done)',
          titleClass: 'text-center',
          dataClass: 'text-center',
          formatter: this.formatDate
        },
        {
          name: 'CloseMeeting',
          sortField: 'adp.CloseMeeting',
          title: 'Closing meeting',
          titleClass: 'text-center',
          dataClass: 'text-center',
          formatter: this.formatDate
        },
        {
          name: 'AuditCriteria',
          title: 'Audit Criteria',
          titleClass: 'text-center',
          dataClass: 'text-center'
        },
        {
          name: 'Objective',
          sortField: 'adp.Objective',
          title: 'Objective',
          titleClass: 'text-center',
          dataClass: 'text-center'
        },
        {
          name: 'Organizer',
          sortField: 'oad.Name',
          title: 'Organizer Audit',
          titleClass: 'text-center',
          dataClass: 'text-center'
        },
        {
          name: 'AuditeeDepartment',
          title: 'Departement Auditee',
          titleClass: 'text-center',
          dataClass: 'text-center'
        },
        {
          name: 'Path',
          sortField: 'adp.Path',
          title: 'Attachment',
          titleClass: 'text-center',
          dataClass: 'text-center'
        },
        {
          name: 'Status',
          sortField: 'adp.Status',
          title: 'Execution Status',
          titleClass: 'text-center',
          dataClass: 'text-center'
        },
        {
          name: 'EmpApproved',
          sortField: 'adp.EmpApproved',
          title: 'Approved',
          titleClass: 'text-center',
          dataClass: 'text-center'
        },
  			{
          name: 'Actions',
          title: 'Actions',
          titleClass: 'text-center',
          dataClass: 'text-center'
        },
        {
          name: 'actions',
          title: 'More',
          titleClass: 'text-center',
          dataClass: 'text-center',
        }
  		],

  		sortOrder: [
        {
          field: 'Id',
          sortField: 'adp.Id',
          direction: 'desc'
        }
      ],

      vars: {
      	perPage: 10
      },

      paramData: {
        search: {},
      },

      User : JSON.parse(window.localStorage.getItem('user'))

  	}
  },

  methods: {
    formatNumber: function(value) {
        return accounting.formatMoney(value, 'Rp ', 2, '.', ',')
    },

    formatDate: function(value) {
      return (value == null) ? '' : moment(value).format('DD/MMMM/YYYY')
    },

    formatDateMY: function(value){
      return (value == null) ? '' : moment(value).format('MMMM-YYYY')
    },

    onPaginationData (paginationData) {
      this.$refs.pagination.setPaginationData(paginationData)
      this.$refs.paginationInfo.setPaginationData(paginationData)
    },

    getAuditCriteriaString(AuditCriteria){
      let StringCriteria = '';
      for( var i = 0; i < AuditCriteria.length; i++ ){
        if(StringCriteria != ''){
          StringCriteria = StringCriteria.concat(', ',AuditCriteria[i].Standart)
        }else{
          StringCriteria = AuditCriteria[i].Standart
        }
      }

      return StringCriteria
    },

    viewAttachment(data,index){
      this.$router.push({
        name: 'approval/view-attachment-approval-audit-plan',
        params: {
          Attachment:data.Path
        }
      })
    },

    viewAuditeeDepartment(data,index){
      this.$router.push({
        name: 'approval/show-auditee-approval-audit-plan',
        params: {
          Id:data.id
        }
      })
    },

    onAction (action, data, index) {
      if(action=='view-item'){
        this.$router.push({
          name: 'approval/show-audit-plan',
          params: {
            Id: data.id,
          }
        })
      }

      if(action == 'approve-item'){
        this.$router.push({
          name: 'audit/form-audit-plan',
          params: {
            id: data.id,
            isFormShow: true
          }
        })
        // this.appData('/AdminVue/approval-audit-plan-approveData', data.id, this.$refs.vuetable,1,data.id)
      }

      if(action == 'reject-item'){
        this.appData('/AdminVue/approval-audit-plan-rejectData', data.id, this.$refs.vuetable,2,data.id)
      }
    },

    onChangePage (page) {
      this.$refs.vuetable.changePage(page)
    },

    getFilters () {
      this.$refs.vuetable.refresh()
    },

    createData () {
      this.$router.push('/RoleAdmin/audit/form-audit-plan')
    },

  },

  mounted(){
    this.isNotifExist()
  },

}
</script>
