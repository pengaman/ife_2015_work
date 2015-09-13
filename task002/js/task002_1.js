
function funct(){
	var err=document.getElementById("err");
	document.getElementById("result").innerHTML="";
err.innerHTML="";
	err.setAttribute("display","none");
	var txt=document.getElementById("inp").value;
	
	if(txt=="")		
{
err.innerHTML="错误：你没有输入任何爱好";
err.style.display="block";
return;}
alert("请确保你用换行、空格、逗号、顿号或分号作为分隔符划分爱好。");
	var newtxt=txt.replace(/[;，、；\n\s]/g,',');
	var arr=newtxt.split(",");
	var newarr=[];
   for(var i=0;i<arr.length;i++){
		if(arr[i]!=='' && newarr.indexOf(arr[i])<0)
			newarr.push(arr[i]);}

if(newarr.length>10){err.style.display="block";
err.innerHTML="错误：你输入了太多爱好";
return;
	}
	
var ele;
	var res1=document.getElementById("result");
	for(var i=0;i<newarr.length;i++){
		ele=document.createElement('lable');
		ele.innerHTML=newarr[i];
		res1.appendChild(ele);
		}
	}
