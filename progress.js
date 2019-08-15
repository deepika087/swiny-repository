
//jQuery time
var current_fs, next_fs, previous_fs; //fieldsets
var left, opacity, scale; //fieldset properties which we will animate
var animating; //flag to prevent quick multi-click glitches
$("#oldAddress").hide();

$(document).on('click', ".next", function() {
    
    if(animating) return false;
	animating = true;
	
	current_fs = $(this).parent();
	next_fs = $(this).parent().next();
	
	//activate next step on progressbar using the index of next_fs
	$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
	
	//show the next fieldset
	next_fs.show(); 
	//hide the current fieldset with style
	current_fs.animate({opacity: 0}, {
		step: function(now, mx) {
			//as the opacity of current_fs reduces to 0 - stored in "now"
			//1. scale current_fs down to 80%
			scale = 1 - (1 - now) * 0.2;
			//2. bring next_fs from the right(50%)
			left = (now * 50)+"%";
			//3. increase opacity of next_fs to 1 as it moves in
			opacity = 1 - now;
			current_fs.css({
        'transform': 'scale('+scale+')',
        'position': 'absolute'
      });
			next_fs.css({'left': left, 'opacity': opacity});
		}, 
		duration: 800, 
		complete: function(){
			current_fs.hide();
			animating = false;
		}, 
		//this comes from the custom easing plugin
		easing: 'easeInOutBack'
	});

});


$(document).on('click', ".previous", function() {
	if(animating) return false;
	animating = true;
	
	current_fs = $(this).parent();
	previous_fs = $(this).parent().prev();
	
	//de-activate current step on progressbar
	$("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
	
	//show the previous fieldset
	previous_fs.addClass('active');
	previous_fs.show(); 
	//hide the current fieldset with style
	current_fs.animate({opacity: 0}, {
		step: function(now, mx) {
			//as the opacity of current_fs reduces to 0 - stored in "now"
			//1. scale previous_fs from 80% to 100%
			scale = 0.8 + (1 - now) * 0.2;
			//2. take current_fs to the right(50%) - from 0%
			left = ((1-now) * 50)+"%";
			//3. increase opacity of previous_fs to 1 as it moves in
			opacity = 1 - now;
			current_fs.css({'left': left});
			previous_fs.css({'transform': 'scale('+scale+')', 'opacity': opacity});
		}, 
		duration: 800, 
		complete: function(){
			animating = false;
		}, 
		//this comes from the custom easing plugin
		easing: 'easeInOutBack'
	});
});

$(".submit").click(function(){
	return false;
});

//Decide if old address is to be shown or not
$(document).on('change', "#monthsLived", function() { 

	_months = $(this).val();
	_years = $($("#yearsLived")).val();

	if (_years.includes("00") || _years.includes("01"))
	{
		$("#oldAddress").show();
	}
	else
	{
		$("#oldAddress").hide();

	}

});

$(document).on('change', "#yearsLived", function() { 
	_years = $(this).val();

	if (_years.includes("00") || _years.includes("01"))
	{
		$("#oldAddress").show();
	}
	else
	{
		$("#oldAddress").hide();

	}
});

$(document).on('change', "#employmentType", function() { 

	console.log("reaching here");
	_empType = $(this).val();

	if(_empType.includes("Full Time") || _empType.includes("Part Time")  || _empType.includes("Casual")  
		|| _empType.includes("Self Employed") )
	{
		$("#workedSomeTime").show();

		//hide rest
		$("#win2").hide();$("#irdOrAcc").hide();$("#boarderIncome").hide();$("#studentAllowance").hide();
	}
	else if (_empType.includes("WINZ"))
	{
		$("#win2").show();

		//hide rest
		$("#workedSomeTime").hide();$("#irdOrAcc").hide();$("#boarderIncome").hide();$("#studentAllowance").hide();
	} 
	else if (_empType.includes("IRD") || _empType.includes("ACC")) 
	{
		$("#irdOrAcc").show();

		//hide rest
		$("#workedSomeTime").hide();$("#win2").hide();$("#boarderIncome").hide();$("#studentAllowance").hide();
	} 
	else if (_empType.includes("Boarder Income"))
	{
		$("#boarderIncome").show();

		$("#workedSomeTime").hide();$("#win2").hide();$("#studentAllowance").hide();$("#irdOrAcc").hide();

	}
	else if (_empType.includes("Student Allowance"))
	{
		$("#studentAllowance").show();

		//hide rest
		$("#workedSomeTime").hide();$("#win2").hide();$("#boarderIncome").hide();$("#irdOrAcc").hide();
	}

});

$(document).on("change", "#MoreIncome", function() {

	if ($(this).val() == "Yes")
	{
		$("#IfMoreIncome").show();
	}
	else
	{
		$("#IfMoreIncome").hide();
	}
});


