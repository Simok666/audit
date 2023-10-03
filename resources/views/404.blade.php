<!DOCTYPE html>

<html lang="en" class="light-style">
<head>
  <title>Restricted Page | e-DMS</title>

  <meta charset="utf-8">
  <meta http-equiv="x-ua-compatible" content="IE=edge,chrome=1">
  <meta name="description" content="">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
  <link rel="icon" type="image/png" href="{{asset('clouds/backend/files/images/logo-icon.png')}}">

  <link rel="stylesheet" href="{{asset('clouds/template/bootstrap.css')}}" class="theme-settings-bootstrap-css">
  <link rel="stylesheet" href="{{asset('clouds/template/appwork.css')}}" class="theme-settings-appwork-css">
  <link rel="stylesheet" href="{{asset('clouds/template/colors.css')}}" class="theme-settings-colors-css">
  <link rel="stylesheet" href="{{asset('clouds/template/uikit.css')}}">
  <link rel="stylesheet" href="{{asset('clouds/template/error.css')}}">
</head>

<body class="bg-primary">

  <div class="container d-flex align-items-center ui-mh-100vh text-white">
    <div class="row align-content-center align-items-start align-items-md-center w-100 py-5">

      <div class="col-md-6 order-2 order-md-1 text-md-left text-center">
        <h1 class="display-2 font-weight-bolder mb-4">Whoops...</h1>
        <div class="text-xlarge font-weight-light mb-5">Access to the page<br> not allowed for you :(</div>
        <a href="{{URL::to('RoleAdmin/main/dashboard')}}"><button type="button" class="btn btn-outline-white">←&nbsp; Go Back</button></a>
      </div>

      <div class="col-md-6 order-1 order-md-2 text-center mb-5 mb-md-0">
        <div class="ui-device macbook w-100 rounded" style="max-width: 500px">
          <img class="device-img" src="{{asset('clouds/backend/files/images/laptop.png')}}" alt>
          <div class="device-content">
            <div class="error-device-content bg-primary">
              <div class="error-device-code text-white font-weight-bolder">406</div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>

</body>
</html>
