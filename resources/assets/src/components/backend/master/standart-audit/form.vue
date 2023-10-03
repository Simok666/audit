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
            <label class="form-label">Organizer</label>
            <label class="form-label float-right text-danger">*Wajib Diisi</label>
              <multiselect
              v-model="field.Organizer"
              :options="opsOrganizer"
              :allow-empty="false"
              :preselect-first="true"
              :show-labels="false"
              placeholder="Pilih Organizer"
              label="Name"
              track-by="Name" />
            <span class="text-danger" v-if="allErrors.Organizer">{{ allErrors.Organizer[0] }}</span>
          </b-form-group>

          <b-form-group class="col-md-4">
            <label class="form-label">Standart Audit</label>
            <label class="form-label float-right text-danger">*Wajib Diisi</label>
            <b-input name="Standart" :state="allErrors.Standart?false:null" v-model="field.Standart" class="mb-1" required />
            <span class="text-danger" v-if="allErrors.Standart">{{ allErrors.Standart[0] }}</span>
          </b-form-group>

          <b-form-group class="col-md-4">
            <label class="form-label">Status</label>
            <multiselect
              v-model="field.Status"
              :options="opsStatus"
              :allow-empty="false"
              :preselect-first="true"
              :show-labels="false"
              placeholder="Pilih Status"
              label="text"
              track-by="text" />
            <span class="text-danger" v-if="allErrors.Group">{{ allErrors.Group[0] }}</span>
          </b-form-group>


        </b-form-row>

        <b-form-row>
            <b-form-group class="col-md-6">
                <label class="form-label">Description</label>
                <label class="form-label float-right text-danger">*Wajib Diisi</label>
                <b-form-textarea
                        name="Description"
                        v-model="field.Description"
                        rows="3"
                        no-resize>
                </b-form-textarea>
                <span class="text-danger" v-if="allErrors.Description">{{ allErrors.Description[0] }}</span>
            </b-form-group>

            <b-form-group class="col-md-6">
                <label>Refrensi</label>
                <file-pond
                name="File"
                ref="pondMyFile"
                label-idle="Klik Untuk Menambahkan Refrensi"
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
  name: 'form-standart-audit',
  metaInfo: {
    title: 'Form Standart Audit'
  },
  components: {

  },
  data () {
    return {
      urlSubmit: '/AdminVue/standart-audit-insert',
      headerCard: 'Form / Create Data Standart Audit',
      textBtnSubmit: 'Create',
      field: {
      //   myFile : ''
        File:[]
      },
      allErrors: [],
      oldFileRefrensi:[],
      opsStatus:[{'value':1,'text':'Aktif'},{'value':0,'text':'Tidak Aktif'}],
      opsOrganizer:[],
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
      formData.append("Standart", this.field.Standart)
      formData.append("Description", this.field.Description)
      for( var i = 0; i < this.field.File.length; i++ ){
        let file = this.field.File[i];
        formData.append('FileRefrensi[' + i + ']', file);
      }
      formData.append("OldFileRefrensi", JSON.stringify(this.oldFileRefrensi))
      formData.append("Status", this.field.Status.value)

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
      axios.post('/AdminVue/standart-audit-edit', {
        Id:Id,
      })
      .then( function (res) {
        var resp = res.data
        this.field = resp.data
        this.field.File = []
        if(this.field.Path != ''){
          let countPath = this.field.Path.length
          for (let i = 0; i < countPath; i++) {
            this.oldFileRefrensi.push(this.field.Path[i])
            this.field.File.push(process.env.BASE_URL + this.field.Path[i])
          }
        }else{
          this.oldFileRefrensi = '';
        }
      }.bind(this))
      .catch( function (e) {
        console.log(e)
        this.isNotif = true
        this.alertNotif = 'Invalid Server Side!'
        this.alertVariant = 'alert-dark-danger'
      }.bind(this))
    },

    getSelect () {
      axios.post('/AdminVue/standart-audit-getSelect')
      .then( function (res) {
        this.opsOrganizer = res.data.organizer
      }.bind(this))
      .catch( function (e) {
        console.log(e)
        this.opsOrganizer = []
      }.bind(this))
    },

    backIndex() {
      this.$router.push('/RoleAdmin/master/data-standart-audit')
    },

    handleFile: function(files) {
        // console.log('FilePond Updated')
        // example of instance method call on pond reference
        this.field.File = files.map(files => files.file)
        // console.log( this.field.myFile )
    },

    priviewFile(){
      if(this.oldFileRefrensi != ''){
        for( var i = 0; i < this.oldFileRefrensi.length; i++ ){
          let file = process.env.BASE_URL + this.oldFileRefrensi[i];
          window.open(file, '_blank');
        }
      }
    },

    handleRemove: function(error,files){
      if(this.isFormEdit == true){
        let index = this.oldFileRefrensi.indexOf(files.source.replace('/clouds','clouds'))
        this.oldFileRefrensi.splice(index,1)
      }
    },

    handleFinish:function(files){
      this.oldFileRefrensi.push('')
    }

  },

  mounted(){

    if(this.$route.params.isFormEdit){
      var Id = this.$route.params.Id
      if(Id){
        this.getData(Id)
        this.field.Id = Id
        this.isFormEdit = true;
        this.urlSubmit = '/AdminVue/standart-audit-update'
        this.headerCard = 'Form / Edit Data Standart Audit'
        this.textBtnSubmit = 'Update'
      }

    }
    this.getSelect()
  },  

}
</script>