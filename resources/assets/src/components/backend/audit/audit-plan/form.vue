<style>
    input:disabled {
        background-color:red;
    }

    input.disable-input {
        background-color: gray;
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
              <label class="form-label">Organizer Audit</label>
              <label class="form-label float-right text-danger">*Wajib Diisi</label>
              <multiselect
                v-model="field.Organizer"
                :options="opsOrganizer"
                :allow-empty="false"
                @select="getIdAudit"
                :show-labels="false"
                placeholder="Pilih Organizer"
                label="Name"
                track-by="Name" />
              <span class="text-danger" v-if="allErrors.Organizer">{{ allErrors.Organizer[0] }}</span>
            </b-form-group>

            <b-form-group class="col-md-4">
                <label class="form-label">Audit Periode</label>
                <label class="form-label float-right text-danger">*Wajib Diisi</label>
                <datepicker
                v-model="field.AuditPeriode"
                :format="formatDatedmy"
                :state="allErrors.AuditPeriode?false:null"
                :bootstrapStyling="true"
                :typeable="true"
                minimum-view="month"
                @selected="dateSelected()"
                class="mb-1" required/>
            </b-form-group>

            <b-form-group class="col-md-4">
                <label class="form-label">ID Audit</label>
                <b-input name="IdAudit" :state="allErrors.IdAudit?false:null" v-model="field.IdAudit" class="mb-1" readonly />
                <span class="text-danger" v-if="allErrors.IdAudit">{{ allErrors.IdAudit[0] }}</span>
            </b-form-group>
        </b-form-row>

        <b-form-row>
            <b-form-group class="col-md-3">
                <label class="form-label">Opening Meeting</label>
                <b-form-row>
                    <b-form-group class="col-md-8" >
                        <datepicker
                        v-model="field.OpeningMeeting"
                        :format="formatDatedmy"
                        :state="allErrors.OpeningMeeting?false:null"
                        :bootstrapStyling="true"
                        :typeable="true"
                        class="mb-1" 
                        style="background: #fff !important;"
                        required/>
                        <span class="text-danger" v-if="allErrors.DateOpen">{{ allErrors.DateOpen[0] }}</span>
                    </b-form-group>
                    <b-form-group class="col-md-4">
                        <masked-input type="text" class="form-control mb-1"
                            v-model="field.OpeningMeetingTime"
                            :placeholder="'00:00'"
                            :state="allErrors.OpeningMeetingTime?false:null"
                            :mask="timeMask"/>
                        <span class="text-danger" v-if="allErrors.OpeningMeetingTime">{{ allErrors.OpeningMeetingTime[0] }}</span>
                    </b-form-group>
                </b-form-row>
            </b-form-group>

            <b-form-group class="col-md-3">
                <label class="form-label">Audit Execution</label>
                <label class="form-label float-right text-danger">*Wajib Diisi</label>
                <datepicker
                    v-model="field.AuditExecutionStart"
                    :format="formatDatedmy"
                    :state="allErrors.AuditExecutionStart?false:null"
                    :bootstrapStyling="true"
                    :typeable="true"
                    class="mb-1" required/>
                    <span class="text-danger" v-if="allErrors.AuditExecutionStart">{{ allErrors.AuditExecutionStart[0] }}</span>
            </b-form-group>

            <b-form-group class="col-md-3">
                <label class="form-label">Audit Execution(Done)</label>
                <label class="form-label float-right text-danger">*Wajib Diisi</label>
                <datepicker
                    v-model="field.AuditExecutionDone"
                    :format="formatDatedmy"
                    :state="allErrors.AuditExecutionDone?false:null"
                    :bootstrapStyling="true"
                    :typeable="true"
                    class="mb-1" required/>
                    <span class="text-danger" v-if="allErrors.AuditExecutionDone">{{ allErrors.AuditExecutionDone[0] }}</span>
            </b-form-group>

            <b-form-group class="col-md-3">
                <label class="form-label">Close Meeting</label>
                <b-form-row>
                    <b-form-group class="col-md-8">
                        <datepicker
                        v-model="field.ClosingMeeting"
                        :format="formatDatedmy"
                        :state="allErrors.ClosingMeeting?false:null"
                        :bootstrapStyling="true"
                        :typeable="true"
                        class="mb-1" required/>
                        <span class="text-danger" v-if="allErrors.DateClose">{{ allErrors.DateClose[0] }}</span>
                    </b-form-group>
                    <b-form-group class="col-md-4">
                        <masked-input type="text" class="form-control mb-1"
                            v-model="field.CloseMeetingTime"
                            :placeholder="'00:00'"
                            :state="allErrors.CloseMeetingTime?false:null"
                            :mask="timeMask"/>
                        <span class="text-danger" v-if="allErrors.CloseMeetingTime">{{ allErrors.CloseMeetingTime[0] }}</span>
                    </b-form-group>
                </b-form-row>
            </b-form-group>

        </b-form-row>

        <b-form-row>
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
                <label class="form-label">Standart Audit</label>
                <label class="form-label float-right text-danger">*Wajib Diisi</label>
                <multiselect
                v-model="field.AuditCriteria"
                :options="opsAuditCriteria"
                :allow-empty="false"
                :multiple="true"
                :show-labels="false"
                placeholder="Pilih Standart Audit"
                label="Standart"
                track-by="Standart" />
              <span class="text-danger" v-if="allErrors.AuditCriteria">{{ allErrors.AuditCriteria[0] }}</span>
            </b-form-group>

            <b-form-group class="col-md-4">
                <label class="form-label">Audit Scope</label>
                <label class="form-label float-right text-danger">*Wajib Diisi</label>
                <b-form-textarea
                name="AuditScope"
                v-model="field.AuditScope"
                rows="3"
                no-resize>
                </b-form-textarea>
            </b-form-group>

        </b-form-row>

        <b-form-row>
            <b-form-group class="col-md-6">
                <label class="form-label">Purpose</label>
                <label class="form-label float-right text-danger">*Wajib Diisi</label>
                <b-form-textarea
                name="Purpose"
                v-model="field.Purpose"
                rows="3"
                no-resize>
                </b-form-textarea>
            </b-form-group>
            <b-form-group class="col-md-6">
                <label class="form-label">Objective</label>
                <label class="form-label float-right text-danger">*Wajib Diisi</label>
                <b-form-textarea
                name="Objective"
                v-model="field.Objective"
                rows="3"
                no-resize>
                </b-form-textarea>
            </b-form-group>
        </b-form-row>

        <b-card class="mb-4">
          <template v-slot:header>
            <h4>Department Auditee</h4>
          </template>
          <b-form-row v-for="(item, index) in field.AuditeeDepartment" :key="index">
            <b-form-group class="col-md-4">
              <label v-if="index == 0">Area Auditee</label>
              <multiselect
                v-model="item.Department"
                :options="opsDepartment"
                :allow-empty="false"
                :show-labels="false"
                @select="getPositionSelect($event,index)"
                placeholder="Pilih Department Auditee"
                label="Department"
                track-by="Department" />
            </b-form-group>
            <b-form-group class="col-md-4">
              <label v-if="index == 0">Key Area Auditee</label>
              <multiselect
                v-model="item.Position"
                :options="item.opsPosition"
                :allow-empty="false"
                :show-labels="false"
                :multiple="true"
                @select="getEmailEvent($event,index)"
                @remove="removeEmailEvent($event,index)"
                placeholder="Pilih Position Auditee"
                label="Name"
                track-by="Name" />
            </b-form-group>
            <b-form-group class="col-md-3 col-10">
              <label v-if="index == 0">Emails</label>
                <b-form-textarea
                  name="Email"
                  v-model="item.Email"
                  rows="3"
                  background-color="btn-danger"
                  no-resize
                >
                </b-form-textarea>
            </b-form-group>
            <b-form-group class="col-md-1 col-2 text-center">
              <label v-if="index == 0">Action</label>
              <b-button class="btn btn-sm btn-icon btn-danger text-white" :pill="true" @click="removeDepartmentAuditee(index)" v-if="index > 0">
                  <i class="ion ion-md-trash"></i>
              </b-button>
            </b-form-group>
          </b-form-row>
          <b-btn type="button" @click="addDepartmentAuditee()" class="float-left btn-info"><i class="fas fa-plus"></i> Tambah</b-btn>
        </b-card>


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

<style>
  .custom-datepicker {
    background-color: #ffffff; 
}
</style>

<script>

import moment from 'moment'
import MaskedInput from 'vue-text-mask'
import * as textMaskAddons from 'text-mask-addons/dist/textMaskAddons'


export default {
  name: 'form-audit-plan',
  metaInfo: {
    title: 'Form Audit Plan'
  },
  components: {
    MaskedInput
  },
  data () {
    return {
      urlSubmit: '/AdminVue/audit-plan-insert',
      headerCard: 'Form / Create Data Audit Plan',
      textBtnSubmit: 'Create',
      field: {
      //   myFile : ''
      File:'',
      AuditeeDepartment:[{Department:'',Position:'',Email:'',opsPosition:[]}],
      IdAudit:'',
      Date:'',
      Organizer:'',
      AuditPeriode:'',
      AuditCriteria:'',
      Approved:''
      },
      allErrors: [],
      formatDate: 'MM/yyyy',
      formatDatedmy:'dd/MM/yyyy',
      formatDateTime:'dd/MM/yyyy H:i',
      disabledDate:{to: new Date(2021,4,5)},
      opsAuditCriteria:[],
      timeMask: [/\d/, /\d/,':',/\d/, /\d/],
      opsOrganizer:[],
      opsDepartment:[],
      DepSelected:[],
      DisabledDep:[],
      oldFileAttachment:[],
      opsEmployee:[],
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
      formData.append("OrganizerAudit", this.field.Organizer.Id)
      formData.append("AuditPeriode", moment(this.field.AuditPeriode).format('MM/DD/YYYY'))
      formData.append("NoTrans", this.field.IdAudit)
      formData.append("Approved", JSON.stringify(this.field.Approved))
      formData.append("Purpose", this.field.Purpose)
      formData.append("AuditScope", this.field.AuditScope)
      formData.append("OpeningMeeting", moment(this.field.OpeningMeeting).format('MM/DD/YYYY'))
      formData.append("AuditExecutionStart", moment(this.field.AuditExecutionStart).format('MM/DD/YYYY'))
      formData.append("AuditExecutionDone", moment(this.field.AuditExecutionDone).format('MM/DD/YYYY'))
      formData.append("ClosingMeeting", moment(this.field.ClosingMeeting).format('MM/DD/YYYY'))
      formData.append("OpeningMeetingTime", this.field.OpeningMeetingTime)
      formData.append("CloseMeetingTime", this.field.CloseMeetingTime)
      formData.append("AuditCriteria", JSON.stringify(this.field.AuditCriteria))
      formData.append("Objective", this.field.Objective)
      formData.append("AuditeeDepartment", JSON.stringify(this.field.AuditeeDepartment))
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
            name: 'audit/data-audit-plan',
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
      axios.post('/AdminVue/audit-plan-edit', {
        Id:Id,
      })
      .then( function (res) {
        var resp = res.data
        this.field = resp.data
        this.DepSelected = resp.data.DepSelect
        this.DisabledDep = resp.data.DepDisabled
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
        this.getCriteriaAudit(this.field.IdOrganizer,true)
        for(let a=0; a < this.field.AuditeeDepartment.length; a++){
          this.getPosition(this.field.AuditeeDepartment[a].Department.Id,true,a)
        }
      }.bind(this))
      .catch( function (e) {
        console.log(e)
        this.isNotif = true
        this.alertNotif = 'Invalid Server Side!'
        this.alertVariant = 'alert-dark-danger'
      }.bind(this))
    },

    backIndex() {
      this.$router.push('/RoleAdmin/audit/data-audit-plan')
    },

    handleFile: function(files) {
        // console.log('FilePond Updated')
        // example of instance method call on pond reference
        this.field.File = files.map(files => files.file)
        // console.log( this.field.myFile )
    },

    getSelect (IdEmploye) {
      axios.post('/AdminVue/audit-plan-getSelect',{
        IdEmploye:IdEmploye
      })
      .then( function (res) {
        this.opsOrganizer = res.data.organizer
        this.opsDepartment = res.data.departement
        this.field.TotalAuditPlant = res.data.countAuditPlan+1
        this.opsEmployee = res.data.employee
        if(this.field.Id){
          for(let index = 0; index < this.DepSelected.length; index++){
            let IndexDep = this.opsDepartment.findIndex(IdDep => IdDep.Id === this.DepSelected[index])
            this.opsDepartment[IndexDep].$isDisabled = true;
          }
        }
      }.bind(this))
      .catch( function (e) {
        console.log(e)
        this.opsOrganizer = []
        this.opsDepartment = []
        this.field.TotalAuditPlant = 0
        this.opsEmployee = []
      }.bind(this))
    },

    getPosition(Id,statusEdit,index){
      axios.post('/AdminVue/audit-plan-getPosition',{
        IdDepartment:Id
      })
      .then( function (res) {
        this.field.AuditeeDepartment[index].opsPosition = res.data.position
        if(statusEdit == false){
          this.field.AuditeeDepartment[index].Position = ''
          this.field.AuditeeDepartment[index].Email = ''
        }
      }.bind(this))
      .catch( function (e) {
        console.log(e)
        this.opsPosition = []
      }.bind(this))
    },

    getCriteriaAudit(Id,statusEdit){
      axios.post('/AdminVue/audit-plan-getCriteria',{
        IdOrganizer:Id
      })
      .then( function (res) {
        this.opsAuditCriteria = res.data.criteria
        if(statusEdit == false){
          this.field.AuditCriteria = ''
        }
      }.bind(this))
      .catch( function (e) {
        console.log(e)
        this.opsAuditCriteria = []
      }.bind(this))
    },

    getIdAudit(option){
      if(this.field.AuditPeriode != ''){
        let StringAngka = ('00'+this.field.TotalAuditPlant).substring(this.field.TotalAuditPlant.length);
        let YearDate = moment(this.field.AuditPeriode).format('YYYY')
        this.field.IdAudit = YearDate + '/' + option.Name + '/' + StringAngka
      }
      this.getCriteriaAudit(option.Id,false)
    },

    dateSelected(){
      this.$nextTick(() => this.getIdAuditDate(this.field.AuditPeriode))
    },

    priviewFile(){
      if(this.oldFileAttachment != ''){
        for( var i = 0; i < this.oldFileAttachment.length; i++ ){
          let file = process.env.BASE_URL + this.oldFileAttachment[i];
          window.open(file, '_blank');
        }
      }
    },

    getIdAuditDate(DateAudit){
      if(this.field.Organizer != ''){
        let StringAngka = ('00'+this.field.TotalAuditPlant).substring(this.field.TotalAuditPlant.length);
        let YearDate = moment(DateAudit).format('YYYY')
        this.field.IdAudit = YearDate + '/' + this.field.Organizer.Name + '/' + StringAngka
      }
    },

    getPositionSelect(option,index){
      this.DepSelected.splice(index,1)
      this.DepSelected.splice(index,0,option.Id)
      this.disabledSelected(option.Id,index,false)
      this.getPosition(option.Id,false,index)
    },

    getEmailEvent(option,index){
      let Email = this.field.AuditeeDepartment[index].Email
      if(Email != ''){
        this.field.AuditeeDepartment[index].Email = Email.concat(', ',option.Email)
      }else{
        this.field.AuditeeDepartment[index].Email = option.Email
      }
    },

    removeEmailEvent(option,index){
      this.field.AuditeeDepartment[index].Email = this.field.AuditeeDepartment[index].Email.replace(', '+option.Email,'')
    },

    addDepartmentAuditee(){


      this.field.AuditeeDepartment.push({Department:'',Position:'',Email:'',opsPosition:[]})
    },

    removeDepartmentAuditee(index){
      this.field.AuditeeDepartment.splice(index,1)
      this.disabledSelected(this.DepSelected[index],index,true)
    },

    handleRemove: function(error,files){
      if(this.isFormEdit == true){
        let index = this.oldFileAttachment.indexOf(files.source.replace('/clouds','clouds'))
        this.oldFileAttachment.splice(index,1)
      }
    },

    disabledSelected(Id,index,isDelete){
      let IndexDep = this.opsDepartment.findIndex(IdDep => IdDep.Id === Id)
      let Disabled = this.DisabledDep[index]
      if(Disabled === undefined){
        this.opsDepartment[IndexDep].$isDisabled = true;
        this.DisabledDep.push(Id)
      }else{
        this.opsDepartment[IndexDep].$isDisabled = true;
        let IndexDis = this.opsDepartment.findIndex(IdDep => IdDep.Id === Disabled)
        this.opsDepartment[IndexDis].$isDisabled = false;
        this.DisabledDep.splice(index,1)
        this.DisabledDep.splice(index,0,Id)
        if(isDelete){
          this.DepSelected.splice(index,1);
        }
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
        this.urlSubmit = '/AdminVue/audit-plan-update'
        this.headerCard = 'Form / Edit Data Audit Plan'
        this.textBtnSubmit = 'Update'
      }

    }
    this.getSelect()
  },

}
</script>
