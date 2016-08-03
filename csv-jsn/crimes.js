const readline = require('readline');
const fs = require('fs');
var header =[];
var jsonData=[],jsonData1=[],jsonData2=[];
var tempData={};
var temp={},temp1={};
var isHeader=true;
var i=0,j=0;
var above=[],below=[];
var arrest=[],notArrest=[];
var vpioc=0,vioc=0,nonin=0;
var index=["01A","2","3","04A","04B"];
var pindex=[5,6,7,9];
var nonindex=["01B","08A","08B","10","11","12","13","14","15","16","17","18","19","20","22","24","26"];
var arr=0,year=0,desc=0,type=0,code=0,sum1=0,sum2=0,sum3=0;
for(i=2001;i<=2016;i++){
	above[i]=0;
	below[i]=0;
	arrest[i]=0;
	notArrest[i]=0;
}

var recCount = 0;

const rl = readline.createInterface({
	input: fs.createReadStream('crimes_-_2001_to_present1.csv')
});
rl.on('line', function(line) 
{
	var lineRecords= line.trim().split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);;
	
		if(isHeader)
		{   
			for(var i=0;i<lineRecords.length;i++)
				{

			header[i]=lineRecords[i];
			{
				if(header[i]=="Year"){
					year=i;
				}
				else if(header[i]=="Description"){
					desc=i;
				}
				else if(header[i]=="Primary Type"){
					type=i;
				}
				else if(header[i]=="FBI Code"){
					code=i;
                      				}
				else if(header[i]=="Arrest"){
					arr=i;
				}         
			}

		}
	}else
		{
			for(j=2001;j<=2016;j++)
			{
				if(header[year]=="Year" 
					&& lineRecords[year] == j
					&& lineRecords[type] == "THEFT")
				{
					if(lineRecords[desc]=="OVER $500")
					{
						above[j]++;
					}
					if(lineRecords[desc]=="$500 AND UNDER")
					{
						below[j]++;
					}
				}
				if(header[year]=="Year" 
					&& lineRecords[year]== j 
					&& lineRecords[type]=="ASSAULT")
				{
					if(lineRecords[arr]=="true")
					{
						arrest[j]++;
					}
					if(lineRecords[arr]=="false")
					{
						notArrest[j]++;
					}
				}
			}
			if(lineRecords[year]=="2015")
			{
				for(var m=0;m<index.length;m++)
				{
					if(lineRecords[code]==index[m])
					{
					vioc++;
					break;
					}
				}
				for(var n=0;n<pindex.length;n++)
				{
					if(lineRecords[code]==pindex[n])
					{
					vpioc++;
					break;
					}
				}
				for(var o=0;o<nonindex.length;o++)
				{
					if(lineRecords[code]==nonindex[o])
					{
					nonin++;
					break;
					}
				}
			}
			
			/*sum1=m;
			for(var k=0;k<=vioc.length;k++)
			{
				 sum1=vioc[k]+sum1;
			}
			for(var n=0;n<pindex.length;n++)
			{
				if(lineRecords[year]===2015)
				{
					vpioc++;
				}console.log(vpioc);
			}
			
			sum2=n;
			for(var k=0;k<=vpioc.length;k++)
			{
				 sum2=vpioc[k]+sum2;
			}
			for(var o=0;o<nonindex.length;o++)
			{
				if(lineRecords[year]==2015)
				{
					nonin++;
				}console.log(nonin);

			}
			
			sum3=o;
			for(var k=0;k<=nonin.length;k++)
			{
				 sum3=nonin[k]+sum3;
			}*/
		}
		
	isHeader=false;
});
			
			
			
rl.on('close',function()
{
	for(j=2001;j<=2016;j++){
		tempData={};
		tempData["year:"]=j;
		tempData["$500 above:"]=above[j];
		tempData["below $500:"]=below[j];
		jsonData.push(tempData);
		temp={};
		temp["year:s"]=j;
		temp["Arrest:"]=arrest[j];
		temp["NotArrest:"]=notArrest[j];
		jsonData1.push(temp);
	}
	temp1["violent index"]=vioc;
	temp1["property index"]=vpioc;
	temp1["nonindex"]=nonin;
	jsonData2.push(temp1);



	fs.writeFileSync("data1.json",JSON.stringify(jsonData),encoding="utf8");
	fs.writeFileSync("data2.json",JSON.stringify(jsonData1),encoding="utf8");
	fs.writeFileSync("data3.json",JSON.stringify(jsonData2),encoding="utf8");
});