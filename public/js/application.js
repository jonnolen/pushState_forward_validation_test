var pages = [
	{"id":"#page1", idx:0},
	{"id":"#page2", idx:1},
	{"id":"#page3", idx:2} ];
var currentPage = 0;
var formValid = true;
var postWasBecauseOfForwardAction = false;
var crossFade = function(div1, div2){
		$(div1).hide();
		$(div2).show();
	};

var formData = function(){
	return (formValid?"valid=true":"valid=false");
}
var postForm = function(){
	options = {
			type:"post",
			url:"/",
			beforeSend:function(xhr, settings){
				xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
			},
			success:function(data, status, xhr){
				console.log(data);
			},
			data:formData()
		};
	console.log(options.data);
	$.ajax(options);
	};

$(document).on("ready", function(){	

	$("#back").click(function(){
		if (currentPage != 0){
			history.back();
		}
	});

	$("#forward").click(function(){
		if (currentPage != 2){
			postForm();
		}		
	});

	$("#testPost").click(function(){
		postForm();
	});

	$("#setFormValid").click(function(){
		console.log("making form valid.");
		formValid = true;
	});

	$("#setFormInvalid").click(function(){
		console.log("making form invalid");
		formValid = false;
	});

	window.onpopstate = function(evt){
		console.log("popping state!");
		state = evt.state;
		
		//if the forward button gets pushed we can detect that by checking to see what the state object is.
		if (state){
			console.log(state);
			if (state.idx > currentPage){ //forward button pressed.
				postWasBecauseOfForwardAction = true;
				postForm();
			}
			else{ // back button pressed.				
				if (postWasBecauseOfForwardAction){
					postWasBecauseOfForwardAction = false;
				}
				else{
					state = evt.state;
					oCurrentPage = pages[currentPage];
					oNextPage = pages[state.idx];
					crossFade(oCurrentPage.id, oNextPage.id);
					currentPage = state.idx;
				}
			}
		}
	};

	history.replaceState(pages[currentPage], "", pages[currentPage].id);
});	