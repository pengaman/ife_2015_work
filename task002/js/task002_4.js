

var num=-1;
var val="";
var ob=["Text","pool","jk","tao","pull"];

$(".menu").on("keyup",function(){
if($(".txt").val()!=val)	
	newlist();	
	
})
$(".search-box").delegate("li","click",function(){
		$(".txt").val(this.innerHTML);
		
	$(".search-box").css("display","");
		
	});
$(".search-box").delegate("li","mouseover",function(){
			$(".search-box li").removeClass();
			
			$(this).addClass("on");
			
			
		});
	$(".search-box").delegate("li","mouseout",function(){
			
			$(".search-box li").removeClass();
			
			num=0;
		});
	
$(document).on("keyup",function(e){
if(e.keyCode==40)
{$(".search-box li").each(function(){
			$(this).removeClass("on")
			
		});
		num=num+1;
		if(num==$(".search-box li").length)
		{num=0;}
		document.getElementsByTagName("li")[num].className="on";
	
	
}})
$(document).on("keyup",function(e){
if(e.keyCode==38)
{$(".search-box li").each(function(){
			$(this).removeClass("on")
			
		});
		
		if(num==0)
		{num=$(".search-box li").length;}
		num=num-1;
		document.getElementsByTagName("li")[num].className="on";
	
	
}})

$(document).on("click",function(){
	$(".search-box").css("display","");})
$(document).on("keyup",function(e){
if(e.keyCode==13)
{
$(".txt").val(document.getElementsByTagName("li")[num].innerHTML);
$(".search-box").css("display","");	
}})
function newlist(){
	$(".search-box li").remove();
	val=$(".txt").val();
	
	for(var i=0;i<ob.length;i++)
		if(val!="")
		if(eval("/.*"+val+".*/").test(ob[i]))
			
		{$(".search-box").append("<li>"+ob[i]+"</li>");
		$(".search-box").css("display","block");
		}
	}