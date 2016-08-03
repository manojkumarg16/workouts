const readline = require('readline');
const fs = require('fs');
var header =[];
var jsonData=[],data=[];
var tempData={};
var temp={};
var isHeader=true;
var i=0,j=0;
var above=[],below=[];
var arrest=[],notArrest=[];
//var pioc=[],vioc=[];
/*var index=["1A","2","3","4A","4B","5","6","7","9"];
var nonindex=["1B","8A","8B","10","11","12","13","14","15","16","17","18","19","20","22","24","26"];*/

for(i=2001;i<=2016;i++){
	above[i]=0;
	below[i]=0;
	arrest[i]=0;
	notArrest[i]=0;
}
const rl = readline.createInterface({
	input: fs.createReadStream('crimes_-_2001_to_present.csv')
});
rl.on('line', function(line) 
{
	var spl=line.split('\r\n');
	
	var hlength=spl[0].split(']').length;
	//console.log(hlength);
	var lineRecords= line.trim().split(',');
	//console.log(lineRecords);
	for(var i=0;i<lineRecords.length;i++)
	{
		if(isHeader)
		{       
			header[i]=lineRecords[i];
			console.log(header[i]);
			/*{
				if(header[i]=="Year"){
					var year=i;
				}
				else if(header[i]=="Description"){
					var desc=i;
				}
				else if(header[i]=="Primary Type"){
					var type=i;
				}
				else if(header[i]=="FBI Code"){
					var code=i;
                      				}
				else if(header[i]=="Arrest"){
					var arr=i;
				}         
			}*/
		}else
		{			
			for(j=2001;j<=2016;j++)
			{
				// console.log ("Record: ", lineRecords);
				//console.log("Year index: ", header[i], " current year from line: ", lineRecords[i], " current looping year ", j, " Type of crime: ", lineRecords[type]);

				if(header[i]=="Year" 
					&& lineRecords[i] == j
					&& lineRecords[5] == "THEFT")
				{
					//console.log("theft");
					if(lineRecords[6]=="OVER $500")
					{
						above[j]++;
						//console.log("over $500");
					}
					if(lineRecords[6]=="$500 AND UNDER")
					{
						below[j]++;
 						//console.log("below $500");
					}
				}
				 if(header[i]=="Year" 
					&& lineRecords[i]== j 
					&& lineRecords[5]=="ASSAULT")
				{
					//console.log("ass");
					if(lineRecords[8]=="true")
					{
						arrest[j]++;
						//console.log("arrested");
					}
					if(lineRecords[8]=="false")
					{
						notArrest[j]++;
						//console.log("not arrested")
					}
				}
			}
			/*for(k=0;k<index.length;k++)
			{
				index[k]=var;
				if(var<5)
				{
					if(lineRecords[code]===var && header[year]==2015)
					{
						vioc=vioc+1;
					}
				}else
				{
					pioc=pioc+1;
				}
			}*/
		}
	}
	tempData={};
	temp={};
	temp1={};
	isHeader=false;
		//console.log("Inside loop " + j);
});
rl.on('close',function()
{
	for(var k=2001;k<=2016;k++){
		tempData={};
		console.log("Read Over " + k);

		tempData["year:"]=k;
		tempData["$500 above:"]=above[k];
		tempData["below $500:"]=below[k];
		temp={};
		temp["year:"]=k;
		temp["Arrest:"]=arrest[k];
		temp["NotArrest:"]=notArrest[k];
		
		jsonData.push(tempData);
		data.push(temp);	
	}
	
	fs.writeFileSync("data.json",JSON.stringify(jsonData),encoding="utf8");
	fs.writeFileSync("data2.json",JSON.stringify(data),encoding="utf8");
});