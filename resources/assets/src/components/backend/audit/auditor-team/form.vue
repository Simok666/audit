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
              <label class="form-label">ID Audit Plan</label>
              <label class="form-label float-right text-danger">*Wajib Diisi</label>
              <multiselect
                v-model="field.IdAuditPlan"
                :options="opsIdAudit"
                :allow-empty="false"
                :show-labels="false"
                @select="getAuditDetail"
                placeholder="Pilih ID Audit Plan"
                label="NoTrans"
                track-by="NoTrans" />
              <span class="text-danger" v-if="allErrors.Organizer">{{ allErrors.Organizer[0] }}</span>
            </b-form-group>

            <b-form-group class="col-md-4">
              <label class="form-label">Approval</label>
              <label class="form-label float-right text-danger">*Wajib Diisi</label>
              <multiselect
                v-model="field.Approved"
                :options="opsEmployee"
                :allow-empty="false"
                :show-labels="false"
                :multiple="true"
                placeholder="Pilih Approval Employee"
                label="Name"
                track-by="Name" />
              <span class="text-danger" v-if="allErrors.Approved">{{ allErrors.Approved[0] }}</span>
            </b-form-group>

            <b-form-group class="col-md-4">
                <label class="form-label">Purpose</label>
                <label class="form-label float-right text-danger">*Wajib Diisi</label>
                <b-form-textarea
                name="Purpose"
                v-model="field.Purpose"
                rows="3"
                no-resize readonly>
                </b-form-textarea>
            </b-form-group>
        </b-form-row>

        <b-form-row>
            <b-form-group class="col-md-4">
                <label class="form-label">Audit Date</label>
                <label class="form-label float-right text-danger">*Wajib Diisi</label>
                <datepicker
                v-model="field.AuditDate"
                :format="formatDate"
                :state="allErrors.AuditDate?false:null"
                :bootstrapStyling="true"
                :disabled-dates="disabledDate"
                class="mb-1" required/>
            </b-form-group>

            <b-form-group class="col-md-4">
                <label class="form-label">Hour Start</label>
                <label class="form-label float-right text-danger">*Wajib Diisi</label>
                <masked-input type="text" class="form-control mb-1"
                    v-model="field.HourStart"
                    :state="allErrors.HourStart?false:null"
                    :mask="timeMask"/>
                <span class="text-danger" v-if="allErrors.HourStart">{{ allErrors.HourStart[0] }}</span>
            </b-form-group>

            <b-form-group class="col-md-4">
                <label class="form-label">Hour End</label>
                <label class="form-label float-right text-danger">*Wajib Diisi</label>
                <masked-input type="text" class="form-control mb-1"
                    v-model="field.HourDone"
                    :state="allErrors.HourDone?false:null"
                    :mask="timeMask"/>
                <span class="text-danger" v-if="allErrors.HourDone">{{ allErrors.HourDone[0] }}</span>
            </b-form-group>

        </b-form-row>

        <b-form-row>
            <b-form-group class="col-md-6">
              <label class="form-label">Auditee Departement</label>
              <label class="form-label float-right text-danger">*Wajib Diisi</label>
              <multiselect
                v-model="field.AuditeeDepartment"
                :options="opsAuditeeDepartment"
                :allow-empty="false"
                @select="getDepartmentAuditeeDetail"
                :show-labels="false"
                placeholder="Pilih Auditee Departement"
                label="Department"
                track-by="Department" />
              <span class="text-danger" v-if="allErrors.AuditeeDepartment">{{ allErrors.AuditeeDepartment[0] }}</span>
            </b-form-group>

            <b-form-group class="col-md-6">
              <label class="form-label">Auditee</label>
              <label class="form-label float-right text-danger">*Wajib Diisi</label>
              <multiselect
                v-model="field.Auditee"
                :options="opsAuditee"
                :allow-empty="false"
                :show-labels="false"
                :multiple="true"
                @select="getAuditeeDetail"
                @remove="removeAuditeeDetail"
                placeholder="Pilih Auditee"
                label="Employee"
                track-by="Employee" />
              <span class="text-danger" v-if="allErrors.Auditee">{{ allErrors.Auditee[0] }}</span>
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
                <label class="form-label float-right text-danger">*Wajib Diisi</label>
                <multiselect
                  v-model="item.ClauseAudit"
                  :options="item.opsClauseAudit"
                  :allow-empty="false"
                  :show-labels="false"
                  :multiple="true"
                  @select="getClauseDetail"
                  @remove="removeClauseDetail"
                  placeholder="Pilih Clause"
                  label="Clause"
                  track-by="Clause" />
                <span class="text-danger" v-if="allErrors.Organizer">{{ allErrors.Organizer[0] }}</span>
              </b-form-group>
          </b-form-row>
        </b-card>

        <b-form-row>
            <b-form-group class="col-md-4">
              <label class="form-label">Lead Auditor</label>
              <label class="form-label float-right text-danger">*Wajib Diisi</label>
              <multiselect
                v-model="field.LeadAuditor"
                :options="opsLeadAuditor"
                :allow-empty="true"
                :show-labels="false"
                @select="getAuditorDetail"
                @remove="removeAuditorDetail"
                placeholder="Pilih Lead Auditor"
                label="Employee"
                track-by="Employee" />
              <span class="text-danger" v-if="allErrors.LeadAuditor">{{ allErrors.LeadAuditor[0] }}</span>
            </b-form-group>

            <b-form-group class="col-md-4">
              <label class="form-label">Auditor</label>
              <label class="form-label float-right text-danger">*Wajib Diisi</label>
              <multiselect
                v-model="field.Auditor"
                :options="opsAuditor"
                :allow-empty="false"
                :show-labels="false"
                :multiple="true"
                @select="getAuditorDetail"
                @remove="removeAuditorDetail"
                placeholder="Pilih Auditor"
                label="Employee"
                track-by="Employee" />
              <span class="text-danger" v-if="allErrors.Auditor">{{ allErrors.Auditor[0] }}</span>
            </b-form-group>

            <b-form-group class="col-md-4">
              <label class="form-label">Observer</label>
              <label class="form-label float-right text-danger">*Wajib Diisi</label>
              <multiselect
                v-model="field.Observer"
                :options="opsObserver"
                :allow-empty="true"
                :show-labels="false"
                :multiple="true"
                @select="getObserverDetail"
                @remove="removeObserverDetail"
                placeholder="Pilih Observer"
                label="Employee"
                track-by="Employee" />
              <span class="text-danger" v-if="allErrors.Observer">{{ allErrors.Observer[0] }}</span>
            </b-form-group>
        </b-form-row>

        <b-form-row>
            <b-form-group class="col-md-12">
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
  name: 'form-auditor-team',
  metaInfo: {
    title: 'Form Auditor Team'
  },
  components: {
    MaskedInput
  },
  data () {
    return {
      urlSubmit: '/AdminVue/auditor-team-insert',
      headerCard: 'Form / Create Data Auditor Team',
      textBtnSubmit: 'Create',
      field: {
      //   myFile : ''
      File:'',
      AuditClause:[{IdStandartAudit:'',StandartAudit:'',ClauseAudit:'',opsClauseAudit:[]}],
      AuditeeDepartment:'',
      Purpose:'',
      Auditee:'',
      Auditor:'',
      LeadAuditor:'',
      Observer:''
      },
      allErrors: [],
      opsIdAudit:[],
      opsAuditeeDepartment:[],
      opsAuditee:[],
      opsAuditor:[],
      opsLeadAuditor:[],
      opsObserver:[],
      clauseSelect:[],
      auditeeSelect:[],
      standartAuditSelect:[],
      opsEmployee:[],
      departmentAuditorSelect:[],
      departmentObserverSelect:[],
      oldFileAttachment:[],
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
      formData.append("IdAuditPlane", this.field.IdAuditPlan.Id)
      formData.append("NoTrans", this.field.IdAuditPlan.NoTrans)
      formData.append("Approved", JSON.stringify(this.field.Approved))
      formData.append("IdDepartmentAuditee", this.field.AuditeeDepartment.IdDepartmentAuditee)
      formData.append("IdPositionAuditee", this.field.AuditeeDepartment.IdPositionAuditee)
      formData.append("AuditDate", moment(this.field.AuditDate).format('MM/DD/YYYY'))
      formData.append("HourStart", this.field.HourStart)
      formData.append("HourDone", this.field.HourDone)
      formData.append("AuditClause", JSON.stringify(this.field.AuditClause))
      formData.append("Auditee", JSON.stringify(this.field.Auditee))
      formData.append("IdAuditorDepartment", JSON.stringify(this.departmentAuditorSelect))
      formData.append("Auditor", JSON.stringify(this.field.Auditor))
      formData.append("LeadAuditor",this.field.LeadAuditor.Id)
      formData.append("Observer", JSON.stringify(this.field.Observer))
      formData.append("IdDepartmentObserver", JSON.stringify(this.departmentObserverSelect))
      formData.append("Email",this.field.AuditeeDepartment.Email)
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
            name: 'audit/data-auditor-team',
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
      axios.post('/AdminVue/auditor-team-edit', {
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
          this.oldFileAttachment = '';
        }
        this.departmentAuditorSelect = this.field.IdAuditorDepartment
        this.departmentObserverSelect = this.field.IdDepartmentObserver
        this.clauseSelect = this.field.ClauseSelect
        this.standartAuditSelect = this.field.StandartAuditSelect
        this.auditeeSelect = this.field.AuditeeSelect
        let Year = moment(this.field.OpeningMeeting).format('YYYY')
        let Month = moment(this.field.OpeningMeeting).format('MM') - 1
        let Day = moment(this.field.OpeningMeeting).format('DD')
        this.disabledDate = {to: new Date(Year,Month,Day)}
        this.getAuditeeDepartment(this.field.IdAuditPlane,true)
        this.getAuditee(this.field.IdDepartmentAuditee,true)
        this.getAuditorDepartment(this.field.AuditeeDepartment.IdDepartmentAuditee,this.auditeeSelect,true)
        this.getObserverDepartment(this.field.AuditeeDepartment.IdDepartmentAuditee,this.departmentAuditorSelect,this.auditeeSelect,true)
      }.bind(this))
      .catch( function (e) {
        console.log(e)
        this.isNotif = true
        this.alertNotif = 'Invalid Server Side!'
        this.alertVariant = 'alert-dark-danger'
      }.bind(this))
    },

    backIndex() {
      this.$router.push('/RoleAdmin/audit/data-auditor-team')
    },

    getSelect(){
      axios.post('/AdminVue/auditor-team-getSelect')
      .then( function (res) {
        this.opsIdAudit = res.data.IdAudit
        this.opsEmployee = res.data.employee
      }.bind(this))
      .catch( function (e) {
        console.log(e)
        this.opsIdAudit = []
        this.opsEmployee = []
      }.bind(this))
    },

    getAuditeeDepartment(IdAuditPlan,statusEdit){
      axios.post('/AdminVue/auditor-team-getAuditeeDepartment',{
        IdAuditPlan:IdAuditPlan,
        IdDepartmentAuditee:this.field.IdDepartmentAuditee,
        Status:statusEdit
      })
      .then( function (res) {
        this.opsAuditeeDepartment = res.data.AuditeeDepartment
        if(statusEdit == false){
          this.field.AuditeeDepartment = ''
          this.field.Auditee = ''
          this.field.LeadAuditor = ''
          this.field.Auditor = ''
          this.field.Observer = ''
          this.opsAuditee = []
          this.opsAuditor = []
          this.opsLeadAuditor = []
          this.opsObserver = []
          this.field.AuditClause = res.data.AuditClause
          this.standartAuditSelect = res.data.StandartAudit
        }
      }.bind(this))
      .catch( function (e) {
        console.log(e)
        this.opsAuditeeDepartment = []
      }.bind(this))
    },

    getAuditorDepartment(IdAuditeeDepartment,AuditeeSelect,statusEdit){
      axios.post('/AdminVue/auditor-team-getAuditorDepartment',{
        IdAuditeeDepartment:IdAuditeeDepartment,
        StandartAudit:this.standartAuditSelect,
        AuditeeSelect:AuditeeSelect
      })
      .then( function (res) {
        this.opsAuditor = res.data.Auditor
        this.opsLeadAuditor = res.data.Auditor
        if(statusEdit == false){
          this.field.LeadAuditor = ''
          this.field.Auditor = ''
          this.field.Observer = ''
        }
      }.bind(this))
      .catch( function (e) {
        console.log(e)
        this.opsAuditor = []
        this.opsLeadAuditor = []
      }.bind(this))
    },

    getAuditee(IdAuditeeDepartment,statusEdit){
      axios.post('/AdminVue/auditor-team-getAuditee',{
        IdAuditeeDepartment:IdAuditeeDepartment,
        StandartAudit:this.standartAuditSelect
      })
      .then( function (res) {
        this.opsAuditee = res.data.Auditee
        // this.opsAuditor = res.data.Auditor
        // this.opsLeadAuditor = res.data.Auditor
        if(statusEdit == false){
          this.field.Auditee = ''
          this.field.LeadAuditor = ''
          this.field.Auditor = ''
          this.field.Observer = ''
          this.opsObserver = []
        }
      }.bind(this))
      .catch( function (e) {
        console.log(e)
        this.opsAuditee = []
      }.bind(this))
    },

    getObserverDepartment(IdAuditeeDepartment,AuditorDepartment,AuditeeSelect,statusEdit){
      axios.post('/AdminVue/auditor-team-getObserver',{
        IdAuditeeDepartment:IdAuditeeDepartment,
        AuditorDepartment:AuditorDepartment,
        AuditeeSelect:AuditeeSelect
      })
      .then( function (res) {
        this.opsObserver = res.data.Observer
        if(statusEdit == false){
          this.field.Observer = ''
        }
      }.bind(this))
      .catch( function (e) {
        console.log(e)
        this.opsObserver = []
      }.bind(this))
    },

    getAuditDetail(option){
      this.field.Purpose = option.Purpose
      let Year = moment(option.OpeningMeeting).format('YYYY')
      let Month = moment(option.OpeningMeeting).format('MM') - 1
      let Day = moment(option.OpeningMeeting).format('DD')
      this.disabledDate = {to: new Date(Year,Month,Day)}
      this.getAuditeeDepartment(option.Id,false)
    },

    getDepartmentAuditeeDetail(option){
      this.getAuditee(option.IdDepartmentAuditee,false)
      // if(this.clauseSelect.length > 0){
      //   this.getAuditorDepartment(option.IdDepartmentAuditee,this.clauseSelect,false)
      // }
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

    getAuditeeDetail(option){
      this.auditeeSelect.push(option.Id)
      this.getAuditorDepartment(this.field.AuditeeDepartment.IdDepartmentAuditee,this.auditeeSelect,false)
      this.getObserverDepartment(this.field.AuditeeDepartment.IdDepartmentAuditee,this.departmentAuditorSelect,this.auditeeSelect,false)
    },

    removeAuditeeDetail(option){
      let index = this.auditeeSelect.indexOf(option.Id);
      this.auditeeSelect.splice(index,1);
      this.getAuditorDepartment(this.field.AuditeeDepartment.IdDepartmentAuditee,this.auditeeSelect,false)
      this.getObserverDepartment(this.field.AuditeeDepartment.IdDepartmentAuditee,this.departmentAuditorSelect,this.auditeeSelect,false)
    },

    getAuditorDetail(option){
      this.departmentAuditorSelect.push(option.IdDepartment)
      this.getObserverDepartment(this.field.AuditeeDepartment.IdDepartmentAuditee,this.departmentAuditorSelect,this.auditeeSelect,false)
    },

    removeAuditorDetail(option){
      let index = this.departmentAuditorSelect.indexOf(option.IdDepartment)
      this.departmentAuditorSelect.splice(index,1)
      this.getObserverDepartment(this.field.AuditeeDepartment.IdDepartmentAuditee,this.departmentAuditorSelect,this.auditeeSelect,false)
    },

    getObserverDetail(option){
      this.departmentObserverSelect.push(option.IdDepartment)
    },

    removeObserverDetail(option){
    console.log('Remove Observer');
      let index = this.departmentObserverSelect.indexOf(option.IdDepartment);
      this.departmentObserverSelect.splice(index,1)
    },

    handleFile: function(files) {
        // console.log('FilePond Updated')
        // example of instance method call on pond reference
        this.field.File = files.map(files => files.file)
        // console.log( this.field.myFile )
    },

    priviewFile(){
      if(this.oldFileAttachment != ''){
        for( var i = 0; i < this.oldFileAttachment.length; i++ ){
          let file = process.env.BASE_URL + this.oldFileAttachment[i];
          window.open(file, '_blank');
        }
      }
    },

    handleRemove: function(error,files){
      if(this.isFormEdit == true){
        let index = this.oldFileAttachment.indexOf(files.source.replace('/clouds','clouds'))
        this.oldFileAttachment.splice(index,1)
      }
    }

  },

  mounted(){

    if(this.$route.params.isFormEdit){
      var Id = this.$route.params.Id
      if(Id){
        this.getData(Id)
        this.field.Id = Id
        this.isFormEdit = true
        this.urlSubmit = '/AdminVue/auditor-team-update'
        this.headerCard = 'Form / Edit Data Auditor Team'
        this.textBtnSubmit = 'Update'
      }

    }

    this.getSelect()
  },

}
</script>
