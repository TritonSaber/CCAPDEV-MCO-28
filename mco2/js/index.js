$(function(){
    var name = document.forms["registration"]["name"].value;

    $("#loginsubmit").click(function(){
        if (name != "" || name != null) {        
            alert("Name must be filled out");
            $(this).prop("data-toggle", "modal");
            $(this).prop("data-target", "#exampleModalCenter");
            //I need to make the modal appear here
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
    $('#datein').attr('min', today);
});

