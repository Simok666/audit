<template>
    <div>
        <b-card header="View / Data Log History" header-tag="h4" class="mb-4">
            <b-form inline class="mb-2 row">
				<label class="switcher">
					<input type="checkbox" class="switcher-input" @click="toggleColumn">
					<span class="switcher-indicator">
						<span class="switcher-yes"></span>
						<span class="switcher-no"></span>
					</span>
					<span class="switcher-label">Tampilkan Kolom Deskripsi</span>
				</label>
            </b-form>
            <div class="table-responsive"> <vuetable ref="vuetable"
		        api-url="/AdminVue/data-history-data"
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
						<b-input v-model="paramData.search.mdl__Name" placeholder="Nama Modul" v-on:keyup.enter="getFilters()" />
					</th>
					<th>
						<b-input v-model="paramData.search.hry__From" placeholder="From" v-on:keyup.enter="getFilters()" />
					</th>
					<th>
						<b-input v-model="paramData.search.hry__Action" placeholder="Action" v-on:keyup.enter="getFilters()" />
					</th>
					<th>
						<b-input v-model="paramData.search.usr__UserName" placeholder="UserEntry" v-on:keyup.enter="getFilters()" />
					</th>
          <th>
            <masked-input type="text" class="form-control" placeholder="Thn-Bln-Tgl"
              v-model="paramData.search.hry__CreateAt"
              v-on:keyup.enter="getFilters()"
              :guide="false"
              :mask="dateYmdMask" />
          </th>
					<th></th>
          <th v-if="descVisible">
            <b-input v-model="paramData.search.hry__Description" placeholder="Desc" v-on:keyup.enter="getFilters()" />
          </th>
				</tr>
				<vuetable-row-header></vuetable-row-header>
			</template>
				<template slot="index" slot-scope="props">
					{{ props.rowIndex + 1}}
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

import Vuetable from 'vuetable-2'
import VuetablePagination from 'vuetable-2/src/components/VuetablePagination'
import VuetablePaginationInfo from 'vuetable-2/src/components/VuetablePaginationInfo'
import VuetableRowHeader from 'vuetable-2/src/components/VuetableRowHeader'
import accounting from 'accounting'
import moment from 'moment'
import MaskedInput from 'vue-text-mask'
import ButtonAction from '@/components/backend/template/ButtonAction'

var DescriptionColumn = {
	name: 'Description',
	sortField: 'hry.Description',
	title: 'Deskripsi',
	titleClass: 'text-center',
	visible: false
}

export default {
	name: 'index-master-module',
  metaInfo: {
    title: 'Index Master Module'
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
          name: 'Module',
          sortField: 'mdl.Name',
          title: 'Nama Modul',
          titleClass: 'text-center',
          dataClass: 'text-center'
        },
        {
          name: 'From',
          sortField: 'hry.From',
          title: 'From',
          titleClass: 'text-center',
          dataClass: 'text-center'
        },
        {
          name: 'Action',
          sortField: 'hry.Action',
          title: 'Action',
          titleClass: 'text-center',
          dataClass: 'text-center',
        },
		    {
          name: 'UserEntry',
          sortField: 'usr.UserName',
          title: 'UserEntry',
          titleClass: 'text-center',
		      dataClass: 'text-center'
        },
        {
          name: 'CreateAt',
          sortField: 'hry.CreateAt',
          title: 'CreateAt',
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
          isEdit: false,
          isDelete: false,
          showUrl: 'main/show-history-data',
        },
        DescriptionColumn
      ],

      sortOrder: [
        {
          field: 'id',
          sortField: 'hry.Id',
          direction: 'desc'
        }
      ],

      vars: {
        perPage: 10
      },

      paramData: {
        search: {},
      },

      descVisible: false

    }
  },

  methods: {
    formatNumber: function(value) {
        return accounting.formatMoney(value, 'Rp ', 2, '.', ',')
    },

    formatDate: function(value) {
      return (value == null) ? '' : moment(value).format('DD/MM/YYYY')
	  },
	
    toggleColumn(){
      DescriptionColumn.visible = !DescriptionColumn.visible
      this.descVisible = DescriptionColumn.visible
      this.$refs.vuetable.normalizeFields()
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

  },

  mounted(){
    this.isNotifExist()
  },
}
</script>