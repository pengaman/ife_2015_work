var cle;
function funct(){
	var inpt=document.getElementById("inpt").value;
var arr=inpt.split('-');
var date1=new Date(arr[0],arr[1]-1,arr[2]);
var sec=date1.getTime();
	if(!/^[0-9]{4}[-][0-9]{2}[-][0-9]{2}$/.test(inpt))
	{alert("输入格式错误，请按‘YYYY-MM-DD’格式输入");
	return;
	}
	stopin(cle);

 cle=window.setInterval(function(){showdate(sec,arr,cle);},1000);
}
function showdate(sec,arr,cle){
	var nowtime=new Date().getTime();
	var sec_left=Math.floor((sec-nowtime)/1000);
	if(sec_left/(24*60*60)>0)
	{var day_left=Math.floor(sec_left/(24*60*60));
	sec_left=sec_left%(24*60*60);}
	else{day_left=0;}
	if(sec_left/(60*60)>0)
	{var hour_left=Math.floor(sec_left/(60*60));
	sec_left=sec_left%(60*60);}
	else{hour_left=0;}
	if(sec_left/60>0)
	{var minm_left=Math.floor(sec_left/(60));
	sec_left=sec_left%(60);}
	else{minm_left=0;}
	if(sec_left>0){sec_left=Math.floor(sec_left);}else{sec_left=0;}
	if(sec_left==0&&minm_left==0&&hour_left==0&&day_left==0)
	{window.clearInterval(cle);}
	document.getElementById("resu").innerHTML="距离"+arr[0]+"年"+arr[1]+"月"+arr[2]+"日还有"+day_left+"天"+hour_left+"小时"+minm_left+"分"+sec_left+"秒";
}
function stopin(cle){
	window.clearInterval(cle);}