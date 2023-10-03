<!DOCTYPE html>

<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="default-style layout-fixed">
<head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="IE=edge,chrome=1">
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>Audit Widatra</title>
    <link rel="icon" type="image/png" href="{{asset('clouds/backend/files/images/logo-icon.png')}}">

    <!-- Main font -->
    <link href="https://fonts.googleapis.com/css?family=Roboto:300,300i,400,400i,500,500i,700,700i,900" rel="stylesheet">

    <!-- Icons. Uncomment required icon fonts -->
    <link rel="stylesheet" href="{{ mix('/vendor/fonts/fontawesome.css') }}">
    <link rel="stylesheet" href="{{ mix('/vendor/fonts/ionicons.css') }}">
    <link rel="stylesheet" href="{{ mix('/vendor/fonts/linearicons.css') }}">
    <link rel="stylesheet" href="{{ mix('/vendor/fonts/open-iconic.css') }}">
    <link rel="stylesheet" href="{{ mix('/vendor/fonts/pe-icon-7-stroke.css') }}">

    <!-- Core stylesheets -->
    <link rel="stylesheet" href="{{ mix('/vendor/css/bootstrap.css') }}" class="theme-settings-bootstrap-css">
    <link rel="stylesheet" href="{{ mix('/vendor/css/appwork.css') }}" class="theme-settings-appwork-css">
    <link rel="stylesheet" href="{{ mix('/vendor/css/theme-corporate.css') }}" class="theme-settings-theme-css">
    <link rel="stylesheet" href="{{ mix('/vendor/css/colors.css') }}" class="theme-settings-colors-css">
    <link rel="stylesheet" href="{{ mix('/vendor/css/uikit.css') }}">

    <!-- Material ripple -->
    <script src="{{ mix('/vendor/js/material-ripple.js') }}"></script>

    <!-- Layout helpers -->
    <script src="{{ mix('/vendor/js/layout-helpers.js') }}"></script>

    <!-- Theme settings -->
    <script src="{{ mix('/vendor/js/theme-settings.js') }}"></script>
    <script>
        // Use settings panel generator to configure the plugin
        window.themeSettings = new ThemeSettings({
            cssPath: '',
            themesPath: '',
            pathResolver: function(path) {
                var resolvedPaths = {
                    // Core stylesheets
                    //
                    @foreach (['bootstrap', 'appwork', 'colors'] as $name)
                    '{{ $name }}.css': '{{ mix("/vendor/css/{$name}.css") }}',
                    '{{ $name }}-material.css': '{{ mix("/vendor/css/{$name}-material.css") }}',
                    @endforeach

                    // UI Kit
                    'uikit.css': '{{ mix("/vendor/css/uikit.css") }}',

                    // Themes
                    //
                    @foreach (['air', 'corporate', 'cotton', 'gradient', 'paper', 'shadow', 'soft', 'sunrise', 'twitlight', 'vibrant'] as $name)
                    'theme-{{ $name }}.css': '{{ mix("/vendor/css/theme-{$name}.css") }}',
                    'theme-{{ $name }}-material.css': '{{ mix("/vendor/css/theme-{$name}-material.css") }}',
                    @endforeach
                }

                return resolvedPaths[path] || path;
            }
        });
    </script>

    <!-- Splash screen -->
    <style>
        .app-splash-screen {
            background: #fff;
            position: fixed;
            display: block;
            z-index: 99999999;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            opacity: 1;
            transition: opacity .3s;
        }

        .app-splash-screen-content {
            position: absolute;
            top: 25%;
            margin-left: auto;
            margin-right: auto;
            left: 0;
            right: 0;
            width: 400px;
            /*-webkit-animation: appSplashScreenAnimation 1.2s ease-in-out 0s infinite;
            animation: appSplashScreenAnimation 1.2s ease-in-out 0s infinite;*/
        }

        @-webkit-keyframes appSplashScreenAnimation {
            0%,
            20% {
                -webkit-transform: translate(-50%, -50%) rotateY(0);
                transform: translate(-50%, -50%) rotateY(0);
            }
            50% {
                -webkit-transform: translate(-50%, -50%) rotateY(180deg);
                transform: translate(-50%, -50%) rotateY(180deg);
            }
            80%,
            100% {
                -webkit-transform: translate(-50%, -50%) rotateY(360deg);
                transform: translate(-50%, -50%) rotateY(360deg);
            }
        }

        @keyframes appSplashScreenAnimation {
            0%,
            20% {
                -webkit-transform: translate(-50%, -50%) rotateY(0);
                transform: translate(-50%, -50%) rotateY(0);
            }
            50% {
                -webkit-transform: translate(-50%, -50%) rotateY(180deg);
                transform: translate(-50%, -50%) rotateY(180deg);
            }
            80%,
            100% {
                -webkit-transform: translate(-50%, -50%) rotateY(360deg);
                transform: translate(-50%, -50%) rotateY(360deg);
            }
        }
    </style>
    <!-- / Splash screen -->

</head>
<body>

    <!-- Splash screen -->
    <div id="div-splash" class="app-splash-screen d-none">
        <div class="app-splash-screen-content">
            <img src="{{asset('clouds/backend/files/images/logo-full.png')}}" alt="Audit Widatra" width="400px">
        </div>
    </div>
    <!-- / Splash screen -->

    <div id="app"></div>

    <script src="{{ mix('/entry-point.js') }}"></script>

    <script type="text/javascript">
        function diffMinutes(dt2, dt1) {
            var diff = (dt2.getTime() - dt1.getTime()) / 1000;
            diff /= 60;
            return Math.abs(Math.round(diff));
        }

        element = document.getElementById('div-splash');
        timeOpen = localStorage.getItem('timeOpen');
        now = new Date();
        
        if(timeOpen==null) {
            element.classList.remove('d-none');
            localStorage.setItem('timeOpen', now);
        } else {
            timeOpen = new Date(timeOpen)
            isHour = diffMinutes(now, timeOpen);

            if(isHour>59) {
                element.classList.remove('d-none');
                localStorage.setItem('timeOpen', now);
            }
        }
    </script>

</body>
</html>
