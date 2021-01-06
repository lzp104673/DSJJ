$(function () {
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })


    var form = layui.form
    var layer = layui.layer

    form.verify({
        // 自定义了一个叫做 pwd 校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        // 校验两次密码是否一致的规则
        repwd: function (value) {
            // 通过形参拿到的是确认密码框中的内容
            // 还需要拿到密码框中的内容
            // 然后进行一次等于的判断
            // 如果判断失败,则return一个提示消息即可
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致！'
            }
        }
    })

    //监听注册表单的提交事件
    $('#form_reg').on('submit', function (e) {
        //1.阻止默认的提交行为
        e.preventDefault()
        // 发起 ajax 的POST请求
        $.ajax({
            url: '/api/reguser',
            method: 'POST',
            data: {
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val()
            },
            success: function (res) {
                if (res.status !== 0) {
                    layer.msg(res.message + '注册失败');
                    return
                }
                layer.msg(res.message + '注册成功');
                //模拟人的点击行为
                $('#link_login').click()
            }
        })
    })

    
    //监听登入表单的提交事件
    $('#form_login').on('submit', function (e) {
        //1.阻止默认的提交行为
        e.preventDefault()
        // 发起 ajax 的POST请求
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $(this).serialize(), // 快速获取表单数据
            success: function (res) {
                if (res.status !== 0) {
                    layer.msg( '登入失败');
                    return
                }
                layer.msg( '登入成功');
                // 将登入成功得到的 token 字符串 保存到  localStorage  中
                localStorage.setItem('token', res.token)
                //  点击之后页面自动跳转  到后台主页
                location.href = '/index.html'
            }
        })
    })
});