<template>
    <b-card header="Data Auditee Department" header-tag="h4" class="mb-4 text-center">
        <div class="table-responsive">
            <table class="table table-bordered b-t">
                <thead>
                    <tr style="background-color:white;">
                        <th>#</th>
                        <th>Departement</th>
                        <th>Position</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody v-for="(item,index) in detailData" :key="index">
                    <tr style="background-color:white" v-for="(val,i) in item.AuditeePosition" :key="i">
                        <td>
                            <div v-if="i==0">
                                {{index+1}}
                            </div>
                        </td>
                        <td>
                            <div v-if="i==0">
                                {{item.Department}}
                            </div>
                        </td>
                        <td>{{val.Name}}</td>
                        <td>{{val.Email}}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <b-form-row>
          <b-form-group class="col-md-6"></b-form-group>
          <b-form-group label="" class="col-md-6">
            <b-btn type="button" variant="secondary" @click="backIndex()" class="float-right">Back</b-btn>
          </b-form-group>
        </b-form-row>
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
  name: 'form-standart-audit',
  metaInfo: {
    title: 'View Attachment Audit Plan'
  },

  data () {
    return {
      detailData:[],
      BaseUrl:process.env.BASE_URL
    }
  },

  methods: {
      getDetailData(Id){
          axios.post('/AdminVue/audit-plan-getAuditeeDepartment', {
                Id:Id,
            })
            .then( function (res) {
                var resp = res.data
                this.field = resp.data
                this.detailData = resp.AuditeeDepartment
            }.bind(this))
            .catch( function (e) {
                console.log(e);
            })
      },

      backIndex() {
        this.$router.push('/RoleAdmin/approval/data-approval-audit-plan')
      }
  },

  mounted(){
    if(this.$route.params.Id){
        this.getDetailData(this.$route.params.Id)
    }
  },
}
</script>