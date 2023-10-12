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
            <label class="form-label">Position — Department</label>
            <label class="form-label float-right text-danger">*Wajib Diisi</label>
            <multiselect
              v-model="field.IdDepartment"
              :options="opsDepartment"
              :allow-empty="false"
              :show-labels="false"
              placeholder="Pilih Department"
              label="Department"
              :custom-label="labelDepartment"
              track-by="Department" />
            <span class="text-danger" v-if="allErrors.IdDepartment">{{ allErrors.IdDepartment[0] }}</span>
          </b-form-group>

          <b-form-group class="col-md-6">
            <label class="form-label">Nama Karyawan</label>
            <label class="form-label float-right text-danger">*Wajib Diisi</label>
            <b-input name="Name" :state="allErrors.Name?false:null" v-model="field.Name" class="mb-1" required />
            <span class="text-danger" v-if="allErrors.Name">{{ allErrors.Name[0] }}</span>
          </b-form-group>
        </b-form-row>

        <b-form-row>
          <b-form-group class="col-md-4">
            <label class="form-label">NIP</label>
            <b-input name="NIP" :state="allErrors.NIP?false:null" v-model="field.NIP" class="mb-1" type="number" />
            <span class="text-danger" v-if="allErrors.NIP">{{ allErrors.NIP[0] }}</span>
          </b-form-group>

          <b-form-group class="col-md-4">
            <label class="form-label">Email</label>
            <b-input name="Email" :state="allErrors.Email?false:null" v-model="field.Email" class="mb-1" />
            <span class="text-danger" v-if="allErrors.Email">{{ allErrors.Email[0] }}</span>
          </b-form-group>

          <b-form-group class="col-md-4">
            <label class="form-label">Hak Akses User</label>
            <label class="form-label float-right text-danger">*Wajib Diisi</label>
            <multiselect
              v-model="field.TypeUser"
              :options="opsTypeUser"
              :allow-empty="false"
              :show-labels="false"
              placeholder="Pilih Type User"
              label="TypeUser"
              track-by="TypeUser" />
            <span class="text-danger" v-if="allErrors.TypeUser">{{ allErrors.TypeUser[0] }}</span>
          </b-form-group>

        </b-form-row>

        <b-form-row>
          <b-form-group class="col-md-6">
            <label class="form-label">User Name</label>
            <label class="form-label float-right text-danger">*Wajib Diisi</label>
            <b-input name="UserName" :state="allErrors.UserName?false:null" v-model="field.UserName" class="mb-1" required />
            <span class="text-danger" v-if="allErrors.UserName">{{ allErrors.UserName[0] }}</span>
          </b-form-group>

          <b-form-group class="col-md-6">
            <label class="form-label">Password</label>
            <label class="form-label float-right text-danger">*Wajib Diisi</label>
            <b-input name="Password" :state="allErrors.Password?false:null" v-model="field.Password" class="mb-1" type="password" @input="maskPassword" :required="isFormCreate" />
            <span class="text-danger" v-if="allErrors.Password">{{ allErrors.Password[0] }}</span>
          </b-form-group>
        </b-form-row>

        <b-form-row>
          <b-form-group class="col-md-6">
            <label class="form-label float-right text-danger">*Wajib Diisi</label>
            <b-form-checkbox
              id="checkbox-1"
              v-model="field.isApproved"
              name="checkbox-1"
              value="1"
              unchecked-value="0"
            >
              Approved
            </b-form-checkbox>
            <span class="text-danger" v-if="allErrors.isApproved">{{ allErrors.isApproved[0] }}</span>
          </b-form-group>
          
          <b-form-group class="col-md-6">
            <label class="form-label float-right text-danger">*Wajib Diisi</label>
            <b-form-checkbox
              id="checkbox-2"
              v-model="field.Actived"
              name="checkbox-2"
              value="1"
              unchecked-value="0"
            >
              Active User
            </b-form-checkbox>
            <span class="text-danger" v-if="allErrors.Actived">{{ allErrors.Actived[0] }}</span>
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
  name: 'form-user-employee',
  metaInfo: {
    title: 'Form User Karyawan'
  },
  components: {
    
  },
  data () {
    return {
      urlSubmit: '/AdminVue/user-employee-insert',
      headerCard: 'Form / Create Data User Karyawan',
      textBtnSubmit: 'Create',
      field: {
        // myFile : ''
        isApproved: 0,
        Actived: 0
      },
      allErrors: [],
      isNotif: false,
      isFormCreate: true,
      alertNotif: '',
      alertVariant: 'alert-dark-danger',
      opsDepartment: [],
      opsCity: [],
      opsTypeUser: [],
      maskedPassword: '',
      isCheckedApproval: false,
      isCheckedActived: false
      
    }
  },
  methods: {
    maskPassword() {
      this.maskedPassword = '*'.repeat(this.field.Password.length);
    },

    submitForm () {
      const formData = new FormData()
      formData.append("Id", this.field.Id)
      if(this.field.IdDepartment) formData.append("IdDepartment", this.field.IdDepartment.IdDepartment)
      if(this.field.IdDepartment) formData.append("IdPosition", this.field.IdDepartment.IdPosition)
      formData.append("Name", this.field.Name)
      formData.append("NIP", this.field.NIP)
      formData.append("Email", this.field.Email)
      
      if(this.field.TypeUser) formData.append("TypeUser", this.field.TypeUser.Id)
      formData.append("UserName", this.field.UserName)
      if(this.field.Password) formData.append("Password", this.field.Password)
      formData.append("Approval", this.field.isApproved)
      formData.append("Actived", this.field.Actived)
      const config = {
          headers: { 'content-type': 'multipart/form-data' }
      }

      axios.post(this.urlSubmit, formData, config)
      .then( function (res) {
        var resp = res.data

        if(resp.status){

          this.$router.push({
            name: 'master/data-user-employee',
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
      axios.post('/AdminVue/user-employee-edit', {
        Id:Id,
      })
      .then( function (res) {
        var resp = res.data
        console.log(resp.data)
        this.field = resp.data
      }.bind(this))
      .catch( function (e) {
        console.log(e)
        this.isNotif = true
        this.alertNotif = 'Invalid Server Side!'
        this.alertVariant = 'alert-dark-danger'
      }.bind(this))
    },

    getDepartment () {
      axios.post('/AdminVue/user-get-department')
      .then( function (res) {
        // console.log(res.data.data)
        this.opsDepartment = res.data.data
      }.bind(this))
      .catch( function (e) {
        console.log(e)
        this.opsDepartment = []
      }.bind(this))
    },

    getCity () {
      axios.post('/AdminVue/user-get-city')
      .then( function (res) {
        // console.log(res.data.data)
        this.opsCity = res.data.data
      }.bind(this))
      .catch( function (e) {
        console.log(e)
        this.opsCity = []
      }.bind(this))
    },

    getTypeUser () {
      axios.post('/AdminVue/user-get-type-user')
      .then( function (res) {
        // console.log(res.data.data)
        this.opsTypeUser = res.data.data
      }.bind(this))
      .catch( function (e) {
        console.log(e)
        this.opsTypeUser = []
      }.bind(this))
    },

    labelDepartment ({Position, Department}) {
      return `${Position} — ${Department}`
    },

    backIndex() {
      this.$router.push('/RoleAdmin/master/data-user-employee')
    },

  },

  mounted(){

    this.getDepartment()
    // this.getCity()
    this.getTypeUser()

    if(this.$route.params.isFormEdit){
      this.isFormCreate = false
      var Id = this.$route.params.Id
      if(Id){
        this.getData(Id)
        this.field.Id = Id
        this.urlSubmit = '/AdminVue/user-employee-update'
        this.headerCard = 'Form / Edit Data User Karyawan'
        this.textBtnSubmit = 'Update'
      }

    }
  },  

}
</script>