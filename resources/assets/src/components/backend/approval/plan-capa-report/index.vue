<template> <div>

  <b-card header="View / Data Approval Plan Capa Report" header-tag="h4" class="mb-4">

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
	    api-url="/AdminVue/data-approval-plan-capa-report"
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
            <b-input v-model="paramData.search.acp__NoTrans" placeholder="IdAudit" v-on:keyup.enter="getFilters()" />
          </th>
          <th>
            <b-input v-model="paramData.search.adr__RefNumber" placeholder="RefNumber" v-on:keyup.enter="getFilters()" />
          </th>
          <th>
            <masked-input type="text" class="form-control" placeholder="Thn-Bln-Tgl"
              v-model="paramData.search.acp__AuditorDate"
              v-on:keyup.enter="getFilters()"
              :guide="false"
              :mask="dateYmdMask" />
          </th>
          <th>
            <b-input v-model="paramData.search.dpt__Department" placeholder="Department" v-on:keyup.enter="getFilters()" />
          </th>
          <th>
            <b-input v-model="paramData.search.pad__Name" placeholder="Lead Auditor" v-on:keyup.enter="getFilters()" />
          </th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th>
            <b-input v-model="paramData.search.acp__PotentialNonConformitiy" placeholder="Potential Non Conformity" v-on:keyup.enter="getFilters()" />
          </th>
          <th>
            <b-input v-model="paramData.search.acp__TypeNonConformity" placeholder="Type Non Conformity" v-on:keyup.enter="getFilters()" />
          </th>
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

      <template slot="Path" slot-scope="props">
          <div class="custom-path">
            <b-btn class="btn btn-outline-danger btn-sm mr-1 mt-1"
            @click="viewAttachment(props.rowData, props.rowIndex)" v-if="User.accessMenuDB[2].children[3].children[2].selected === true">
            <i class="ion ion-md-attach"></i>
            </b-btn>
          </div>
      </template>

      <template slot="IdAuditor" slot-scope="props">
        {{getAuditAuditorString(JSON.parse(props.rowData.IdAuditor))}}
      </template>

      <template slot="IdAuditee" slot-scope="props">
        {{getAuditAuditeeString(JSON.parse(props.rowData.IdAuditee))}}
      </template>

      <template slot="IdObserver" slot-scope="props">
        {{getAuditObserverString(JSON.parse(props.rowData.IdObserver))}}
      </template>

      <!--<template slot="Clause" slot-scope="props">-->
        <!--{{getClauseString(props.rowData.AuditCriteria)}}-->
      <!--</template>-->

        <template slot="Actions" slot-scope="props">
            <div class="custom-actions" v-if="props.rowData.Actived == 1">
                <b-btn class="btn btn-outline-info btn-sm mr-sm-1"
                @click="onAction('view-item', props.rowData, props.rowIndex,0)">
                <i class="ion ion-ios-eye"></i> Show
                </b-btn>
                <b-btn class="btn btn-outline-secondary btn-sm mr-sm-1"
                @click="onAction('edit-item', props.rowData, props.rowIndex,0)">
                <i class="ion ion-md-create"></i> Edit
                </b-btn>
                <b-btn class="btn btn-outline-danger btn-sm mr-1 mt-1"
                @click="onAction('delete-item', props.rowData, props.rowField,0)">
                <i class="ion ion-md-trash"></i> Delete
                </b-btn>
            </div>
             <div class="custom-actions" v-else>
                <b-btn class="btn btn-outline-info btn-sm mr-sm-1"
                    @click="onAction('view-item', props.rowData, props.rowIndex,0)">
                    <i class="ion ion-ios-eye"></i> Show
                </b-btn>
            </div>
        </template>

	  	<template slot="actions" slot-scope="props">
        <div class="custom-actions" v-if="props.rowData.Actived == 1">
          <b-btn class="btn btn-outline-success btn-sm mr-1 mt-1"
            @click="onAction('publish-item', props.rowData, props.rowIndex,0)">
            <i class="ion ion-md-checkmark"></i> Send to Workflow
          </b-btn>
        </div>
        <div class="custom-actions" v-if="props.rowData.Actived == 2 && props.rowData.StatusApproved == 1">
          <div v-if="props.rowData.ApprovedOrdinal == 0 && props.rowData.ApprovedOrdinal == props.rowData.OrdinalApproval">
            <b-btn class="btn btn-outline-success btn-sm mr-1 mt-1"
              @click="onAction('approve-item', props.rowData, props.rowIndex,0)" v-if="User.accessMenuDB[2].children[3].children[3].selected === true">
              <i class="ion ion-ios-create"></i> Approve
            </b-btn>
            <b-btn class="btn btn-outline-danger btn-sm mr-sm-1 mt-1"
                @click="onAction('reject-item', props.rowData, props.rowIndex,0)" v-if="User.accessMenuDB[2].children[3].children[4].selected === true">
                <i class="ion ion-md-warning"></i> Reject
            </b-btn>
          </div>
          <div v-else-if="props.rowData.ApprovedOrdinal == 1 && props.rowData.AuditorId == User.IdEmployee">
            <b-btn class="btn btn-outline-success btn-sm mr-1 mt-1"
              @click="onAction('approve-item', props.rowData, props.rowIndex,1)" v-if="User.accessMenuDB[2].children[3].children[3].selected === true">
              <i class="ion ion-ios-create"></i> Approve
            </b-btn>
            <b-btn class="btn btn-outline-danger btn-sm mr-sm-1 mt-1"
                @click="onAction('reject-item', props.rowData, props.rowIndex,1)" v-if="User.accessMenuDB[2].children[3].children[4].selected === true">
                <i class="ion ion-md-warning"></i> Reject
            </b-btn>
          </div>
          <div v-else-if="props.rowData.ApprovedOrdinal == 2 && props.rowData.ApprovedOrdinal == props.rowData.OrdinalApproval">
            <b-btn class="btn btn-outline-success btn-sm mr-1 mt-1"
              @click="onAction('approve-item', props.rowData, props.rowIndex,2)" v-if="User.accessMenuDB[2].children[3].children[3].selected === true">
              <i class="ion ion-ios-create"></i> Approve
            </b-btn>
            <b-btn class="btn btn-outline-danger btn-sm mr-sm-1 mt-1"
                @click="onAction('reject-item', props.rowData, props.rowIndex,2)" v-if="User.accessMenuDB[2].children[3].children[4].selected === true">
                <i class="ion ion-md-warning"></i> Reject
            </b-btn>
          </div>
        </div>
      </template>

      <template slot="Workflow" slot-scope="props">
          <div v-if="props.rowData.ApprovedOrdinal == 0">
            Belum Approved by Auditee
          </div>
          <div v-if="props.rowData.ApprovedOrdinal == 0 && props.rowData.StatusApproved == 3">
            Rejected by Auditee
          </div>
          <div v-else-if="props.rowData.ApprovedOrdinal == 1 && props.rowData.StatusApproved == 1">
            Belum Approved by Auditor
          </div>
          <div v-else-if="props.rowData.ApprovedOrdinal == 1 && props.rowData.StatusApproved == 3">
            Rejected by Auditor
          </div>
          <div v-else-if="props.rowData.ApprovedOrdinal == 2 && props.rowData.StatusApproved == 1">
            Belum Approved by MR
          </div>
          <div v-else-if="props.rowData.ApprovedOrdinal == 2 && props.rowData.StatusApproved == 3">
            Rejected by MR
          </div>
          <div v-else-if="props.rowData.ApprovedOrdinal == 2 && props.rowData.StatusApproved == 2">
            Approved by MR
          </div>
      </template>

	  	<!-- <template slot="actions" slot-scope="props">
        <div class="custom-actions">
          <b-btn class="btn btn-outline-success btn-sm mr-1 mt-1"
            @click="onAction('publish-item', props.rowData, props.rowIndex)">
            <i class="ion ion-md-checkmark"></i> Publish
          </b-btn>
          <b-btn class="btn btn-outline-warning btn-sm mr-1 mt-1"
            @click="onAction('unpublish-item', props.rowData, props.rowIndex)">
            <i class="ion ion-md-eye-off"></i> UnPublish
          </b-btn>
          <b-btn class="btn btn-outline-danger btn-sm mr-1 mt-1"
            @click="onAction('cetak-item', props.rowData, props.rowIndex)">
            <i class="fas fa-print"></i> Cetak
          </b-btn>
        </div>
      </template> -->

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
    title: 'Index Approval Plan Capa Report'
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
  				sortField: 'acp.NoTrans',
  				title: 'Id Audit',
  				titleClass: 'text-center',
          dataClass: 'text-center'
  			},
  			{
  				name: 'RefNumber',
  				sortField: 'adr.RefNumber',
  				title: 'Ref Number',
  				titleClass: 'text-center',
          dataClass: 'text-center'
  			},
  			{
          name: 'AuditorDate',
          sortField: 'acp.AuditorDate',
          title: 'Auditor Date',
          titleClass: 'text-center',
          dataClass: 'text-center',
          formatter: this.formatDate
        },
        {
          name: 'Department',
          sortField: 'dpt.Department',
          title: 'Departement',
          titleClass: 'text-center',
          dataClass: 'text-center'
        },
        {
          name: 'LeadAuditor',
          sortField: 'emp.Name',
          title: 'Lead Auditor',
          titleClass: 'text-center',
          dataClass: 'text-center'
        },
        {
          name: 'IdAuditor',
          title: 'Auditor',
          titleClass: 'text-center',
          dataClass: 'text-center'
        },
        {
          name: 'IdAuditee',
          title: 'Auditee',
          titleClass: 'text-center',
          dataClass: 'text-center'
        },
        {
          name: 'IdObserver',
          title: 'Observer',
          titleClass: 'text-center',
          dataClass: 'text-center'
        },
        {
          name: 'Clause',
          title: 'Clause',
          titleClass: 'text-center',
          dataClass: 'text-center'
        },
        {
          name: 'PotentialNonConformitiy',
          sortField: 'acp.PotentialNonConformitiy',
          title: 'Potential Non Conformity',
          titleClass: 'text-center',
          dataClass: 'text-center'
        },
        {
          name: 'TypeNonConformity',
          sortField: 'acp.TypeNonConformity',
          title: 'Type Of Non Conformity',
          titleClass: 'text-center',
          dataClass: 'text-center'
        },
        {
          name: 'Path',
          title: 'Attachment',
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
        },
        {
          name: 'Workflow',
          title: 'Workflow',
          titleClass: 'text-center',
          dataClass: 'text-center',
        }
  		],

  		sortOrder: [
        {
          field: 'Id',
          sortField: 'acp.Id',
          direction: 'desc'
        }
      ],

      vars: {
      	perPage: 10
      },

      paramData: {
        search: {},
      },

      User : JSON.parse(window.localStorage.getItem('user')),

      IdEmployee: JSON.parse(window.localStorage.getItem('user')).IdEmployee

  	}
  },

  methods: {
    formatNumber: function(value) {
        return accounting.formatMoney(value, 'Rp ', 2, '.', ',')
    },

    formatDate: function(value) {
      return (value == null) ? '' : moment(value).format('DD/MM/YYYY')
    },

    onPaginationData (paginationData) {
      this.$refs.pagination.setPaginationData(paginationData)
      this.$refs.paginationInfo.setPaginationData(paginationData)
    },

    onChangePage (page) {
      this.$refs.vuetable.changePage(page)
    },

    getFilters () {
      this.$refs.vuetable.refresh()
    },

    getAuditAuditorString(Auditor){
      let StringCriteria = '';
      for( var i = 0; i < Auditor.length; i++ ){
        if(StringCriteria != ''){
          StringCriteria = StringCriteria.concat(', ',Auditor[i].Employee)
        }else{
          StringCriteria = Auditor[i].Employee
        }
      }

      return StringCriteria
    },

    getAuditAuditeeString(Auditee){
      let StringAuditee = ''
      for( var i = 0; i < Auditee.length; i++ ){
        if(StringAuditee != ''){
          StringAuditee = StringAuditee.concat(', ',Auditee[i].Employee)
        }else{
          StringAuditee = Auditee[i].Employee
        }
      }

      return StringAuditee
    },

    getAuditObserverString(Observer){
      let StringObserver = ''
      for( var i = 0; i < Observer.length; i++ ){
        if(StringObserver != ''){
          StringObserver = StringObserver.concat(', ',Observer[i].Employee)
        }else{
          StringObserver = Observer[i].Employee
        }
      }

      return StringObserver
    },

    getClauseString(AuditClause){
      let StringClause = ''
      let ClauseArr = '';
      for( var i=0; i < AuditClause.length; i++){
        if(StringClause != ''){
          StringClause = StringClause.concat(', ',AuditClause[i].Standart)
          ClauseArr = JSON.parse(AuditClause[i].Clause)
          for( var k=0; k < ClauseArr.length; k++){
            if(k == 0){
              if(ClauseArr.length > 1){
                StringClause = StringClause.concat('(',ClauseArr[k].Clause)
              }else{
                StringClause = StringClause.concat('(',ClauseArr[k].Clause,')')
              }
            }else if(k == Clause.length-1){
              StringClause = StringClause.concat(',',ClauseArr[k].Clause,')')
            }else{
              StringClause = StringClause.concat(',',ClauseArr[k].Clause)
            }
          }
        }else{
          StringClause = AuditClause[i].Standart
          ClauseArr = JSON.parse(AuditClause[i].Clause)
          for( var k=0; k < ClauseArr.length; k++){
            if(k == 0){
              if(ClauseArr.length > 1){
                StringClause = StringClause.concat('(',ClauseArr[k].Clause)
              }else{
                StringClause = StringClause.concat('(',ClauseArr[k].Clause,')')
              }
            }else if(k == ClauseArr.length-1){
              StringClause = StringClause.concat(',',ClauseArr[k].Clause,')')
            }else{
              StringClause = StringClause.concat(',',ClauseArr[k].Clause)
            }
          }
        }
      }

      return StringClause
    },

    viewAttachment(data,index){
      this.$router.push({
        name: 'approval/view-attachment-approval-plan-capa-report',
        params: {
          AttachmentCorrective:data.PathCorrective,
          AttachmentPreventive:data.PathPreventive
        }
      })
    },

    onAction (action, data, index,ordinal) {
      if(action=='view-item'){
        this.$router.push({
          name: 'approval/show-plan-capa-report',
          params: {
            Id: data.id,
          }
        })
      }

      if(action == 'approve-item'){
        this.appData('/AdminVue/approval-plan-capa-report-approveData', data.id, this.$refs.vuetable,1,ordinal)
      }

      if(action == 'reject-item'){
        this.appData('/AdminVue/approval-plan-capa-report-rejectData', data.id, this.$refs.vuetable,2,ordinal)
      }
    }

  },

  mounted(){
    this.isNotifExist()
  },

}
</script>
