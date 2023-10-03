<style>


    #FileCorrective .filepond--panel-root {
        background-color: #ffffff;
        border: 1px solid #2c3340;
    }
    #FilePreventive .filepond--panel-root {
        background-color: #ffffff;
        border: 1px solid #2c3340;
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
        <div id="formAuditee">
        <b-form-row>
            <b-form-group class="col-md-4">
              <label class="form-label">Id Audit</label>
              <label class="form-label float-right text-danger">*Wajib Dipilih</label>
              <multiselect
                v-model="field.IdAuditPlan"
                :options="opsIdAudit"
                :allow-empty="false"
                :show-labels="false"
                @select="getAuditDetailSelect"
                :custom-label="convertSelectBox"
                placeholder="Pilih Id Audit Plan"
                label="Id"
                track-by="Id" required/>
              <span class="text-danger" v-if="allErrors.IdAuditPlan">{{ allErrors.IdAuditPlan[0] }}</span>
            </b-form-group>

            <b-form-group class="col-md-4">
                <label class="form-label">Audit Date</label>
                <datepicker
                v-model="field.AuditorDate"
                :format="formatDate"
                :state="allErrors.AuditorDate?false:null"
                :bootstrapStyling="true"
                class="mb-1" :disabled="true"/>
            </b-form-group>

            <b-form-group class="col-md-4">
                <label class="form-label">Ref.Number</label>
                <b-input name="RefNumber" :state="allErrors.RefNumber?false:null" v-model="field.RefNumber" class="mb-1" readonly />
                <span class="text-danger" v-if="allErrors.RefNumber">{{ allErrors.RefNumber[0] }}</span>
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
              <label class="form-label">Type of Non Conformity</label>
              <b-input name="TypeNonConformity" :state="allErrors.TypeNonConformity?false:null" v-model="field.TypeNonConformity" class="mb-1" readonly />
              <span class="text-danger" v-if="allErrors.TypeNonConformity">{{ allErrors.TypeNonConformity[0] }}</span>
            </b-form-group>

            <b-form-group class="col-md-6">
                <label class="form-label">Potential Non Comformity</label>
                <b-form-textarea
                name="PotentialNonConformitiy"
                v-model="field.PotentialNonConformitiy"
                rows="3"
                no-resize readonly>
                </b-form-textarea>
            </b-form-group>
        </b-form-row>

        <b-form-row>
            <b-form-group class="col-md-12">
                <label class="form-label">Attachment</label>
                <file-pond
                name="File"
                ref="pondMyFile"
                label-idle="Attachment"
                :allow-multiple="true"
                @addfile="handleFinish"
                @updatefiles="handleFile"
                :files="field.File"
                :disabled="true"/>
            </b-form-group>
        </b-form-row>

        <b-form-row>
            <b-form-group class="col-md-12">
                <label class="form-label">Kondisi Saat Ini</label>
                <b-form-textarea
                name="ConditionNow"
                v-model="field.ConditionNow"
                rows="3"
                no-resize readonly>
                </b-form-textarea>
            </b-form-group>

            <b-form-group class="col-md-12">
                <label class="form-label">Gap Analysis</label>
                <b-form-textarea
                name="GapAnalysis"
                v-model="field.GapAnalysis"
                rows="3"
                no-resize readonly>
                </b-form-textarea>
            </b-form-group>

            <b-form-group class="col-md-12">
                <label class="form-label">Potential Clause Non Comformity</label>
                <b-form-textarea
                name="PotentialCauseNonConformitiy"
                v-model="field.PotentialCauseNonConformitiy"
                rows="3"
                no-resize readonly>
                </b-form-textarea>
            </b-form-group>

        </b-form-row>

        <b-form-row>
            <b-form-group class="col-md-6">
                <label class="form-label">Corrective Action</label>
                <b-form-textarea
                name="CorrectiveAction"
                v-model="field.CorrectiveAction"
                rows="3"
                no-resize readonly>
                </b-form-textarea>
            </b-form-group>

            <b-form-group class="col-md-6">
                <label class="form-label">Execution Plan</label>
                <datepicker
                v-model="field.ExecutionPlaneCorrective"
                :format="formatDate"
                :state="allErrors.ExecutionPlaneCorrective?false:null"
                :bootstrapStyling="true"
                class="mb-1" :disabled="true"/>
            </b-form-group>
        </b-form-row>

        <b-form-row>
            <b-form-group class="col-md-12">
                <label class="form-label">Attachment</label>
                <label class="form-label float-right text-danger" v-if="IsAuditee === true">*Wajib Dipilih</label>
                <file-pond
                name="FileCorrective"
                ref="pondMyFile"
                label-idle="Attachment"
                :allow-multiple="true"
                id="FileCorrective"
                @updatefiles="handleFileCorrective"
                @removefile="handleRemoveCorrective"
                :files="field.FileCorrective" required
                />
                <b-btn type="button" variant="secondary" @click="priviewFileCorrective()" class="float-right" v-if="textBtnSubmit == 'Update'">Preview File</b-btn>
            </b-form-group>
        </b-form-row>

        <b-form-row>
            <b-form-group class="col-md-6">
                <label class="form-label">Preventive Action</label>
                <b-form-textarea
                name="PreventiveAction"
                v-model="field.PreventiveAction"
                rows="3"
                no-resize readonly>
                </b-form-textarea>
            </b-form-group>

            <b-form-group class="col-md-6">
                <label class="form-label">Execution Plan</label>
                <datepicker
                v-model="field.ExecutionPreventiveAction"
                :format="formatDate"
                :state="allErrors.ExecutionPreventiveAction?false:null"
                :bootstrapStyling="true"
                class="mb-1" :disabled="true"/>
            </b-form-group>
        </b-form-row>

        <b-form-row>
            <b-form-group class="col-md-12">
                <label class="form-label">Attachment</label>
                <label class="form-label float-right text-danger" v-if="IsAuditee === true">*Wajib Dipilih</label>
                <file-pond
                name="FilePreventive"
                ref="pondMyFile"
                id="FilePreventive"
                label-idle="Attachment"
                :allow-multiple="true"
                @updatefiles="handleFilePreventive"
                @removefile="handleRemovePreventive"
                :files="field.FilePreventive"
                :disabled="false" required/>
                <b-btn type="button" variant="secondary" @click="priviewFilePreventive()" class="float-right" v-if="textBtnSubmit == 'Update'">Preview File</b-btn>
            </b-form-group>
        </b-form-row>
        </div>
        <div v-if="isAuditee === false">
          <b-form-row>
              <b-form-group class="col-md-4">
                  <label class="form-label">Verification Result CAPA</label>
                  <label class="form-label float-right text-danger">*Wajib Dipilih</label>
                  <multiselect
                      v-model="field.VerificationExecution"
                      :options="opsVerif"
                      :allow-empty="false"
                      :show-labels="false"
                      @select="getVerificationCapaSelect"
                      placeholder="Pilih Verification Result CAPA"
                      label="Name"
                      track-by="Name" />
                  <span class="text-danger" v-if="allErrors.Organizer">{{ allErrors.Organizer[0] }}</span>
              </b-form-group>

              <b-form-group class="col-md-4">
                  <label class="form-label">Re-Audit</label>
                  <multiselect
                    v-model="field.ReAudit"
                    :options="opsReaudit"
                    :allow-empty="false"
                    :show-labels="false"
                    @select="getReauditSelect"
                    placeholder="Pilih Reaudit"
                    label="text"
                    track-by="text"
                    :disabled="isDisabled"
                    :required="isRequired"/>
              </b-form-group>

              <b-form-group class="col-md-4">
                  <label class="form-label">Re-Audit Date</label>
                  <datepicker
                  v-model="field.ReAuditDate"
                  :format="formatDate"
                  :state="allErrors.ReAuditDate?false:null"
                  :bootstrapStyling="true"
                  class="mb-1"
                  :disabled="isDisabledAudit"
                  :required="isRequired" />
              </b-form-group>
          </b-form-row>

          <b-form-row>
              <b-form-group class="col-md-6">
                  <label class="form-label">Status Audit</label>
                  <!-- <multiselect
                      v-model="field.Status"
                      :options="opsStatus"
                      :allow-empty="false"
                      :show-labels="false"
                      placeholder="Pilih Status Audit"
                      label="text"
                      track-by="text"
                      :disabled="true" /> -->
                  <b-input name="Status" :state="allErrors.Status?false:null" v-model="field.Status" class="mb-1" readonly />
                  <span class="text-danger" v-if="allErrors.Status">{{ allErrors.Status[0] }}</span>
              </b-form-group>

              <b-form-group class="col-md-6">
                  <label class="form-label">Recommendation Execution</label>
                  <b-form-textarea
                  name="RecommendationExecution"
                  v-model="field.RecommendationExecution"
                  rows="3"
                  no-resize
                  :readonly="isReadonly"
                  :required="isRequired">
                  </b-form-textarea>
              </b-form-group>
          </b-form-row>
        </div>

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
  name: 'form-verification-capa-report',
  metaInfo: {
    title: 'Form Verification Capa Report'
  },
  components: {
    MaskedInput
  },
  data () {
    return {
      urlSubmit: '/AdminVue/verification-capa-report-insert',
      headerCard: 'Form / Create Data Verification Capa Report',
      textBtnSubmit: 'Create',
      field: {
      //   myFile : ''
      File:'',
      FileCorrective:'',
      FilePreventive:'',
      AuditClause:[{StandartAudit:'',Clause:''}],
      RefNumber:'',
      PotentialNonConformitiy:'',
      AuditorDate:'',
      GapAnalysis:'',
      PotentialCauseNonConformitiy:'',
      CorrectiveAction:'',
      ExecutionPlaneCorrective:'',
      PreventiveAction:'',
      ExecutionPreventiveAction:'',
      ReAudit:'',
      ReAuditDate:'',
      Status:'Open',
      RecommendationExecution:''
      },
      allErrors: [],
      opsIdAudit:[],
      opsType:[{'value':'Critical','text':'Critical'},{'value':'Major','text':'Major'},{'value':'Minor','text':'Minor'},{'value':'Observasi','text':'Observasi'}],
      opsStatus:[{'value':1,'text':'Open'},{'value':2,'text':'Close'}],
      opsReaudit:[{'value':1,'text':'Ya'},{'value':2,'text':'Tidak'}],
      // opsVerif:[{'value':'Tindakan telah dilaksanakan dengan baik','text':'Tindakan telah dilaksanakan dengan baik'},{'value':'Tindakan belum dilaksanakan secara efektif','text':'Tindakan belum dilaksanakan secara efektif'}],
      opsVerif:[],
      oldFileAttachmentCorrective:[],
      oldFileAttachmentPreventive:[],
      isReadonly:true,
      isDisabled:true,
      isDisabledAudit:true,
      isRequired:false,
      isAuditee:true,
      formatDate:'dd/MM/yyyy',
      timeMask: [/\d/, /\d/,':',/\d/, /\d/],
      isNotif: false,
      alertNotif: '',
      alertVariant: 'alert-dark-danger'
    }
  },
  methods: {
    submitForm () {
      const formData = new FormData()
      formData.append("Id", this.field.Id)
      formData.append("NoTrans", this.field.IdAuditPlan.NoTrans)
      formData.append("IdAuditCapaPlane", this.field.IdAuditPlan.Id)
      formData.append("IdAuditReport", this.field.IdAuditPlan.IdAuditReport)
      formData.append("IdAuditSelection", this.field.IdAuditPlan.IdAuditSelection)
      formData.append("IdAuditPlane", this.field.IdAuditPlan.IdAuditPlane)
      formData.append("IdDepartmentAuditee", this.field.IdAuditPlan.IdDepartmentAuditee)
      formData.append("IdPositionAuditee", this.field.IdPositionAuditee)
      formData.append("OrganizerAudit", this.field.IdAuditPlan.OrganizerAudit)
      formData.append("AuditorDate", moment(this.field.AuditorDate).format('MM/DD/YYYY'))
      formData.append("PotentialNonConformitiy", this.field.PotentialNonConformitiy)
      formData.append("TypeNonConformity", this.field.TypeNonConformity)
      formData.append("HeadAuditee", this.field.HeadAuditee)
      formData.append("HeadAuditeePosition", this.field.HeadAuditeePosition)
      formData.append("IdLeadAuditor", this.field.IdLeadAuditor)
      if(this.isAuditee == false){
        formData.append("IdVerificationExecution", this.field.VerificationExecution.Id)
        formData.append("Status", this.field.Status)
        if(this.field.ReAudit != ''){
          formData.append("ReAudit", this.field.ReAudit.value)
          formData.append("ReAuditDate", moment(this.field.ReAuditDate).format('MM/DD/YYYY'))
        }else{
          formData.append("ReAudit", 2)
          formData.append("ReAuditDate", this.field.ReAuditDate)
        }
        formData.append("RecommendationExecution", this.field.RecommendationExecution)
      }

      for( var i = 0; i < this.field.FileCorrective.length; i++ ){
        let file = this.field.FileCorrective[i];
        formData.append('FileAttachmentCorrective[' + i + ']', file);
      }
      formData.append("OldFileAttachmentCorrective", JSON.stringify(this.oldFileAttachmentCorrective))
      for( var i = 0; i < this.field.FilePreventive.length; i++ ){
        let file = this.field.FilePreventive[i];
        formData.append('FileAttachmentPreventive[' + i + ']', file);
      }
      formData.append("OldFileAttachmentPreventive", JSON.stringify(this.oldFileAttachmentPreventive))

      const config = {
          headers: { 'content-type': 'multipart/form-data' }
      }

      axios.post(this.urlSubmit, formData, config)
      .then( function (res) {
        var resp = res.data

        if(resp.status){

          this.$router.push({
            name: 'audit/data-verification-capa-report',
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

    getData (Id,RevisiEdit) {
      axios.post('/AdminVue/verification-capa-report-edit', {
        Id:Id,
        RevisiEdit:RevisiEdit
      })
      .then( function (res) {
        var resp = res.data
        this.field = resp.data
        if(RevisiEdit == true){
          if(this.field.IdVerificationExecution == 1){
            this.isDisabled = true
            this.isReadonly = true
            this.isRequired = false
          }else{
            this.isDisabled = false
            this.isReadonly = false
            this.isRequired = true
            if(this.field.ReAudit.value == 1){
              this.isDisabledAudit = false
            }else{
              this.isDisabledAudit = true
            }
          }
        }
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

        this.getAuditDetail(this.field.IdAuditCapaPlane,this.field.IdAuditReport,this.field.IdAuditSelection)
      }.bind(this))
      .catch( function (e) {
        console.log(e)
        this.isNotif = true
        this.alertNotif = 'Invalid Server Side!'
        this.alertVariant = 'alert-dark-danger'
      }.bind(this))
    },

    getSelect(Auditee){
      axios.post('/AdminVue/verification-capa-report-getSelect',{
        Auditee:Auditee
      })
      .then( function (res) {
        this.opsIdAudit = res.data.IdAudit
        this.opsVerif = res.data.Verif
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
      this.getAuditDetail(option.Id,option.IdAuditReport,option.IdAuditSelection)
    },

    getAuditDetail(IdAuditCapaPlane,IdAuditReport,IdAuditSelection){
      axios.post('/AdminVue/verification-capa-report-getAuditDetail',{
        IdAuditSelection:IdAuditSelection,
        IdAuditReport:IdAuditReport,
        IdAuditCapaPlane:IdAuditCapaPlane
      })
      .then( function (res) {
        this.field.HeadAuditee = res.data.HeadAuditee
        this.field.HeadAuditeePosition = res.data.HeadAuditeePosition
        this.field.AuditClause = res.data.AuditClause
        this.field.IdPositionAuditee = res.data.IdPositionAuditee
        this.field.IdLeadAuditor = res.data.IdLeadAuditor
        let AuditReport = res.data.AuditReport
        let PlanCapaReport = res.data.PlanCapaReport
        this.field.RefNumber = AuditReport.RefNumber
        this.field.PotentialNonConformitiy = AuditReport.PotentialNonConformitiy
        this.field.TypeNonConformity = AuditReport.TypeNonConformity
        this.field.AuditorDate = AuditReport.AuditorDate
        this.field.GapAnalysis = PlanCapaReport.GapAnalysis
        this.field.ConditionNow = PlanCapaReport.ConditionNow
        this.field.PotentialCauseNonConformitiy = PlanCapaReport.PotentialCauseNonConformitiy
        this.field.CorrectiveAction = PlanCapaReport.CorrectiveAction
        this.field.ExecutionPlaneCorrective = PlanCapaReport.ExecutionPlaneCorrective
        this.field.PreventiveAction = PlanCapaReport.PreventiveAction
        this.field.ExecutionPreventiveAction = PlanCapaReport.ExecutionPreventiveAction
        this.field.File = []
        let countPath = AuditReport.Path.length
        for (let i = 0; i < countPath; i++) {
          this.field.File.push(process.env.BASE_URL + AuditReport.Path[i])
        }
        // this.field.FileCorrective = []
        // let countPathCorrective = PlanCapaReport.PathCorrective.length
        // for (let i = 0; i < countPathCorrective; i++) {
        //   this.field.FileCorrective.push(process.env.BASE_URL + PlanCapaReport.PathCorrective[i])
        // }
        // this.field.FilePreventive = []
        // let countPathPreventive = PlanCapaReport.PathPreventive.length
        // for (let i = 0; i < countPathPreventive; i++) {
        //   this.field.FilePreventive.push(process.env.BASE_URL + PlanCapaReport.PathPreventive[i])
        // }
      }.bind(this))
      .catch( function (e) {
        console.log(e)
      }.bind(this))
    },

    getVerificationCapaSelect(option){
      this.getVerificationCapa(option.Id)
    },

    getVerificationCapa(Id){
      if(Id == 1){
        this.isDisabled = true
        this.isReadonly = true
        this.isRequired = false
        this.field.ReAudit = ''
        this.field.ReAuditDate = ''
        this.field.RecommendationExecution = ''
        this.field.Status = 'Close'
      }else{
        this.isDisabled = false
        this.isReadonly = false
        this.isRequired = true
        this.field.ReAudit = ''
        this.field.ReAuditDate = ''
        this.field.RecommendationExecution = ''
        this.field.Status = 'Open'
      }
    },

    getReauditSelect(option){
      if(option.value == 1){
        this.isDisabledAudit = false
      }else{
        this.isDisabledAudit = true
      }
    },

    backIndex() {
      this.$router.push('/RoleAdmin/audit/data-verification-capa-report')
    },

    handleFile: function(files) {
        // console.log('FilePond Updated')
        // example of instance method call on pond reference
        this.field.File = files.map(files => files.file)
        // console.log( this.field.myFile )
    },

    priviewFileCorrective(){
      if(this.oldFileAttachmentCorrective != ''){
        for( var i = 0; i < this.oldFileAttachmentCorrective.length; i++ ){
          let file = process.env.BASE_URL + this.oldFileAttachmentCorrective[i];
          window.open(file, '_blank');
        }
      }
    },

    priviewFilePreventive(){
      if(this.oldFileAttachmentPreventive != ''){
        for( var i = 0; i < this.oldFileAttachmentPreventive.length; i++ ){
          let file = process.env.BASE_URL + this.oldFileAttachmentPreventive[i];
          window.open(file, '_blank');
        }
      }
    },

    handleFileCorrective: function(files){
      this.field.FileCorrective = files.map(files => files.file)
    },

    handleFilePreventive: function(files){
      this.field.FilePreventive = files.map(files => files.file)
    },

    handleFinish: function(error,file){
      if(this.textBtnSubmit == 'Update'){
        this.field.FileCorrective = []
        if(this.field.PathCorrective != ''){
          let countPath = this.field.PathCorrective.length
          for (let i = 0; i < countPath; i++) {
            this.oldFileAttachmentCorrective.push(this.field.PathCorrective[i])
            this.field.FileCorrective.push(process.env.BASE_URL + this.field.PathCorrective[i])
          }
        }else{
          this.oldFileAttachmentCorrective = ''
        }
        this.field.FilePreventive = []
        if(this.field.PathPreventive != ''){
          let countPath = this.field.PathPreventive.length
          for (let i = 0; i < countPath; i++) {
            this.oldFileAttachmentPreventive.push(this.field.PathPreventive[i])
            this.field.FilePreventive.push(process.env.BASE_URL + this.field.PathPreventive[i])
          }
        }else{
          this.oldFileAttachmentPreventive = ''
        }
      }
    },

    handleRemoveCorrective: function(error,files){
        if(this.textBtnSubmit == 'Update'){
          let index = this.oldFileAttachmentCorrective.indexOf(files.source.replace('/clouds','clouds'))
          this.oldFileAttachmentCorrective.splice(index,1)
        }
    },
    handleRemovePreventive: function(error,files){
        if(this.textBtnSubmit == 'Update'){          
          let index = this.oldFileAttachmentPreventive.indexOf(files.source.replace('/clouds','clouds'))
          this.oldFileAttachmentPreventive.splice(index,1)
        }
    }
  },

  mounted(){

    if(this.$route.params.isFormEdit){
      var Id = this.$route.params.Id
      if(Id){
        this.getData(Id,false)
        this.field.Id = Id
        this.urlSubmit = '/AdminVue/verification-capa-report-update'
        this.headerCard = 'Form / Edit Data Verification Capa Report'
        this.textBtnSubmit = 'Update'
      }

    }
    if(this.$route.params.isFormRevisi){
      this.getSelect(false)
      this.isAuditee = false
      document.getElementById("formAuditee").style.pointerEvents="none"
      var Id = this.$route.params.Id
      if(this.$route.params.isFormEditRevisi){
        if(Id){
          this.getData(Id,true)
          this.field.Id = Id
          this.urlSubmit = '/AdminVue/verification-capa-report-revisi-update'
          this.headerCard = 'Form / Revisi Data Verification Capa Report'
          this.textBtnSubmit = 'Update'
        }
      }else{
        if(Id){
          this.getData(Id,false)
          this.field.Id = Id
          this.urlSubmit = '/AdminVue/verification-capa-report-revisi'
          this.headerCard = 'Form / Revisi Data Verification Capa Report'
          this.textBtnSubmit = 'Update'
        }
      }
    }else{
      this.getSelect(true)
    }
  },

}
</script>
