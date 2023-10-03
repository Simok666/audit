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
            <label class="form-label">Nama Karyawan</label>
            <label class="form-label float-right text-danger">*Wajib Diisi</label>
            <b-input name="Employee" :state="allErrors.Employee?false:null" v-model="field.Employee" class="mb-1" readonly />
            <span class="text-danger" v-if="allErrors.Employee">{{ allErrors.Employee[0] }}</span>
          </b-form-group>

          <b-form-group class="col-md-6">
              <label class="form-label">Status</label>
              <label class="form-label float-right text-danger">*Wajib Diisi</label>
              <multiselect
                v-model="field.Status"
                :options="opsType"
                :allow-empty="false"
                :show-labels="false"
                :preselect-first="true"
                placeholder="Pilih Status"
                label="text"
                track-by="text" />
              <span class="text-danger" v-if="allErrors.Status">{{ allErrors.Status[0] }}</span>
          </b-form-group>

        </b-form-row>

        <b-form-row>
          <b-form-group class="col-md-12">
              <label>Manual Book</label>
              <file-pond
              name="Photo"
              ref="pondMyFile"
              label-idle="Klik Untuk Menambahkan Attachment"
              :allow-multiple="false"
              @updatefiles="handleFile"
              :files="field.Photo"
              required/>
          </b-form-group>
        </b-form-row>

        <b-form-row>
          <b-form-group label="" class="col-md-12">
            <b-btn type="submit" variant="primary" class="float-right ml-2">{{textBtnSubmit}}</b-btn>
            <b-btn type="button" variant="secondary" @click="backIndex()" class="float-right">Back</b-btn>
          </b-form-group>
        </b-form-row>
      </form>

      
    </b-card>

  </div>
</template>

<script>

export default {
  name: 'form-manual-book',
  metaInfo: {
    title: 'Form Manual Book'
  },
  components: {
    
  },
  data () {
    return {
      urlSubmit: '/AdminVue/manual-book-insert',
      headerCard: 'Form / Create Data Manual Book',
      textBtnSubmit: 'Create',
      field: {
      //   myFile : ''
        Photo:'',
        Employee:''
      },
      allErrors: [],
      opsType:[{'value':0,'text':'Non Active'},{'value':1,'text':'Active'}],
      isNotif: false,
      alertNotif: '',
      alertVariant: 'alert-dark-danger',
      opsDivision: []
    }
  },
  methods: {
    submitForm () {
      const formData = new FormData()
      formData.append("Id", this.field.Id)
      formData.append("Code", this.field.Code)
      formData.append("IdEmployee", this.field.IdEmployee)
      formData.append("Status", this.field.Status.value)
      formData.append("Employee", this.field.Employee)
      formData.append("Photo",this.field.Photo[0])
      formData.append("OldPhoto",this.field.OldPhoto)

      const config = {
          headers: { 'content-type': 'multipart/form-data' }
      }

      axios.post(this.urlSubmit, formData, config)
      .then( function (res) {
        var resp = res.data

        if(resp.status){

          this.$router.push({
            name: 'main/manual-book',
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
          this.scrollTop(0, 1000)
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
      axios.post('/AdminVue/manual-book-edit', {
        Id:Id,
      })
      .then( function (res) {
        var resp = res.data
        this.field = resp.data
        if(resp.data.Path != ''){
          this.field.Photo = process.env.BASE_URL + resp.data.Path
          this.field.OldPhoto = resp.data.Path
        }
      }.bind(this))
      .catch( function (e) {
        console.log(e)
        this.isNotif = true
        this.alertNotif = 'Invalid Server Side!'
        this.alertVariant = 'alert-dark-danger'
      }.bind(this))
    },

    getSelect(){
      axios.post('/AdminVue/manual-book-getSelect')
      .then( function (res) {
        var resp = res.data
        this.field.Employee = resp.data
      }.bind(this))
      .catch( function (e) {
        console.log(e)
        this.isNotif = true
        this.alertNotif = 'Invalid Server Side!'
        this.alertVariant = 'alert-dark-danger'
      }.bind(this))
    },

    handleFile: function(files) {
      // console.log('FilePond Updated')
      // example of instance method call on pond reference
      this.field.Photo = files.map(files => files.file)
      // console.log( this.field.myFile )
    },

    backIndex() {
      this.$router.push('/RoleAdmin/main/manual-book')
    },

  },

  mounted(){

    if(this.$route.params.isFormEdit){
      var Id = this.$route.params.Id
      if(Id){
        this.getData(Id)
        this.field.Id = Id
        this.urlSubmit = '/AdminVue/manual-book-update'
        this.headerCard = 'Form / Edit Data Manual Book'
        this.textBtnSubmit = 'Update'
      }

    }else{
        this.getSelect()
    }
    
  },  

}
</script>