<template>
<div>
	<b-card header="Detail / Data Glossary Of Terms" header-tag="h4" class="mb-0" no-body>
		<b-card-body>
	    <h6 class="font-weight-semibold">
	      Data Glossary Of Terms
	    </h6>
	    <div class="row">
	      <div class="col-md-4 mb-3">
	        <div class="font-weight-semibold">Group</div>
	        {{field.Group}}
	      </div>
	      <div class="col-md-4 mb-3">
	        <div class="font-weight-semibold">Terms</div>
	        {{field.Terms}}
	      </div>
		  <div class="col-md-4 mb-3">
	        <div class="font-weight-semibold">Deskripsi</div>
			<div v-html="field.Description">
			</div>
	        <!-- {{field.Description}} -->
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
		title: 'Detail Glossary Of Terms'
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
	    axios.post('/AdminVue/glossary-of-terms-show', {
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

	getDataHelp (item) {
	    axios.post('/AdminVue/glossary-of-terms-show', {
	        Id:item.Id,
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
    	this.$router.push('/RoleAdmin/master/data-glossary-of-terms')
    }

  },

  mounted(){
	if(this.$route.params.Id && this.$route.params.isHelp === undefined){
		var Id = this.$route.params.Id;
		if(Id){
			this.getData(Id);
		}
	} else if (this.$route.params.isHelp === true){
		var item = this.$route.params.item;
		var query = this.$route.query.Id
		
		if(item){
			this.getDataHelp(item, query);
		}
	}
  },

  watch: {
	'$route' (to, from) {
		if (to.params.Id && to.params.isHelp === undefined) {
			var Id = to.params.Id;
			if (Id) {
				this.getData(Id);
			}
		} else if (to.params.isHelp === true) {
			var item = to.params.item;
			var query = to.query.Id;

			if(item) {
				this.getDataHelp(item)
			}
		} 
	}
  }  

}

</script>