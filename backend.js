$(document).ready(function (){
	var myFirebaseRef = new Firebase("https://status101.firebaseio.com/");

	$('.close, .cancel').click(function () {
		$('#dialog').fadeOut(500);
	});
	$('.add').click(function () {
		var d = new Date();
		var n = d.getTime();
		$('#edit-tit').text("Add");
		$('#edit').val("");
		$('#notesarea').val("");
		$('#timet').text(n);
		$('#dialog').fadeIn(500);
	});
	$(document).on('click','.grid-item',function () {
		$('#edit-tit').text("Edit");
		$('#edit').val($(this).children('.notes-title').text());
		$('#notesarea').val($(this).children('.notes').text());
		$('#timet').text($(this).find('i').text());
		$('#dialog').fadeIn(500);
	});

	$('#save').click(function () {
		if (!($('#notesarea').val().trim() == "")) {
			if ($('#edit-tit').text() == "Add"){
				myFirebaseRef.child($('#timet').text()).set({
		  			title: $('#edit').val(),
		  			content: $('#notesarea').val()
				});
			}else if($('#edit-tit').text() == "Edit"){
				var hopperRef = myFirebaseRef.child($('#timet').text());
				hopperRef.update({
					title: $('#edit').val(),
		  			content: $('#notesarea').val()
				});
			}
		}
	});

	myFirebaseRef.on("value", function(snapshot) {
		$('#grid').empty();
		cntnt = "";
  		snapshot.forEach(function(data) {
	    	var x = true;
	    	data.forEach(function (d) {
	    		if (x) {
	    			content = d.val();
	    		}else{
	    			title = d.val();
	    		}
	    		x=!x;
	    	});
	    	cntnt += "<div class=\"grid-item\"><span class=\"notes-title\">" + title + "</span><span class=\"notes\">" + content + "</span></div>";
	  	});
	  	$('#grid').append(cntnt);
	  	$('#grid').masonry( 'reloadItems' );
		$('#grid').masonry( 'layout' );
	});
});