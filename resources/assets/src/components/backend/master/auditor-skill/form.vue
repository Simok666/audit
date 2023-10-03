<template>
  <div>

    <b-card :header="headerCard" header-tag="h4" class="mb-4">

      <div v-if="isNotif" class="alert alert-dismissible fade show" v-bind:class="[alertVariant]">
        <button type="button" class="close" data-dismiss="alert" v-on:click="isNotif = !isNotif">×</button>
        {{alertNotif}}
      </div>

      <form method="POST" @submit.prevent="submitForm()">
        <b-form-row>

          <b-form-group class="col-md-3">
            <label class="form-label">Nama Karyawan</label>
            <label class="form-label float-right text-danger">*Wajib Diisi</label>
            <multiselect
                v-model="field.Employee"
                :options="opsEmployee"
                :allow-empty="false"
                :show-labels="false"
                @select="getEmployeeNip"
                placeholder="Pilih Karyawan"
                label="Name"
                track-by="Name" />
            <span class="text-danger" v-if="allErrors.Name">{{ allErrors.Name[0] }}</span>
          </b-form-group>

          <b-form-group class="col-md-3">
            <label class="form-label">NIK/NIP</label>
            <label class="form-label float-right text-danger">*Wajib Diisi</label>
            <b-input name="NIK" :state="allErrors.NIK?false:null" v-model="field.NIK" class="mb-1" readonly />
            <span class="text-danger" v-if="allErrors.NIK">{{ allErrors.NIK[0] }}</span>
          </b-form-group>

          <b-form-group class="col-md-3">
            <label class="form-label">Date</label>
            <label class="form-label float-right text-danger">*Wajib Diisi</label>
            <datepicker
            v-model="field.Date"
            :format="formatDate"
            :state="allErrors.Date?false:null"
            :bootstrapStyling="true"
            class="mb-1" required/>
            <span class="text-danger" v-if="allErrors.Date">{{ allErrors.Date[0] }}</span>
          </b-form-group>
         <b-form-group class="col-md-3">
            <label class="form-label">Organizer</label>
            <label class="form-label float-right text-danger">*Wajib Diisi</label>
            <b-input name="Certificate" :state="allErrors.Organizer?false:null" v-model="field.Organizer" class="mb-1" required/>
            <span class="text-danger" v-if="allErrors.Organizer">{{ allErrors.Organizer[0] }}</span>
         </b-form-group>

        </b-form-row>

        <b-form-row>
            <!--<b-form-group class="col-md-4">-->
              <!--<label class="form-label">Organizer</label>-->
              <!--<label class="form-label float-right text-danger">*Wajib Diisi</label>-->
              <!--<multiselect-->
                <!--v-model="field.Organizer"-->
                <!--:options="opsOrganizer"-->
                <!--:allow-empty="false"-->
                <!--:show-labels="false"-->
                <!--placeholder="Pilih Organizer"-->
                <!--@select="selectOrganizer"-->
                <!--label="Name"-->
                <!--track-by="Name" />-->
              <!--<span class="text-danger" v-if="allErrors.Organizer">{{ allErrors.Organizer[0] }}</span>-->
            <!--</b-form-group>-->



            <b-form-group class="col-md-4">
                <label class="form-label">Personal Skill</label>
                <label class="form-label float-right text-danger">*Wajib Diisi</label>
                <multiselect
                v-model="field.StandartAudit"
                :options="opsStandartAudit"
                :allow-empty="false"
                :show-labels="false"
                @select="selectStandartAudit"
                placeholder="Pilih Personal Skill"
                label="Standart"
                track-by="Standart" />
                <span class="text-danger" v-if="allErrors.StandartAudit">{{ allErrors.StandartAudit[0] }}</span>
            </b-form-group>
            <b-form-group class="col-md-3">
                <label class="form-label">Pelatihan</label>
                <label class="form-label float-right text-danger">*Wajib Diisi</label>
                <b-input name="Training" :state="allErrors.Training?false:null" v-model="field.Training" class="mb-1" required/>
                <span class="text-danger" v-if="allErrors.Certificate">{{ allErrors.Certificate[0] }}</span>
            </b-form-group>

            <b-form-group class="col-md-3">
                <label class="form-label">Institusi</label>
                <label class="form-label float-right text-danger">*Wajib Diisi</label>
                <b-input name="Institution" :state="allErrors.Institution?false:null" v-model="field.Institution" class="mb-1" required/>
                <span class="text-danger" v-if="allErrors.Certificate">{{ allErrors.Certificate[0] }}</span>
            </b-form-group>

            <b-form-group class="col-md-2">
                <label class="form-label">Status</label>
                <label class="form-label float-right text-danger">*Wajib Diisi</label>
                <multiselect
                        v-model="field.Status"
                        :options="opsStatus"
                        :allow-empty="false"
                        :preselect-first="true"
                        :show-labels="false"
                        placeholder="Pilih Status"
                        label="text"
                        track-by="text" />
                <span class="text-danger" v-if="allErrors.Status">{{ allErrors.Status[0] }}</span>
            </b-form-group>

            <!--<b-form-group class="col-md-4">-->
                <!--<label class="form-label">Certificate</label>-->
                <!--<label class="form-label float-right text-danger">*Wajib Diisi</label>-->
                <!--<b-input name="Certificate" :state="allErrors.Certificate?false:null" v-model="field.Certificate" class="mb-1" required/>-->
                <!--<span class="text-danger" v-if="allErrors.Certificate">{{ allErrors.Certificate[0] }}</span>-->
            <!--</b-form-group>-->

            <!-- <b-form-group class="col-md-4">
                <label class="form-label">Clause Audit</label>
                <label class="form-label float-right text-danger">*Wajib Diisi</label>
                <multiselect
                v-model="field.ClauseAudit"
                :options="opsClause"
                :allow-empty="false"
                :placeholder="placeholderClause"
                label="Clause"
                track-by="Clause" />
                <span class="text-danger" v-if="allErrors.ClauseAudit">{{ allErrors.ClauseAudit[0] }}</span>
            </b-form-group> -->
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


export default {
  name: 'form-auditor-skill',
  metaInfo: {
    title: 'Form Auditors Skill'
  },
  components: {

  },
  data () {
    return {
      urlSubmit: '/AdminVue/auditor-skill-insert',
      headerCard: 'Form / Create Data Auditors Skill',
      textBtnSubmit: 'Create',
      field: {
      //   myFile : ''
      File:'',
      ClauseAudit:'',
      StandartAudit:''
      },
      allErrors: [],
      opsCertificate:[{'value':'Auditor','text':'Auditor'},{'value':'Auditee','text':'Auditee'}],
      opsStatus:[{'value':1,'text':'Aktif'},{'value':0,'text':'Tidak Aktif'}],
      opsNIK:[],
      opsPosition:[],
      opsEmployee:[],
      opsOrganizer:[],
      opsStandartAudit:[],
      opsClause:[],
      oldFileAttachment:[],
      placeholderClause:'Pilih Personal Skill Terlebih Dahulu',
      formatDate: 'dd/MM/yyyy',
      isNotif: false,
      isFormEdit:false,
      alertNotif: '',
      alertVariant: 'alert-dark-danger'
    }
  },
  methods: {
    submitForm () {
      const formData = new FormData()
      formData.append("Id", this.field.Id)
      formData.append("IdOrganizer", this.field.Organizer.Id)
      formData.append("IdPersonel", this.field.Employee.Id)
      formData.append("IdStandartAudit", this.field.StandartAudit.Id)
      formData.append("Certificate", this.field.Certificate)
      formData.append("Training", this.field.Training)
      formData.append("Institution", this.field.Institution)
      formData.append("Status", this.field.Status.value)
      formData.append("Organizer", this.field.Organizer)
      formData.append("Date", this.field.Date)
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
            name: 'master/data-auditor-skill',
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
      axios.post('/AdminVue/auditor-skill-edit', {
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
        // this.getStandartAudit(this.field.IdOrganizer,true)
      }.bind(this))
      .catch( function (e) {
        console.log(e)
        this.isNotif = true
        this.alertNotif = 'Invalid Server Side!'
        this.alertVariant = 'alert-dark-danger'
      }.bind(this))
    },

    getSelect(){
      axios.post('/AdminVue/auditor-skill-getSelect')
      .then( function (res) {
        this.opsEmployee = res.data.employee
        // this.opsOrganizer = res.data.organizer
      }.bind(this))
      .catch( function (e) {
        console.log(e)
        this.opsEmployee = []
      }.bind(this))
    },

    getStandartAudit(Id,statusEdit){
      axios.post('/AdminVue/auditor-skill-getStandartAudit',{
        IdOrganizer:Id
      })
      .then( function (res) {
        this.opsStandartAudit = res.data.standart
      }.bind(this))
      .catch( function (e) {

      }.bind(this))
    },

    // getAuditClause(Id,statusEdit){
    //   axios.post('/AdminVue/auditor-skill-getClauseAudit',{
    //     IdStandartAudit:Id
    //   })
    //   .then( function (res) {
    //     this.opsClause = res.data.clause
    //     if(statusEdit == false){
    //       this.placeholderClause = 'Pilih Clause Audit'
    //       this.field.ClauseAudit = ''
    //     }
    //   }.bind(this))
    //   .catch( function (e) {
    //     console.log(e)
    //     this.opsClause = []
    //   }.bind(this))
    // },

    getEmployeeNip(option){
      this.field.NIK = option.NIP
    },

    selectOrganizer(option){
      // this.getStandartAudit(0,false)
    },

    selectStandartAudit(option){

    },

    backIndex() {
      this.$router.push('/RoleAdmin/master/data-auditor-skill')
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
        this.urlSubmit = '/AdminVue/auditor-skill-update'
        this.headerCard = 'Form / Edit Data Auditor Skill'
        this.textBtnSubmit = 'Update'
      }

    }
    this.getSelect();
    this.getStandartAudit(1,false)
  },

}
</script>
