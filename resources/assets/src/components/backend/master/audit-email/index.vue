<template> <div>

    <b-card header="View / Data Audit Template Email" header-tag="h4" class="mb-4">
  
        <b-form inline class="mb-2 row">
        <div class="col-md-6">
            <b-form inline class="">
              <label class="form-label mr-sm-2">Show Data</label>
              <b-select v-model="vars.perPage" value="vars.perPage" :options="[10,25,50,100,1000]" />
            </b-form>
        </div>
        <div class="col-md-6">
            <b-btn @click="createData()" class="btn btn-success btn-md float-right mr-2" v-if="User.accessMenuDB[0].children[12].children[0].selected === true">
                <i class="ion ion-md-add-circle"></i> Create Data
            </b-btn>
        </div>
        </b-form>
  
        <div class="table-responsive"> <vuetable ref="vuetable"
          api-url="/AdminVue/data-audit-email-template"
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
              <b-input v-model="paramData.search.ae__organizer" placeholder="Organizer" v-on:keyup.enter="getFilters()" />
            </th>
            <th>
              <b-input v-model="paramData.search.ae__from" placeholder="from" v-on:keyup.enter="getFilters()" />
            </th>
            <th>
              <b-input v-model="paramData.search.ae__to" placeholder="to" v-on:keyup.enter="getFilters()" />
            </th>
            <th>
              <b-input v-model="paramData.search.ae__cc" placeholder="cc" v-on:keyup.enter="getFilters()" />
            </th>
            <th>
              <b-input v-model="paramData.search.ae__subject" placeholder="subject" v-on:keyup.enter="getFilters()" />
            </th>
            <th>
              <b-input v-model="paramData.search.ae__content" placeholder="content" v-on:keyup.enter="getFilters()" />
            </th>
            <th></th>
            <!-- <th></th> -->
          </tr>
          <vuetable-row-header></vuetable-row-header>
        </template>
  
        <template slot="index" slot-scope="props">
            {{ props.rowIndex + 1}}
        </template>
  
        <template slot="Actions" slot-scope="props">
              <div class="custom-actions">
                  <b-btn class="btn btn-outline-info btn-sm mr-sm-1"
                  @click="onAction('view-item', props.rowData, props.rowIndex)">
                  <i class="ion ion-ios-eye"></i> Show
                  </b-btn>
                  <b-btn class="btn btn-outline-secondary btn-sm mr-sm-1"
                  @click="onAction('edit-item', props.rowData, props.rowIndex)" v-if="User.accessMenuDB[0].children[10].children[0].selected === true">
                  <i class="ion ion-md-create"></i> Edit
                  </b-btn>
                  <b-btn class="btn btn-outline-danger btn-sm mr-1 mt-1"
                  @click="onAction('delete-item', props.rowData, props.rowField)" v-if="User.accessMenuDB[0].children[10].children[1].selected === true">
                  <i class="ion ion-md-trash"></i> Delete
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
  import ButtonAction from '@/components/backend/template/ButtonAction'
  
  export default {
    name: 'index-distric',
    metaInfo: {
      title: 'Index Template Email'
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
                    name: 'organizer',
                    sortField: 'oag.organizer',
                    title: 'Organizer',
                    titleClass: 'text-center',
                    dataClass: 'text-center'
                },
                {
                    name: 'from',
                    sortField: 'ae.from',
                    title: 'from',
                    titleClass: 'text-center',
                    dataClass: 'text-left'
                },
                {
                    name: 'to',
                    sortField: 'ae.to',
                    title: 'to',
                    titleClass: 'text-center',
                    dataClass: 'text-left',
                },
                {
                    name: 'cc',
                    sortField: 'ae.cc',
                    title: 'cc',
                    titleClass: 'text-center',
                    dataClass: 'text-left',
                },
                {
                    name: 'subject',
                    sortField: 'ae.subject',
                    title: 'subject',
                    titleClass: 'text-center',
                    dataClass: 'text-left',
                },
                {
                    name: 'content',
                    sortField: 'ae.content',
                    title: 'content',
                    titleClass: 'text-center',
                    dataClass: 'text-left',
                },
                {
                    name: 'Actions',
                    title: 'Actions',
                    titleClass: 'text-center',
                    dataClass: 'text-center'
                },
        
            ],
  
            sortOrder: [
                        {
                            field: 'id',
                            sortField: 'ae.id',
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
  
      onAction (action, data, index) {
        if(action=='edit-item'){
          this.$router.push({
            name: 'master/form-email-template',
            params: {
              isFormEdit: true,
              Id: data.id,
            }
          })
        }
  
        if(action=='view-item'){
          this.$router.push({
            name: 'master/show-email-template',
            params: {
              Id: data.id,
            }
          })
        }
  
        if(action=='delete-item'){
          this.deleteData('/AdminVue/email-template-delete', data.id, this.$refs.vuetable)
        }
      },
  
      createData () {
        this.$router.push('/RoleAdmin/master/form-audit-email-template')
      },
  
    },
  
    mounted(){
      this.isNotifExist()
    },
  
  }
  </script>
  