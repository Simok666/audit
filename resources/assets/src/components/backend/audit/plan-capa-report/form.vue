<template>
  <div>

    <b-card :header="headerCard" header-tag="h4" class="mb-4">

      <div v-if="isNotif" class="alert alert-dismissible fade show" v-bind:class="[alertVariant]">
        <button type="button" class="close" data-dismiss="alert" v-on:click="isNotif = !isNotif">×</button>
        {{alertNotif}}
      </div>

      <form method="POST" @submit.prevent="submitForm()">
        <b-form-row>
            <b-form-group class="col-md-7">
              <label class="form-label">Id Audit</label>
              <label class="form-label float-right text-danger">*Wajib Dipilih</label>
              <multiselect
                v-model="field.IdAuditPlan"
                :options="opsIdAudit"
                :allow-empty="true"
                :show-labels="false"
                @select="getAuditDetailSelect"
                :custom-label="convertSelectBox"
                placeholder="Pilih Id Audit Plan"
                label="Id"
                track-by="Id"/>
              <span class="text-danger" v-if="allErrors.IdAuditPlan">{{ allErrors.IdAuditPlan[0] }}</span>
            </b-form-group>

            <b-form-group class="col-md-3">
                <label class="form-label">Ref.Number</label>
                <b-input name="RefNumber" :state="allErrors.RefNumber?false:null" v-model="field.RefNumber" class="mb-1" readonly />
                <span class="text-danger" v-if="allErrors.RefNumber">{{ allErrors.RefNumber[0] }}</span>
            </b-form-group>

            <b-form-group class="col-md-2">
              <label class="form-label">Type of Non Conformity</label>
              <b-input name="TypeNonConformity" :state="allErrors.TypeNonConformity?false:null" v-model="field.TypeNonConformity" class="mb-1" readonly />
              <span class="text-danger" v-if="allErrors.TypeNonConformity">{{ allErrors.TypeNonConformity[0] }}</span>
            </b-form-group>

        </b-form-row>

        <b-card class="mb-4">
          <template v-slot:header>
            <h4>Standar Audit</h4>
          </template>
          <b-form-row v-for="(item, index) in field.AuditClause" :key="index">
              <b-form-group class="col-md-6">
                <label v-if="index == 0">Standar </label>
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
            <b-form-group class="col-md-6">
                <label class="form-label">Potential Non Comformity</label>
                <b-form-textarea
                name="PotentialNonConformitiy"
                v-model="field.PotentialNonConformitiy"
                rows="3"
                no-resize readonly>
                </b-form-textarea>
            </b-form-group>
            <b-form-group class="col-md-6">
                <label>Attachment</label>
                <file-pond
                name="File"
                ref="pondMyFile"
                label-idle="Attachment"
                :allow-multiple="true"
                @updatefiles="handleFile"
                :files="field.File"
                :disabled="true"/>
            </b-form-group>
        </b-form-row>

        <b-form-row>
            <b-form-group class="col-md-12">
                <label class="form-label">Kondisi Saat Ini</label>
                <label class="form-label float-right text-danger">*Wajib Diisi</label>
                <b-form-textarea
                name="ConditionNow"
                v-model="field.ConditionNow"
                rows="3"
                no-resize required>
                </b-form-textarea>
            </b-form-group>

            <b-form-group class="col-md-12">
                <label class="form-label">Gap Analysis</label>
                <label class="form-label float-right text-danger">*Wajib Diisi</label>
                <b-form-textarea
                name="GapAnalysis"
                v-model="field.GapAnalysis"
                rows="3"
                no-resize required>
                </b-form-textarea>
            </b-form-group>

            <b-form-group class="col-md-12">
                <label class="form-label">Potential Clause Non Comformity</label>
                <label class="form-label float-right text-danger">*Wajib Diisi</label>
                <b-form-textarea
                name="PotentialCauseNonConformitiy"
                v-model="field.PotentialCauseNonConformitiy"
                rows="3"
                no-resize required>
                </b-form-textarea>
            </b-form-group>

        </b-form-row>

        <b-form-row>
            <b-form-group class="col-md-6">
                <label class="form-label">Corrective Action</label>
                <label class="form-label float-right text-danger">*Wajib Diisi</label>
                <b-form-textarea
                name="CorrectiveAction"
                v-model="field.CorrectiveAction"
                rows="3"
                no-resize required>
                </b-form-textarea>
            </b-form-group>

            <b-form-group class="col-md-6">
                <label class="form-label">Execution Plan</label>
                <label class="form-label float-right text-danger">*Wajib Diisi</label>
                <datepicker
                v-model="field.ExecutionPlaneCorrective"
                :format="formatDate"
                :state="allErrors.ExecutionPlaneCorrective?false:null"
                :bootstrapStyling="true"
                :disabled-dates="disabledDate"
                class="mb-1" required/>
            </b-form-group>
        </b-form-row>

        <!--<b-form-row>-->
            <!--<b-form-group class="col-md-12">-->
                <!--<label>Attachment</label>-->
                <!--<file-pond-->
                <!--name="FileCorrective"-->
                <!--ref="pondMyFile"-->
                <!--label-idle="Klik Untuk Menambahkan Attachment"-->
                <!--:allow-multiple="true"-->
                <!--@updatefiles="handleFileCorrective"-->
                <!--@removefile="handleRemoveCorrective"-->
                <!--:files="field.FileCorrective"/>-->
            <!--</b-form-group>-->
        <!--</b-form-row>-->

        <b-form-row>
            <b-form-group class="col-md-6">
                <label class="form-label">Preventive Action</label>
                <label class="form-label float-right text-danger">*Wajib Diisi</label>
                <b-form-textarea
                name="PreventiveAction"
                v-model="field.PreventiveAction"
                rows="3"
                no-resize required>
                </b-form-textarea>
            </b-form-group>

            <b-form-group class="col-md-6">
                <label class="form-label">Execution Plan</label>
                <label class="form-label float-right text-danger">*Wajib Diisi</label>
                <datepicker
                v-model="field.ExecutionPreventiveAction"
                :format="formatDate"
                :state="allErrors.ExecutionPreventiveAction?false:null"
                :bootstrapStyling="true"
                :disabled-dates="disabledDate"
                class="mb-1" required/>
            </b-form-group>
        </b-form-row>

        <!--<b-form-row>-->
            <!--<b-form-group class="col-md-12">-->
                <!--<label>Attachment</label>-->
                <!--<file-pond-->
                <!--name="FilePreventive"-->
                <!--ref="pondMyFile"-->
                <!--label-idle="Klik Untuk Menambahkan Attachment"-->
                <!--:allow-multiple="true"-->
                <!--@updatefiles="handleFilePreventive"-->
                <!--@removefile="handleRemovePreventive"-->
                <!--:files="field.FilePreventive"/>-->
            <!--</b-form-group>-->
        <!--</b-form-row>-->

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
  name: 'form-plan-capa-report',
  metaInfo: {
    title: 'Form Plan Capa Report'
  },
  components: {
    MaskedInput
  },
  data () {
    return {
      urlSubmit: '/AdminVue/plan-capa-report-insert',
      headerCard: 'Form / Create Data Plan Capa Report',
      textBtnSubmit: 'Create',
      field: {
      //   myFile : ''
      File:'',
      FileCorrective:'',
      FilePreventive:'',
      AuditClause:[{StandartAudit:'',Clause:''}],
      RefNumber:'',
      PotentialNonConformitiy:''
      },
      allErrors: [],
      opsIdAudit:[],
      oldFileAttachmentCorrective:[],
      oldFileAttachmentPreventive:[],
      opsType:[{'value':'Critical','text':'Critical'},{'value':'Major','text':'Major'},{'value':'Minor','text':'Minor'},{'value':'Observasi','text':'Observasi'}],
      disabledDate:{},
      formatDate:'dd/MM/yyyy',
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
      formData.append("IdAuditReport", this.field.IdAuditPlan.Id)
      formData.append("IdAuditSelection", this.field.IdAuditPlan.IdAuditSelection)
      formData.append("IdAuditPlane", this.field.IdAuditPlan.IdAuditPlane)
      formData.append("IdDepartmentAuditee", this.field.IdAuditPlan.IdDepartmentAuditee)
      formData.append("IdPositionAuditee", this.field.IdPositionAuditee)
      formData.append("OrganizerAudit", this.field.IdAuditPlan.OrganizerAudit)
      formData.append("AuditorDate", this.field.AuditorDate)
      formData.append("PotentialNonConformitiy", this.field.PotentialNonConformitiy)
      formData.append("TypeNonConformity", this.field.TypeNonConformity)
      formData.append("HeadAuditee", this.field.HeadAuditee)
      formData.append("HeadAuditeePosition", this.field.HeadAuditeePosition)
      formData.append("IdLeadAuditor", this.field.IdLeadAuditor)
      formData.append("ConditionNow", this.field.ConditionNow)
      formData.append("GapAnalysis", this.field.GapAnalysis)
      formData.append("PotentialCauseNonConformitiy", this.field.PotentialCauseNonConformitiy)
      formData.append("CorrectiveAction", this.field.CorrectiveAction)
      formData.append("ExecutionPlaneCorrective", moment(this.field.ExecutionPlaneCorrective).format('MM/DD/YYYY'))
      formData.append("PreventiveAction", this.field.PreventiveAction)
      formData.append("ExecutionPreventiveAction", moment(this.field.ExecutionPreventiveAction).format('MM/DD/YYYY'))

      // for( var i = 0; i < this.field.FileCorrective.length; i++ ){
      //   let file = this.field.FileCorrective[i];
      //   formData.append('FileAttachmentCorrective[' + i + ']', file);
      // }
      // formData.append("OldFileAttachmentCorrective", JSON.stringify(this.oldFileAttachmentCorrective))
      // for( var i = 0; i < this.field.FilePreventive.length; i++ ){
      //   let file = this.field.FilePreventive[i];
      //   formData.append('FileAttachmentPreventive[' + i + ']', file);
      // }
      // formData.append("OldFileAttachmentPreventive", JSON.stringify(this.oldFileAttachmentPreventive))

      const config = {
          headers: { 'content-type': 'multipart/form-data' }
      }

      axios.post(this.urlSubmit, formData, config)
      .then( function (res) {
        var resp = res.data

        if(resp.status){

          this.$router.push({
            name: 'audit/data-plan-capa-report',
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
      axios.post('/AdminVue/plan-capa-report-edit', {
        Id:Id,
      })
      .then( function (res) {
        var resp = res.data
        this.field = resp.data
        // this.field.FileCorrective = []
        // if(this.field.PathCorrective != ''){
        //   let countPath = this.field.PathCorrective.length
        //   for (let i = 0; i < countPath; i++) {
        //     this.oldFileAttachmentCorrective.push(this.field.PathCorrective[i])
        //     this.field.FileCorrective.push(process.env.BASE_URL + this.field.PathCorrective[i])
        //   }
        // }else{
        //   this.oldFileAttachmentCorrective = ''
        // }
        // this.field.FilePreventive = []
        // if(this.field.PathPreventive != ''){
        //   let countPath = this.field.PathPreventive.length
        //   for (let i = 0; i < countPath; i++) {
        //     this.oldFileAttachmentPreventive.push(this.field.PathPreventive[i])
        //     this.field.FilePreventive.push(process.env.BASE_URL + this.field.PathPreventive[i])
        //   }
        // }else{
        //   this.oldFileAttachmentPreventive = ''
        // }
        let Year = moment(resp.data.OpeningMeeting).format('YYYY')
        let Month = moment(resp.data.OpeningMeeting).format('MM') - 1
        let Day = moment(resp.data.OpeningMeeting).format('DD')
        this.disabledDate = {to: new Date(Year,Month,Day)}
        this.getAuditDetail(resp.data.IdAuditReport,resp.data.IdAuditSelection)
      }.bind(this))
      .catch( function (e) {
        console.log(e)
        this.isNotif = true
        this.alertNotif = 'Invalid Server Side!'
        this.alertVariant = 'alert-dark-danger'
      }.bind(this))
    },

    getSelect(){
      axios.post('/AdminVue/plan-capa-report-getSelect')
      .then( function (res) {
        this.opsIdAudit = res.data.IdAudit
      }.bind(this))
      .catch( function (e) {
        console.log(e)
        this.opsIdAudit = []
      }.bind(this))
    },

    convertSelectBox ({ NoTrans, DepartmentAuditee , RefNumber}) {
        return `${NoTrans} - ${DepartmentAuditee} NoReff. ${RefNumber}`
    },

    getAuditDetailSelect(option){
      let Year = moment(option.OpeningMeeting).format('YYYY')
      let Month = moment(option.OpeningMeeting).format('MM') - 1
      let Day = moment(option.OpeningMeeting).format('DD')
      this.disabledDate = {to: new Date(Year,Month,Day)}
      this.field.RefNumber = option.RefNumber
      this.getAuditDetail(option.Id,option.IdAuditSelection)
    },

    getAuditDetail(Id,IdAuditSelection){
      axios.post('/AdminVue/plan-capa-report-getAuditDetail',{
        IdAuditSelection:IdAuditSelection,
        IdAuditReport:Id
      })
      .then( function (res) {
        this.field.HeadAuditee = res.data.HeadAuditee
        this.field.HeadAuditeePosition = res.data.HeadAuditeePosition
        this.field.AuditClause = res.data.AuditClause
        this.field.IdPositionAuditee = res.data.IdPositionAuditee
        this.field.IdLeadAuditor = res.data.IdLeadAuditor
        let AuditReport = res.data.AuditReport
        this.field.PotentialNonConformitiy = AuditReport.PotentialNonConformitiy
        this.field.TypeNonConformity = AuditReport.TypeNonConformity
        this.field.AuditorDate = AuditReport.AuditorDate
        this.field.File = []
        let countPath = AuditReport.Path.length
        for (let i = 0; i < countPath; i++) {
          this.field.File.push(process.env.BASE_URL + AuditReport.Path[i])
        }
      }.bind(this))
      .catch( function (e) {
        console.log(e)
      }.bind(this))
    },

    backIndex() {
      this.$router.push('/RoleAdmin/audit/data-plan-capa-report')
    },

    handleFile: function(files) {
        // console.log('FilePond Updated')
        // example of instance method call on pond reference
        this.field.File = files.map(files => files.file)
        // console.log( this.field.myFile )
    },

    handleFileCorrective: function(files){
      this.field.FileCorrective = files.map(files => files.file)
    },

    handleFilePreventive: function(files){
      this.field.FilePreventive = files.map(files => files.file)
    },

    // handleRemoveCorrective: function(error,files){
    //   if(this.isFormEdit == true){
    //     let index = this.oldFileAttachmentCorrective.indexOf(files.source.replace('/clouds','clouds'))
    //     this.oldFileAttachmentCorrective.splice(index,1)
    //   }
    // },

    // handleRemovePreventive: function(error,files){
    //   if(this.isFormEdit == true){
    //     let index = this.oldFileAttachmentPreventive.indexOf(files.source.replace('/clouds','clouds'))
    //     this.oldFileAttachmentPreventive.splice(index,1)
    //   }
    // }

  },

  mounted(){

    if(this.$route.params.isFormEdit){
      var Id = this.$route.params.Id
      if(Id){
        this.getData(Id)
        this.field.Id = Id
        this.isFormEdit = true
        this.urlSubmit = '/AdminVue/plan-capa-report-update'
        this.headerCard = 'Form / Edit Data Plan Capa Report'
        this.textBtnSubmit = 'Update'
      }

    }
    this.getSelect()
  },

}
</script>
