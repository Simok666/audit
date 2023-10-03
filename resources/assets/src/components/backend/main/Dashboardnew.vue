<template>
    <div>
        <b-card>
            <h4 class="font-weight-bold py-3 mb-4">
                1. Audit Plan 123
            </h4>
            <b-form inline class="mb-2 row">
                <div class="col-md-6">
                    <b-form inline class="">
                        <label class="form-label mr-sm-2">Show Data</label>
                        <b-select v-model="vars.perPage" value="vars.perPage" :options="[10,25,50,100,1000]" />
                    </b-form>
                </div>
	        </b-form>

            <div class="table-responsive"> <vuetable ref="vuetable"
                api-url="/AdminVue/data-audit-plan"
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
                @click="viewAuditeeDepartment(props.rowData, props.rowIndex)" v-if="User.accessMenuDB[1].children[0].children[2].selected === true">
                <i class="ion ion-ios-eye"></i> Lihat Auditee
                </b-btn>
            </template>

            <template slot="Path" slot-scope="props">
                <div v-if="props.rowData.Path != ''">
                    <b-btn class="btn btn-outline-danger btn-sm mr-1 mt-1"
                    @click="viewAttachment(props.rowData, props.rowIndex)" v-if="User.accessMenuDB[1].children[0].children[3].selected === true">
                    <i class="ion ion-md-attach"></i>
                    </b-btn>
                </div>
            </template>

            <template slot="actions" slot-scope="props">
                <div class="custom-actions" v-if="props.rowData.Actived == 1">
                <!-- <b-btn class="btn btn-outline-success btn-sm mr-1 mt-1"
                    @click="onAction('publish-item', props.rowData, props.rowIndex)" v-if="User.accessMenuDB[1].children[0].children[10].selected === true">
                    <i class="ion ion-md-checkmark"></i> Send to Workflow
                </b-btn> -->
                </div>
                <div class="custom-actions" v-if="props.rowData.Actived == 2">
                <!-- <div v-if="props.rowData.Approved == 0">
                    <b-btn class="btn btn-outline-success btn-sm mr-1 mt-1"
                    @click="onAction('approve-item', props.rowData, props.rowIndex)">
                    <i class="ion ion-ios-create"></i> Approve
                    </b-btn>
                </div> -->
                <div v-if="props.rowData.StatusApproved == 2 && props.rowData.IdAuditSelection !== null">
                    <b-dd variant="danger">
                        <template v-slot:button-content>
                        Export PDF
                        </template>
                        <b-dropdown-item :href="'/AdminVue/audit-plan/'+props.rowData.id+'/exportProgram'" target="_blank" v-if="User.accessMenuDB[1].children[0].children[5].selected === true">Program</b-dropdown-item>
                        <b-dd-item :href="'/AdminVue/audit-plan/'+props.rowData.id+'/exportJadwal'" target="_blank" v-if="User.accessMenuDB[1].children[0].children[6].selected === true">Jadwal</b-dd-item>
                        <b-dd-item :href="'/AdminVue/audit-plan/'+props.rowData.id+'/exportTindakLanjut'" target="_blank" v-if="User.accessMenuDB[1].children[0].children[7].selected === true">Tindak Lanjut</b-dd-item>
                        <b-dd-item :href="'/AdminVue/audit-plan/'+props.rowData.id+'/exportAnalisis'" target="_blank" v-if="User.accessMenuDB[1].children[0].children[8].selected === true">Analisis</b-dd-item>
                    </b-dd>
                    <!-- <a class="btn btn-xs btn-outline-danger text-danger" :href="'/AdminVue/audit-plan/'+props.rowData.id+'/exportProgram'" target="_blank"> <i class="fas fa-print"></i> Export Program</a>
                    <a class="btn btn-xs btn-outline-danger text-danger" :href="'/AdminVue/audit-plan/'+props.rowData.id+'/exportJadwal'" target="_blank"> <i class="fas fa-print"></i> Export Jadwal</a>
                    <a class="btn btn-xs btn-outline-danger text-danger" :href="'/AdminVue/audit-plan/'+props.rowData.id+'/exportTindakLanjut'" target="_blank"> <i class="fas fa-print"></i> Export Tindak Lanjut</a>
                    <a class="btn btn-xs btn-outline-danger text-danger" :href="'/AdminVue/audit-plan/'+props.rowData.id+'/exportAnalisis'" target="_blank"> <i class="fas fa-print"></i> Export Analisis</a> -->
                </div>
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
            <hr>
            <h4 class="font-weight-bold py-3 mb-4">
                2. Total Temuan Audit All Departement
            </h4>
            <b-form-row>
                <b-form-group class="col-md-8" style="width:100%;">
                    <chart-temuan :chart-data="datacollectiontemuan" :height="200" />
                </b-form-group>
                <b-form-group class="col-md-4">
                    <b-form-row>
                        <b-form-group class="col-md-12" label-cols="12" label-cols-sm="2" label="Tahun">
                                <multiselect
                                    v-model="YearTemuan"
                                    :options="opsYear"
                                    :allow-empty="true"
                                    :show-labels="false"
                                    :multiple="true"
                                    placeholder="Pilih Tahun"
                                    label="text"
                                    track-by="text" />
                        </b-form-group>
                        <b-form-group class="col-md-12" label-cols="12" label-cols-sm="2" label="Standart Audit">
                                <multiselect
                                    v-model="StandartAuditTemuan"
                                    :options="opsStandart"
                                    :allow-empty="false"
                                    :show-labels="false"
                                    placeholder="Pilih Standart Audit"
                                    label="Standart"
                                    track-by="Standart" />
                        </b-form-group>
                        <b-form-group class="col-md-12">
                            <b-btn @click="getTemuan()" class="btn btn-info btn-md" style="width:100%;">
	                            <i class="ion ion-ios-search"></i> Cari
	                        </b-btn>
                        </b-form-group>
                        <!-- <b-form-group class="col-md-12" label-cols="12" label-cols-sm="2" label="Departement">
                                <multiselect
                                    v-model="Year"
                                    :options="opsYear"
                                    :allow-empty="true"
                                    :show-labels="false"
                                    placeholder="Pilih Departement"
                                    label="Name"
                                    track-by="Name" />
                        </b-form-group> -->
                    </b-form-row>
                </b-form-group>
            </b-form-row>
            <hr>
            <h4 class="font-weight-bold py-3 mb-4">
                3. Total Klausul Audit yg belum dipenuhi Tiap Departemen
            </h4>
            <b-form-row>
                <b-form-group class="col-md-8" style="width:100%;">
                    <chart-klausa :chart-data="datacollectionclause" :height="200" />
                </b-form-group>
                <b-form-group class="col-md-4">
                    <b-form-row>
                        <b-form-group class="col-md-12" label-cols="12" label-cols-sm="2" label="Year">
                            <multiselect
                            v-model="YearClause"
                            :options="opsYear"
                            :allow-empty="false"
                            :show-labels="false"
                            placeholder="Pilih Tahun"
                            label="text"
                            track-by="text" />
                        </b-form-group>
                        <b-form-group class="col-md-12" label-cols="12" label-cols-sm="2" label="Standart Audit">
                                <multiselect
                                    v-model="StandartAuditClause"
                                    :options="opsStandart"
                                    :allow-empty="false"
                                    :show-labels="false"
                                    placeholder="Pilih Standart Audit"
                                    label="Standart"
                                    track-by="Standart" />
                        </b-form-group>
                        <b-form-group class="col-md-12" label-cols="12" label-cols-sm="2" label="Departement">
                                <multiselect
                                    v-model="DepartmentClause"
                                    :options="opsDepartment"
                                    :allow-empty="false"
                                    :show-labels="false"
                                    placeholder="Pilih Departement"
                                    label="Department"
                                    track-by="Department" />
                        </b-form-group>
                        <b-form-group class="col-md-12">
                            <b-btn @click="getClause()" class="btn btn-info btn-md" style="width:100%;">
	                            <i class="ion ion-ios-search"></i> Cari
	                        </b-btn>
                        </b-form-group>
                    </b-form-row>
                </b-form-group>
            </b-form-row>
            <hr>
            <h4 class="font-weight-bold py-3 mb-4">
                4. Oustanding Temuan Audit
            </h4>
            <b-form-row>
                <b-form-group class="col-md-3"></b-form-group>
                <b-form-group class="col-md-6" label-cols="12" label-cols-sm="2" label="Tahun">
                    <multiselect
                        v-model="YearOutstanding"
                        :options="opsYear"
                        :allow-empty="true"
                        :show-labels="false"
                        placeholder="Pilih Tahun"
                        label="text"
                        track-by="text" />
                </b-form-group>
                <b-form-group class="col-md-3">
                    <b-btn @click="getOutstandingTable()" class="btn btn-info btn-md float-right" style="width:100%;">
	                    <i class="ion ion-ios-search"></i> Cari
	                </b-btn>
                </b-form-group>
            </b-form-row>
            <div class="table-responsive">
                <table class="table table-bordered b-t">
                    <thead>
                        <tr style="background-color:white;" v-if="headerOneTableOutstanding == ''">
                            <th rowspan="2">No.</th>
                            <th rowspan="2">Departemen Auditee</th>
                            <th rowspan="2">Tanggal Audit</th>
                            <th colspan="5" style="text-align:center;">Kriteria Temuan</th>
                            <th rowspan="2">&#931;</th>
                            <th colspan="5" style="text-align:center;">Tindak Lanjut</th>
                            <th rowspan="2">Closed</th>
                            <th rowspan="2">Sisa Temuan Open</th>
                            <th rowspan="2">%</th>
                            <th colspan="3">Sisa Temuan Open 2018</th>
                        </tr>
                        <tr style="background-color:white;" v-else v-html="headerOneTableOutstanding"></tr>
                        <tr v-if="headerTwoTableOutstanding == ''">
                            <th>9001</th>
                            <th>14001</th>
                            <th>18001</th>
                            <th>CPOB</th>
                            <th>SJH</th>
                            <th>9001</th>
                            <th>14001</th>
                            <th>18001</th>
                            <th>CPOB</th>
                            <th>SJH</th>
                            <th>9001</th>
                            <th>14001</th>
                            <th>18001</th>
                        </tr>
                        <tr v-else>
                            <th style="text-align:center;" v-for="(item, index) in headerTwoTableOutstanding" :key="index">
                                {{item}}
                            </th>
                        </tr>
                    </thead>
                    <tbody v-if="statusDataTableOutstanding === false">
                        <tr style="background-color:white">
                            <td colspan="20" style="text-align:center;"><h4>Tidak Ada Data</h4></td>
                        </tr>
                    </tbody>
                    <tbody v-else>
                        <tr style="background-color:white" v-if="dataTableOutstanding == ''">
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>

                        <tr style="background-color:white" v-else v-for="(item, index) in dataTableOutstanding" :key="index">
                            <td style="text-align:center;">{{index+1}}</td>
                            <td style="text-align:center;">{{item.Department}}</td>
                            <td style="text-align:center;" v-for="(detail,i) in item.TotalData" :key="i">
                                {{detail.TotalData}}
                            </td>
                            <td style="text-align:center;">{{item.TotalAllData}}</td>
                            <td style="text-align:center;" v-for="(det,inc) in item.TotalDataTindakLanjut" :key="inc">
                                {{det.TotalData}}
                            </td>
                            <td style="text-align:center;">{{item.IsStatus}}</td>
                            <td style="text-align:center;">{{item.RestFound}}</td>
                            <td style="text-align:center;">{{item.PercentageFound}}%</td>
                        </tr>

                        <tr style="background-color:white" v-if="totalDataTableOutstanding == ''">
                            <td colspan="3"></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr style="background-color:white" v-else>
                            <td colspan="2" style="text-align:right;">Total</td>
                            <td v-for="(item, index) in totalDataTableOutstanding" :key="index" style="text-align:center;">
                                {{item}}
                            </td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <hr>
            <h4 class="font-weight-bold py-3 mb-4">
                5. Klausul Audit yg belum dipenuhi Tiap Department
            </h4>
            <b-form-row>
                <b-form-group class="col-md-3"></b-form-group>
                <b-form-group class="col-md-6" label-cols="12" label-cols-sm="2" label="Tahun">
                    <multiselect
                        v-model="YearClauseTable"
                        :options="opsYear"
                        :allow-empty="true"
                        :show-labels="false"
                        placeholder="Pilih Tahun"
                        label="text"
                        track-by="text" />
                </b-form-group>
                <b-form-group class="col-md-3">
                    <b-btn @click="getClauseTable()" class="btn btn-info btn-md float-right" style="width:100%;">
	                    <i class="ion ion-ios-search"></i> Cari
	                </b-btn>
                </b-form-group>
            </b-form-row>
            <div class="table-responsive">
                <table class="table table-bordered b-t">
                    <thead>
                        <tr style="background-color:white;" v-if="headerOneTableClause == ''">
                            <th rowspan="2">No.</th>
                            <th rowspan="2">Departemen</th>
                            <th colspan="7" style="text-align:center;">ISO 9001:2015</th>
                            <th colspan="7" style="text-align:center;">14001:2015</th>
                            <th colspan="7" style="text-align:center;">ISO 45001:2015</th>
                            <th colspan="11" style="text-align:center;">SJH 23000</th>
                            <th colspan="7" style="text-align:center;">CPOB</th>
                        </tr>
                        <tr style="background-color:white;" v-else v-html="headerOneTableClause"></tr>
                        <tr v-if="headerTwoTableClause == ''">
                            <th>4</th>
                            <th>5</th>
                            <th>6</th>
                            <th>7</th>
                            <th>8</th>
                            <th>9</th>
                            <th>10</th>
                            <th>4</th>
                            <th>5</th>
                            <th>6</th>
                            <th>7</th>
                            <th>8</th>
                            <th>9</th>
                            <th>10</th>
                            <th>4</th>
                            <th>5</th>
                            <th>6</th>
                            <th>7</th>
                            <th>8</th>
                            <th>9</th>
                            <th>10</th>
                            <th>1</th>
                            <th>2</th>
                            <th>3</th>
                            <th>4</th>
                            <th>5</th>
                            <th>6</th>
                            <th>7</th>
                            <th>8</th>
                            <th>9</th>
                            <th>10</th>
                            <th>11</th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                        <tr v-else>
                            <th style="text-align:center;" v-for="(item, index) in headerTwoTableClause" :key="index">
                                {{item.Clause}}
                            </th>
                        </tr>
                    </thead>
                    <tbody v-if="statusDataTable === false">
                        <tr style="background-color:white">
                            <td colspan="41" style="text-align:center;"><h4>Tidak Ada Data</h4></td>
                        </tr>
                    </tbody>
                    <tbody v-else>
                        <tr style="background-color:white" v-if="dataTableClause == ''">
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr v-else v-for="(item, index) in dataTableClause" :key="index">
                            <td style="text-align:center;">{{index+1}}</td>
                            <td style="text-align:center;">{{item.Department}}</td>
                            <td style="text-align:center;" v-for="(detail,i) in item.TotalData" :key="i">
                                {{detail.TotalData}}
                            </td>
                        </tr>
                        <tr style="background-color:white" v-if="totalDataTableClause == ''">
                            <td colspan="2" style="text-align:right;">Total</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr v-else>
                            <td colspan="2" style="text-align:right;">Total</td>
                            <td v-for="(item, index) in totalDataTableClause" :key="index" style="text-align:center;">
                                {{item}}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </b-card>
    </div>
</template>
<script>
import Vue from 'vue'
import VueChartJs from 'vue-chartjs'
import Vuetable from 'vuetable-2'
import VuetablePagination from 'vuetable-2/src/components/VuetablePagination'
import VuetablePaginationInfo from 'vuetable-2/src/components/VuetablePaginationInfo'
import VuetableRowHeader from 'vuetable-2/src/components/VuetableRowHeader'
import accounting from 'accounting'
import moment from 'moment'
import MaskedInput from 'vue-text-mask'
import ButtonAction from '@/components/backend/template/ButtonAction'

Vue.component('chart-temuan', {
  extends: VueChartJs.Bar,
  mixins: [VueChartJs.mixins.reactiveProp],
  data:function(){
    return {
        options:{
            responsive: true,
            maintainAspectRatio: true
        }
    }
  },
  mounted () {
    this.renderChart(this.chartData,this.options)
  }
})

Vue.component('chart-klausa', {
  extends: VueChartJs.Bar,
  mixins: [VueChartJs.mixins.reactiveProp],
  data:function(){
    return {
        options:{
            responsive: true,
            maintainAspectRatio: true
        }
    }
  },
  
  mounted () {
    this.renderChart(this.chartData,this.options)
  }
})

export default {
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
    data() {
        return {
            opsYear:[{'text':2021,'value':2021},{'text':2022,'value':2022},{'text':2023,'value':2023},{'text':2024,'value':2024},{'text':2025,'value':2025}],
            opsStandart:[],
            opsDepartment:[],
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
                    title: 'Standard Audit',
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

            User : JSON.parse(window.localStorage.getItem('user')),
            Year:'',
            YearTemuan:'',
            YearOutstanding:'',
            StandartAuditTemuan:'',
            YearClause:'',
            StandartAuditClause:'',
            DepartmentClause:'',
            YearClauseTable:'',
            headerOneTableClause:'',
            headerTwoTableClause:'',
            dataTableClause:'',
            totalDataTableClause:'',
            headerOneTableOutstanding:'',
            headerTwoTableOutstanding:'',
            dataTableOutstanding:'',
            totalDataTableOutstanding:'',
            statusDataTable:true,
            statusDataTableOutstanding:true,
            datacollectiontemuan:null,
            datacollectionclause:null
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
            name: 'audit/view-attachment-audit-plan',
            params: {
            Attachment:data.Path
            }
        })
        },

        viewAuditeeDepartment(data,index){
        this.$router.push({
            name: 'audit/show-auditee-audit-plan',
            params: {
            Id:data.id
            }
        })
        },

        onChangePage (page) {
            this.$refs.vuetable.changePage(page)
        },

        dummyDataTemuan(){
            this.datacollectiontemuan = {
                labels: [2021,2022],
                datasets: [{
                    label: 'IT',
                    data: [24,20],
                    borderWidth: 1,
                    backgroundColor: 'rgba(205, 220, 57, 0.3)',
                    borderColor: '#CDDC39'
                }, {
                    label: 'ENG',
                    data: [10,15],
                    borderWidth: 1,
                    backgroundColor: 'rgba(103, 58, 183, 0.3)',
                    borderColor: '#673AB7'
                }]
            }
        },

        dummyDataClause(){
            this.datacollectionclause = {
                labels: ['1','2','3','4','5','6','7','8','9','10','11'],
                datasets: [{
                    label: 'Standart Audit SJH 23000',
                    data: [2,5,3,8,10,19,14,17,19,11,9],
                    borderWidth: 1,
                    backgroundColor: 'rgba(205, 220, 57, 0.3)',
                    borderColor: '#CDDC39'
                }]
            }
        },

        getSelect(){
            axios.post('/AdminVue/dashboard-getSelect')
            .then( function (res) {
                this.opsStandart = res.data.Standart
                this.opsDepartment = res.data.Departement
            }.bind(this))
            .catch( function (e) {
                console.log(e)
                this.opsStandart = []
                this.opsDepartment = []
            }.bind(this))
        },

        getTemuan(){
            axios.post('/AdminVue/dashboard-getAuditTemuan',{
                Year:JSON.stringify(this.YearTemuan),
                StandartAudit:this.StandartAuditTemuan.Id
            })
            .then( function (res) {
                this.datacollectiontemuan = {
                    labels: res.data.dataLabel,
                    datasets: res.data.dataColumn
                }
            }.bind(this))
            .catch( function (e) {
                console.log(e)
            }.bind(this))
        },

        getClause(){
            axios.post('/AdminVue/dashboard-getAuditClause',{
                Year:this.YearClause.value,
                StandartAudit:this.StandartAuditClause.Id,
                StandartAuditName:this.StandartAuditClause.Standart,
                DepartmentClause:this.DepartmentClause.Id
            })
            .then( function (res) {
                this.datacollectionclause = {
                    labels: res.data.dataLabel,
                    datasets: res.data.dataColumn
                }
            }.bind(this))
            .catch( function (e) {
                console.log(e)
            }.bind(this))
        },

        getClauseTable(){
            axios.post('/AdminVue/dashboard-getAuditClauseTable',{
                Year:this.YearClauseTable.value
            })
            .then( function (res) {
                if(res.data.status === true){
                    this.statusDataTable = true
                    this.headerOneTableClause = res.data.HeaderOne
                    this.headerTwoTableClause = res.data.HeaderTwo
                    this.dataTableClause = res.data.DataTable
                    this.totalDataTableClause = res.data.TotalClause
                }else{
                    this.statusDataTable = false
                    this.headerOneTableClause = ''
                    this.headerTwoTableClause = ''
                    this.dataTableClause = ''
                    this.totalDataTableClause = ''
                }
            }.bind(this))
            .catch( function (e) {
                console.log(e)
            }.bind(this))
        },

        getOutstandingTable(){
            axios.post('/AdminVue/dashboard-getOutstandingAudit',{
                Year:this.YearOutstanding.value
            })
            .then( function (res) {
                if(res.data.status === true){
                    this.statusDataTableOutstanding = true
                    this.headerOneTableOutstanding = res.data.HeaderOne
                    this.headerTwoTableOutstanding = res.data.HeaderTwo
                    this.dataTableOutstanding = res.data.DataTable
                    this.totalDataTableOutstanding = res.data.TotalOutstanding
                }else{
                    this.statusDataTableOutstanding = false
                    this.headerOneTableOutstanding = ''
                    this.headerTwoTableOutstanding = ''
                    this.dataTableOutstanding = ''
                    this.totalDataTableOutstanding = ''
                }
            }.bind(this))
            .catch( function (e) {
                console.log(e)
            }.bind(this))
        },

        getFilters () {
            this.$refs.vuetable.refresh()
        },

    },

    mounted(){
        this.hideLoading()
        // this.dummyDataTemuan()
        const charts = this.$children.filter(component => /^vue-chartjs-/.test(component.$options._componentTag))

        const resizeCharts = () => charts.forEach(chart => chart._data._chart.resize())

        // Initial resize
        resizeCharts()

        // For performance reasons resize charts on delayed resize event
        this.layoutHelpers.on('resize.charts-demo', resizeCharts)
    },
    beforeDestroy () {
        this.layoutHelpers.off('resize.charts-demo')
    },
    created(){
        this.dummyDataTemuan()
        this.dummyDataClause()
        this.getSelect()
    },
}
</script>