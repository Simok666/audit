<template>
<div>
	<b-card header="Detail / Data Struktur Auditor" header-tag="h4" class="mb-0" no-body>
		<b-card-body>
	    <h6 class="font-weight-semibold">
	      Data Struktur Auditor
	    </h6>
	    <div class="row">
	      <div class="col-md-4 mb-3">
	        <div class="font-weight-semibold">Nama</div>
	        {{field.Name}}
	      </div>
	      <div class="col-md-4 mb-3">
	        <div class="font-weight-semibold">Group</div>
	        {{field.Group}}
	      </div>
		  <div class="col-md-4 mb-3">
	        <div class="font-weight-semibold">Deskripsi</div>
	        {{field.Description}}
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
		title: 'Detail Struktur Auditor'
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
	    axios.post('/AdminVue/structure-auditor-show', {
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
    	this.$router.push('/RoleAdmin/master/data-structure-auditor')
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