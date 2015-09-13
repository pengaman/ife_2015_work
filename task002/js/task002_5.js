var left1;
var top1;
var X,Y,x,y;
var a,b;
$("#left,#right").delegate("li","mousedown",
function(e){
	$(this).css("opacity","0.5");
	$(this).css("border","1px #000 solid");
	
	Y = $(this).offset().top;
    X = $(this).offset().left;
	
	a=X;
	b=Y;
    left1=e.clientX;
	top1=e.clientY; 
	
  x=left1-X;
  y=top1-Y;
	$(this).css("position","absolute");
	$(this).css("top",Y);
    $(this).css("left",X);
	
	$(this).css("cursor","move");
console.log(X+","+Y);
	
	$("#left,#right").delegate("li","mousemove",function(e){
		
		left1=e.clientX;
		top1=e.clientY;
		
		X=left1-x;
	    Y=top1-y;
$(this).css("top",Y);
$(this).css("left",X);
	})
	

})
$("#left,#right").delegate("li","mouseup",
function(e){$("#left,#right").undelegate("li","mousemove");
$(this).css("opacity","1");

if((left1<$("#right").offset().left&&a<$("#right").offset().left-10)||(left1>$("#left").offset().left+200&&a>$("#left").offset().left+10))
{$(this).css("position","static");
$(this).css("border","");
}
else if(left1>=$("#right").offset().left&&a<$("#right").offset().left-10)
{var lis= document.createElement("li");
 $("#right").append(lis);	
$(this).remove();}
else if(left1<=$("#left").offset().left+200&&a>$("#left").offset().left+10)
{var lis= document.createElement("li");
 $("#left").append(lis);	
$(this).remove();}

})