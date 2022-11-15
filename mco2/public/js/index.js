//Prevents Showing the modal when the form is incomplete
$(function(){
    $("#signup-submit").click(function(){
        var name = $("#name").val();
        var username = $("#username").val();
        var password = $("#password").val();
        var bdate = $("#bdate").val();
        var phone = $("#phone").val();
        var email = $("#email").val();


        if (name.length != 0 && username.length != 0 && password.length != 0 && bdate.length != 0 && phone.length != 0 && email.length != 0) {        
            $(this).attr("href", "#signup-popup");

        }
    })

    
});

//restrict the reservation dates to 1 day ahead - Done!!
$(function(){
    var date = new Date();
    var month = date.getMonth() + 1;
    var day = date.getDate() + 1;
    var year = date.getFullYear();
    if(month < 10)
        month = '0' + month.toString();
    if(day < 10)
        day = '0' + day.toString();
    
    var today = year + '-' + month + '-' + day;
    $('#datein').attr('min', today);s
});

