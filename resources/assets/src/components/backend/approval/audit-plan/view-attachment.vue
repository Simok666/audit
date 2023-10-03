<template>
    <b-card header="Data File Attachment Audit Plan" header-tag="h4" class="mb-4 text-center">
        <div class="table-responsive">
            <table class="table table-bordered b-t">
                <thead>
                    <tr style="background-color:white;">
                        <th>#</th>
                        <th>Nama File</th>
                        <th>Type File</th>
                        <th>Ekstensi File</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody v-for="(item, index) in detailData" :key="index">
                    <tr style="background-color:white">
                        <td>{{index+1}}</td>
                        <td>{{getNameFile(item)}}</td>
                        <td>{{getFileType(item)}}</td>
                        <td>{{getEkstensiFile(item)}}</td>
                        <td>
                            <div class="">
                                <a class="btn btn-xs btn-outline-success text-success" :href="BaseUrl+item" target="_blank"> <i class="fas fa-download"></i> Download</a>
                            </div>
                        </td>
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
      getFileType(data){
        let getEkstensi = this.getEkstensiFile(data)
        let FileType = ''
        if(getEkstensi == 'doc' || getEkstensi == 'docs' || getEkstensi == 'docx' || getEkstensi == 'xls' || getEkstensi == 'xlss' || getEkstensi == 'xlsx' || getEkstensi == 'pdf'){
            FileType = 'Document'
        }else if(getEkstensi == 'jpg' || getEkstensi == 'png' || getEkstensi == 'jpeg'){
            FileType = 'Images'
        }
        return FileType;
      },

      getEkstensiFile(data){
          let getEkstensi = data.split('.').pop();
          return getEkstensi;
      },

      backIndex() {
        this.$router.push('/RoleAdmin/approval/data-approval-audit-plan')
      },

      getNameFile(data){
        let split = data.split('.')
        let NameFile = split[0].replace('clouds/backend/files/audit-plan/','')
        return NameFile;
      }
  },

  mounted(){
    if(this.$route.params.Attachment){
        this.detailData = JSON.parse(this.$route.params.Attachment)
    }
  },
}
</script>