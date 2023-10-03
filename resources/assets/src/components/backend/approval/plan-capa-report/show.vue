<template>
<div>
	<b-card header="Detail / Data Plan Capa Report" header-tag="h4" class="mb-0" no-body>
		<b-card-body>
	    <h6 class="font-weight-semibold">
	      Data Plan Capa Report
	    </h6>
	    <div class="row">
	      <div class="col-md-4 mb-3">
	        <div class="font-weight-semibold">ID Audit</div>
	        {{field.NoTrans}}
	      </div>
		  <div class="col-md-4 mb-3">
	        <div class="font-weight-semibold">Ref Number</div>
	        {{field.RefNumber}}
	      </div>
	      <div class="col-md-4 mb-3">
	        <div class="font-weight-semibold">Departement Auditee</div>
	        {{field.AuditeeDepartment}}
	      </div>
		  <div class="col-md-4 mb-3">
	        <div class="font-weight-semibold">Kondisi Saat Ini</div>
	        {{field.ConditionNow}}
	      </div>
		  <div class="col-md-4 mb-3">
	        <div class="font-weight-semibold">Gap Analysis</div>
	        {{field.GapAnalysis}}
	      </div>
		  <div class="col-md-4 mb-3">
	        <div class="font-weight-semibold">Penyebab / Potensi Penyebab Ketidaksesuaian</div>
	        {{field.PotentialCauseNonConformitiy}}
	      </div>
		  <div class="col-md-4 mb-3">
	        <div class="font-weight-semibold">Tindakan Korektif</div>
	        {{field.CorrectiveAction}}
	      </div>
		  <div class="col-md-4 mb-3">
	        <div class="font-weight-semibold">Eksekusi Tindakan Korektif</div>
	        {{field.ExecutionPlaneCorrective}}
	      </div>
		  <div class="col-md-4 mb-3">
	        <div class="font-weight-semibold">Tindakan Preventif</div>
	        {{field.PreventiveAction}}
	      </div>
		  <div class="col-md-4 mb-3">
	        <div class="font-weight-semibold">Eksekusi Tindakan Preventif</div>
	        {{field.ExecutionPreventiveAction}}
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
		<hr>
		<h6 class="font-weight-semibold">
	      Approval Plan Capa Report
	    </h6>
		<div class="row" v-for="(item, index) in detailApproval" :key="index">
		  <div class="col-md-4 mb-3">
	        <div class="font-weight-semibold">Nama Karyawan</div>
	        {{item.Name}}
	      </div>
		  <div class="col-md-4 mb-3">
	        <div class="font-weight-semibold">Type</div>
			<div v-if="index == 0">
				Head Auditee
			</div>
			<div v-else-if="index == 1 && field.LeadAuditor == item.IdEmployeApproval">
				Lead Auditor
			</div>
			<div v-else-if="index == 1 && field.LeadAuditor != item.IdEmployeApproval">
				Auditor
			</div>
			<div v-else>
				Manajemen Representatif
			</div>
	      </div>
	      <div class="col-md-4 mb-3">
	        <div class="font-weight-semibold">Status</div>
	        <div v-if="item.Status == 1">
				Belum Disetujui
			</div>
			<div v-else-if="item.Status == 2">
				Sudah Disetujui
			</div>
			<div v-else>
				Ditolak
			</div>
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
		title: 'Detail Plan Capa Report'
	},

	components: {

	},

	data () {
		return {
	    field: {},
		detailApproval:[]
		};
	},

	methods: {
  	getData (Id) {
	    axios.post('/AdminVue/plan-capa-report-show', {
	        Id:Id,
	    })
	    .then( function (res) {
	        var resp = res.data;
	        this.field = resp.data;
			this.detailApproval = resp.Approval
	    }.bind(this))
	    .catch( function (e) {
	        console.log(e);
	    })
    },

    backIndex() {
    	this.$router.push('/RoleAdmin/approval/data-approval-plan-capa-report')
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