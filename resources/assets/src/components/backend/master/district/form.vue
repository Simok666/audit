<template>
  <div>
    <!-- <h4 class="font-weight-bold py-3 mb-4">
      <span class="text-muted font-weight-light">Forms /</span> Form Input
    </h4> -->

    <b-card :header="headerCard" header-tag="h4" class="mb-4">

      <div v-if="isNotif" class="alert alert-dismissible fade show" v-bind:class="[alertVariant]">
        <button type="button" class="close" data-dismiss="alert" v-on:click="isNotif = !isNotif">×</button>
        {{alertNotif}}
      </div>

      <form method="POST" @submit.prevent="submitForm()">
        <b-form-row>
        
          <b-form-group class="col-md-6">
            <label class="form-label">Kecamatan</label>
            <label class="form-label float-right text-danger">*Wajib Diisi</label>
            <b-input name="Name" :state="allErrors.Name?false:null" v-model="field.Name" class="mb-1" required />
            <span class="text-danger" v-if="allErrors.Name">{{ allErrors.Name[0] }}</span>
          </b-form-group>

          <b-form-group class="col-md-6">
            <label class="form-label">Kota / Kabupaten</label>
            <label class="form-label float-right text-danger">*Wajib Diisi</label>
            <multiselect
              v-model="field.IdCity"
              :options="opsCity"
              :allow-empty="false"
              :show-labels="false"
              placeholder="Pilih Kota / Kabupaten"
              label="City"
              track-by="City" />
            <span class="text-danger" v-if="allErrors.IdCity">{{ allErrors.IdCity[0] }}</span>
          </b-form-group>

          <b-form-group label="" class="col-md-6"></b-form-group>

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
  name: 'form-district',
  metaInfo: {
    title: 'Form Kecamatan'
  },
  components: {
    
  },
  data () {
    return {
      urlSubmit: '/AdminVue/district-insert',
      headerCard: 'Form / Create Data Kecamatan',
      textBtnSubmit: 'Create',
      field: {
        myFile : ''
      },
      allErrors: [],
      isNotif: false,
      alertNotif: '',
      alertVariant: 'alert-dark-danger',
      opsCity: []
    }
  },
  methods: {
    submitForm () {
      const formData = new FormData()
      formData.append("Id", this.field.Id)
      formData.append("Name", this.field.Name)
      if(this.field.IdCity) formData.append("IdCity", this.field.IdCity.Id)

      const config = {
          headers: { 'content-type': 'multipart/form-data' }
      }

      axios.post(this.urlSubmit, formData, config)
      .then( function (res) {
        var resp = res.data

        if(resp.status){

          this.$router.push({
            name: 'master/data-district',
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
      axios.post('/AdminVue/district-edit', {
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

    getCity () {
      axios.post('/AdminVue/district-get-city')
      .then( function (res) {
        // console.log(res.data.data)
        this.opsCity = res.data.data
      }.bind(this))
      .catch( function (e) {
        console.log(e)
        this.opsCity = []
      }.bind(this))
    },

    backIndex() {
      this.$router.push('/RoleAdmin/master/data-district')
    },

    convertSelectBox ({ City, Id }) {
      return `${City}`
    }

  },

  mounted(){

    this.getCity()

    if(this.$route.params.isFormEdit){
      var Id = this.$route.params.Id
      if(Id){
        this.getData(Id)
        this.field.Id = Id
        this.urlSubmit = '/AdminVue/district-update'
        this.headerCard = 'Form / Edit Data Kecamatan'
        this.textBtnSubmit = 'Update'
      }

    }
  },  

}
</script>