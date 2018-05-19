$(document).ready( function(){
    // show the form to create a new appointment
    $("#new").click(function(){
	$(this).hide();
	$("#form").show();
    });

    // remove form when cancel is clicked
    $("#cancel").click(function(){
	$("#form").hide();
	$("#new").show();
    });

        // datepicker
    $( function(){
	$("#appointment_date").datepicker({minDate:0});
    });

    $('#appointment_time').timepicker({ 'scrollDefault': 'now' });

    //data submission
    $("#add").on("click", function(){

	//var appt_date = $("#appointment_date").val();
	var appt_date = getInput($("#appointment_date"));
	var appt_time = getInput($("#appointment_time"));
	var description = getInput($("#description"));	
	var appt = {"date": appt_date, "time": appt_time, "description":description}
	$.ajax({
	    type: "GET",
	    url: "http://localhost/cgi-bin/appointment/appointment.pl",
	    contentType: "application/json; charset=utf-8",
	    data:appt,
	    dataType: "json",
	    cache: false,
	    //processData: false,	    
	    success: function(result){
		$("div#form").hide();
		$("div#message").text("saved something: "+result.success);
		console.log(result.success);
		console.log(result.time);
	    },
	    error: function(result){
		console.log(result.error);
	    }
	});
	
    });

    function getInput(field){
	if(field.val().length == 0){	    
	    field.addClass("input_error");	    
	}
	else{
	    field.removeClass("input_error");
	}
	return field.val();
    };
});
