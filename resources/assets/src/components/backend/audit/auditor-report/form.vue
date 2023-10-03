<style>
  .audit-report-date .input-group .form-control{
    background-color: white !important;
  }
</style>
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
              <label class="form-label">Id Audit Plan</label>
              <label class="form-label float-right text-danger">*Wajib Diisi</label>
              <multiselect
                v-model="field.IdAuditPlan"
                :options="opsIdAudit"
                :allow-empty="false"
                :show-labels="false"
                @select="getAuditDetailSelect"
                :custom-label="convertSelectBox"
                placeholder="Pilih Id Audit Plan"
                label="NoTrans"
                track-by="NoTrans" />
              <span class="text-danger" v-if="allErrors.Organizer">{{ allErrors.Organizer[0] }}</span>
            </b-form-group>

            <b-form-group class="col-md-4">
                <label class="form-label">Audit Date</label>
                <label class="form-label float-right text-danger">*Wajib Diisi</label>
                <datepicker
                v-model="field.AuditorDate"
                :format="formatDate"
                :state="allErrors.AuditorDate?false:null"
                :bootstrapStyling="true"
                :disabled-dates="disabledDate"
                class="mb-1 audit-report-date"/>
            </b-form-group>

            <b-form-group class="col-md-4">
                <label class="form-label">Ref.Number</label>
                <b-input name="IDAudit" :state="allErrors.IDAudit?false:null" v-model="field.IDAudit" class="mb-1" readonly />
                <span class="text-danger" v-if="allErrors.IDAudit">{{ allErrors.IDAudit[0] }}</span>
            </b-form-group>

        </b-form-row>

        <b-form-row>
            <b-form-group class="col-md-4">
              <label class="form-label">Lead Auditor</label>
              <b-input name="LeadAuditor" :state="allErrors.LeadAuditor?false:null" v-model="field.LeadAuditor" class="mb-1" readonly />
              <span class="text-danger" v-if="allErrors.LeadAuditor">{{ allErrors.LeadAuditor[0] }}</span>
            </b-form-group>

            <b-form-group class="col-md-4">
              <label class="form-label">Auditor</label>
              <b-input name="Auditor" :state="allErrors.Auditor?false:null" v-model="field.Auditor" class="mb-1" readonly />
              <span class="text-danger" v-if="allErrors.Organizer">{{ allErrors.Organizer[0] }}</span>
            </b-form-group>

            <b-form-group class="col-md-4">
              <label class="form-label">Auditee</label>
              <b-input name="Auditee" :state="allErrors.Auditee?false:null" v-model="field.Auditee" class="mb-1" readonly />
              <span class="text-danger" v-if="allErrors.Organizer">{{ allErrors.Organizer[0] }}</span>
            </b-form-group>
        </b-form-row>

        <b-card class="mb-4">
          <template v-slot:header>
            <h4>Standart Audit</h4>
          </template>
          <b-form-row v-for="(item, index) in field.AuditClause" :key="index">
              <b-form-group class="col-md-6">
                <label v-if="index == 0">Standart </label>
                <b-input name="StandartAudit" :state="allErrors.StandartAudit?false:null" v-model="item.StandartAudit" class="mb-1" readonly />
                <span class="text-danger" v-if="allErrors.StandartAudit">{{ allErrors.StandartAudit[0] }}</span>
              </b-form-group>

              <b-form-group class="col-md-6">
                <label v-if="index == 0">Clause</label>
                <b-input name="Clause" :state="allErrors.Clause?false:null" v-model="item.Clause" class="mb-1" readonly />
                <span class="text-danger" v-if="allErrors.Clause">{{ allErrors.Clause[0] }}</span>
              </b-form-group>
          </b-form-row>
        </b-card>

        <b-form-row>
            <b-form-group class="col-md-3">
              <label class="form-label">Observer</label>
              <b-input name="Observer" :state="allErrors.Observer?false:null" v-model="field.Observer" class="mb-1" readonly />
              <span class="text-danger" v-if="allErrors.Organizer">{{ allErrors.Organizer[0] }}</span>
            </b-form-group>
            <b-form-group class="col-md-6">
                <label>Kriteria Temuan</label>
                <label class="form-label float-right text-danger">*Wajib Diisi</label>
                <multiselect
                        v-model="field.CriteriaFound"
                        :options="opsClauseAudit"
                        :allow-empty="true"
                        :show-labels="false"
                        :multiple="true"
                        placeholder="Pilih Kriteria Temuan"
                        label="Requirements"
                        track-by="Requirements" />
                <span class="text-danger" v-if="allErrors.CriteriaFound">{{ allErrors.CriteriaFound[0] }}</span>
            </b-form-group>
            <b-form-group class="col-md-3">
              <label class="form-label">Type of Non Conformity</label>
              <label class="form-label float-right text-danger">*Wajib Diisi</label>
              <multiselect
                v-model="field.TypeNonConformity"
                :options="opsType"
                :allow-empty="false"
                :show-labels="false"
                :preselect-first="true"
                placeholder="Pilih Type Non Conformity"
                label="text"
                track-by="text" />
              <span class="text-danger" v-if="allErrors.TypeNonConformity">{{ allErrors.TypeNonConformity[0] }}</span>
            </b-form-group>

        </b-form-row>

        <b-form-row>
            <b-form-group class="col-md-6">
                <label class="form-label">Potential Non Comformity</label>
                <b-form-textarea
                name="PotentialNonConformitiy"
                v-model="field.PotentialNonConformitiy"
                rows="3"
                no-resize>
                </b-form-textarea>
            </b-form-group>
            <b-form-group class="col-md-6">
                <label>Attachment</label>
                <file-pond
                name="File"
                ref="pondMyFile"
                label-idle="Klik Untuk Menambahkan Attachment"
                :allow-multiple="true"
                @updatefiles="handleFile"
                @removefile="handleRemove"
                :files="field.File"
                required/>
                <b-btn type="button" variant="secondary" @click="priviewFile()" class="float-right" v-if="textBtnSubmit == 'Update'">Preview File</b-btn>
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


    </b-card>

  </div>
</template>

<script>

import moment from 'moment'
import MaskedInput from 'vue-text-mask'


export default {
  name: 'form-auditor-report',
  metaInfo: {
    title: 'Form Auditor Report'
  },
  components: {
    MaskedInput
  },
  data () {
    return {
      urlSubmit: '/AdminVue/auditor-report-insert',
      headerCard: 'Form / Create Data Auditor Report',
      textBtnSubmit: 'Create',
      field: {
      //   myFile : ''
      File:'',
      Auditor:'',
      Auditee:'',
      Observer:'',
      LeadAuditor:'',
      AuditClause:[{StandartAudit:'',Clause:''}],
      },
      allErrors: [],
      opsClauseAudit:[],
      opsIdAudit:[],
      oldFileAttachment:[],
      clauseSelect:[],
      opsType:[{'value':'Critical','text':'Critical'},{'value':'Major','text':'Major'},{'value':'Minor','text':'Minor'},{'value':'Observasi','text':'Observasi'}],
      formatDate:'dd/MM/yyyy',
      disabledDate:{},
      timeMask: [/\d/, /\d/,':',/\d/, /\d/],
      isNotif: false,
      isFormEdit: false,
      alertNotif: '',
      alertVariant: 'alert-dark-danger'
    }
  },
  methods: {
    submitForm () {
      const formData = new FormData()
      formData.append("Id", this.field.Id)
      formData.append("NoTrans", this.field.IdAuditPlan.NoTrans)
      formData.append("IdAuditSelection", this.field.IdAuditPlan.Id)
      // formData.append("CriteriaFound", this.field.CriteriaFound.Id)
      formData.append("IdAuditPlane", this.field.IdAuditPlan.IdAuditPlane)
      formData.append("IdDepartmentAuditee", this.field.IdAuditPlan.IdDepartmentAuditee)
      formData.append("IdPositionAuditee", this.field.IdPositionAuditee)
      formData.append("OrganizerAudit", this.field.IdAuditPlan.OrganizerAudit)
      formData.append("AuditorDate", moment(this.field.AuditorDate).format('MM/DD/YYYY'))
      formData.append("PotentialNonConformitiy", this.field.PotentialNonConformitiy)
      formData.append("TypeNonConformity", this.field.TypeNonConformity.value)
      formData.append("HeadAuditee", this.field.HeadAuditee)
      formData.append("HeadAuditeePosition", this.field.HeadAuditeePosition)
      formData.append("IdLeadAuditor", this.field.IdLeadAuditor)
      formData.append("CriteriaFound", JSON.stringify(this.field.CriteriaFound))
      for( var i = 0; i < this.field.File.length; i++ ){
        let file = this.field.File[i];
        formData.append('FileAttachment[' + i + ']', file);
      }
      formData.append("OldFileAttachment", JSON.stringify(this.oldFileAttachment))

      const config = {
          headers: { 'content-type': 'multipart/form-data' }
      }

      axios.post(this.urlSubmit, formData, config)
      .then( function (res) {
        var resp = res.data

        if(resp.status){

          this.$router.push({
            name: 'audit/data-auditor-report',
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
      axios.post('/AdminVue/auditor-report-edit', {
        Id:Id,
      })
      .then( function (res) {
        var resp = res.data
        this.field = resp.data
        this.field.File = []
        if(this.field.Path != ''){
          let countPath = this.field.Path.length
          for (let i = 0; i < countPath; i++) {
            this.oldFileAttachment.push(this.field.Path[i])
            this.field.File.push(process.env.BASE_URL + this.field.Path[i])
          }
        }else{
          this.oldFileAttachment = ''
        }
        let Year = moment(this.field.OpeningMeeting).format('YYYY')
        let Month = moment(this.field.OpeningMeeting).format('MM') - 1
        let Day = moment(this.field.OpeningMeeting).format('DD')
        this.disabledDate = {to: new Date(Year,Month,Day)}
        this.getAuditDetail(this.field.IdAuditSelection)
      }.bind(this))
      .catch( function (e) {
        console.log(e)
        this.isNotif = true
        this.alertNotif = 'Invalid Server Side!'
        this.alertVariant = 'alert-dark-danger'
      }.bind(this))
    },

    getSelect(){
      axios.post('/AdminVue/auditor-report-getSelect')
      .then( function (res) {
        this.opsIdAudit = res.data.IdAudit
      }.bind(this))
      .catch( function (e) {
        console.log(e)
        this.opsIdAudit = []
      }.bind(this))
    },

    convertSelectBox ({ NoTrans, DepartmentAuditee }) {
        return `${NoTrans} - ${DepartmentAuditee}`
    },

    getAuditDetailSelect(option){
      let Year = moment(option.OpeningMeeting).format('YYYY')
      let Month = moment(option.OpeningMeeting).format('MM') - 1
      let Day = moment(option.OpeningMeeting).format('DD')
      this.disabledDate = {to: new Date(Year,Month,Day)}
      this.getAuditDetail(option.Id)
    },

    getAuditDetail(Id){
      axios.post('/AdminVue/auditor-report-getAuditDetail',{
        IdAuditSelection:Id
      })
      .then( function (res) {
        this.field.LeadAuditor = res.data.LeadAuditor
        this.field.Auditor = res.data.Auditor
        this.field.Auditee = res.data.Auditee
        this.field.Observer = res.data.Observer
        this.field.HeadAuditee = res.data.HeadAuditee
        this.field.HeadAuditeePosition = res.data.HeadAuditeePosition
        this.field.AuditClause = res.data.AuditClause
        this.field.IdPositionAuditee = res.data.IdPositionAuditee
        this.field.IdLeadAuditor = res.data.IdLeadAuditor
        for(let index = 0; index < this.field.AuditClause.length; index++){
          let Clause = JSON.parse(this.field.AuditClause[index].IdClauseAudit)
          for (let i = 0; i < Clause.length; i++){
            this.clauseSelect.push(Clause[i].Id)
          }
        }
        this.getFoundCriteria(this.clauseSelect)
      }.bind(this))
      .catch( function (e) {
        console.log(e)
      }.bind(this))
    },

    getFoundCriteria(arrayClause){
      axios.post('/AdminVue/auditor-report-getFoundCriteria',{
        ClauseArr:arrayClause
      })
      .then( function (res) {
        this.opsClauseAudit = res.data.Clause
      }.bind(this))
      .catch( function (e) {
        console.log(e)
        this.opsClauseAudit = []
      }.bind(this))
    },

    backIndex() {
      this.$router.push('/RoleAdmin/audit/data-auditor-report')
    },

    priviewFile(){
      if(this.oldFileAttachment != ''){
        for( var i = 0; i < this.oldFileAttachment.length; i++ ){
          let file = process.env.BASE_URL + this.oldFileAttachment[i];
          window.open(file, '_blank');
        }
      }
    },

    handleFile: function(files) {
        // console.log('FilePond Updated')
        // example of instance method call on pond reference
        this.field.File = files.map(files => files.file)
        // console.log( this.field.myFile )
    },

    handleRemove: function(error,files){
      if(this.isFormEdit == true){
        let index = this.oldFileAttachment.indexOf(files.source.replace('/clouds','clouds'))
        this.oldFileAttachment.splice(index,1)
      }
    },
      getClauseDetail(option){
          // this.clauseSelect.push(option.Id)
          // this.getAuditorDepartment(this.field.AuditeeDepartment.IdDepartmentAuditee,this.clauseSelect,false)
      },

      removeClauseDetail(option){
          // let index = this.clauseSelect.indexOf(option.Id)
          // this.clauseSelect.splice(index,1)
          // this.getAuditorDepartment(this.field.AuditeeDepartment.IdDepartmentAuditee,this.clauseSelect,false)
      },

  },

  mounted(){

    if(this.$route.params.isFormEdit){
      var Id = this.$route.params.Id
      if(Id){
        this.getData(Id)
        this.field.Id = Id
        this.isFormEdit = true
        this.urlSubmit = '/AdminVue/auditor-report-update'
        this.headerCard = 'Form / Edit Data Auditor Report'
        this.textBtnSubmit = 'Update'
      }

    }
    this.getSelect()
  },

}
</script>
