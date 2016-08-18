
$(function(){
    var input;
    var display=$('#display');
    var texts=$('#texts');
    var tempo=$('#template').html();
    $('#head').hide();
    $('#previous').hide();
    $('#next').hide();
    $('.pages').hide();
    var page=1;
    var i=0,total=0;
    var number=1;
function totalRecords() {
	$.ajax({
		type: 'GET',
		url: "http://localhost:8080/RioOlympics",

		success:function(data){
			console.log(data.length);
			var pagination = parseInt(data.length/1000);
			for(var loop=1;loop<=pagination;loop++){
				$('.pages').append('<a href="#" id=loop>'+loop+" "+'</a>');
			}
		}
	});
			
}

$('.pages').delegate('#loop','click',function(){
	$('#tableview').empty();
	$('#next').hide();
	$('#previous').hide();
	$('.pages').hide();
	console.log("Inside loop click");
	console.log($(this).html());
	number=parseInt($(this).text());
	var start=1000*number;
	//pagevalue();

	$.ajax({
				type:'GET',
				url: "http://localhost:8080/RioOlympics?_sort=name&order=ASC&_start="+start+"&_limit=1000&_page="+number,
				success:function(data) {
	                var count = data.length;
	                console.log("inside function after limiting:"+count+" "+number);
	                $('#head').show();
	                
	                
	                
	                for (i=0;i<count;) 
	                {
	                	console.log("inside for");
	                    $('#tableview').append(Mustache.render(tempo,data[i]));
	                    i++;
	                }
	               
	                $('#next').show();
	                $('#previous').show();
	                $('.pages').show();
				}
			});
});

function viewbutton() {
	$('#tableview').empty();
	totalRecords();
	$.ajax({
            type:'GET',
            url: "http://localhost:8080/RioOlympics?_limit=1000&_sort=name&_order=ASC",

            success:function(data) {
                console.log("success",data);
                var count = data.length;
                console.log("inside function after limiting:"+count);
                $('#head').show();
                $('#next').show();
                $('.pages').show();
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
			url:"http://localhost:8080/RioOlympics?_sort=name&_order=ASC",
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
					$('#tableview').append(Mustache.render(tempo,newdata));
					
                }
		});
}



//search button
	$('#search').on('click',function(){
        input=$('#find').val();
        searchbutton();
    }); 
 //end of search button


//start of view button
	$('#view').on('click',function() {
		viewbutton();
	});
//end of view button

//start of save button
	$('#forms').submit(function(add) {
		add.preventDefault();
		var chestno = $("#chestno").val();
		var age = $("#age").val();
		var name = $("#inputName").val();
		var dob = $("#inputDOB").val();
		var gender = $("#inputGender").val();
		var email = $("#inputEmail").val();
		var country = $("#inputCountry").val();

		savebutton(chestno,age,name,dob,gender,email,country);
		$('#forms')[0].reset();
		$('#mymodal1').modal('toggle');
	});	
//end of save button
	
//start of update button
	$('#tableview').delegate('.noedit','click',function(){
		var $tr = $(this).closest('tr');
		$tr.find('input.chestno').val($tr.find('span.chestno').html());
		$tr.find('input.age').val($tr.find('span.age').html());
		$tr.find('input.name').val($tr.find('span.name').html());
		$tr.find('input.dob').val($tr.find('span.dob').html());
		$tr.find('input.gender').val($tr.find('span.gender').html());
		$tr.find('input.email').val($tr.find('span.email').html());
		$tr.find('input.country').val($tr.find('span.country').html());
		$tr.find('td').addClass('edit');
		});

		$('#tableview').delegate('#cancel','click',function(){
			$(this).closest('tr').find('td').removeClass('edit');
		});

		$('#tableview').delegate('#save','click',function(){
			var $tr = $(this).closest('tr');
			var	chestno = $tr.find('input.chestno').val();
			var	age = $tr.find('input.age').val();
			var	name = $tr.find('input.name').val();
			var	dob = $tr.find('input.dob').val();
			var	gender = $tr.find('input.gender').val();
			var	email = $tr.find('input.email').val();
			var	country = $tr.find('input.country').val();
			$.ajax({
				type:'PUT',
				url:"http://localhost:8080/RioOlympics/"+$tr.attr('data-id'),
				data:{
					chestno : chestno,
					age : age,
					name : name,
					DOB : dob,
					gender : gender,
					email : email,
					country : country,
				},
				success:function(data){
					$tr.find('span.chestno').html(data.chestno);
					$tr.find('span.age').html(data.age);
					$tr.find('span.name').html(data.name);
					$tr.find('span.dob').html(data.DOB);
					$tr.find('span.gender').html(data.gender);
					$tr.find('span.email').html(data.email);
					$tr.find('span.country').html(data.country);
					$tr.find('td').removeClass('edit');
					//$('#tableview').append(Mustache.render(tempo,newdata));
				}
			});
		});		
//end of update button

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
		var number1=number;
		number1=number1-1;
		//totalRecords();
		$('#previous').hide();
		$('.pages').empty();
		$('#next').hide();
		$('#tableview').empty();
		$.ajax({
			type: 'GET',
			url: "http://localhost:8080/RioOlympics",
			success:function(data){

		var pagenumber = parseInt(data.length/1000);
		console.log(pagenumber);
		var start = 1000*(number1);
		if(pagenumber>1){
		$.ajax({
			type:'GET',
			url: "http://localhost:8080/RioOlympics?_sort=name&_order=ASC&_start="+start+"&_limit=1000&_page="+number1,
			success:function(data) {
				console.log("success",data);
                var count = data.length;
                console.log("inside function after limiting:"+count+ " "+ number1);
                for (i=0;i<count;) 
                {
                	console.log("inside for")
                    $('#tableview').append(Mustache.render(tempo,data[i]));
                    i++;
                }
                totalRecords();
                $('#head').show();
                $('#next').show();
                $('#previous').show();
                $('.pages').show();
			}
		})
	}
}
});
	});
//end of Previous button

//start of next button
	$('#next').on('click',function() {
		var number2=number;
		number2=number2+1;
		$('#next').hide();
		$('#previous').hide();
		$('.pages').empty();
		$('#tableview').empty();
		$.ajax({
			type: 'GET',
			url: "http://localhost:8080/RioOlympics",
			success:function(data){

		var pagenumber = parseInt(data.length/1000);
		//pagenumber = pagenumber-(page-1);
		console.log(pagenumber);
		var start = 1000*(number2);
		
		//$('.pages').append("Pages"+" "+page+" out of "+pagenumber);
		if(pagenumber>1){ 
			$.ajax({
				type:'GET',
				url: "http://localhost:8080/RioOlympics?_sort=name&_order=ASC&_start="+start+"&_limit=1000&_page="+(number2+1),
				success:function(data) {
	                var count = data.length;
	                console.log("inside function after limiting:"+count+" "+number2);
	                console.log(number2);
	                
	                
	                
	                
	                for (i=0;i<count;) 
	                {
	                	console.log("inside for");
	                    $('#tableview').append(Mustache.render(tempo,data[i]));
	                    i++;
	                }
	                totalRecords();
	                $('#head').show();
	                $('#next').show();
	                $('#previous').show();
	                $('.pages').show();
				}
			});
		}
		}
		});
	});
//end of next button


$('#asc').on('click',function() {
		var number2=number;
		number2=number2+1;
		
		$('#next').hide();
		$('#previous').hide();
		$('.pages').empty();
		$('#tableview').empty();
		$.ajax({
			type: 'GET',
			url: "http://localhost:8080/RioOlympics",
			success:function(data){

		var pagenumber = parseInt(data.length/1000);
		//pagenumber = pagenumber-(page-1);
		console.log(pagenumber);
		var start = 1000*(number2);
		
		//$('.pages').append("Pages"+" "+page+" out of "+pagenumber);
		if(pagenumber>1){ 
			$.ajax({
				type:'GET',
				url: "http://localhost:8080/RioOlympics?_sort=name&_order=ASC&_start="+start+"&_limit=1000&_page="+(number2+1),
				success:function(data) {
	                var count = data.length;
	                console.log("inside function after limiting:"+count+" "+number2);
	                console.log(number2);
	                
	                
	                
	                
	                for (i=0;i<count;) 
	                {
	                	console.log("inside for");
	                    $('#tableview').append(Mustache.render(tempo,data[i]));
	                    i++;
	                }
	                totalRecords();
	                $('#head').show();
	                $('#next').show();
	                $('#previous').show();
	                $('.pages').show();
				}
			});
		}
		}
		});
	});



});//end of main funvtion

