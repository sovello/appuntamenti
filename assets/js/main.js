var appointment = {
    init: function(){
	appointment.config = {
	    urlBase: "http://localhost/cgi-bin/appointment/appointment.pl",
	    contentType: "application/json; charset=utf-8",
	    dataType: "json",
	};
    },

    //*************************************//
    //===========FORM CONTROLS=============//
    //*************************************//
    
    // show the form to create a new appointment
    showForm: function(){
	$(document).on("click","#new", function(){
	    $(this)
		.text("ADD")
		.attr("id", "add");
	    $("#cancel").show();
	    $("form#appointment").show();
	});
    },

    //clicking on the cancel button
    cancel: function(){
	// remove form when cancel is clicked
	$(document).on("click", "#cancel", function(){
	    $(this).hide();
	    $("#add")
		.text("NEW")
		.attr("id", "new");
	    $("form#appointment").hide();
	});
    },
    
    //clear the form
    //used specifically after submission of new appointment
    clearForm: function(){
	$("#appointment_date").val("");
	$("#appointment_time").val("");
	$("#description").val("");
    },

    //clear a form field
    clearField: function(field_element){
	$(field_element).val("");
    },        

    //show date or time picker depending on picker
    showPicker: function(element, picker){
	// datepicker
	if( picker == "date"){
	    $(element).datepicker({minDate:0});	    
	}
	else {
	    $(element).timepicker({ 'scrollDefault': 'now', 'timeFormat': 'H:i:s' });
	}
    },

    //**************************************//
    //*******DATA SUBMISSIONS***************//
    //**************************************//
    
    //validations
    validateFormFields: function(field_elements){
	var valid = true;
	for(field in field_elements){
	    if($(field_elements[field]).val().length == 0){
		$(field_elements[field]).addClass("input_error");
		valid = false;		
	    }
	    else{
		$(field_elements[field]).removeClass("input_error");
	    };
	};		
	return valid;
    },
    
    
    //ajax request
    doAjax: function(method, request_data){
	$.ajax({	    
	    url: appointment.config.urlBase,
	    method: method,	    
	    data:request_data,
	    dataType: appointment.config.dataType,
	    cache: false,
	    success: function(result){
		if( method != "GET" ){
		    $("div#message").text("Record has been saved!");
		    console.log("Record has been saved");
		    appointment.clearForm();
		}
		appointment.echoAppointments(result.appointments);
	    },
	    error: function(result){
		console.log(result.error);
	    }
	});
    },

    echoAppointments: function(data){	
	//var appointments = JSON.parse(data);
	if($.isEmptyObject(data)){
	    $("div#message").text("We couldn't find a match");
	}
	else{
	    $('#appointment_list').empty();
	    var trHTML = '';
	    $.each(data, function (i, appointment) {
		trHTML += '<tr><td>' + appointment.date + '</td><td>' + appointment.time + '</td><td><a href="'+appointment.id+'">' + appointment.description + '</a></td></tr>';
	    });
	    $('#appointment_list').append(trHTML);
	};
	
    },

    getInput: function(field){	
	return field.val();
    },

};

$(document).ready( function(){
    appointment.init();
    appointment.showForm();
    
    appointment.cancel();
    
    appointment.showPicker("#appointment_date", "date");
    appointment.showPicker("#appointment_time", "time");
    $(document).on("click", "a", function(event){
	event.preventDefault();
	$("#new")
	    .text("UPDATE")
	    .attr("id", "add");
	$("#cancel").show();
	$("form#appointment").show();
    });
    //data submission
    $(document).on("click", "#add", function(){
	$("div#message").text("");
	if( appointment.validateFormFields(["#appointment_date", "#appointment_time", "#description"])){
	    var appt_date = appointment.getInput($("#appointment_date"));
	    var appt_time = appointment.getInput($("#appointment_time"));
	    var description = appointment.getInput($("#description"));
	    
	    var appt = {id: "12", date: appt_date, time: appt_time, description:description}	
	    appointment.doAjax("POST", appt);
	}
	else{
	    console.log("we didn't submit anything");
	}	
    });

    $(document).on("click", "#search", function(){
	$("div#message").text("");
	var query = appointment.getInput($("#search_query"));
	if( query.trim().length != 0){
	    appointment.doAjax("GET", {search_query: query, all:2});
	}
	appointment.doAjax("GET", {search_query: query, all:2});
    });
    appointment.doAjax("GET", {all:1})
});
