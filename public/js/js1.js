$(document).ready(function(){
    var maxField = 10; //Input fields increment limitation
    var addButton = $('.add_button'); //Add button selector
    var wrapper = $('.field_wrapper'); //Input field wrapper
    var fieldHTML = '<div><input type="text" name="Name" placeholder="Name"><input type="text" name="Gender" placeholder="Gender"><input type="number" name="Age" placeholder="Age"><input type="date" name="Request_for_Registration" placeholder="Registration request date "><input type="date" name="Date_of_Job_card_Issue" placeholder="Job card issue date:"><input type="text" name="Disabled" placeholder="Disabled"><input type="text" name="Minority" placeholder="Minority"><input type="text" name="Job_Card_Id" placeholder="Job card id"><input type="text" name="Reason" placeholder="Reason(if not to approve)"><input type="text" name="Status" placeholder="Status"><input type="text" name="Aadhaar" placeholder="Aadhar No."><a href="javascript:void(0);" class="remove_button">Remove Field</a></div>'; //New input field html 
    var x = 1; //Initial field counter is 1
    //Once add button is clicked
    $(addButton).click(function(){
        //Check maximum number of input fields
        if(x < maxField){ 
            x++; //Increment field counter
            $(wrapper).append(fieldHTML); //Add field html
        }
    });   
    //Once remove button is clicked
    $(wrapper).on('click', '.remove_button', function(e){
        e.preventDefault();
        $(this).parent('div').remove(); //Remove field html
        x--; //Decrement field counter
    });
});
