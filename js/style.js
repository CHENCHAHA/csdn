//为了开发效率，此处使用jquery开发
$(function() {
    $('#lan').on('click', 'li', function() {
        $(this).addClass('selected').siblings('li').removeClass('selected')
        $('.biao').children().eq($(this).index()).removeClass('apply-1').siblings().addClass('apply-1')
    })
})