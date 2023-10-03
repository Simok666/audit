<template>
  <div class="authentication-wrapper authentication-2 ui-bg-cover ui-bg-overlay-container px-4" :style="`background-image: url('${publicUrl}clouds/backend/files/images/bg-login.jpg');`">
    <div class="ui-bg-overlay bg-dark opacity-25"></div>

    <div class="authentication-inner py-5">

      <b-card no-body>
        <div class="p-4 p-sm-5">
          <!-- Logo -->
          <div class="d-flex justify-content-center align-items-center pb-2 mb-4">
            <img :src="`${publicUrl}clouds/backend/files/images/Logo_WB.png`" alt="Treenear Vue" width="240px">
          </div>
          <!-- / Logo -->

          <h2 class="text-center font-weight-bold mb-4 text-danger" >E-AUDIT</h2>

          <div v-if="isNotif" class="alert alert-dismissible fade show" v-bind:class="[alertVariant]">
            <button type="button" class="close" data-dismiss="alert" v-on:click="isNotif = !isNotif">×</button>
            {{alertNotif}}
          </div>

          <!-- Form -->
          <form @submit.prevent="login()">
            <b-form-group label="User Name">
              <b-input ref="username" v-model="credentials.username" required />
            </b-form-group>
            <b-form-group>
              <div slot="label" class="d-flex justify-content-between align-items-end">
                <div>Password</div>
                <!-- <a href="javascript:void(0)" class="d-block small">Forgot password?</a> -->
              </div>
              <b-input type="password" v-model="credentials.password" required />
            </b-form-group>

            <div class="d-flex justify-content-between align-items-center m-0">
              <b-check v-model="credentials.rememberMe" class="m-0">Remember me</b-check>
              <b-btn type="submit" variant="primary">Login</b-btn>
            </div>
          </form>
          <!-- / Form -->
          <div class="mb-2"></div>
          <p style="text-align:center;">Lupa Password Anda ? <a href="/RoleAdmin/forgot-password">Reset Password</a></p>
        </div>
        <b-card-footer class="py-3 px-4 px-sm-5">
          <div class="text-center text-muted">
            <span class="font-weight-bolder">Treenear</span> © {{ momentYear() }} All rights reserved.
            <!-- Don't have an account yet? <a href="javascript:void(0)">Sign Up</a> -->
          </div>
        </b-card-footer>
      </b-card>

    </div>
  </div>
</template>

<!-- Page -->
<style src="@/vendor/styles/pages/authentication.scss" lang="scss"></style>

<script>
export default {
  name: 'pages-login',
  metaInfo: {
    title: 'Login Page'
  },
  data: () => ({
    isNotif: false,
    alertNotif: '',
    alertVariant: 'alert-dark-success',
    credentials: {
      username: '',
      password: '',
      rememberMe: true
    }
  }),

  methods: {
    login() {
      let data = {
        username: this.credentials.username,
        password: this.credentials.password
      }
      this.showLoading()
      axios.post('/AdminVue/login', data)
        .then(({data}) => {
          auth.login(data.dataUser, data.dataUser.accessMenu)
          this.$router.push('/RoleAdmin/main/dashboard')
        })
        .catch(({response}) => {
          this.$Progress.fail()
          setTimeout(() => this.$swal('User Login', response.data.message), 500)
          this.hideLoading()
        })
    },

    forgotPassword(){
      this.$router.push('/RoleAdmin/forgot-password')
    }
  },

  mounted () {
    if(this.$route.params.isSuccess){
      this.isNotif = true
      this.alertNotif = 'Reset Password Berhasil Silahkan Login!'
    }
    this.$refs.username.$el.focus()
  }

}
</script>
