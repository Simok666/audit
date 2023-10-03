<template>
  <div>
    <div class="media align-items-center py-3 mb-3">
      <img :src="`${publicUrl}${field.Photo}`" alt="" class="d-block ui-w-100 rounded-circle">
      <div class="media-body ml-4">
        <h4 class="font-weight-bold mb-0">{{field.EmpName}}</h4>
        <div class="text-muted mb-2">{{field.Department}} | {{field.City}}</div>
        <b-btn @click="editData()" variant="primary" size="sm">Edit</b-btn>&nbsp;
        <b-btn variant="default" size="sm">Profile</b-btn>&nbsp;
        <b-btn variant="default icon-btn" size="sm"><i class="ion ion-md-mail"></i></b-btn>
      </div>
    </div>
    <b-card no-body>
      <hr class="border-light m-0">
      <b-card-body>

        <table class="table user-view-table m-0">
          <tbody>
            <tr>
              <td><strong>Nama Lengkap</strong></td>
              <td>: {{field.EmpName}}</td>
            </tr>
            <tr>
              <td><strong>NIP</strong></td>
              <td>: {{field.NIP}}</td>
            </tr>
            <!--<tr>-->
              <!--<td><strong>Tanggal Lahir</strong></td>-->
              <!--<td>: {{field.DateBirth}}</td>-->
            <!--</tr>-->
            <tr>
              <td><strong>Nomor HP</strong></td>
              <td>: {{field.CellPhone}}</td>
            </tr>
            <tr>
              <td><strong>Departemen</strong></td>
              <td>: {{field.Department}}</td>
            </tr>
            <tr>
              <td><strong>Jabatan</strong></td>
              <td>: {{field.Position}}</td>
            </tr>
            <!--<tr>-->
              <!--<td><strong>Job Desk</strong></td>-->
              <!--<td>: {{field.JobDesk}}</td>-->
            <!--</tr>-->
            <!--<tr>-->
              <!--<td><strong>Alamat</strong></td>-->
              <!--<td>: {{field.Address}}</td>-->
            <!--</tr>-->
            <!--<tr>-->
              <!--<td><strong>Kota/Kab</strong></td>-->
              <!--<td>: {{field.City}}</td>-->
            <!--</tr>-->
            <tr>
              <td><strong>User Name</strong></td>
              <td>: {{field.UserName}}</td>
            </tr>
            <tr>
              <td><strong>Update At</strong></td>
              <td>: {{field.UpdateAt}}</td>
            </tr>
          </tbody>
        </table>
      </b-card-body>
    </b-card>

  </div>
</template>

<!-- Page -->
<style src="@/vendor/styles/pages/users.scss" lang="scss"></style>

<script>
import Vue from 'vue'
import moment from 'moment'
import MaskedInput from 'vue-text-mask'

export default {
  name: 'profile',
  metaInfo: {
    title: 'Profile'
  },

  data () {
    return {
      field: {
        Photo: 'clouds/backend/files/images/users/user-default.png'
      }
    }
  },

  methods: {

    getData() {
      var savedUserProfile = this.$store.state.savedUserProfile
      var lengthObject = Object.keys(savedUserProfile).length

      if (lengthObject) {
        this.field = savedUserProfile
        window.localStorage.setItem('user', JSON.stringify(savedUserProfile))
      } else {
        axios.post('/AdminVue/profile')
        .then( function (res) {
          var resp = res.data
          this.field = resp.data
          this.$store.commit('updateUserProfile', resp.data)

          window.localStorage.setItem('user', JSON.stringify(resp.data))
          var elmName = document.getElementById('span-UserName')
          var elmPhoto = document.getElementById('img-UserPhoto')

          elmName.innerHTML = resp.data.EmpName
          elmPhoto.src = this.publicUrl+resp.data.Photo

        }.bind(this))
        .catch( function (e) {
          console.log(e)
        }.bind(this))
      }
    },

    editData () {
      // this.$router.push('/main/form-profile')
      this.$router.push({
        name: 'main/form-profile',
        params: {
          Id: this.field.id,
        }
      })
    }
  },

  mounted(){
    this.getData()
  },
}
</script>
