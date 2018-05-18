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
	var form = $("#appointment")[0];
	
	var data = new FormData();
	data.append("date", appt_date);
	data.append("time", appt_time);
	data.append("description", description);
	$.ajax({
	    type: "POST",
	    url: "http://localhost/appointment/cgi-bin/appointment.pl",
	    contentType: "application/json; charset=utf-8",
	    dataType: "json",
	    data: {'appointment': JSON.stringify(data)},
	    processData: false,
	    cache: false,
	    success: function(data){
		console.log("Success:", data);
	    },
	    error: function(e){
		console.log();
		console.log("Error:", e);
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
