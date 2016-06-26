var sortdata=[
	{
		id:'0',
		name:'默认分类',
		child:[0]
	},
	{
		id:'1',
		name:'社团活动',
		child:[1]
	}	
];
var tlistdata=[
	{
		id:'0',
		name:'默认子分类',
		child:[0,1],
		parent:'0'
	},
	{
		id:'1',
		name:'开会',
		child:[2],
		parent:'1'
	}
];
var taskdata=[
	{
		id:"0",
		name:"todo1",
		date:"2016-07-11",
		status:0,
		content:"完成task003",
		parent:'0'
	},
	{
		id:"1",
		name:"todo2",
		date:"2016-07-14",
		status:1,
		content:"完成task003",
		parent:'0'
	},
	{
		id:"2",
		name:"todo3",
		date:"2016-07-14",
		status:1,
		content:"完成task003",
		parent:'1'
	}
];
var temp,temp1,temp2;
var oldchoose;
var chooseid,oldchoose1;
var chooseid1;
var shelter=getByClass(document.body,"shelter")[0];;
var prompt=document.getElementById('prompt');
var sort_list=document.getElementsByTagName("ul")[0];
var tlist=document.getElementById("tlist");
var num=document.getElementById("num").getElementsByTagName('span')[0];
var finish=document.getElementById("finish");
var edit=document.getElementById('edit');
var task_title=document.getElementById("task_title");
var task_date=document.getElementById("task_date");
var task_content=document.getElementById("task_content");
var btn3=document.getElementById('btn3');
var btn4=document.getElementById('btn4');
var all=document.getElementById('all');
var not_finish=document.getElementById('not_finish');
var all_finish=document.getElementById('all_finish');
//显示分类列表
function dis_sort(){
	btn3.parentNode.style.display='none';
	setnum();
	sort_list.innerHTML="";
	num.innerHTML="";
	var nsum=0;
	var str='';
	nsum+=sortdata[0].num;
	str+='<li><i class="iconfont">&#xe611;</i><span>'+sortdata[0].name+'</span><span>('+sortdata[0].num+')</span></li>';
	str+='<li><ul><li ><i class="iconfont">&#xe791;</i><span>'+tlistdata[0].name+'</span><span>('+tlistdata[0].num+')</span></li></ul></li>';
	for (var i = 1; i < sortdata.length; i++) {
		str+='<li class="lihead"><i class="iconfont">&#xe611;</i><span>'+sortdata[i].name+'</span><span>('+sortdata[i].num+')</span><span onclick="del(this)"><i class="iconfont1">&#xe646;</i></li>';
		if(sortdata[i].child.length>0){
			str+="<li><ul>";
			for (var j = 1; j < tlistdata.length; j++) {
				if(tlistdata[j].parent==sortdata[i].id)
				str+='<li><i class="iconfont">&#xe791;</i><span>'+tlistdata[j].name+'</span><span>('+tlistdata[j].num+')</span><span onclick="del(this)"><i class="iconfont1">&#xe646;</i></span></li>';	
			};
			str+="</ul></li>";
		};
	nsum+=sortdata[i].num;
	};
	var html=sort_list.innerHTML+str;
	sort_list.innerHTML=html;
	num.innerHTML+='('+nsum+')';
}
//显示任务列表
function dis_tlist(id){
	temp=[];
	temp1=[];
	temp2=[];
	btn3.parentNode.style.display='none';
	tlist.innerHTML='';
	var date=[];
	var str='';
	var target=getByattr(tlistdata,'id',id,'obj');
	var index=target.child;
	for (var i=0;i<index.length;i++){
		date.push((getByattr(taskdata,'id',index[i],'obj').date));	
	}
	date = uniqArray(date);
	date = datesort(date);
	for (var j = 0; j < date.length; j++) {//遍历日期并保存在数组
		for (var i = 0; i < taskdata.length; i++) {
			if(taskdata[i].date==date[j]&&taskdata[i].parent==id){ 
				if(taskdata[i].status==1){
					temp1.push(taskdata[i]);					
					temp.push(taskdata[i]);
				}
				else{
					temp2.push(taskdata[i]);
					temp.push(taskdata[i]);
				}
			}
		}
	}
	if (all_finish.className=='choose2') {
		for (var i = 0; i < temp1.length; i++) {
			if (i==0 || temp1[i].date!=temp1[i-1].date) {
				str+='<h4>'+temp1[i].date+'</h4>';
			}
			str+='<li style="color:green;">'+temp1[i].name+'<i class="iconfont1" onclick="del1(this)">&#xe646;</i></li>';
		}	
	}
	else if (not_finish.className=='choose2') {
		for (var i = 0; i < temp2.length; i++) {
			if (i==0 || temp2[i].date!=temp2[i-1].date) {
				str+='<h4>'+temp2[i].date+'</h4>';
			}
			str+='<li style="color:red;">'+temp2[i].name+'<i class="iconfont1" onclick="del1(this)">&#xe646;</i></li>';
		}	
	}
	else{
		all.className='choose2';
		for (var i = 0; i < temp.length; i++) {
			if (i==0 || temp[i].date!=temp[i-1].date) {
				str+='<h4>'+temp[i].date+'</h4>';
			}
			if (temp[i].status==0) {
				str+='<li style="color:red;">'+temp[i].name+'<i class="iconfont1" onclick="del1(this)">&#xe646;</i></li>';
			}
			else{
				str+='<li style="color:green;">'+temp[i].name+'<i class="iconfont1" onclick="del1(this)">&#xe646;</i></li>';
			}
		}	
	}	
	tlist.innerHTML+=str;
}
//显示具体任务
function dis_task(id){
	btn3.parentNode.style.display='none';
	if(tlist.getElementsByTagName('li').length==0){
		document.getElementById("task_title").innerHTML="没有任务";
		document.getElementById("task_date").innerHTML="";
		document.getElementById("task_content").innerHTML="";
	}
	else{
	var i = 0;
		for (; i < taskdata.length; i++) {
			if(taskdata[i].id==id){
				task_title.innerHTML=taskdata[i].name;
				task_date.innerHTML=taskdata[i].date;
				task_content.innerHTML=taskdata[i].content;
				return;
			}
		}
	}
}
//未完成的任务数
function setnum(){
	var num1=0;
	var num2=0;
	for (var i = 0; i < sortdata.length; i++) {
		for (var j = 0; j < tlistdata.length; j++) {
			for (var k = 0; k < taskdata.length; k++) {
				if(taskdata[k].status==0&&taskdata[k].parent==tlistdata[j].id){
					num1+=1;
				}
			}
			tlistdata[j].num=num1;
			num1=0;
			if(tlistdata[j].parent==sortdata[i].id){
				num2+=tlistdata[j].num;
			}
		};
		sortdata[i].num=num2;
		num2=0;		
	};
}
function uniqArray(arr) {     //数组去重
    var new_array = [];
    for (var i = 0, len = arr.length; i < len; i++) {
        if (arr[i] !== '' && new_array.indexOf(arr[i]) < 0 ) {
            new_array.push(arr[i]);
        }
    }
    return new_array;
}
//按日期排序加一个数组并return给dis_tlist
function datesort(date){
	return date.sort(function (a, b) {
        return a.replace(/-/g, '') - b.replace(/-/g, '');
    });
}
//点击新建分类弹框
function prompt_c1(){
	var str='';
	shelter.style.display="block";
	prompt.className="prompt";
	for (var i = 1; i < sortdata.length; i++) {
		str+='<option value='+sortdata[i].id+'>'+sortdata[i].name+'</option>';
	};
	var html='<p class="textinput">输入任务名：<input id="input" type="text" name="name"></p>'
	+'<p class="textinput">选择所属文件夹：<select id="select"><option value="-1">一级目录</option>'
	+str
	+'</select></p>'
	+'<button class="btn1" onclick="add_sort()">确定</button><button class="btn2" onclick="closeprompt()">取消</button>';
	var content=getByClass(prompt,"prompt-content")[0];
	content.innerHTML=html;
}
//点击新建任务弹框
function prompt_c2() {
	shelter.style.display="block";
	prompt.className="prompt1";
	var html='<p class="textinput">任务标题：<input id="input_name" type="text" name="name" placeholder="任务1"></p>'
	+'<p class="textinput">任务日期：<input id="input_date" type="text" name="date" placeholder="2016-09-08"></p>'
	+'<p class="textinput">任务内容：<textarea id="input_content" type="text" name="content" placeholder="输入任务内容"></textarea></p>'
	+'<button class="btn1" onclick="add_task()">确定</button><button class="btn2" onclick="closeprompt()">取消</button>';
	var content=getByClass(prompt,"prompt-content")[0];
	content.innerHTML=html;
}
//关闭弹出框
function closeprompt(){
	shelter.style.display="none";
	prompt.className="no";
}
//添加分类
function add_sort (){
	var val=document.getElementById("select").value;
	var text=document.getElementById("input").value;
	var tag;
	var arr=sortdata.concat(tlistdata);
	text=trim(text);
	if (val==-1) {
		if(name_rep(arr,text)){
			var obj1={};
			obj1.id=sortdata[sortdata.length-1].id-1+2+'';
			obj1.name=text;
			obj1.child=[];
			sortdata.push(obj1);
			dis_sort();
			closeprompt();
		}
	}
	else{
		if(name_rep(arr,text)){
			var obj2={};
			obj2.id=tlistdata[tlistdata.length-1].id-1+2+'';
			obj2.name=text;
			obj2.child=[];
			obj2.parent=val+'';
			getByattr(sortdata,'id',obj2.parent,'obj').child.push(obj2.id);
			tlistdata.push(obj2);
			dis_sort();
			closeprompt();
		}
	}
	toold("sort");
}

//添加任务
function add_task(){
	var name=trim(document.getElementById("input_name").value);
	var date=trim(document.getElementById("input_date").value);
	var content=trim(document.getElementById("input_content").value);
	if(daterule(date)&&name_rep(taskdata,name)){
		var obj3={};
		obj3.id=taskdata[taskdata.length-1].id-1+2+'';
		obj3.name=name;
		obj3.date=date;
		obj3.status=0
		obj3.content=content;
		obj3.parent=chooseid;
		taskdata.push(obj3);
		getByattr(tlistdata,'id',chooseid,'obj').child.push(obj3.id);
		dis_sort();
		dis_tlist(chooseid);
		dis_task(chooseid1);
		toold("sort");
		toold("tlist");
		closeprompt();
	}
}
//通过属性获取对象
function getByattr(arr,attr,val,type) {
	for (var i = 0; i < arr.length; i++) {
		if(arr[i][attr]==val){
			switch(type){
				case 'obj':return arr[i];break;;
				case 'index':return i;
			}
		}
	}
}
//根据class获取元素
function getByClass(oParent, sClass) { 
    var oReasult = [];
    var oEle = oParent.getElementsByTagName("*");
    for (i = 0; i < oEle.length; i++) {
        if (oEle[i].className == sClass) {
            oReasult.push(oEle[i])
        }
    };
        return oReasult;
}
//日期格式
function daterule (date) {
	if(!ifnull(date)){
		alert("请输入日期");
		return false;
	}
	date=date.replace(/-/g, '');
	if(date.length!=8){
		alert("请按格式输入日期");
		return false;
	}
	var year=Number(date.substring(0,4));
	var month=Number(date.substring(4,6));
	var day=Number(date.substring(6,8));
	var arr=[2,4,6,9,11];
	if(year==NaN || month==NaN ||day==NaN){
		alert("请输入日期");
		return false;
	}
	if(month>12){
		alert("没有这个月份");
		return false;
	}
	if (arr.indexOf(month)) {
		if(day>30){
			alert("没有这一天");
			return false;
		}
	}
	else{
		if(day>31){
			return false;
			alert("没有这一天");
		}
	}
	return true;

}
//判断输入是否为空
function ifnull (str) {
	if(str=='' || str==null){
		alert("你的输入为空");
		return false;
	}
	return true;
}
//判断是否重复
function name_rep (arr,str) {
	if(!ifnull(str)){
		return false;
	}
	for (var i = 0; i < arr.length; i++) {
		if (arr[i].name==str) {
			alert("请输入一个未使用过的名称！");
			return false;
		}
	}
	return true;
}
//去掉首尾空格
function trim (str) {
	return str.replace(/^\s*/g,'');
}
//委托
function delegateEvent(ele,tag,eventname,listener){ //事件代理兼容
	ele["on"+eventname]=function(e){
		var e=e||window.event();
	    var target=e.srcElemrnt||e.target;
		if(target.nodeName.toLowerCase()===tag){
			listener(target);
		}
	}
}
//选中任务
function choosesort (t) {	
	if(t.parentNode.parentNode.nodeName=="LI"){
		oldchoose.className="";
		t.className="choose";
		oldchoose=t;
		var name=trim(t.getElementsByTagName('span')[0].innerHTML);
		chooseid=getByattr(tlistdata,'name',name,'obj').id;
		dis_tlist(chooseid);
		if (tlist.getElementsByTagName('li')[0]) {
			tlist.getElementsByTagName('li')[0].className="choose1";
			oldchoose1=tlist.getElementsByTagName('li')[0];
			chooseid1=getByattr(taskdata,'name',trim(getByClass(tlist,'choose1')[0].innerHTML.split('<',1)[0]),'obj').id;
			
		};
		dis_task(chooseid1);
	}
}
//选中具体任务
function choosetask (t) {	
	oldchoose1.className="";
	t.className="choose1";
	oldchoose1=t;
	var name=trim(t.innerHTML.split('<',1)[0]);
	chooseid1=getByattr(taskdata,'name',name,'obj').id;
	dis_task(chooseid1);
}
//恢复旧选择
function toold (a) 
{	var sort1=[];
	switch(a){
		case 'sort':var sort=sort_list.getElementsByTagName('li');
		for (var i = 0; i < sort.length; i++) {
			if (sort[i].parentNode.parentNode.nodeName=="LI") {
				sort1.push(sort[i]);
			}
			for(var j=0;j<sort1.length;j++){
				if(getByattr(tlistdata,'id',chooseid,'obj').name==trim(sort1[j].getElementsByTagName('span')[0].innerHTML)){
					sort1[j].className='choose';
					oldchoose=sort1[j];
				}
			}};break;
		case 'tlist':var sort=tlist.getElementsByTagName("li");
		for (var i = 0; i < sort.length; i++) {
			if(getByattr(taskdata,'id',chooseid1,'obj').name==trim(sort[i].innerHTML.split('<',1)[0])){
				sort[i].className='choose1';
				oldchoose1=sort[i];
			}
		};break;
};
}
//删除分类
function del(that) {
	if(confirm("操作不可逆，是否继续？")){
		var t=that.getElementsByTagName('i')[0];
		if(t.className=="iconfont1"){
			var name=trim(t.parentNode.parentNode.getElementsByTagName('span')[0].innerHTML);
			if (getByattr(sortdata,'name',name,'index')) {
				var index=getByattr(sortdata,'name',name,'index');
				for (var i = sortdata[index].child.length-1; i >=0 ; i--) {
					var task=getByattr(tlistdata,'id',sortdata[index].child[i],'obj');
					for (var j = task.child.length-1; j >= 0 ; j--) {
						taskdata.splice(getByattr(taskdata,'id',task.child[j],'index'),1);
						
					};
					tlistdata.splice(getByattr(tlistdata,'id',sortdata[index].child[i],'index'),1);
				};	
				sortdata.splice(index,1);
				if (getByClass(that.parentNode.parentNode,"choose").length>0) {
					init();
				}
				else{
					dis_sort();
				}
			}
			else{
				var index=getByattr(tlistdata,'name',name,'index');
				for (var k =tlistdata[index].child.length-1; k >= 0 ; k--) {
						taskdata.splice(getByattr(taskdata,'id',tlistdata[index].child[k],'index'),1);
					};
				var obj=getByattr(sortdata,'id',tlistdata[index].parent,'obj');
				for (var i = obj.child.length - 1; i >= 0; i--) {
						if(obj.child[i]==tlistdata[index].id){
							obj.child.splice(i,1);
						}
				};
				tlistdata.splice(index,1);
				if (that.parentNode.className=="choose") {
					init();
				}
				else{
					dis_sort();
				}
			}
		}
	}
}
function del1(that){ //删除任务
	if(confirm("操作不可逆，是否继续？")){
		var index=getByattr(taskdata,'name',trim(that.parentNode.innerHTML.split('<',1)[0]),'index');
		var child=getByattr(tlistdata,'id',taskdata[index].parent,'obj').child;
		for (var i = child.length - 1; i >= 0; i--) {
			if(child[i]==taskdata[index].id){
				child.splice(i,1);
				break;
			}
		}
		taskdata.splice(index,1);
		if (that.parentNode.className=="choose1") {
			init();
			dis_task(chooseid1);
		}
		else{
			dis_tlist(chooseid);
			dis_sort();
			dis_task(chooseid1);
		}
	}
}
function finishtask () {
	if (getByattr(taskdata,'id',chooseid1,'obj').status==1) {
		alert("你已经完成了！");
	}
	else{
		getByattr(taskdata,'id',chooseid1,'obj').status=1;
		dis_sort();
		dis_tlist(chooseid);
		toold('tlist');
		toold('sort');
	}
}
function edittask(){
	btn3.parentNode.style.display='block';
	var taskchoose=getByattr(taskdata,'id',chooseid1,'obj');
	task_title.innerHTML='标题：<input type="text" value="'+taskchoose.name+'">';
	task_date.innerHTML='日期： <input type="text" value="'+taskchoose.date+'">';
	task_content.innerHTML='内容：  <textarea>'+taskchoose.content+'</textarea>';
	btn3.onclick=function(){
		taskchoose.name=trim(task_title.getElementsByTagName('input')[0].value);
		taskchoose.date=trim(task_date.getElementsByTagName('input')[0].value);
		taskchoose.content=trim(task_content.getElementsByTagName('textarea')[0].value);
		dis_task(chooseid1);
		dis_tlist(chooseid);
		toold('tlist');
	}
	btn4.onclick=function(){
		btn3.parentNode.style.display='none';
		dis_task(chooseid1);
		toold('tlist');
	}

}
function save(){
	localStorage.sortdata=JSON.stringify(sortdata);
	localStorage.tlistdata=JSON.stringify(tlistdata);
	localStorage.taskdata=JSON.stringify(taskdata);
}
function init(){//起始函数
	if (localStorage.getItem('sortdata')) {
		sortdata=JSON.parse(localStorage.sortdata);
		tlistdata=JSON.parse(localStorage.tlistdata);
		taskdata=JSON.parse(localStorage.taskdata);
	}
	setnum();
	dis_sort();	
	dis_tlist('0');
	chooseid=0;
	if(tlist.getElementsByTagName('li')[0]){
	tlist.getElementsByTagName('li')[0].className="choose1";
	chooseid1=getByattr(taskdata,'name',trim(getByClass(tlist,'choose1')[0].innerHTML.split('<',1)[0]),'obj').id;
	}
	dis_task(chooseid1);
	oldchoose=sort_list.getElementsByTagName('ul')[0].getElementsByTagName('li')[0];
	oldchoose1=tlist.getElementsByTagName('li')[0];
	sort_list.getElementsByTagName('ul')[0].getElementsByTagName('li')[0].className="choose";
	document.getElementById("add_sort").onclick=prompt_c1;
	document.getElementById("add_task").onclick=prompt_c2;
	delegateEvent(sort_list,'li','click',choosesort);
	delegateEvent(tlist,'li','click',choosetask);
	finish.onclick=finishtask;
	edit.onclick=edittask;
	all.onclick=function(){
		all_finish.className='';
		not_finish.className='';
		all.className='choose2';
		dis_tlist(chooseid);
		chooseid1=getByattr(taskdata,'name',trim(tlist.getElementsByTagName('li')[0].innerHTML.split('<',1)[0]),'obj').id;
		tlist.getElementsByTagName('li')[0].className='choose1';
		dis_task(chooseid1);
	}
	all_finish.onclick=function(){
		all_finish.className='choose2';
		not_finish.className='';
		all.className='';
		dis_tlist(chooseid);
		if (tlist.getElementsByTagName('li').length!=0) {
			chooseid1=getByattr(taskdata,'name',trim(tlist.getElementsByTagName('li')[0].innerHTML.split('<',1)[0]),'obj').id;
			tlist.getElementsByTagName('li')[0].className='choose1';
		}
		
		dis_task(chooseid1);
	}
	not_finish.onclick=function(){
		all_finish.className='';
		not_finish.className='choose2';
		all.className='';
		dis_tlist(chooseid);
		if (tlist.getElementsByTagName('li').length!=0) {
			chooseid1=getByattr(taskdata,'name',trim(tlist.getElementsByTagName('li')[0].innerHTML.split('<',1)[0]),'obj').id;
			tlist.getElementsByTagName('li')[0].className='choose1';
		}
		dis_task(chooseid1);
	}
}
init();
window.onunload=function(){save();}
	
