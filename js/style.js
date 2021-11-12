//为了开发效率，此处使用jquery开发
$(function() {
    $('#lan').on('click', 'li', function() {
        $(this).addClass('selected').siblings('li').removeClass('selected')
        $('.biao').children().eq($(this).index()).removeClass('apply-1').siblings().addClass('apply-1')
    })


    //实现注册按钮
    $('#reg').on('click', function() {
        var telephone = $('#textreg').val()
        var password = $('#passwordreg').val()
        $.ajax({
            type: "post",
            //http://不能省略
            url: "http://127.0.0.1/chenchao/reguser",
            data: {
                telephone,
                password
            },
            success: function(res) {
                console.log(res)
                alert(res.msg)
                if (res.msg == '注册成功！') {
                    window.location.reload()
                }
            }
        })
    })


    //实现登录按钮
    $('#login_button').on('click', function() {
        var telephone = $('#telelogin').val()
        var password = $('#passwordlogin').val()
        $.ajax({
            type: "post",
            url: "http://127.0.0.1/chenchao/login",
            data: {
                telephone,
                password
            },
            success: function(res) {
                console.log(res)
                alert(res.msg)
                sessionStorage.setItem('token', res.token)
                if (res.status == 0) {
                    window.location.href = '../index.html'
                }
            }
        })
    })
})