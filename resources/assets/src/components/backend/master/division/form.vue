<template>
  <div>

    <b-card :header="headerCard" header-tag="h4" class="mb-4">

      <div v-if="isNotif" class="alert alert-dismissible fade show" v-bind:class="[alertVariant]">
        <button type="button" class="close" data-dismiss="alert" v-on:click="isNotif = !isNotif">×</button>
        {{alertNotif}}
      </div>

      <form method="POST" @submit.prevent="submitForm()">
        <b-form-row>

          <b-form-group class="col-md-2">
            <label class="form-label">Code</label>
            <label class="form-label float-right text-danger">*Wajib Diisi</label>
            <b-input name="Code" :state="allErrors.Code?false:null" v-model="field.Code" class="mb-1" required />
            <span class="text-danger" v-if="allErrors.Code">{{ allErrors.Code[0] }}</span>
          </b-form-group>
        
          <b-form-group class="col-md-4">
            <label class="form-label">Division</label>
            <label class="form-label float-right text-danger">*Wajib Diisi</label>
            <b-input name="Division" :state="allErrors.Division?false:null" v-model="field.Division" class="mb-1" required />
            <span class="text-danger" v-if="allErrors.Division">{{ allErrors.Division[0] }}</span>
          </b-form-group>

        </b-form-row>

        <b-form-row>
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

export default {
  name: 'form-division',
  metaInfo: {
    title: 'Form Division'
  },
  components: {
    
  },
  data () {
    return {
      urlSubmit: '/AdminVue/division-insert',
      headerCard: 'Form / Create Data Division',
      textBtnSubmit: 'Create',
      field: {
      //   myFile : ''
      },
      allErrors: [],
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
      formData.append("Division", this.field.Division)

      const config = {
          headers: { 'content-type': 'multipart/form-data' }
      }

      axios.post(this.urlSubmit, formData, config)
      .then( function (res) {
        var resp = res.data

        if(resp.status){

          this.$router.push({
            name: 'master/data-division',
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
      axios.post('/AdminVue/division-edit', {
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
      this.$router.push('/RoleAdmin/master/data-division')
    },

  },

  mounted(){

    if(this.$route.params.isFormEdit){
      var Id = this.$route.params.Id
      if(Id){
        this.getData(Id)
        this.field.Id = Id
        this.urlSubmit = '/AdminVue/division-update'
        this.headerCard = 'Form / Edit Data Division'
        this.textBtnSubmit = 'Update'
      }

    }
  },  

}
</script>