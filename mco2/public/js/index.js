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


$(function(){
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate() - 1;// tommorrow
    if(month < 10)// january - september 01-09
        month = '0' + month.toString();
    if(day < 10)//01-09
        day = '0' + day.toString();  
    var minDate = year + '-' + month + '-' + day;// set the max date of birthday
    $('#bdate').attr('max', minDate);
});


$(function(){
    $("#reserve-submit").click(function(){
        var restaurant = $("#restaurant").val();
        var date= $("#datein").val();
        var time = $("#timein").val();
        var num = $("#numpeople").val();
        var card = $("#card").val();
        var cardnum = $("#cardnum").val();

        if (restaurant.length != 0 && date.length != 0 && time.length != 0 && num.length != 0 && card.length != 0 && cardnum.length != 0) {        
            $(this).attr("href", "#success-popup");

        }
    });

    
});


//restrict the reservation dates to 1 day ahead
//prevents users from reserving dates that has already passed
$(function(){
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate() + 1;// tommorrow
    if(month < 10)// january - september 01-09
        month = '0' + month.toString();
    if(day < 10)//01-09
        day = '0' + day.toString();  
    var minDate = year + '-' + month + '-' + day;// set the min date to reserve s
    $('#datein').attr('min', minDate);
});
