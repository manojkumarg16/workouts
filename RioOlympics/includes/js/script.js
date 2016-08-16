
$(function(){
    var input;
    var display=$('#display');
    var texts=$('#texts');
    var tempo=$('#template').html();
    $('#head').hide();
    $('#previous').hide();
    $('#next').hide();
    var page=1;
    var i=0,total=0;
function totalRecords() {
	$.ajax({
		type: 'GET',
		url: "http://localhost:8080/RioOlympics",

		success:function(data){
			console.log(data.length);
			var pagination = parseInt(data.length/1000);
		}
	});
			
}

function viewbutton() {
	totalRecords();
	$.ajax({
            type:'GET',
            url: "http://localhost:8080/RioOlympics?_limit=1000",

            success:function(data) {
                console.log("success",data);
                var count = data.length;
                console.log("inside function after limiting:"+count);
                $('#head').show();
                $('#next').show();
                for (;i<count;) 
                {
                    $('#tableview').append(Mustache.render(tempo,data[i]));
                    i++;
                }
            }
        });
	}
function searchbutton(){
	$.ajax({
            type:'GET',
            url: "http://localhost:8080/RioOlympics?name="+input,

            success:function(data) {
                console.log("success",data);
                var count = data.length;
                console.log(count);
                $('#head').show();
                for (;i<count;) 
                {
                    $('#tableview').append(Mustache.render(tempo,data[i]));
                
                    i++;
                }
            }
        });
	}
function savebutton(chestno,age,name,dob,gender,email,country){

	$.ajax({
			type:"POST",
			url:"http://localhost:8080/RioOlympics",
			data:{
				chestno:chestno,
				age:age,
				name:name,
				DOB:dob,
				gender:gender,
				email:email,
				country:country,
			},
			success:function(newdata){
                $('#head').show();
            	console.log(chestno);
					$('#tableview').append(Mustache.render(tempo,newdata));
                }
		});
}



//search button
	$('#search').on('click',function(){
        console.log("entered");
        input=$('#find').val();
        //console.log(input);

        searchbutton();
    }); //end of search button


//start of view button
	$('#view').on('click',function() {
		viewbutton();
	}); //end of view button

//start of save button
	$('#save').on('click',function() {
		var chestno = $("#chestno").val();
		var age = $("#age").val();
		var name = $("#inputName").val();
		var dob = $("#inputDOB").val();
		var gender = $("#inputGender").val();
		var email = $("#inputEmail").val();
		var country = $("#inputCountry").val();
		//console.log(gender);
		savebutton(chestno,age,name,dob,gender,email,country);
		$('#mymodal').modal('toggle');
				//alert(gender);

	});	//end of save button
	

//start of update button
	$('#')
//end of update buttonh

//start of delete button
	$('#tableview').delegate('#delete','click',function() {
		var tr = $(this).closest('tr');
		$.ajax({
			type:'DELETE',
			url:"http://localhost:8080/RioOlympics/" + $(this).attr("delete-id"),
			
			success:function() {
				tr.remove();
			}
		});
	});	//end of delete button

//start of previous button
	$('#previous').on('click',function() {

		page=page-1;
		$('#tableview').empty();
		$.ajax({
			type: 'GET',
			url: "http://localhost:8080/RioOlympics",
			success:function(data){

		var pagenumber = parseInt(data.length/1000);
		pagenumber=pagenumber+(page);
		console.log(pagenumber);
		var start = 1000*(page-1);
		$('#next').show();
		if(pagenumber>0){
		$.ajax({
			type:'GET',
			url: "http://localhost:8080/RioOlympics?_start="+start+"&_limit=1000&_page="+page,
			success:function(data) {
				console.log("success",data);
                var count = data.length;
                console.log("inside function after limiting:"+count+ " "+ page);
                $('#head').show();
                $('#next').show();
                for (i=0;i<count;) 
                {
                	console.log("inside for")
                    $('#tableview').append(Mustache.render(tempo,data[i]));
                    i++;
                }
			}
		})
	}
}
});
	});
//end of Previous button

//start of next button
	$('#next').on('click',function() {
		page=page+1;
		$('#tableview').empty();
		$.ajax({
			type: 'GET',
			url: "http://localhost:8080/RioOlympics",
			success:function(data){

		var pagenumber = parseInt(data.length/1000);
		pagenumber=pagenumber-(page-1);
		console.log(pagenumber);
		var start = 1000*(page-1);
		$('#previous').show();
		if(pagenumber>0){ 
			$.ajax({
				type:'GET',
				url: "http://localhost:8080/RioOlympics?_start="+start+"&_limit=1000&_page="+page,
				success:function(data) {
	                var count = data.length;
	                console.log("inside function after limiting:"+count+" "+page);
	                $('#head').show();
	                
	                $('#next').show();
	                
	                for (i=0;i<count;) 
	                {
	                	console.log("inside for");
	                    $('#tableview').append(Mustache.render(tempo,data[i]));
	                    i++;
	                }
				}
			});
		}
		}
		});
	});
//end of next button
});//end of main funvtion

