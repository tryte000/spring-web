<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!doctype html>
<html lang="en">
<head>
    <title>平台后台管理</title>
    <meta content="IE=edge,chrome=1" http-equiv="X-UA-Compatible">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">

    <link rel="stylesheet" type="text/css" href="/css/stylesheets/fonts.useso.css">
    <link rel="stylesheet" type="text/css" href="/css/stylesheets/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="/css/stylesheets/main.css">
    <link rel="stylesheet" type="text/css"
          href="/css/stylesheets/font-awesome/css/font-awesome.min.css">
    <link rel="stylesheet" type="text/css" href="/css/stylesheets/titatoggle-dist-min.css">
    <link rel="stylesheet" type="text/css" href="/css/stylesheets/minimal.css">
    <link rel="stylesheet" type="text/css" href="/css/stylesheets/theme.css">
    <link rel="stylesheet" type="text/css" href="/css/stylesheets/premium.css">
    <link rel="stylesheet" type="text/css"
          href="/css/stylesheets/bootstrap-datetimepicker.min.css">
    <link rel="stylesheet" type="text/css" href="/css/stylesheets/bootstrap-table.min.css">

    <script type="text/javascript" src="/js/pub/jquery-1.11.1.min.js"></script>
    <script type="text/javascript" src="/js/pub/jquery.knob.js"></script>
    <script type="text/javascript" src="/js/pub/bootstrap.min.js"></script>
    <script type="text/javascript" src="/js/pub/bootstrap-table.min.js"></script>
    <script type="text/javascript" src="/js/pub/bootstrap-table-zh-CN.min.js"></script>
    <script type="text/javascript" src="/js/pub/bootstrap-datetimepicker.min.js"
            charset="UTF-8"></script>
    <script type="text/javascript" src="/js/pub/bootstrap-datetimepicker.zh-CN.js"
            charset="UTF-8"></script>


    <script type="text/javascript" src="/js/layer/layer.js"></script>
    <script type="text/javascript" src="/js/operate.js"></script>
    <script type="text/javascript">
        $(function () {
            $(".knob").knob();
            $('#datetimepicker').datetimepicker({
                language: 'zh-CN',
                weekStart: 1,
                todayBtn: 1,
                autoclose: 1,
                todayHighlight: 1,
                startView: 2,
                forceParse: 0,
                showMeridian: 1
            });
        });

        $(document).ready(function () {
            changecode();
            document.getElementById("showimg").onload = function () {
                $.post('<?php echo site_url('
                code / get
                ');?>', {}, function (result) {
                    $("#randcode").val(result);
                }
            )
            }
        });

        function changecode() {
            var img = document.getElementById("showimg");
            img.src = "<?php echo site_url('code/img');?>?" + Math.random(1);
            return;
        }
    </script>

</head>


<body class="theme-logoin">

<!-- Demo page code -->

<script type="text/javascript">
    $(function () {
        var match = document.cookie.match(new RegExp('color=([^;]+)'));
        if (match) var color = match[1];
        if (color) {
            $('body').removeClass(function (index, css) {
                return (css.match(/\btheme-\S+/g) || []).join(' ')
            })
            $('body').addClass('theme-' + color);
        }

        $('[data-popover="true"]').popover({html: true});

    });
</script>
<script type="text/javascript">
    $(function () {
        var uls = $('.sidebar-nav > ul > *').clone();
        uls.addClass('visible-xs');
        $('#main-menu').append(uls.clone());
    });
</script>

<!-- Le HTML5 shim, for IE6-8 support of HTML5 elements -->
<!--[if lt IE 9]>
<script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
<![endif]-->

<!-- Le fav and touch icons -->
<link rel="shortcut icon" href="../assets/ico/favicon.ico">
<link rel="apple-touch-icon-precomposed" sizes="144x144" href="../assets/ico/apple-touch-icon-144-precomposed.png">
<link rel="apple-touch-icon-precomposed" sizes="114x114" href="../assets/ico/apple-touch-icon-114-precomposed.png">
<link rel="apple-touch-icon-precomposed" sizes="72x72" href="../assets/ico/apple-touch-icon-72-precomposed.png">
<link rel="apple-touch-icon-precomposed" href="../assets/ico/apple-touch-icon-57-precomposed.png">


<!--[if lt IE 7 ]>
<body class="ie ie6"> <![endif]-->
<!--[if IE 7 ]>
<body class="ie ie7 "> <![endif]-->
<!--[if IE 8 ]>
<body class="ie ie8 "> <![endif]-->
<!--[if IE 9 ]>
<body class="ie ie9 "> <![endif]-->
<!--[if (gt IE 9)|!(IE)]><!-->

<!--<![endif]-->

<div class="container asdfadf">
    <div class="row row-centered ">
        <div class=" col-xs-12 col-md-4 col-sm-8  col-centered ">
            <div class="form-top">
                <div class="bg_form_top comcolor">
                    <img src="/images/pub/sign.png">
                </div>
            </div>
            <div class="form-bottom">
                <p>账户登录</p>
                <form class="form-horizontal" id="<?php echo $form->getId (); ?>" name="<?php echo $form->getId (); ?>"
                      method="post" onsubmit="return false">
                    <div class="input-group padding-bottom-30">
                        <div class="input-group-addon"><i class="glyphicon glyphicon-user"></i></div>
                        <input class="form-control input-lg" name="username" id="username" class="fsize"
                               placeholder="用户名">
                        <span style="display:none" data-for="username"></span>
                    </div>
                    <div class="input-group padding-bottom-30">
                        <div class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></div>
                        <input class="form-control input-lg" type="password" name="password" id="password"
                               placeholder="密码">
                        <span style="display:none" data-for="password"></span>
                    </div>
                    <div class="input-group padding-bottom-30">
                        <input type="hidden" id="randcode"/>
                        <input type="text" name="code" id="code" class="form-control input-lg">
                        <span style="display:none" data-for="code"></span>
                        <span class="input-group-addon input_padding">
						<img onclick="javascript:changecode();" id="showimg" src="">
					  </span>
                    </div>
                    <div>
                        <button type="button" name="sbtn" id="sbtn" class="btn btn-primary btn-lg btn-block comcolor ">登<i
                                class="padding-left-30"></i>录
                        </button>
                        <?php $this->load->view('common/form_view', array('action' => site_url('login'), 'submitbtn' =>
                        'sbtn'));?>
                    </div>
                    <div class="padding-bottom-30">
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>


<script type="text/javascript">
    $("#code").attr("data-error-appendto", "#showimg");
    form.submitedCallBack = function (data) {
        window.location.reload();
    }
    $("[rel=tooltip]").tooltip();
    $(function () {
        $('.demo-cancel-click').click(function () {
            return false;
        });
    });
</script>


</body>
</html>