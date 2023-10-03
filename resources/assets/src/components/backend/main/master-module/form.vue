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
            <label class="form-label">Parent</label>
            <multiselect
              v-model="field.IdParent"
              :options="opsParent"
              :allow-empty="true"
              :show-labels="false"
              placeholder="Pilih Parent"
              label="Parent"
              track-by="Parent" />
            <span class="text-danger" v-if="allErrors.IdParent">{{ allErrors.IdParent[0] }}</span>
          </b-form-group>

          <b-form-group class="col-md-6">
            <label class="form-label">Nama Modul</label>
            <label class="form-label float-right text-danger">*Wajib Diisi</label>
            <b-input name="Name" :state="allErrors.Name?false:null" v-model="field.Name" class="mb-1" required />
            <span class="text-danger" v-if="allErrors.Name">{{ allErrors.Name[0] }}</span>
          </b-form-group>
        </b-form-row>

        <b-form-row>
          <b-form-group class="col-md-6">
            <label class="form-label">Deskripsi</label>
            <b-textarea name="Description" :state="allErrors.Description?false:null" v-model="field.Description" class="mb-1" row="3" />
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



export default {
  name: 'form-master-module',
  metaInfo: {
    title: 'Form Master Module'
  },
  components: {
    
  },
  data () {
    return {
      urlSubmit: '/AdminVue/master-module-insert',
      headerCard: 'Form / Create Data Master Module',
      textBtnSubmit: 'Create',
      field: {
        // myFile : ''
      },
      allErrors: [],
      isNotif: false,
      alertNotif: '',
      alertVariant: 'alert-dark-danger',
      opsParent: []
    }
  },
  methods: {
    submitForm () {
      const formData = new FormData()
      if(this.field.IdParent) this.field.IdParent = this.field.IdParent.Id
      else this.field.IdParent = 0
      formData.append("Id", this.field.Id)
      formData.append("Parent", this.field.IdParent)
      formData.append("Name", this.field.Name)
      formData.append("Description", this.field.Description)

      const config = {
          headers: { 'content-type': 'multipart/form-data' }
      }

      axios.post(this.urlSubmit, formData, config)
      .then( function (res) {
        var resp = res.data

        if(resp.status){

          this.$router.push({
            name: 'main/master-module',
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
      axios.post('/AdminVue/master-module-edit', {
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

    getParent () {
      axios.post('/AdminVue/master-module-get-parent')
      .then( function (res) {
        this.opsParent = res.data.data
      }.bind(this))
      .catch( function (e) {
        console.log(e)
        this.opsParent = []
      }.bind(this))
    },

    backIndex() {
      this.$router.push('/RoleAdmin/main/master-module')
    },

    convertSelectBox ({ Parent, Id }) {
      return `${Parent}`
    }

  },

  mounted(){

    this.getParent()

    if(this.$route.params.isFormEdit){
      var Id = this.$route.params.Id
      if(Id){
        this.getData(Id)
        this.field.Id = Id
        this.urlSubmit = '/AdminVue/master-module-update'
        this.headerCard = 'Form / Edit Data Master Module'
        this.textBtnSubmit = 'Update'
      }

    }
  },  

}
</script>