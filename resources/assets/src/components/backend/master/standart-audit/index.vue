<template> <div>

  <b-card header="View / Data Standart Audit" header-tag="h4" class="mb-4">

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

          <b-btn @click="createData()" class="btn btn-success btn-md float-right mr-2" v-if="User.accessMenuDB[0].children[7].children[0].selected === true">
              <i class="ion ion-md-add-circle"></i> Create Data
          </b-btn>
      </div>
	  </b-form>

	  <div class="table-responsive"> <vuetable ref="vuetable"
	    api-url="/AdminVue/data-standart-audit"
      :http-options= "authHeader"
	    :fields="fields"
	    :css="cssTable"
	    :sort-order="sortOrder"
	    :multi-sort="false"
	    multi-sort-key="ctrl"
	    :per-page="vars.perPage"
      :detail-row-component="myDetailRow"
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
            <b-input v-model="paramData.search.aog__Name" placeholder="Organizer" v-on:keyup.enter="getFilters()" />
          </th>
          <th>
            <b-input v-model="paramData.search.sdt__Standart" placeholder="Standart Audit" v-on:keyup.enter="getFilters()" />
          </th>
          <th>
            <b-input v-model="paramData.search.sdt__Description" placeholder="Description" v-on:keyup.enter="getFilters()" />
          </th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
        </tr>
        <vuetable-row-header></vuetable-row-header>
      </template>

      <!-- <template slot="index" slot-scope="props">
          {{ props.rowIndex + 1}}
      </template> -->

      <template slot="index" slot-scope="props">
        <b-btn class="btn btn-outline-info btn-sm mr-sm-1"
          @click="onCellClicked(props.rowData, props.rowIndex)">
          <i :class="[iconClass]"></i>
        </b-btn>
      </template>

      <template slot="Status" slot-scope="props">
          <div v-if="props.rowData.Status == 1">
            Aktif
          </div>
          <div v-else>
            Tidak Aktif
          </div>
      </template>

      <template slot="Path" slot-scope="props">
          <div v-if="props.rowData.Path != ''">
            <b-btn class="btn btn-outline-danger btn-sm mr-1 mt-1"
            @click="viewAttachment(props.rowData, props.rowIndex)" v-if="User.accessMenuDB[0].children[7].children[3].selected === true">
            <i class="ion ion-md-attach"></i>
            </b-btn>
          </div>
      </template>

      <template slot="Actions" slot-scope="props">
            <div class="custom-actions">
                <b-btn class="btn btn-outline-info btn-sm mr-sm-1"
                @click="onAction('view-item', props.rowData, props.rowIndex)">
                <i class="ion ion-ios-eye"></i> Show
                </b-btn>
                <b-btn class="btn btn-outline-secondary btn-sm mr-sm-1"
                @click="onAction('edit-item', props.rowData, props.rowIndex)" v-if="User.accessMenuDB[0].children[7].children[0].selected === true">
                <i class="ion ion-md-create"></i> Edit
                </b-btn>
                <b-btn class="btn btn-outline-danger btn-sm mr-1 mt-1"
                @click="onAction('delete-item', props.rowData, props.rowField)" v-if="User.accessMenuDB[0].children[7].children[1].selected === true">
                <i class="ion ion-md-trash"></i> Delete
                </b-btn>
            </div>
      </template>

	  	<template slot="actions" slot-scope="props">
        <div class="custom-actions">
          <b-btn class="btn btn-outline-success btn-sm mr-1 mt-1"
            @click="addClause(props.rowData, props.rowIndex)" v-if="User.accessMenuDB[0].children[7].children[2].selected === true">
            <i class="ion ion-md-add-circle"></i> Tambah Clause Audit
          </b-btn>
          <b-btn class="btn btn-outline-success btn-sm mr-1 mt-1"
            @click="importClause(props.rowData, props.rowIndex)" v-if="User.accessMenuDB[0].children[7].children[6].selected === true">
            <i class="ion ion-md-add-circle"></i> Import Clause Audit
          </b-btn>
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
import DetailRow from './detail-row'
import ButtonAction from '@/components/backend/template/ButtonAction'

export default {
  name: 'index-distric',
  metaInfo: {
    title: 'Index Standart Auditor'
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
  				name: 'Organizer',
  				sortField: 'aog.Name',
  				title: 'Organizer',
  				titleClass: 'text-center',
          dataClass: 'text-center'
  			},
  			{
  				name: 'Standart',
  				sortField: 'sdt.Standart',
  				title: 'StandartAudit',
  				titleClass: 'text-center',
          dataClass: 'text-center'
  			},
  			{
          name: 'Description',
          sortField: 'sdt.Description',
          title: 'Description',
          titleClass: 'text-center',
          dataClass: 'text-center',
        },
        {
          name: 'Path',
          sortField: 'sdt.Path',
          title: 'Reference',
          titleClass: 'text-center',
          dataClass: 'text-center'
        },
        {
          name: 'Status',
          sortField: 'sdt.Status',
          title: 'Status',
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
          sortField: 'sdt.Id',
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

      myDetailRow: DetailRow,

      iconClass:'ion ion-ios-add',
      isClicked:false

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

    onCellClicked(data, index){
      this.$refs.vuetable.toggleDetailRow(data.id)
      this.isClicked = !this.isClicked;
      if(this.isClicked == true){
        this.iconClass = 'fas fa-minus'
      }else{
        this.iconClass = 'ion ion-ios-add'
      }
      
    },

    addClause(data,index){
      this.$router.push({
        name: 'master/form-audit-clause',
        params: {
          IdStandartAudit: data.Id,
          StandartAudit: data.Standart
        }
      })
    },

    importClause(data,index){
      this.$router.push({
        name: 'master/form-audit-clause-import',
        params: {
          Id: data.Id
        }
      })
    },

    viewAttachment(data,index){
      this.$router.push({
        name: 'master/view-attachment-standart-audit',
        params: {
          Attachment:data.Path
        }
      })
    },

    onAction (action, data, index) {
      if(action=='edit-item'){
        this.$router.push({
          name: 'master/form-standart-audit',
          params: {
            isFormEdit: true,
            Id: data.id,
          }
        })
      }

      if(action=='view-item'){
        this.$router.push({
          name: 'master/show-standart-audit',
          params: {
            Id: data.id,
          }
        })
      }

      if(action=='delete-item'){
        this.deleteData('/AdminVue/standart-audit-delete', data.id, this.$refs.vuetable)
      }
    },

    createData () {
      this.$router.push('/RoleAdmin/master/form-standart-audit')
    },

  },

  mounted(){
    this.isNotifExist()
  },

}
</script>
