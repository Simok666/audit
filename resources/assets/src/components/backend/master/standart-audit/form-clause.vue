<template>
  <div>

    <b-card :header="headerCard" header-tag="h4" class="mb-4">

      <div v-if="isNotif" class="alert alert-dismissible fade show" v-bind:class="[alertVariant]">
        <button type="button" class="close" data-dismiss="alert" v-on:click="isNotif = !isNotif">×</button>
        {{alertNotif}}
      </div>

      <form method="POST" @submit.prevent="submitForm()">
        <b-form-row>
            <b-form-group class="col-md-4">
                <label class="form-label">Persyaratan Standart Audit</label>
                <b-input name="StandartAudit" :state="allErrors.StandartAudit?false:null" v-model="field.StandartAudit" class="mb-1" readonly />
                <span class="text-danger" v-if="allErrors.StandartAudit">{{ allErrors.StandartAudit[0] }}</span>
            </b-form-group>

            <b-form-group class="col-md-4">
                <label class="form-label">Parent Clause Audit</label>
                <!-- <label class="form-label float-right text-danger">*Wajib Diisi</label> -->
                <multiselect
                        v-model="field.Parent"
                        :options="opsParent"
                        :allow-empty="true"
                        :show-labels="false"
                        :disabled="isDisabled"
                        placeholder="Pilih Parent Clause"
                        label="Requirements"
                        track-by="Requirements" />
                <span class="text-danger" v-if="allErrors.Parent">{{ allErrors.Parent[0] }}</span>
            </b-form-group>
            <b-form-group class="col-md-4">
                <label class="form-label">Clause Audit</label>
                <label class="form-label float-right text-danger">*Wajib Diisi</label>
                <b-input name="Clause" :state="allErrors.Clause?false:null" v-model="field.Clause" class="mb-1" required />
                <!-- <masked-input type="text" class="form-control mb-1"
                    v-model="field.Clause"
                    :state="allErrors.Clause?false:null"

                    required/> -->
                <span class="text-danger" v-if="allErrors.Clause">{{ allErrors.Clause[0] }}</span>
            </b-form-group>
        </b-form-row>

        <b-form-row>
            <b-form-group class="col-md-6">
                <label class="form-label">Persyaratan Audit</label>
                <label class="form-label float-right text-danger">*Wajib Diisi</label>
                <b-form-textarea
                        name="Requirements"
                        v-model="field.Requirements"
                        rows="2"
                        no-resize>
                </b-form-textarea>
                <span class="text-danger" v-if="allErrors.Requirements">{{ allErrors.Requirements[0] }}</span>
            </b-form-group>

            <b-form-group class="col-md-6">
                <label class="form-label">Detail Persyaratan</label>
                <label class="form-label float-right text-danger">*Wajib Diisi</label>
                <b-form-textarea
                        name="DetailRequirements"
                        v-model="field.RequirementsDetail"
                        rows="2"
                        no-resize>
                </b-form-textarea>
                <span class="text-danger" v-if="allErrors.RequirementsDetail">{{ allErrors.RequirementsDetail[0] }}</span>
            </b-form-group>
        </b-form-row>

        <b-form-row>
          <b-form-group class="col-md-6"></b-form-group>
          <b-form-group label="" class="col-md-6">
            <b-btn type="submit" variant="primary" class="float-right ml-2">{{textBtnSubmit}}</b-btn>
            <b-btn type="button" variant="secondary" @click="backIndex()" class="float-right">Back</b-btn>
          </b-form-group>
        </b-form-row>
      </form>

      <div class="table-responsive" v-if="isEdit == false">
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
                <tbody v-for="(item, index) in detailClauseAudit" :key="index">
                    <tr style="background-color:white">
                        <td>{{index+1}}</td>
                        <td>{{item.Clause}}</td>
                        <td>{{item.Requirements}}</td>
                        <td>{{item.RequirementsDetail}}</td>
                        <td>
                            <div class="">
                                <b-btn class="btn btn-outline-info btn-sm mr-sm-1"
                                    @click="onAction('view-item', item.Id, field.IdStandartAudit,field.StandartAudit)">
                                    <i class="ion ion-ios-eye"></i>
                                </b-btn>
                                <b-btn class="btn btn-outline-secondary btn-sm mr-sm-1"
                                    @click="onAction('edit-item', item.Id, field.IdStandartAudit,field.StandartAudit)">
                                    <i class="ion ion-md-create"></i>
                                </b-btn>
                                <b-btn class="btn btn-outline-danger btn-sm mr-sm-1"
                                    @click="onAction('delete-item', item.Id, field.IdStandartAudit,field.StandartAudit)">
                                    <i class="ion ion-md-trash"></i>
                                </b-btn>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

    </b-card>

  </div>
</template>

<script>

import moment from 'moment'
import MaskedInput from 'vue-text-mask'
import * as textMaskAddons from 'text-mask-addons/dist/textMaskAddons'

export default {
  name: 'form-standart-audit',
  metaInfo: {
    title: 'Form Standart Audit Clause'
  },
  components: {
    MaskedInput
  },
  data () {
    return {
      urlSubmit: '/AdminVue/standart-audit-clause-insert',
      headerCard: 'Form / Create Data Standart Audit Clause',
      textBtnSubmit: 'Create',
      field: {
      //   myFile : ''
        File:'',
        StandartAudit:''
      },
      allErrors: [],
      isNotif: false,
      isEdit: false,
      detailClause:[],
      opsParent:[],
      alertNotif: '',
      isDisabled:false,
      alertVariant: 'alert-dark-danger',
      numberMask: textMaskAddons.createNumberMask({
        prefix: '',
        allowDecimal: true,
        thousandsSeparatorSymbol: '.',
        decimalSymbol: ',',
        decimallimit: 2
       })
    }
  },
  methods: {
    submitForm () {
      const formData = new FormData()
      if(this.field.Parent) this.field.Parent = this.field.Parent.Id
      else this.field.Parent = 0
      formData.append("Id", this.field.Id)
      formData.append("IdStandartAudit", this.field.IdStandartAudit)
      formData.append("Clause", this.field.Clause)
      formData.append("Parent", this.field.Parent)
      formData.append("Requirements", this.field.Requirements)
      formData.append("RequirementsDetail", this.field.RequirementsDetail)

      const config = {
          headers: { 'content-type': 'multipart/form-data' }
      }

      axios.post(this.urlSubmit, formData, config)
      .then( function (res) {
        var resp = res.data

        if(resp.status){

          this.$router.push({
            name: 'master/data-standart-audit',
            params: {
              isNotif: true,
              gNotif: 'notifications-success',
              tNotif: this.textBtnSubmit+' Data Success',
              txNotif: 'Save Data Success!',
            }
          })

        }else{
          this.isNotif = true
          this.alertNotif = resp.message
          this.alertVariant = 'alert-dark-danger'
          this.allErrors = resp.validation
        }
      }.bind(this))
      .catch( function (e) {
        console.log(e)
        this.isNotif = true
        this.alertNotif = 'Invalid Server Side!'
        this.alertVariant = 'alert-dark-danger'
      }.bind(this))
    },

    getData (Id) {
      axios.post('/AdminVue/standart-audit-clause-edit', {
        Id:Id,
      })
      .then( function (res) {
        var resp = res.data
        this.field = resp.data
        this.isDisabled = true
      }.bind(this))
      .catch( function (e) {
        console.log(e)
        this.isNotif = true
        this.alertNotif = 'Invalid Server Side!'
        this.alertVariant = 'alert-dark-danger'
      }.bind(this))
    },

    getClause(Id){
      axios.post('/AdminVue/standart-audit-clause-getClauseEdit', {
        Id:Id,
      })
      .then( function (res) {
        var resp = res.data
        this.detailClauseAudit = resp.data
        this.opsParent = resp.parent
      }.bind(this))
      .catch( function (e) {
        console.log(e)
        this.isNotif = true
        this.alertNotif = 'Invalid Server Side!'
        this.alertVariant = 'alert-dark-danger'
      }.bind(this))
    },

    backIndex() {
      this.$router.push('/RoleAdmin/master/data-standart-audit')
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
          let router = this.$router.resolve({
              name: 'master/form-audit-clause',
              query: {
                isFormEdit: true,
                Id: data,
                IdStandartAudit: IdStandart,
                StandartAudit: Standart
              }
          })

          window.open(router.href, '_blank');
      }
      if(action == 'delete-item'){
          this.deleteDataClause('/AdminVue/standart-audit-clause-delete', data, this.vuetable,IdStandart,this.detailClauseAudit)
          // this.getClause(this.field.IdStandartAudit)
      }
    },

    handleFile: function(files) {
        // console.log('FilePond Updated')
        // example of instance method call on pond reference
        this.field.File = files.map(files => files.file)
        // console.log( this.field.myFile )
    },

  },

  mounted(){
    if(this.$route.params.isFormEdit || this.$route.query.isFormEdit){
      var Id = this.$route.params.Id
      if(this.$route.query.isFormEdit){
        var Id = this.$route.query.Id
      }
      this.isEdit = true
      if(Id){
        this.getData(Id)
        this.field.Id = Id
        this.urlSubmit = '/AdminVue/standart-audit-clause-update'
        this.headerCard = 'Form / Edit Data Standart Audit Clause'
        this.textBtnSubmit = 'Update'
      }

    }
    if(this.$route.params.IdStandartAudit || this.$route.query.IdStandartAudit){
      this.field.IdStandartAudit = this.$route.params.IdStandartAudit
      this.field.StandartAudit = this.$route.params.StandartAudit
      if(this.$route.query.IdStandartAudit){
        this.field.IdStandartAudit = this.$route.query.IdStandartAudit
        this.field.StandartAudit = this.$route.query.StandartAudit
      }
      if(this.isEdit == false){
        this.getClause(this.field.IdStandartAudit)
      }

    }else{
      this.$router.push('/RoleAdmin/master/data-standart-audit')
    }
  },

}
</script>
