$(function(){
    var input;
    var detail=$('#detail');
    var texts=$('#texts');
    var tempo=$('#temp').html();
    var a=1;
    var i=0,j=0;
    $('#search').on('click',function(){
        console.log("entered");
        input=$('#find').val();
        console.log(input);
 

        $.ajax({
            type:'GET',
            url: "http://www.omdbapi.com/?s="+input,

            success:function(data){
                console.log("success",data);
                var count=data.Search.length;
                console.log(count);
                var total=data.totalResults;
                j=parseInt(total/10);
                console.log(j);
                for (;i<count;) 
                {
                    detail.append(Mustache.render(tempo,data.Search[i]));
                
                    i++;
                }
            }
        });
    });
    $('#link').on('click',function(){
        j=j-1;
        if(j>0){
        a=a+1;
        console.log("value of a: "+a);
        detail.html("");
        $.ajax({
            type:'GET',
            url: "http://www.omdbapi.com/?s="+input+"&page="+a,
            success:function(data){
                console.log("success",data);
                var count=data.Search.length;
                console.log(count);
                var total=data.totalResults;
                var j=parseInt(total/10);
                console.log(j);
                for (i=0;i<count;) 
                {
                    detail.append(Mustache.render(tempo,data.Search[i]));    
                    i++;
                }
            }
        });
    }
    });
}); 

