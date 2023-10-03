<template>
<div>
	<b-card header="Detail / Data Personel Auditor" header-tag="h4" class="mb-0" no-body>
		<b-card-body>
	    <h6 class="font-weight-semibold">
	      Data Personel Auditor
	    </h6>
	    <div class="row">
	      <div class="col-md-4 mb-3">
	        <div class="font-weight-semibold">Nama Karyawan</div>
	        {{field.Name}}
	      </div>
	      <div class="col-md-4 mb-3">
	        <div class="font-weight-semibold">NIP/NIK</div>
	        {{field.NIP}}
	      </div>
		  <div class="col-md-4 mb-3">
	        <div class="font-weight-semibold">Departement</div>
	        {{field.Department}}
	      </div>
		  <div class="col-md-4 mb-3">
	        <div class="font-weight-semibold">Jabatan/Posisi</div>
	        {{field.Position}}
	      </div>
		  <div class="col-md-4 mb-3">
	        <div class="font-weight-semibold">Type</div>
	        {{field.Type}}
	      </div>
		  <div class="col-md-4 mb-3">
	        <div class="font-weight-semibold">Email</div>
	        {{field.Email}}
	      </div>
		  <div class="col-md-4 mb-3">
	        <div class="font-weight-semibold">Klasifikasi</div>
	        {{field.Category}}
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
		title: 'Detail Personel Auditor'
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
	    axios.post('/AdminVue/personel-auditor-show', {
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
    	this.$router.push('/RoleAdmin/master/data-personel-auditor')
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