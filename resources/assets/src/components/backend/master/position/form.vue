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
            <label class="form-label">Code</label>
            <label v-if="isShow == false" class="form-label float-right text-danger">*Wajib Diisi</label>
            <b-input name="Code" :state="allErrors.Code?false:null" v-model="field.Code" class="mb-1" required :readonly="isShow" />
            <span class="text-danger" v-if="allErrors.Code">{{ allErrors.Code[0] }}</span>
          </b-form-group>

          <b-form-group class="col-md-4">
            <label class="form-label">Divisi</label>
            <!-- <label v-if="isShow == false" class="form-label float-right text-danger">*Wajib Diisi</label> -->
            <multiselect
              v-model="field.Division"
              :options="opsDivision"
              :allow-empty="false"
              :show-labels="false"
              placeholder="Pilih Divisi"
              label="Department"
              track-by="Department"
              :disabled="isShow" />
            <span class="text-danger" v-if="allErrors.Division">{{ allErrors.Division[0] }}</span>
          </b-form-group>

          <b-form-group class="col-md-4">
            <label class="form-label">Departement</label>
            <!-- <label v-if="isShow == false" class="form-label float-right text-danger">*Wajib Diisi</label> -->
            <multiselect
              v-model="field.Departement"
              :options="opsDepartment"
              @input="getParent"
              :show-labels="false"
              placeholder="Pilih Departement"
              label="Department"
              track-by="Department"
              :disabled="isShow" />
            <span class="text-danger" v-if="allErrors.IdDepartment">{{ allErrors.IdDepartment[0] }}</span>
          </b-form-group>

        </b-form-row>

        <b-form-row>
          <b-form-group class="col-md-6">
            <label class="form-label">Parent Position</label>
            <multiselect
              v-model="field.Parent"
              :options="opsParent"
              :allow-empty="true"
              :show-labels="false"
              placeholder="Pilih Department Dahulu"
              label="Name"
              track-by="Name"
              :disabled="isShow" />
            <span class="text-danger" v-if="allErrors.Parent">{{ allErrors.Parent[0] }}</span>
          </b-form-group>

          <b-form-group class="col-md-3">
            <label class="form-label">Position</label>
            <label v-if="isShow == false" class="form-label float-right text-danger">*Wajib Diisi</label>
            <b-input name="Name" :state="allErrors.Name?false:null" v-model="field.Name" class="mb-1" required :readonly="isShow" />
            <span class="text-danger" v-if="allErrors.Name">{{ allErrors.Name[0] }}</span>
          </b-form-group>
          <b-form-group class="col-md-3">
            <label class="form-label">Email</label>
            <b-input name="Email" :state="allErrors.Email?false:null" v-model="field.Email" class="mb-1" :readonly="isShow" />
            <span class="text-danger" v-if="allErrors.Email">{{ allErrors.Email[0] }}</span>
          </b-form-group>
        </b-form-row>

        <!--<b-form-row>-->
          <!--<b-form-group class="col-md-6">-->
            <!--<label class="form-label">JobDesk</label>-->
            <!--<b-form-textarea-->
                <!--name="JobDesk"-->
                <!--v-model="field.JobDesk"-->
                <!--rows="3"-->
                <!--no-resize-->
                <!--:readonly="isShow">-->
            <!--</b-form-textarea>-->
            <!--<span class="text-danger" v-if="allErrors.JobDesk">{{ allErrors.JobDesk[0] }}</span>-->
          <!--</b-form-group>-->


        <!--</b-form-row>-->

        <!--<b-form-row>-->
           <!--<b-form-group class="col-md-6">-->
            <!--<label class="form-label">Keterangan</label>-->
           <!--<b-form-textarea-->
                <!--name="Remarks"-->
                <!--v-model="field.Remarks"-->
                <!--rows="3"-->
                <!--no-resize-->
                <!--:readonly="isShow">-->
            <!--</b-form-textarea>-->
            <!--<span class="text-danger" v-if="allErrors.Remarks">{{ allErrors.Remarks[0] }}</span>-->
          <!--</b-form-group>-->
        <!--</b-form-row>-->

        <b-form-row>
          <b-form-group class="col-md-6"></b-form-group>
          <b-form-group label="" class="col-md-6">
            <b-btn v-if="isShow == false" type="submit" variant="primary" class="float-right ml-2">{{textBtnSubmit}}</b-btn>
            <b-btn type="button" variant="secondary" @click="backIndex()" class="float-right">Back</b-btn>
          </b-form-group>
        </b-form-row>
      </form>


    </b-card>

  </div>
</template>

<script>

export default {
  name: 'form-position',
  metaInfo: {
    title: 'Form Position'
  },
  components: {

  },
  data () {
    return {
      urlSubmit: '/AdminVue/position-insert',
      headerCard: 'Form / Create Data Position',
      textBtnSubmit: 'Create',
      field: {
      //   myFile : ''
        JobDesk:'',
        Email:'',
        Remarks:''
      },
      allErrors: [],
      opsParent:[],
      opsDepartment:[],
      opsDivision:[],
      isNotif: false,
      alertNotif: '',
      alertVariant: 'alert-dark-danger',
      isShow: false
    }
  },
  methods: {
    submitForm () {
      const formData = new FormData()
      if(this.field.Parent) this.field.Parent = this.field.Parent.Id
      else this.field.Parent = 0
      formData.append("Id", this.field.Id)
      if(this.field.Departement) formData.append("IdDepartment", this.field.Departement.Id)
      else formData.append("IdDepartment", 0)
      if(this.field.Division) formData.append("IdDivision", this.field.Division.Id)
      else formData.append("IdDivision", 0)
      formData.append("Parent", this.field.Parent)
      formData.append("Code", this.field.Code)
      formData.append("Name", this.field.Name)
      formData.append("JobDesk", this.field.JobDesk)
      formData.append("Remarks", this.field.Remarks)
      formData.append("Email", this.field.Email)

      const config = {
          headers: { 'content-type': 'multipart/form-data' }
      }

      axios.post(this.urlSubmit, formData, config)
      .then( function (res) {
        var resp = res.data

        if(resp.status){

          this.$router.push({
            name: 'master/data-position',
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
      axios.post('/AdminVue/position-edit', {
        Id:Id,
      })
      .then( function (res) {
        var resp = res.data
        this.field = resp.data
        if(this.field.IdDepartment != 0){
          this.getParent(null, 1)
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
      axios.post('/AdminVue/position-getSelect',{
      })
      .then( function (res) {
        this.opsDepartment = res.data.departement
        this.opsDivision = res.data.division
      }.bind(this))
      .catch( function (e) {
        console.log(e)
        this.opsParent = []
        this.opsDepartment= []
      }.bind(this))
    },

    getParent (value, mode=0) {
      if(mode==0) var id = value.Id
      else var id = this.field.Departement.Id
      var idPosition = 0
      if(this.field.Id) idPosition = this.field.Id

      axios.post('/AdminVue/position-getParent',{
        IdPosition: idPosition,
        IdDepartment: id
      })
      .then( function (res) {
        this.opsParent = res.data.parent
      }.bind(this))
      .catch( function (e) {
        console.log(e)
        this.opsParent = []
      }.bind(this))
    },

    backIndex() {
      this.$router.push('/RoleAdmin/master/data-position')
    }

  },

  mounted(){

    if(this.$route.params.isFormEdit){
      var Id = this.$route.params.Id
      if(Id){
        this.getData(Id)
        this.field.Id = Id
        this.urlSubmit = '/AdminVue/position-update'
        this.headerCard = 'Form / Edit Data Position'
        this.textBtnSubmit = 'Update'
      }
    }
    if(this.$route.params.isShow){
      this.isShow = this.$route.params.isShow
      var Id = this.$route.params.Id
      if(Id){
        this.getData(Id)
        this.field.Id = Id
        this.headerCard = 'Show Data Position'
      }
    }
    this.getSelect()
  },

}
</script>
