<template>
<div>
	<b-card header="Detail / Data Auditor Report" header-tag="h4" class="mb-0" no-body>
		<b-card-body>
	    <h6 class="font-weight-semibold">
	      Data Auditor Report
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
	        <div class="font-weight-semibold">Tanggal Auditor</div>
	        {{field.AuditorDate}}
	      </div>
		  <div class="col-md-4 mb-3">
	        <div class="font-weight-semibold">Uraian / Potensi Ketidaksesuaian</div>
	        {{field.PotentialNonConformitiy}}
	      </div>
		  <div class="col-md-4 mb-3">
	        <div class="font-weight-semibold">Jenis Ketidaksesuaian</div>
	        {{field.TypeNonConformity}}
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
	      Approval Auditor Report
	    </h6>
		<div class="row" v-for="(item, index) in detailApproval" :key="index">
		  <div class="col-md-4 mb-3">
	        <div class="font-weight-semibold">Nama Karyawan</div>
	        {{item.Name}}
	      </div>
		  <div class="col-md-4 mb-3">
	        <div class="font-weight-semibold">Type</div>
			<div v-if="index == 0 && field.LeadAuditor == item.IdEmployeApproval">
				Lead Auditor
			</div>
			<div v-else-if="index == 0 && field.LeadAuditor != item.IdEmployeApproval">
				Auditor
			</div>
			<div v-else-if="index == 1">
				Head Auditee
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
		title: 'Detail Auditor Report'
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
	    axios.post('/AdminVue/auditor-report-show', {
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
    	this.$router.push('/RoleAdmin/approval/data-approval-auditor-report')
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