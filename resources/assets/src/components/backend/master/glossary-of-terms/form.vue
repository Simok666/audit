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
            <label class="form-label">Group</label>
            <label class="form-label float-right text-danger">*Wajib Diisi</label>
            <b-input name="Group" :state="allErrors.Group?false:null" v-model="field.Group" class="mb-1" required />
            <span class="text-danger" v-if="allErrors.Group">{{ allErrors.Group[0] }}</span>
          </b-form-group>
        
          <b-form-group class="col-md-6">
            <label class="form-label">Terms</label>
            <label class="form-label float-right text-danger">*Wajib Diisi</label>
            <b-input name="Terms" :state="allErrors.Terms?false:null" v-model="field.Terms" class="mb-1" required />
            <span class="text-danger" v-if="allErrors.Terms">{{ allErrors.Terms[0] }}</span>
          </b-form-group>

        </b-form-row>

        <b-form-row>
          <b-form-group class="col-md-12">
            <label class="form-label">Deskripsi</label>
            <label class="form-label float-right text-danger">*Wajib Diisi</label>
            <!-- <b-form-textarea
                    name="Description"
                    v-model="field.Description"
                    rows="3"
                    no-resize required>
            </b-form-textarea> -->
            <quill-editor v-model="field.Description" :options="editorOptions" />
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

<style src="@/vendor/libs/vue-quill-editor/typography.scss" lang="scss"></style>
<style src="@/vendor/libs/vue-quill-editor/editor.scss" lang="scss"></style>

<script>

import moment from 'moment'


export default {
  name: 'form-glossary-of-terms',
  metaInfo: {
    title: 'Form Glossary Of Terms'
  },
  components: {
    quillEditor: () => import('vue-quill-editor/dist/vue-quill-editor').then(m => m.quillEditor).catch(() => {})
  },
  data () {
    return {
      urlSubmit: '/AdminVue/glossary-of-terms-insert',
      headerCard: 'Form / Create Data Glossary Of Terms',
      textBtnSubmit: 'Create',
      field: {
      //   myFile : ''
      },
      allErrors: [],
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
      }
    }
  },
  methods: {
    submitForm () {
      const formData = new FormData()
      formData.append("Id", this.field.Id)
      formData.append("Group", this.field.Group)
      formData.append("Terms", this.field.Terms)
      formData.append("Description", this.field.Description)

      const config = {
          headers: { 'content-type': 'multipart/form-data' }
      }

      axios.post(this.urlSubmit, formData, config)
      .then( function (res) {
        var resp = res.data

        if(resp.status){

          this.$router.push({
            name: 'master/data-glossary-of-terms',
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
      axios.post('/AdminVue/glossary-of-terms-edit', {
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
      this.$router.push('/RoleAdmin/master/data-glossary-of-terms')
    }

  },

  mounted(){

    if(this.$route.params.isFormEdit){
      var Id = this.$route.params.Id
      if(Id){
        this.getData(Id)
        this.field.Id = Id
        this.urlSubmit = '/AdminVue/glossary-of-terms-update'
        this.headerCard = 'Form / Edit Data Glossary Of Terms'
        this.textBtnSubmit = 'Update'
      }

    }
  },  

}
</script>