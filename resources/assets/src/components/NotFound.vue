<template>
  <div class="bg-primary"><div class="container d-flex align-items-center ui-mh-100vh text-white con">
    <div class="row align-content-center align-items-start align-items-md-center w-100 py-5">

      <div class="col-md-6 order-2 order-md-1 text-md-left text-center">
        <h1 class="display-2 font-weight-bolder mb-4">Whoops...</h1>
        <div class="text-xlarge font-weight-light mb-5">We couldn't find the page<br> you are looking for :(</div>
        <router-link class="btn btn-outline-white" to="/RoleAdmin/main/dashboard" :exact="true">←&nbsp; Go Back</router-link>
      </div>

      <div class="col-md-6 order-1 order-md-2 text-center mb-5 mb-md-0">
        <div class="ui-device macbook w-100 rounded" style="max-width: 500px">
          <img class="device-img" :src="`${publicUrl}clouds/backend/files/images/laptop.png`" alt>
          <div class="device-content">
            <div class="error-device-content bg-primary">
              <div class="error-device-code text-white font-weight-bolder">404</div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div></div>
</template>

<style src="@/vendor/styles/error.css" lang="css"></style>

<script>
export default {
  name: 'not-found',
  metaInfo: {
    title: '404 Not Found'
  }
}
</script>
