<template>
<div>
	<b-card header="Detail / Data Master Module" header-tag="h4" class="mb-0" no-body>
		<b-card-body>
	    <h6 class="font-weight-semibold">
	      Data Master Module
	    </h6>
	    <div class="row">
	      <div class="col-md-4 mb-3">
	        <div class="font-weight-semibold">Parent</div>
	        {{field.Parent}}
	      </div>
	      <div class="col-md-4 mb-3">
	        <div class="font-weight-semibold">Name</div>
	        {{field.Name}}
	      </div>
	      <div class="col-md-4 mb-3">
	        <div class="font-weight-semibold">Deskripsi</div>
	        {{field.Description}}
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

<style src="@/vendor/styles/pages/users.scss" lang="scss"></style>
<style type="text/css">
	.td-first-child{
		width: 9rem;
	}
</style>

<script>
	
export default {
	name: 'show-master-module',
	metaInfo: {
		title: 'Detail Master Module'
	},

	components: {

	},

	data () {
		return {
	    field: {},
		};
	},

	methods: {
  	getData (Id) {
	    axios.post('/AdminVue/master-module-show', {
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
    	this.$router.push('/RoleAdmin/main/master-module')
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