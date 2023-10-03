<template> <div>

  <b-card header="View / Data Auditor Skill" header-tag="h4" class="mb-4">

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

          <b-btn @click="createData()" class="btn btn-success btn-md float-right mr-2" v-if="User.accessMenuDB[0].children[9].children[0].selected === true">
              <i class="ion ion-md-add-circle"></i> Create Data
          </b-btn>
      </div>
	  </b-form>

	  <div class="table-responsive"> <vuetable ref="vuetable"
	    api-url="/AdminVue/data-auditor-skill"
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
            <b-input v-model="paramData.search.psa__Name" placeholder="Karyawan" v-on:keyup.enter="getFilters()" />
          </th>
            <th>
            <b-input v-model="paramData.search.psa__Department" placeholder="Department" v-on:keyup.enter="getFilters()" />
          </th>
          <th>
            <b-input v-model="paramData.search.pas__Organizer" placeholder="Organizer" v-on:keyup.enter="getFilters()" />
          </th>
          <th>
            <b-input v-model="paramData.search.sdt__Standart" placeholder="Standart Audit" v-on:keyup.enter="getFilters()" />
          </th>
          <th>
            <masked-input type="text" class="form-control" placeholder="Thn-Bln-Tgl"
              v-model="paramData.search.pas__Date"
              v-on:keyup.enter="getFilters()"
              :guide="false"
              :mask="dateYmdMask" />
          </th>
          <!--<th>-->
            <!--<b-input v-model="paramData.search.pas__Certificate" placeholder="Certificate" v-on:keyup.enter="getFilters()" />-->
          <!--</th>-->
          <th>
            <b-input v-model="paramData.search.pas__CategoryName" placeholder="Category" v-on:keyup.enter="getFilters()" />
          </th>
            <th>
            <b-input v-model="paramData.search.pas__Training" placeholder="Pelatihan" v-on:keyup.enter="getFilters()" />
          </th>
          <th>
            <b-input v-model="paramData.search.pas__Institution" placeholder="Institusi" v-on:keyup.enter="getFilters()" />
          </th>
          <th></th>
          <th></th>
          <th></th>
          <!-- <th></th> -->
        </tr>
        <vuetable-row-header></vuetable-row-header>
      </template>

      <template slot="index" slot-scope="props">
          {{ props.rowIndex + 1}}
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
            @click="viewAttachment(props.rowData, props.rowIndex)" v-if="User.accessMenuDB[0].children[9].children[2].selected === true">
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
                @click="onAction('edit-item', props.rowData, props.rowIndex)" v-if="User.accessMenuDB[0].children[9].children[0].selected === true">
                <i class="ion ion-md-create"></i> Edit
                </b-btn>
                <b-btn class="btn btn-outline-danger btn-sm mr-1 mt-1"
                @click="onAction('delete-item', props.rowData, props.rowField)" v-if="User.accessMenuDB[0].children[9].children[1].selected === true">
                <i class="ion ion-md-trash"></i> Delete
                </b-btn>
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
    title: 'Index Auditor Skill'
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
  				name: 'EmpName',
  				sortField: 'psa.Name',
  				title: 'Karyawan',
  				titleClass: 'text-center',
          dataClass: 'text-center'
  			},
            {
  				name: 'Department',
  				sortField: 'psa.Department',
  				title: 'Department',
  				titleClass: 'text-center',
          dataClass: 'text-center'
  			},
  			{
  				name: 'Organizer',
  				sortField: 'pas.Organizer',
  				title: 'Organizer',
  				titleClass: 'text-center',
          dataClass: 'text-center'
  			},
  			{
          name: 'StandartAudit',
          sortField: 'sdt.Standart',
          title: 'Personal Skill',
          titleClass: 'text-center',
          dataClass: 'text-center',
        },
        {
          name: 'Date',
          sortField: 'pas.Date',
          title: 'Tanggal',
          titleClass: 'text-center',
          dataClass: 'text-center',
          formatter: this.formatDate
        },
        {
          name: 'CategoryName',
          sortField: 'psa.CategoryName',
          title: 'Category',
          titleClass: 'text-center',
          dataClass: 'text-center',
        },
        {
          name: 'Training',
          sortField: 'pas.Training',
          title: 'Pelatihan',
          titleClass: 'text-center',
          dataClass: 'text-center',
        },
        {
          name: 'Institution',
          sortField: 'pas.Institution',
          title: 'Institusi',
          titleClass: 'text-center',
          dataClass: 'text-center',
        },
        {
          name: 'Path',
          sortField: 'pas.Path',
          title: 'Path',
          titleClass: 'text-center',
          dataClass: 'text-center',
        },
        {
          name: 'Status',
          sortField: 'pas.Status',
          title: 'Status',
          titleClass: 'text-center',
          dataClass: 'text-center',
        },
  			{
          name: 'Actions',
          title: 'Actions',
          titleClass: 'text-center',
          dataClass: 'text-center'
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
          field: 'Id',
          sortField: 'pas.Id',
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

    viewAttachment(data,index){
      this.$router.push({
        name: 'master/view-attachment-auditor-skill',
        params: {
          Attachment:data.Path
        }
      })
    },

    onAction (action, data, index) {
      if(action=='edit-item'){
        this.$router.push({
          name: 'master/form-auditor-skill',
          params: {
            isFormEdit: true,
            Id: data.id,
          }
        })
      }

      if(action=='view-item'){
        this.$router.push({
          name: 'master/show-auditor-skill',
          params: {
            Id: data.id,
          }
        })
      }

      if(action=='delete-item'){
        this.deleteData('/AdminVue/auditor-skill-delete', data.id, this.$refs.vuetable)
      }
    },

    createData () {
      this.$router.push('/RoleAdmin/master/form-auditor-skill')
    },

  },

  mounted(){
    this.isNotifExist()
  },

}
</script>
