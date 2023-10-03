<template>
<div>
	<b-card header="Detail / Data Auditor Team" header-tag="h4" class="mb-0" no-body>
		<b-card-body>
	    <h6 class="font-weight-semibold">
	      Data Auditor Team
	    </h6>
	    <div class="row">
	      <div class="col-md-4 mb-3">
	        <div class="font-weight-semibold">ID Audit</div>
	        {{field.NoTrans}}
	      </div>
	      <div class="col-md-4 mb-3">
	        <div class="font-weight-semibold">Departement Auditee</div>
	        {{field.AuditeeDepartment}}
	      </div>
		  <div class="col-md-4 mb-3">
	        <div class="font-weight-semibold">Pemberi Persetujuan</div>
	        {{field.EmpApproved}}
	      </div>
		  <div class="col-md-4 mb-3">
	        <div class="font-weight-semibold">Tanggal Audit</div>
	        {{field.AuditDate}}
	      </div>
		  <div class="col-md-4 mb-3">
	        <div class="font-weight-semibold">Jam Mulai</div>
	        {{field.HourStart}}
	      </div>
		  <div class="col-md-4 mb-3">
	        <div class="font-weight-semibold">Jam Berakhir</div>
	        {{field.HourDone}}
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
	    </div>
		<hr class="m-0">
		<h6 class="font-weight-semibold">
	      Data Standart Audit
	    </h6>
		<div class="row" v-for="(item, index) in field.ClauseAudit" :key="index">
		   <div class="col-md-4 mb-3">
	        <div class="font-weight-semibold">Standart Audit</div>
	        {{item.Standart}}
	      </div>
		  <div class="col-md-8 mb-3">
	        <div class="font-weight-semibold">Clause</div>
	        {{getStringClause(JSON.parse(item.Clause))}}
	      </div>
		</div>
		<div class="row">
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
	name: 'show-division',
	metaInfo: {
		title: 'Detail Auditor Team'
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
	    axios.post('/AdminVue/auditor-team-show', {
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

	getStringClause(Observer){
      let StringObserver = ''
      for( var i = 0; i < Observer.length; i++ ){
        if(StringObserver != ''){
          StringObserver = StringObserver.concat(', ',Observer[i].Clause)
        }else{
          StringObserver = Observer[i].Clause
        }
      }

      return StringObserver
    },

    backIndex() {
    	this.$router.push('/RoleAdmin/audit/data-auditor-team')
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
