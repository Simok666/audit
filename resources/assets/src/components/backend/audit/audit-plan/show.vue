<template>
<div>
	<b-card header="Detail / Data Audit Plan" header-tag="h4" class="mb-0" no-body>
		<b-card-body>
	    <h6 class="font-weight-semibold">
	      Data Audit Plan
	    </h6>
	    <div class="row">
	      <div class="col-md-4 mb-3">
	        <div class="font-weight-semibold">ID Audit</div>
	        {{field.NoTrans}}
	      </div>
	      <div class="col-md-4 mb-3">
	        <div class="font-weight-semibold">Organizer Audit</div>
	        {{field.Organizer}}
	      </div>
		  <div class="col-md-4 mb-3">
	        <div class="font-weight-semibold">Pemberi Persetujuan</div>
	        {{field.ApprovedEmployee}}
	      </div>
	      <div class="col-md-4 mb-3">
	        <div class="font-weight-semibold">Periode Audit</div>
	        {{field.AuditPeriode}}
	      </div>
		  <div class="col-md-4 mb-3">
	        <div class="font-weight-semibold">Purpose</div>
	        {{field.Purpose}}
	      </div>
	      <div class="col-md-4 mb-3">
	        <div class="font-weight-semibold">Audit Scope</div>
	        {{field.AuditScope}}
	      </div>
		  <div class="col-md-4 mb-3">
	        <div class="font-weight-semibold">Opening Meeting</div>
	        {{field.OpeningMeeting}}
	      </div>
	      <div class="col-md-4 mb-3">
	        <div class="font-weight-semibold">Audit Execution (Start)</div>
	        {{field.AuditExecutionStart}}
	      </div>
		  <div class="col-md-4 mb-3">
	        <div class="font-weight-semibold">Audit Execution (Done)</div>
	        {{field.AuditExecutionDone}}
	      </div>
		  <div class="col-md-4 mb-3">
	        <div class="font-weight-semibold">Closing Meeting</div>
	        {{field.CloseMeeting}}
	      </div>
		  <div class="col-md-4 mb-3">
			  <div class="font-weight-semibold">Standard Audit</div>
			  {{getAuditCriteriaString(field.Criteria)}}
		  </div>
		  <div class="col-md-4 mb-3">
			  <div class="font-weight-semibold">Objective</div>
			  {{field.Objective}}
		  </div>
		  <div class="col-md-4 mb-3">
	        <div class="font-weight-semibold">Status</div>
	        {{field.Status}}
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
	name: 'show-division',
	metaInfo: {
		title: 'Detail Audit Plan'
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
	    axios.post('/AdminVue/audit-plan-show', {
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

	getAuditCriteriaString(AuditCriteria){
      let StringCriteria = '';
      for( var i = 0; i < AuditCriteria.length; i++ ){
        if(StringCriteria != ''){
          StringCriteria = StringCriteria.concat(', ',AuditCriteria[i].Standart)
        }else{
          StringCriteria = AuditCriteria[i].Standart
        }
      }

      return StringCriteria
    },

    backIndex() {
    	this.$router.push('/RoleAdmin/audit/data-audit-plan')
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