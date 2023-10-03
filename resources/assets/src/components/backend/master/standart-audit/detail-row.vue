<template>
    <b-card header="Data Detail Clause Audit" header-tag="h4" class="mb-4 text-center">
        <div class="table-responsive">
            <table class="table table-bordered b-t">
                <thead>
                    <tr style="background-color:white;">
                        <th>#</th>
                        <th>Clause</th>
                        <th>Persyaratan Audit</th>
                        <th>Detail Persyaratan</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody v-for="(item, index) in detailData" :key="index">
                    <tr style="background-color:white">
                        <td>{{index+1}}</td>
                        <td>{{item.Clause}}</td>
                        <td>{{item.Requirements}}</td>
                        <td>{{item.RequirementsDetail}}</td>
                        <td>
                            <div class="">
                                <b-btn class="btn btn-outline-info btn-sm mr-sm-1"
                                    @click="onAction('view-item', item.Id, rowData.Id,rowData.Standart)" v-if="User.accessMenuDB[0].children[7].children[5].selected === true">
                                    <i class="ion ion-ios-eye"></i>
                                </b-btn>
                                <b-btn class="btn btn-outline-secondary btn-sm mr-sm-1"
                                    @click="onAction('edit-item', item.Id, rowData.Id,rowData.Standart)" v-if="User.accessMenuDB[0].children[7].children[2].selected === true">
                                    <i class="ion ion-md-create"></i>
                                </b-btn>
                                <b-btn class="btn btn-outline-danger btn-sm mr-sm-1"
                                    @click="onAction('delete-item', item.Id, rowData.Id,rowData.Standart)" v-if="User.accessMenuDB[0].children[7].children[4].selected === true">
                                    <i class="ion ion-md-trash"></i>
                                </b-btn>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </b-card>
</template>

<script>

import Vue from 'vue'
import Vuetable from 'vuetable-2'
import VuetablePagination from 'vuetable-2/src/components/VuetablePagination'
import VuetablePaginationInfo from 'vuetable-2/src/components/VuetablePaginationInfo'
import VuetableRowHeader from 'vuetable-2/src/components/VuetableRowHeader'
import moment from 'moment'

export default {
    props: {
      rowData: {
        type: Object,
        required: true
      },
      rowIndex: {
        type: Number
      }
    },

    components: {
        Vuetable,
        VuetablePagination,
        VuetablePaginationInfo,
        VuetableRowHeader
    },

    data() {
        return {
            detailData:[],
            User : JSON.parse(window.localStorage.getItem('user'))
        }
    },

    methods: {
        formatDate: function(value) {
          return (value == null) ? '' : moment(value).format('DD/MM/YYYY')
        },
        getDataDetail(id){
            axios.post('/AdminVue/standart-audit/'+this.rowData.Id+'/detail')
            .then( function(res){
                var resp = res.data
                this.detailData = resp.data
            }.bind(this))
            .catch( function(e){
                console.log(e)
                this.isNotif = true
                this.alertNotif = 'Invalid Server Side!'
                this.alertVariant = 'alert-dark-danger'
            }.bind(this))
        },
        onAction(action,data,IdStandart,Standart){
            if(action=='view-item'){
                this.$router.push({
                    name: 'master/show-audit-clause',
                    params: {
                        Id: data,
                    }
                })
            }
            if(action == 'edit-item'){
                this.$router.push({
                    name: 'master/form-audit-clause',
                    params: {
                        isFormEdit: true,
                        Id: data,
                        IdStandartAudit: IdStandart,
                        StandartAudit: Standart
                    }
                })
            }
            if(action == 'delete-item'){
                this.deleteData('/AdminVue/standart-audit-clause-delete', data, this.$parent,IdStandart)
            }
        }
    },

    mounted() {
        this.getDataDetail(this.rowData.Id)
    },
}

</script>