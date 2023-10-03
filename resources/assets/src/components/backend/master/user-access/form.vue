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
            <label class="form-label">Nama Hak Akses User</label>
            <label class="form-label float-right text-danger">*Wajib Diisi</label>
            <b-input name="Name" :state="allErrors.Name?false:null" v-model="field.Name" class="mb-1" required />
            <span class="text-danger" v-if="allErrors.Name">{{ allErrors.Name[0] }}</span>
          </b-form-group>

          <b-form-group class="col-md-6">
            <label class="form-label">Deskripsi</label>
            <b-textarea name="Description" :state="allErrors.Description?false:null" v-model="field.Description" class="mb-1" row="3" />
            <span class="text-danger" v-if="allErrors.Description">{{ allErrors.Description[0] }}</span>
          </b-form-group>
        </b-form-row>

        <div id="tree-akses">
          <v-jstree
          :data="treeData"
          :class="{ 'tree-rtl': isRtlMode }"
          no-dots
          show-checkbox
          multiple
          collapse
          allow-batch
          @item-click="itemClick" />
        </div>
        

        <!-- <pre class="mt-4" style="white-space: normal;direction:ltr;text-align:left">{{ treeDataJson }}</pre> -->

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

<style src="@/vendor/libs/vue-jstree/vue-jstree.scss" lang="scss"></style>

<script>
import VJstree from 'vue-jstree'

export default {
  name: 'form-user-access',
  metaInfo: {
    title: 'Form Hak Akses User'
  },
  components: {
    VJstree
  },
  data () {
    return {
    treeData: [],

    urlSubmit: '/AdminVue/user-access-insert',
    headerCard: 'Form / Create Data Hak Akses User',
    textBtnSubmit: 'Create',
    field: {},
    allErrors: [],
    isNotif: false,
    alertNotif: '',
    alertVariant: 'alert-dark-danger'
  }},
  computed: {
    treeDataJson () {
      return JSON.stringify(this.treeData)
    }
  },
  methods: {
    itemClick (node) {
      this.treeData = this.treeData.slice(0)
      /*console.log(this.treeData)
      console.log(this.treeData.slice(0))*/
    },

    submitForm () {
      const formData = new FormData()
      formData.append("Id", this.field.Id)
      formData.append("Name", this.field.Name)
      formData.append("Description", this.field.Description)
      formData.append("Action", JSON.stringify(this.treeData))

      const config = {
          headers: { 'content-type': 'multipart/form-data' }
      }

      axios.post(this.urlSubmit, formData, config)
      .then( function (res) {
        var resp = res.data

        if(resp.status){

          this.$router.push({
            name: 'master/data-user-access',
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
      axios.post('/AdminVue/user-access-edit', {
        Id:Id,
      })
      .then( function (res) {
        var resp = res.data
        this.field = resp.data
        // console.log(this.field.action)
        this.treeData = JSON.parse(this.field.action)

        // // this.itemClick(node.model.text)
        // this.treeData = this.field.action
        // console.log(this.treeData)
      }.bind(this))
      .catch( function (e) {
        console.log(e)
        this.isNotif = true
        this.alertNotif = 'Invalid Server Side!'
        this.alertVariant = 'alert-dark-danger'
      }.bind(this))
    },

    backIndex() {
      this.$router.push('/RoleAdmin/master/data-user-access')
    }
  },

  mounted(){

    if(this.$route.params.isFormEdit){
      var Id = this.$route.params.Id
      if(Id){
        this.getData(Id)
        this.field.Id = Id
        if(this.field.Id == 11){
          document.getElementById("tree-akses").style.pointerEvents="none"
        }
        this.urlSubmit = '/AdminVue/user-access-update'
        this.headerCard = 'Form / Edit Hak Akses User'
        this.textBtnSubmit = 'Update'
      }
    }else{
      axios.post('/AdminVue/user-access-getJsonTree')
      .then( function (res) {
        // console.log(res.data.action)
        this.treeData = JSON.parse( res.data.action )
      }.bind(this))
      .catch( function (e) {
        console.log(e)
        this.isNotif = true
        this.alertNotif = 'Invalid Server Side!'
        this.alertVariant = 'alert-dark-danger'
      }.bind(this))
    }

  }

}

</script>
