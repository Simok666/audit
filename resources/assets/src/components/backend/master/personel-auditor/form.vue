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
            <label class="form-label">Klasifikasi</label>
            <label class="form-label float-right text-danger">*Wajib Diisi</label>
            <multiselect
            v-model="field.Category"
            :options="opsCategory"
            :allow-empty="false"
            :preselect-first="true"
            :show-labels="false"
            @select="getClassification"
            placeholder="Pilih Klasifikasi"
            label="text"
            track-by="text" />
            <span class="text-danger" v-if="allErrors.Category">{{ allErrors.Category[0] }}</span>
          </b-form-group>

          <b-form-group class="col-md-4">
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
                track-by="Name" v-if="isSelect == true" />
            <b-input name="Name" :state="allErrors.Name?false:null" v-model="field.Name" class="mb-1" v-if="isSelect == false"/>
            <span class="text-danger" v-if="allErrors.Name">{{ allErrors.Name[0] }}</span>
          </b-form-group>

          <b-form-group class="col-md-4">
            <label class="form-label">NIK/NIP</label>
            <b-input name="NIP" :state="allErrors.NIP?false:null" v-model="field.NIP" class="mb-1" type="number" :readonly="isReadOnly" />
            <span class="text-danger" v-if="allErrors.NIK">{{ allErrors.NIK[0] }}</span>
          </b-form-group>

        </b-form-row>

        <b-form-row>
            <b-form-group class="col-md-4">
              <label class="form-label">Departement</label>
              <label class="form-label float-right text-danger">*Wajib Diisi</label>
              <multiselect
                v-model="field.Department"
                :options="opsDepartement"
                :allow-empty="false"
                :show-labels="false"
                placeholder="Pilih Departement"
                @select="getPositionSelect"
                label="Department"
                track-by="Department" v-if="isSelect == true"/>
              <b-input name="DepartmentName" :state="allErrors.DepartmentName?false:null" v-model="field.DepartmentName" class="mb-1" v-if="isSelect == false"/>
              <span class="text-danger" v-if="allErrors.Departement">{{ allErrors.Departement[0] }}</span>
            </b-form-group>

            <b-form-group class="col-md-4">
                <label class="form-label">Position</label>
                <label class="form-label float-right text-danger">*Wajib Diisi</label>
                <multiselect
                v-model="field.Position"
                :options="opsPosition"
                :show-labels="false"
                :placeholder="placeholdertext"
                @select="getPositionId"
                label="Name"
                track-by="Name" v-if="isSelect == true"/>
                <b-input name="PositionName" :state="allErrors.PositionName?false:null" v-model="field.PositionName" class="mb-1" v-if="isSelect == false"/>
                <span class="text-danger" v-if="allErrors.Position">{{ allErrors.Position[0] }}</span>
            </b-form-group>

            <b-form-group class="col-md-4">
                <label class="form-label">Email</label>
                <label class="form-label float-right text-danger">*Wajib Diisi</label>
                <b-input name="Email" :state="allErrors.Email?false:null" v-model="field.Email" class="mb-1" required />
                <span class="text-danger" v-if="allErrors.Email">{{ allErrors.Email[0] }}</span>
            </b-form-group>

        </b-form-row>

        <b-form-row>

          <b-form-group class="col-md-6">
            <label class="form-label">Type</label>
            <label class="form-label float-right text-danger">*Wajib Diisi</label>
            <multiselect
            v-model="field.Type"
            :options="opsType"
            :allow-empty="false"
            :preselect-first="true"
            :show-labels="false"
            placeholder="Pilih Type"
            label="text"
            track-by="text" />
            <span class="text-danger" v-if="allErrors.Type">{{ allErrors.Type[0] }}</span>
          </b-form-group>

          <b-form-group class="col-md-6">
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
  name: 'form-personel-auditor',
  metaInfo: {
    title: 'Form Personel Auditor'
  },
  components: {

  },
  data () {
    return {
      urlSubmit: '/AdminVue/personel-auditor-insert',
      headerCard: 'Form / Create Data Personel Auditor',
      textBtnSubmit: 'Create',
      field: {
      //   myFile : ''
      NIK:'',
      Position:'',
      Department:'',
      IdEmploye:0,
      IdDepartment:0,
      IdPosition:0
      },
      allErrors: [],
      opsType:[{'value':'Auditor','text':'Auditor'},{'value':'Auditee','text':'Auditee'},{'value':'Observer','text':'Observer'}],
      opsCategory:[{'value':1,'text':'Internal'},{'value':2,'text':'Eksternal'}],
      opsStatus:[{'value':1,'text':'Aktif'},{'value':0,'text':'Tidak Aktif'}],
      opsEmployee:[],
      opsDepartement:[],
      opsPosition:[],
      placeholdertext:'Pilih Departement Terlebih Dahulu',
      isNotif: false,
      isReadOnly:true,
      isSelect:true,
      alertNotif: '',
      alertVariant: 'alert-dark-danger'
    }
  },
  methods: {
    submitForm () {
      const formData = new FormData()
      formData.append("Id", this.field.Id)
      formData.append("IdDepartment", this.field.IdDepartment)
      formData.append("IdEmploye", this.field.IdEmploye)
      formData.append("NIP", this.field.NIP)
      formData.append("Name", this.field.Name)
      formData.append("Department", this.field.DepartmentName)
      formData.append("Position", this.field.PositionName)
      formData.append("Category", this.field.Category.value)
      formData.append("IdPosition", this.field.IdPosition)
      formData.append("Type", this.field.Type.value)
      formData.append("Status", this.field.Status.value)
      formData.append("Email", this.field.Email)

      const config = {
          headers: { 'content-type': 'multipart/form-data' }
      }

      axios.post(this.urlSubmit, formData, config)
      .then( function (res) {
        var resp = res.data

        if(resp.status){

          this.$router.push({
            name: 'master/data-personel-auditor',
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
      axios.post('/AdminVue/personel-auditor-edit', {
        Id:Id,
      })
      .then( function (res) {
        var resp = res.data
        this.field = resp.data
        if(this.field.Categoryvalue == 1){
          this.isReadOnly = true
          this.isSelect = true
        }else{
          this.isReadOnly = false
          this.isSelect = false
        }
        this.getPosition(this.field.IdDepartment,true)
        this.getSelect(this.field.IdEmploye)
      }.bind(this))
      .catch( function (e) {
        console.log(e)
        this.isNotif = true
        this.alertNotif = 'Invalid Server Side!'
        this.alertVariant = 'alert-dark-danger'
      }.bind(this))
    },

    getSelect (IdEmploye) {
      axios.post('/AdminVue/personel-auditor-getSelect',{
        IdEmploye:IdEmploye
      })
      .then( function (res) {
        this.opsEmployee = res.data.employee
        this.opsDepartement = res.data.departement
      }.bind(this))
      .catch( function (e) {
        console.log(e)
        this.opsEmployee = []
        this.opsDepartement = []
      }.bind(this))
    },

    getPosition(Id,statusEdit,statusSelectEmployee=false,IdPosition=null,Position=null){
      axios.post('/AdminVue/personel-auditor-getPosition',{
        IdDepartment:Id
      })
      .then( function (res) {
        this.opsPosition = res.data.position
        if(statusEdit == false){
          this.placeholdertext = 'Pilih Posisition'
          this.field.Position = ''
        }

        if(statusSelectEmployee == true){
          this.field.Position = [{'Id':IdPosition,'Name':Position}]
          this.field.IdPosition = IdPosition
          this.field.PositionName = Position
        }
      }.bind(this))
      .catch( function (e) {
        console.log(e)
        this.opsPosition = []
      }.bind(this))
    },

    getEmployeeNip(option){
      this.field.NIP = option.NIP
      this.field.IdEmploye = option.Id
      this.field.Name = option.Name
      this.field.Email = option.Email
      this.field.Department = [{'Id':option.IdDepartment,'Department':option.Department}]
      this.field.IdDepartment = option.Id
      this.field.DepartmentName = option.Department
      this.getPosition(option.IdDepartment,false,true,option.IdPosition,option.Position)
    },

    getPositionSelect(option){
      this.field.IdDepartment = option.Id
      this.field.DepartmentName = option.Department
      this.getPosition(option.Id,false)
    },

    getPositionId(option){
      this.field.IdPosition = option.Id
      this.field.PositionName = option.Name
    },

    backIndex() {
      this.$router.push('/RoleAdmin/master/data-personel-auditor')
    },

    getClassification(option){
      if(option.text == 'Internal'){
        this.isReadOnly = true
        this.isSelect = true
      }else{
        this.isReadOnly = false
        this.isSelect = false
      }
    }

  },

  mounted(){

    if(this.$route.params.isFormEdit){
      var Id = this.$route.params.Id
      if(Id){
        this.getData(Id)
        this.field.Id = Id
        this.urlSubmit = '/AdminVue/personel-auditor-update'
        this.headerCard = 'Form / Edit Data Personel Auditor'
        this.textBtnSubmit = 'Update'
      }
    }else{
      this.getSelect(this.field.IdEmploye)
    }
  },  

}
</script>