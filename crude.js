



$("#reserve-submit").click(function(){
    //get inputs 1 by 1
    var restaurant = document.querySelector("#restaurant").value;
    var fullName = document.querySelector("#fullName").value;
    var email = document.querySelector("#email").value;
    var phone = document.querySelector("#phone").value;
    var datein = document.querySelector("#datein").value;
    var timein = document.querySelector("#timein").value;
    var numpeople = document.querySelector("#numpeople").value;
    var card = document.querySelector("#card").value;
    var cardnum = document.querySelector("#cardnum").value;
    var cvv = document.querySelector("#cvv").value;
    var monthexp = document.querySelector("#monthexp").value;
    
    //select the table that it will use
    var tbl = document.querySelector("#reservation-details");    
    
    //create row for the new data
    var row = document.createElement("tr");
    
    //place all the inputs to new row
        row.innerHTML = 
        `<td>${restaurant}</td>
        <td>${fullName}</td>
        <td>${email}</td>       
        <td>${phone}</td>
        <td>${datein}</td>
        <td>${timein}</td>
        <td>${numpeople}</td>
        <td>${card}</td>
        <td>${cardnum}</td>
        <td>${cvv}</td>
        <td>${monthexp}</td>
        <td><a onClick="onDelete(this)" class="btn btn-danger btn-sm delete">Delete</a>
        <a onClick="onEdit(this)" class="btn btn-warning btn-sm warning">Edit</a>
        `
    //append the row to the table
        tbl.appendChild(row);
    //remove all input on the form
        clearinput();
    
});




function clearinput(){
    //forces the input area with no value
    document.querySelector("#fullName").value = "";
    document.querySelector("#email").value = "";
    document.querySelector("#phone").value = "";
    document.querySelector("#datein").value = "";
    document.querySelector("#timein").value = "";
    document.querySelector("#numpeople").value = "";
    document.querySelector("#card").value = "";
    document.querySelector("#cardnum").value = "";
    document.querySelector("#cvv").value = "";
    document.querySelector("#monthexp").value = "";

}

function onEdit(editButton) {
    var row = editButton.parentElement.parentElement;//get the row element: first parent=cell second parent=row
    //Obtain all data in that row and place it in the input area
    document.querySelector("#restaurant").value = row.cells[0].innerHTML;
    document.querySelector("#fullName").value = row.cells[1].innerHTML;
    document.querySelector("#email").value = row.cells[2].innerHTML;
    document.querySelector("#phone").value = row.cells[3].innerHTML;
    document.querySelector("#datein").value = row.cells[4].innerHTML;
    document.querySelector("#timein").value = row.cells[5].innerHTML;
    document.querySelector("#numpeople").value = row.cells[6].innerHTML;
    document.querySelector("#card").value = row.cells[7].innerHTML;
    document.querySelector("#cardnum").value = row.cells[8].innerHTML;
    document.querySelector("#cvv").value = row.cells[9].innerHTML;
    document.querySelector("#monthexp").value = row.cells[10].innerHTML;

    //delete its first record then will be replace once confirmed with new inputs
    updateRecord(editButton);
}

//Used for update data
function updateRecord(editButton) {
    if(confirm('Additional charges will be added. Are you sure you want to change your reservation?')){
        deleteRow = editButton.parentElement.parentElement;
        document.querySelector("#reservation-details").deleteRow(deleteRow.rowIndex);
        //no clear input so that user can actually edit their record
    }
}

//used for actual delete data
function onDelete(deleteButton) {
    if (confirm('Are you sure you want to cancel reservation?')) {
        deleteRow = deleteButton.parentElement.parentElement;
        document.querySelector("#reservation-details").deleteRow(deleteRow.rowIndex);
        //clear input to avoid resubmitting same form
        clearinput();
        alert("Reservation has been deleted");

    }
}


