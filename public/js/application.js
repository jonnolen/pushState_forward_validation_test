var pages = [
	{"id":"#page1", idx:0},
	{"id":"#page2", idx:1},
	{"id":"#page3", idx:2} ];
var currentPage = 0;

$(document).on("ready", function(){
	var crossFade = function(div1, div2){
		$(div1).hide();
		$(div2).show();
	}

	$("#back").click(function(){
		if (currentPage != 0){
			history.back();
		}
	});

	$("#forward").click(function(){
		if (currentPage != 2){
			oCurrentPage = pages[currentPage];
			console.log(oCurrentPage);
			oNextPage = pages[currentPage+1];
			crossFade(oCurrentPage.id, oNextPage.id);
			history.pushState(oNextPage, "", oNextPage.id);
			currentPage++;
		}				
	});

	$("#testPost").click(function(){
		$.ajax({
			type:"post",
			url:"/",
			beforeSend:function(xhr, settings){
				xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
			}
		});
	})

	history.replaceState(pages[currentPage], "", pages[currentPage].id);



	/*
	when forward is pressed:
	submit the remote form for the previous state.
	have the resulting js
		check a page state against the currentState
		if the currentState is equal 
			render the partial in the correct div.
		else
			set flag.
			call history.back(); 

	in pop state handler
	if flag is set
		clear flag.
	else
		show the correct div for the current state.

	*/
	window.onpopstate = function(evt){
		console.log("popping state!");
		state = evt.state;
		
		//if the forward button gets pushed we can detect that by checking to see what the state object is.
		if (state){
			console.log(state);
			if (state.idx > currentPage){
				evt.preventDefault();
				evt.stopPropagation();
			}
			else{
				
				state = evt.state;
				oCurrentPage = pages[currentPage];
				oNextPage = pages[state.idx];
				crossFade(oCurrentPage.id, oNextPage.id);
				currentPage = state.idx;
			}
		}
	};

});	