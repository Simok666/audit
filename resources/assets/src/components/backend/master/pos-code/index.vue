<template> <div>

  <b-card header="View / Data Kode Pos" header-tag="h4" class="mb-4">

  	<b-form inline class="mb-2 row">
      <div class="col-md-6">
          <b-form inline class="">
            <label class="form-label mr-sm-2">Show Data</label>
            <b-select v-model="vars.perPage" value="vars.perPage" :options="[10,25,50,100,1000]" />
          </b-form>
      </div>
      <div class="col-md-6">
          <b-btn @click="createData()" class="btn btn-success btn-md float-right mr-2">
              <i class="ion ion-md-add-circle"></i> Create Data
          </b-btn>
      </div>
	  </b-form>

	  <div class="table-responsive"> <vuetable ref="vuetable"
	    api-url="/AdminVue/data-pos-code"
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

      <template slot="tableHeader" slot-scope="props">
        <tr class="text-center">
          <th class="wd-50"></th>
          <th>
            <b-input v-model="paramData.search.dstp__PosCode" placeholder="Kode Pos" v-on:keyup.enter="getFilters()" />
          </th>
          <th>
            <b-input v-model="paramData.search.dst__Name" placeholder="Kecamatan" v-on:keyup.enter="getFilters()" />
          </th>
          <th>
            <b-input v-model="paramData.search.usr__UserName" placeholder="User Entry" v-on:keyup.enter="getFilters()" />
          </th>
          <th>
            <masked-input type="text" class="form-control" placeholder="Thn-Bln-Tgl"
              v-model="paramData.search.dst__UpdateAt"
              v-on:keyup.enter="getFilters()"
              :guide="false"
              :mask="dateYmdMask" />
          </th>
          <th></th>
          <!-- <th></th> -->
        </tr>
        <vuetable-row-header></vuetable-row-header>
      </template>

      <template slot="index" slot-scope="props">
          {{ props.rowIndex + 1}}
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

</div> </template>


<script>

import Vue from 'vue'
import Vuetable from 'vuetable-2'
import VuetablePagination from 'vuetable-2/src/components/VuetablePagination'
import VuetablePaginationInfo from 'vuetable-2/src/components/VuetablePaginationInfo'
import VuetableRowHeader from 'vuetable-2/src/components/VuetableRowHeader'
import moment from 'moment'
import MaskedInput from 'vue-text-mask'
import ButtonAction from '@/components/backend/template/ButtonAction'

export default {
  name: 'index-pos-code',
  metaInfo: {
    title: 'Index Kode Pos'
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
  				name: 'PosCode',
  				sortField: 'dstp.PosCode',
  				title: 'Kode Pos',
  				titleClass: 'text-center',
          dataClass: 'text-center'
  			},
  			{
  				name: 'District',
  				sortField: 'dst.Name',
  				title: 'Kecamatan',
  				titleClass: 'text-center',
          dataClass: 'text-center'
  			},
  			{
          name: 'UserEntry',
          sortField: 'usr.UserName',
          title: 'User Entry',
          titleClass: 'text-center',
          dataClass: 'text-center',
        },
        {
          name: 'UpdateAt',
          sortField: 'dst.UpdateAt',
          title: 'Update At',
          titleClass: 'text-center',
          dataClass: 'text-center',
          formatter: this.formatDate
        },
  			{
          name: ButtonAction,
          title: 'Actions',
          titleClass: 'text-center',
          dataClass: 'text-center',
          isShow: true,
          isEdit: true,
          isDelete: true,
          showUrl: 'master/show-pos-code',
          editUrl: 'master/form-pos-code',
          deleteUrl: '/AdminVue/pos-code-delete'
        },
        /*{
          name: 'actions',
          title: 'More',
          titleClass: 'text-center',
          dataClass: 'text-center',
        }*/
  		],

  		sortOrder: [
        {
          field: 'PosCode',
          sortField: 'dstp.PosCode',
          direction: 'asc'
        }
      ],

      vars: {
      	perPage: 10
      },

      paramData: {
        search: {},
      }

  	}
  },

  methods: {
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

    createData () {
      this.$router.push('/RoleAdmin/master/form-pos-code')
    },

  },

  mounted(){
    this.isNotifExist()
  },

}
</script>
