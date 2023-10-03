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
            <label class="form-label">Approval</label>
            <label class="form-label float-right text-danger">*Wajib Diisi</label>
            <multiselect
                v-model="field.Approve"
                :options="opsEmployee"
                :allow-empty="false"
                :show-labels="false"
                placeholder="Pilih Approval"
                label="Name"
                track-by="Name" />
            <span class="text-danger" v-if="allErrors.Division">{{ allErrors.Division[0] }}</span>
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

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style src="@/vendor/libs/vue-multiselect/vue-multiselect.scss" lang="scss"></style>

<script>

import moment from 'moment'
import Multiselect from 'vue-multiselect'


export default {
  name: 'form-departement',
  metaInfo: {
    title: 'Form Approve Auditor Team'
  },
  components: {
    Datepicker,
    Multiselect
  },
  data () {
    return {
      urlSubmit: '/AdminVue/auditor-team-approval',
      headerCard: 'Form / Approve Data Audit Plan',
      textBtnSubmit: 'Approve',
      field: {
      //   myFile : ''
      },
      allErrors: [],
      opsEmployee:[],
      isNotif: false,
      alertNotif: '',
      alertVariant: 'alert-dark-danger'
    }
  },
  methods: {
    submitForm () {
      const formData = new FormData()
      formData.append("Id", this.field.Id)
      formData.append("Approve", this.field.Approve.Id)

      const config = {
          headers: { 'content-type': 'multipart/form-data' }
      }

      axios.post(this.urlSubmit, formData, config)
      .then( function (res) {
        var resp = res.data

        if(resp.status){

          this.$router.push({
            name: 'audit/data-auditor-team',
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

    getSelect (IdEmploye) {
      axios.post('/AdminVue/auditor-team-getApproval',{
        IdEmploye:IdEmploye
      })
      .then( function (res) {
        this.opsEmployee = res.data.employee
      }.bind(this))
      .catch( function (e) {
        console.log(e)
        this.opsEmployee = []
      }.bind(this))
    },

    getData (Id) {
      axios.post('/AdminVue/department-edit', {
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
      this.$router.push('/RoleAdmin/audit/data-auditor-team')
    }

  },

  mounted(){
    if(this.$route.params.Id){
      var Id = this.$route.params.Id
      this.field.Id = Id
    }
    this.getSelect()
  },  

}
</script>