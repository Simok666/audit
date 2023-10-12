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
            <label class="form-label">Organizer</label>
            <label class="form-label float-right text-danger">*Wajib Diisi</label>
            <multiselect
              v-model="field.Organizer"
              :options="opsOrganizer"
              :allow-empty="false"
              :show-labels="false"
              placeholder="Pilih Organizer"
              label="Name"
              track-by="Name" />
            <span class="text-danger" v-if="allErrors.Organizer">{{ allErrors.Organizer[0] }}</span>
          </b-form-group>

        </b-form-row>

        <b-form-row>
          <b-form-group class="col-md-12">
            <label class="form-label">Kategori</label>
            <!-- <label class="form-label float-right text-danger">*Wajib Diisi</label> -->
            <multiselect
              v-model="field.Category"
              :options="opsCategory"
              :allow-empty="false"
              :show-labels="false"
              placeholder="Pilih Kategori"
              label="text"
              track-by="text" />
            <span class="text-danger" v-if="allErrors.Category">{{ allErrors.Category[0] }}</span>
          </b-form-group>
        </b-form-row>

        <b-form-row>
            <b-form-group class="col-md-12">
                <label class="form-label">Subject</label>
                <label class="form-label float-right text-danger">*Wajib Diisi</label>
                <b-input name="Subject" :state="allErrors.Subject?false:null" v-model="field.Subject" class="mb-1" required />
                <span class="text-danger" v-if="allErrors.Subject">{{ allErrors.Subject[0] }}</span>
            </b-form-group>
        </b-form-row>

        <b-form-row>
            <b-form-group class="col-md-12">
                <label>Body</label>
                <quill-editor v-model="field.Body" :options="editorOptions" />
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

<!-- <style src="simplemde/dist/simplemde.min.css"></style>
<style src="@/vendor/libs/vue-simplemde/vue-simplemde.scss" lang="scss"></style> -->
<style src="@/vendor/libs/vue-quill-editor/typography.scss" lang="scss"></style>
<style src="@/vendor/libs/vue-quill-editor/editor.scss" lang="scss"></style>

<script>
//
// Vue Simplemde
//

// const isIE10 = typeof document.documentMode === 'number' && document.documentMode === 10

// /* eslint-disable */

// // Dirty hack to prevent fatal error in IE 10
// if (isIE10) {
//   Uint8Array.prototype.foo = function () { return 42 }
// }

// const markdownEditor = require('vue-simplemde/src/index').default

// if (isIE10) {
//   delete Uint8Array.prototype.foo
//   Uint8Array.prototype.foo = undefined
// }
//

import moment from 'moment'
// import 'codemirror/addon/edit/continuelist.js';
export default {
  name: 'form-email-template',
  metaInfo: {
    title: 'Form Template Email'
  },
  components: {
    // markdownEditor,
    quillEditor: () => import('vue-quill-editor/dist/vue-quill-editor').then(m => m.quillEditor).catch(() => {})
  },
  data () {
    return {
      urlSubmit: '/AdminVue/email-template-insert',
      headerCard: 'Form / Create Data Template Email',
      textBtnSubmit: 'Create',
      field: {
      //   myFile : ''
      },
      configs: {
        spellChecker: false
      },
      allErrors: [],
      opsType:[{'value':'Auditor','text':'Auditor'},{'value':'Auditee','text':'Auditee'},{'value':'Observer','text':'Observer'}],
      opsCategory:[
        {'value':'Persetujuan Audit Plan','text':'Persetujuan Audit Plan'},
        {'value':'Persetujuan Auditor Team','text':'Persetujuan Auditor Team'},
        {'value':'Jadwal Auditor Team','text':'Jadwal Auditor Team'},
        {'value':'Persetujuan Audit Report','text':'Persetujuan Audit Report'},
        {'value':'Persetujuan Plan Capa','text':'Persetujuan Plan Capa'},
        {'value':'Persetujuan Verification Capa','text':'Persetujuan Verification Capa'}
      ],
      opsOrganizer:[],
      opsPosition:[],
      formatDate: 'dd/MM/yyyy',
      isNotif: false,
      alertNotif: '',
      alertVariant: 'alert-dark-danger',
      editorContent: '',
      bubbleEditorContent: '',

      editorOptions: {
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }, { font: [] }, { size: [] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ align: [] }],
            ['link', 'video']
          ]
        }
      },
    }
  },
  methods: {
    submitForm () {
      const formData = new FormData()
      formData.append("Id", this.field.Id)
      formData.append("IdOrganizer", this.field.Organizer.Id)
      formData.append("Category", this.field.Category.value)
      formData.append("Subject", this.field.Subject)
      formData.append("Body", this.field.Body)

      const config = {
          headers: { 'content-type': 'multipart/form-data' }
      }

      axios.post(this.urlSubmit, formData, config)
      .then( function (res) {
        var resp = res.data

        if(resp.status){

          this.$router.push({
            name: 'master/data-email-template',
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
      axios.post('/AdminVue/email-template-edit', {
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

    getSelect(){
      axios.post('/AdminVue/email-template-getSelect')
      .then( function (res) {
        this.opsOrganizer = res.data.organizer
      }.bind(this))
      .catch( function (e) {
        console.log(e)
        this.opsOrganizer = []
      }.bind(this))
    },

    backIndex() {
      this.$router.push('/RoleAdmin/master/data-email-template')
    }

  },

  mounted(){

    if(this.$route.params.isFormEdit){
      var Id = this.$route.params.Id
      if(Id){
        this.getData(Id)
        this.field.Id = Id
        this.urlSubmit = '/AdminVue/email-template-update'
        this.headerCard = 'Form / Edit Data Template Email'
        this.textBtnSubmit = 'Update'
      }

    }
    this.getSelect()
  },  

}
</script>