$(document).ready(function(){
    var token = localStorage.getItem('token');
    if (token) {
        $("#login-form").hide();
    }

    $("#login").click(function(data) {

        var formData= $("#login-form").serializeArray();
        var formObject = {};
    
        $.map(formData, function(n, i){
            formObject[n['name']] = n['value'];
        });

        $.ajax({
            type: 'POST',
            url: '/login',
            dataType: 'json',
            data: { "username": formObject.username, "userPassword" : formObject.password },
            success: function(response) {
                localStorage.setItem('token', response.token);
                alert(response);
            }
        })
    });

    $("#register").click(function(data) {
        var formData= $("#login-form").serializeArray();
        var formObject = {};
    
        $.map(formData, function(n, i){
            formObject[n['name']] = n['value'];
        });

        $.ajax({
            type: 'POST',
            url: '/create',
            dataType: 'json',
            data: { "username": formObject.username, "userPassword" : formObject.password },
            success: function(response) {
                localStorage.setItem('token', response.token);
                alert(response.token);
            }
        })
    });
});