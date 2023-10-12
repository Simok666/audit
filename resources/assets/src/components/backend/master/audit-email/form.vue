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
              <label class="form-label">Id Audit</label>
              <label class="form-label float-right text-danger">*Wajib Diisi</label>
              <multiselect
                v-model="field.idAudit"
                :options="opsAuditPlane"
                :allow-empty="false"
                :show-labels="false"
                placeholder="Pilih Audit"
                label="NoTrans"
                track-by="NoTrans" />
              <span class="text-danger" v-if="allErrors.idAudit">{{ allErrors.idAudit[0] }}</span>
            </b-form-group>
  
          </b-form-row>
  
          <b-form-row>
            <b-form-group class="col-md-12">
              <label class="form-label">From</label>
              <b-input name="from" :state="allErrors.from?false:null" v-model="field.from" class="mb-1" required />
              <span class="text-danger" v-if="allErrors.from">{{ allErrors.from[0] }}</span>
            </b-form-group>
          </b-form-row>
  
          <b-form-row>
              <b-form-group class="col-md-12">
                  <label class="form-label">To</label>
                  <label class="form-label float-right text-danger">*Wajib Diisi</label>
                  <b-input name="to" :state="allErrors.to?false:null" v-model="field.to" class="mb-1" required />
                  <span class="text-danger" v-if="allErrors.to">{{ allErrors.to[0] }}</span>
              </b-form-group>
          </b-form-row>

          <b-form-row>
              <b-form-group class="col-md-12">
                  <label class="form-label">Cc</label>
                  <label class="form-label float-right text-danger">*Wajib Diisi</label>
                  <b-input name="cc" :state="allErrors.cc?false:null" v-model="field.cc" class="mb-1" required />
                  <span class="text-danger" v-if="allErrors.cc">{{ allErrors.cc[0] }}</span>
              </b-form-group>
          </b-form-row>

          <b-form-row>
              <b-form-group class="col-md-12">
                  <label class="form-label">Subject</label>
                  <label class="form-label float-right text-danger">*Wajib Diisi</label>
                  <b-input name="subject" :state="allErrors.subject?false:null" v-model="field.subject" class="mb-1" required />
                  <span class="text-danger" v-if="allErrors.subject">{{ allErrors.subject[0] }}</span>
              </b-form-group>
          </b-form-row>
  
          <b-form-row>
              <b-form-group class="col-md-12">
                  <label>Content</label>
                  <quill-editor v-model="field.content" :options="editorOptions" />
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

  <style src="@/vendor/libs/vue-quill-editor/typography.scss" lang="scss"></style>
  <style src="@/vendor/libs/vue-quill-editor/editor.scss" lang="scss"></style>
  
  <script>
  
  import moment from 'moment'
  
  export default {
    name: 'form-email-template',
    metaInfo: {
      title: 'Form Template Email'
    },
    components: {
      quillEditor: () => import('vue-quill-editor/dist/vue-quill-editor').then(m => m.quillEditor).catch(() => {})
    },
    data () {
      return {
        urlSubmit: '/AdminVue/email-template-insert',
        headerCard: 'Form / Create Data Audit Template Email',
        textBtnSubmit: 'Create',
        field: {
        //   myFile : ''
        },
        configs: {
          spellChecker: false
        },
        allErrors: [],
        
        opsOrganizer:[],
        opsAuditPlane:[],
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
        formData.append("idAudit", this.field.idAudit.Id)
        formData.append("from", this.field.Category.value)
        formData.append("to", this.field.to)
        formData.append("cc", this.field.cc)
        formData.append("subject", this.field.subject)
        formData.append("content", this.field.content)
  
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
          this.opsAuditPlane = res.data.auditplan
        }.bind(this))
        .catch( function (e) {
          console.log(e)
          this.opsAuditPlane = []
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