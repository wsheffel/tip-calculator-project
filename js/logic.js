//Script to assign billing time and due date of bill based on current system time.
$(document).ready(function () {
    var d = new Date(Date.now()).toLocaleString();
    $("#currentDate").html(d)
    var dueDate = new Date();
    //add a week to the date
    dueDate.setDate(dueDate.getDate() + 7);
    $('#dueDate').html(dueDate.toLocaleString())


//Function to handle dropdown menu and payment types.
//Get the initially selected value.
var selection;
$.each($(".dropdown option:selected"), function(){         
            selection = $(this).val();  
            $('#payAs').html(selection);
            
});

$("select").on('change', function(){
    $('#paymentDisplay').html('');
    $('#paymentInputs').html('');
    $.each($(".dropdown option:selected"), function(){            
            selection = $(this).val();  
            $('#payAs').html(selection);
            
    });
    


    //Checking if conditions work.
    
    if ($("#paymentMethod option:selected").text()==='Credit'){
        console.log("Credit")
        $('#paymentDisplay').html('Card Number: ')
        $('#paymentInputs').html('<input type="text" placeholder = "Card No." id="cardNo" /></br><input type="text" placeholder = "CVV" id="CVV" />')

    }
    else if($("#paymentMethod option:selected").text() === 'Cash'){
        console.log('Cash')
    }
    else if ($("#paymentMethod option:selected").text() === 'Check'){
        console.log('Check')
    }
});

//Function to check if user mixed characters or not.
var isFloat = function(n) {/*console.log(parseFloat(n),n);*/ return parseFloat(n) == n };
/*Script to handle the intake of information such as the tip amount and price of the meal.
This script will handle the calculations and necessary type conversions (string, float) as well. */

    
    $("#takeinput").on("click", function() {
        $('#userNotice').html("")
        var price = parseFloat(parseFloat($('#Price').val()).toFixed(2))
        var tip = parseFloat($('#Tip').val()).toFixed(2)
        var tip_calc = $('#Tip').val() /100 *price
        if ($("#paymentMethod option:selected").text()==='Credit'){
            var cardNo = parseFloat($('#cardNo').val()).toString()
            var CVV = parseFloat($('#CVV').val()).toString()

            $('#paymentDisplay').html('Card Number: '+cardNo+'</br>CVV: '+CVV)
        }
        //Error handling conditions

        //1. If the user enters in letters or mix of letters and numbers in either field.
        if(
        //Check if there is a mix of letters and numbers, or just letters.
        (isFloat($('#Price').val())===false || isFloat($('#Tip').val())===false) 
        && 
        //Pass this condition if there is no value input (so that Condition 2 will catch and notify user of missing values.)
        ($('#Price').val() != '' && $('#Tip').val()!='')
        ){
            $('#userNotice').html("<font color ='red'>Do not mix numbers and letters.</br>Please only input positive, nonzero numbers.</font>")
        }
        
        //2. If the user forgets to enter in a value.
        else if (isNaN(price)||isNaN(tip)) {
            $('#userNotice').html("<font color ='red'>Please enter valid values in all fields!</font>")
            
        }

        //3. If the price is negative
        else if (price<0 || tip <0){
            $('#userNotice').html("<font color ='red'>Please do not enter negative numbers!</br>We will take the absolute value of your provided values for calculation.</font>")
        price = Math.abs(price)
        tip_calc = Math.abs(tip_calc)
        //Continue to process calculations even if negative.
        var tip_amount = parseFloat(tip_calc.toFixed(2))

        $('.priceAmount').html(price)
        $('.tipAmount').html(tip_amount)
        $('#percent').html(Math.abs(parseFloat(tip)).toFixed(2)+'%')
        $('.odometer_total').html((tip_amount+price).toFixed(2))
        }

        //4. If the user is asking for the price on a free meal.
        else if (price === 0){
            $('#userNotice').html("<font color ='red'>You cannot perform a tip calculation on a free meal.</font>")
        }

        //5. If the user does not tip.
        else if (tip === 0){
            $('#userNotice').html("<font color ='red'>It's rude not to tip.</br>Also, you don't need to calculate anything if you don't tip.</font>")
        }
        
        //If all error conditions are passed, populate the appropriate fields.
        else{
        var tip_amount = parseFloat(tip_calc.toFixed(2))

        $('.priceAmount').html(price)
        $('.tipAmount').html(tip_amount)
        $('#percent').html(Math.abs(parseFloat(tip)).toFixed(2)+'%')
        $('.odometer_total').html((tip_amount+price).toFixed(2))
        }
    });

});