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
    $("#reserve-submit").click(function(){
        var restaurant = $("#restaurant").val();
        var date= $("#datein").val();
        var time = $("#timein").val();
        var num = $("#numpeople").val();
        var card = $("#card").val();
        var cardnum = $("#cardnum").val();
        var cvv = $("#cvv").val();
        var month = $("#monthexp").val();




        if (restaurant.length != 0 && date.length != 0 && time.length != 0 && num.length != 0 && card.length != 0 && cardnum.length != 0 && cvv.length != 0 && month.length != 0) {        
            $(this).attr("href", "#success-popup");

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

//like function
// $(function(){
//     $(".like-button").click(function(){
//         $(".like-content").toggleClass("like-active")
//         $(".like").toggleClass("like-active")
//         $(".counter").toggleClass("like-active")
        
//     })
// });
