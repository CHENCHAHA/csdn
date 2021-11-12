$(function() {
    $.ajax({
        type: "get",
        url: "http://127.0.0.1/my/userinfo",
        headers: {
            Authorization: sessionStorage.getItem('token') || ''
        },
        success: function(res) {
            console.log(res);
        },
        complete: function(res) {
            if (res.responseJSON.status === 1) {
                console.log(res);
                sessionStorage.removeItem('token')
                location.href = '../登录.html'
            }
        }
    })
})