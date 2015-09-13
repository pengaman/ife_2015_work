window.onload=function(){
			var list=document.getElementById("list");
			var index=0;
			var btns=document.getElementById("buttons").getElementsByTagName("span");
			var isgo=false;
			var tim;
function showbtn(){for(
			var i=0;i<btns.length;i++){
					btns[i].className="";}
					btns[index].className="on";
					}
			for(var i=0;i<btns.length;i++){
				
				btns[i].onclick=function(){if(isgo==false){
					
					var newindex=this.getAttribute("index");
					
					{animate((newindex-index)*(-600));}
					index=parseInt(newindex);
showbtn();	}}}
function animate (offset) {
                if (offset == 0) {
                    return;}
					isgo=true;
					var pic=parseInt(list.style.left);
					left=offset+pic;
					 var time = 300;
                var inteval = 10;
                var speed = offset/(time/inteval);
					
					var go = function (){
                    if ((speed > 0 && parseInt(list.style.left) < left) || (speed < 0 && parseInt(list.style.left) > left)) 
                     { list.style.left = parseInt(list.style.left) + speed + 'px';
					
                        setTimeout(go, inteval);
					 }else {isgo=false; list.style.left=left+"px";        
					 if(left>-600){
						 list.style.left=-3000+"px";}
					 if(left<-3000){
						 list.style.left=-600+"px";}

					
}}	
		go();}	
		function play(){tim=window.setInterval(function(){if (index == 4) {
                    index = 0;
                }
                else {
                    index += 1;
                }
                animate(-600);
                showbtn();},3000);}
		function stop(){clearInterval(tim);}
		container.onmouseover = stop;
            container.onmouseout = play;

            play();}