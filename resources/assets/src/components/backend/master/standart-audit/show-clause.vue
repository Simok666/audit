<template>
<div>
	<b-card header="Detail / Data Clause Audit" header-tag="h4" class="mb-0" no-body>
		<b-card-body>
	    <h6 class="font-weight-semibold">
	      Data Clause Audit
	    </h6>
	    <div class="row">
	      <div class="col-md-4 mb-3">
	        <div class="font-weight-semibold">Standart Audit</div>
	        {{field.Standart}}
	      </div>
	      <div class="col-md-4 mb-3">
	        <div class="font-weight-semibold">Clause</div>
	        {{field.Clause}}
	      </div>
		  <div class="col-md-4 mb-3">
	        <div class="font-weight-semibold">Persyaratan</div>
	        {{field.Requirements}}
	      </div>
		  <div class="col-md-4 mb-3">
	        <div class="font-weight-semibold">Detail Persyaratan</div>
			<quill-editor v-model="field.RequirementsDetail" :options="editorOptions" :disabled="true"/>
	      </div>
		  <div class="col-md-4 mb-3">
	        <div class="font-weight-semibold">CreateAt</div>
	        {{field.CreateAt}}
	      </div>
		  <div class="col-md-4 mb-3">
	        <div class="font-weight-semibold">UpdateAt</div>
	        {{field.UpdateAt}}
	      </div>
		  <div class="col-md-4 mb-3">
	        <div class="font-weight-semibold">UserEntry</div>
	        {{field.UserEntry}}
	      </div>
	      <div class="col-12">
	        <b-btn type="button" variant="secondary" @click="backIndex()" class="float-right">Back</b-btn>
	      </div>
	    </div>
	  </b-card-body>
	  <hr class="m-0">

  </b-card>
</div>
</template>

<style src="@/vendor/libs/vue-quill-editor/typography.scss" lang="scss"></style>
<style src="@/vendor/libs/vue-quill-editor/editor.scss" lang="scss"></style>
<style src="@/vendor/styles/pages/users.scss" lang="scss"></style>
<style type="text/css">
	.td-first-child{
		width: 9rem;
	}
</style>

<script>
	
export default {
	name: 'show-domain',
	metaInfo: {
		title: 'Detail Clause Audit'
	},

	components: {
		quillEditor: () => import('vue-quill-editor/dist/vue-quill-editor').then(m => m.quillEditor).catch(() => {})
	},

	data () {
		return {
	    field: {},
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
		};
	},

	methods: {
  	getData (Id) {
	    axios.post('/AdminVue/standart-audit-showClause', {
	        Id:Id,
	    })
	    .then( function (res) {
	        var resp = res.data;
	        this.field = resp.data;
	    }.bind(this))
	    .catch( function (e) {
	        console.log(e);
	    })
    },

    backIndex() {
    	this.$router.push('/RoleAdmin/master/data-standart-audit')
    }

  },

	mounted(){
    if(this.$route.params.Id){
      var Id = this.$route.params.Id;
      if(Id){
        this.getData(Id);
      }
    }
  },  

}

</script>