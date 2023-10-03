<template>
  <div>

    <b-card :header="headerCard" header-tag="h4" class="mb-4">

      <div v-if="isNotif" class="alert alert-dismissible fade show" v-bind:class="[alertVariant]">
        <button type="button" class="close" data-dismiss="alert" v-on:click="isNotif = !isNotif">×</button>
        {{alertNotif}}
      </div>

      <form method="POST" @submit.prevent="submitForm()">
        <b-form-row>
        
          <b-form-group class="col-md-6">
            <label class="form-label">Organizer</label>
            <label class="form-label float-right text-danger">*Wajib Diisi</label>
            <b-input name="Name" :state="allErrors.Name?false:null" v-model="field.Name" class="mb-1" required />
            <span class="text-danger" v-if="allErrors.Name">{{ allErrors.Name[0] }}</span>
          </b-form-group>
          
          <b-form-group class="col-md-6">
            <label class="form-label">Klasifikasi</label>
            <label class="form-label float-right text-danger">*Wajib Diisi</label>
            <multiselect
              v-model="field.Classification"
              :options="opsClassification"
              :allow-empty="false"
              :preselect-first="true"
              :show-labels="false"
              placeholder="Pilih Classification"
              label="text"
              track-by="text" />
            <span class="text-danger" v-if="allErrors.Classification">{{ allErrors.Group[0] }}</span>
          </b-form-group>

        </b-form-row>

        <b-form-row>
            <b-form-group class="col-md-6">
                <label class="form-label">Deskripsi</label>
                <label class="form-label float-right text-danger">*Wajib Diisi</label>
                <b-form-textarea
                        name="Description"
                        v-model="field.Description"
                        rows="3"
                        no-resize>
                </b-form-textarea>
                <span class="text-danger" v-if="allErrors.Description">{{ allErrors.Description[0] }}</span>
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
  name: 'form-organizer-auditor',
  metaInfo: {
    title: 'Form Organizer Auditor'
  },
  components: {
    
  },
  data () {
    return {
      urlSubmit: '/AdminVue/organizer-auditor-insert',
      headerCard: 'Form / Create Data Organizer Auditor',
      textBtnSubmit: 'Create',
      field: {
      //   myFile : ''
      },
      allErrors: [],
      opsClassification:[{'value':'Internal','text':'Internal'},{'value':'Eksternal','text':'Eksternal'}],
      isNotif: false,
      alertNotif: '',
      alertVariant: 'alert-dark-danger'
    }
  },
  methods: {
    submitForm () {
      const formData = new FormData()
      formData.append("Id", this.field.Id)
      formData.append("Name", this.field.Name)
      formData.append("Classification", this.field.Classification.value)
      formData.append("Description", this.field.Description)

      const config = {
          headers: { 'content-type': 'multipart/form-data' }
      }

      axios.post(this.urlSubmit, formData, config)
      .then( function (res) {
        var resp = res.data

        if(resp.status){

          this.$router.push({
            name: 'master/data-organizer-auditor',
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
      axios.post('/AdminVue/organizer-auditor-edit', {
        Id:Id,
      })
      .then( function (res) {
        var resp = res.data
        this.field = resp.data
      }.bind(this))
      .catch( function (e) {
        console.log(e)
        this.isNotif = true
        this.alertNotif = 'Invalid Server Side!'
        this.alertVariant = 'alert-dark-danger'
      }.bind(this))
    },

    backIndex() {
      this.$router.push('/RoleAdmin/master/data-organizer-auditor')
    }

  },

  mounted(){

    if(this.$route.params.isFormEdit){
      var Id = this.$route.params.Id
      if(Id){
        this.getData(Id)
        this.field.Id = Id
        this.urlSubmit = '/AdminVue/organizer-auditor-update'
        this.headerCard = 'Form / Edit Data Organizer Auditor'
        this.textBtnSubmit = 'Update'
      }

    }
  },  

}
</script>