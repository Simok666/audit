<template>
  <div>

    <b-card :header="headerCard" header-tag="h4" class="mb-4">
        <div v-if="isNotif" class="alert alert-dismissible fade show" v-bind:class="[alertVariant]">
        <button type="button" class="close" data-dismiss="alert" v-on:click="isNotif = !isNotif">×</button>
        {{alertNotif}}
      </div>

      <form method="POST" @submit.prevent="submitForm()">
        <b-form-row>
            <b-form-group class="col-md-12">
                <label>File Import</label>
                <file-pond
                name="File"
                ref="pondMyFile"
                label-idle="Klik Untuk Menambahkan File Import"
                :allow-multiple="false"
                @updatefiles="handleFile"
                :files="field.File"
                required/>
            </b-form-group>
        </b-form-row>

        <b-form-row>
            <b-form-group class="col-md-12">
                <p>
                    <strong>Download Format Excel Import Clause Disini :</strong>
                    <a class="btn btn-xs btn-outline-success text-success" :href="BaseUrl+item" target="_blank"> <i class="fas fa-download"></i> Download</a>
                </p>
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
    title: 'Form Import Clause Audit'
  },
  components: {

  },
  data () {
    return {
      urlSubmit: '/AdminVue/standart-audit-clause-import',
      headerCard: 'Form / Import Data Clause Audit',
      textBtnSubmit: 'Import',
      field: {
      //   myFile : ''
        File:''
      },
      allErrors: [],
      isNotif: false,
      isFormEdit:false,
      item:"clouds/template/file-import.xlsx",
      BaseUrl:process.env.BASE_URL,
      alertNotif: '',
      alertVariant: 'alert-dark-danger'
    }
  },
  methods: {
    submitForm () {
      const formData = new FormData()
      formData.append("Id", this.field.Id)
      formData.append("File",this.field.File[0])

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
              txNotif: 'Import Data Success!',
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

    backIndex() {
      this.$router.push('/RoleAdmin/master/data-standart-audit')
    },

    handleFile: function(files) {
        // console.log('FilePond Updated')
        // example of instance method call on pond reference
        this.field.File = files.map(files => files.file)
        // console.log( this.field.myFile )
    }

  },

  mounted(){
    if(this.$route.params.Id){
      this.field.Id = this.$route.params.Id
    }else{
      this.$router.push('/RoleAdmin/master/data-standart-audit')
    }
  },  

}
</script>