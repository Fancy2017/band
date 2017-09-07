function addLoadEvent(func){
	var oldonload = window.onload;
	if(typeof window.onload!="function"){
		window.onload=func;
	}else{
		window.onload=function(){
			oldonload();
			func();
		}
	}

}

function insertAfter(newElement,targetElement){
	var parent=targetElement.parentNode;
	if(parent.lastChild==targetElement){
		parent.appendChild(newElement);
	}else{
		parent.insertBefore(newElement,targetElement.nextSibling);
	}
}

function addClass(element,value){
	if (!element.className) {  //.className注意！！！
		element.className=value;
	}else{
		element.className+=" ";
		element.className+=value;
	}
}


function highlightPage(){
	var headers=document.getElementsByTagName('header');
	if(headers.length==0) return false;
	var navs=headers[0].getElementsByTagName('nav');
	if(navs.length==0) return false;
	var links=navs[0].getElementsByTagName('a');
	var linkurl;
	for(var i=0;i<links.length;i++){
		linkurl=links[i].getAttribute('href');
		if(window.location.href.indexOf(linkurl)!=-1){
			links[i].className="here";
		var linktext=links[i].lastChild.nodeValue.toLowerCase();
		document.body.setAttribute("id",linktext);
		}
		
	}
}
addLoadEvent(highlightPage);

//home
function moveElement(elementID,final_x,final_y,interval){
	if(!document.getElementById) return false;
	if(!document.getElementById(elementID)) return false;
	var elem=document.getElementById(elementID);
	if (elem.movement){
		clearTimeout(elem.movement);
	}
	if(!elem.style.left){
		elem.style.left="0px";
	}
	if(!elem.style.top){
		elem.style.top="0px";
	}
	var xpos=parseInt(elem.style.left);
	var ypos=parseInt(elem.style.top);
	if(xpos==final_x && ypos==final_y){
		return true;
	}
	if(xpos<final_x){
		var dist=Math.ceil((final_x-xpos)/10);
		xpos=xpos+dist;
	}
	if(xpos>final_x){
		var dist=Math.ceil((xpos-final_x)/10);
		xpos=xpos-dist;
	}
	if(ypos<final_y){
		var dist=Math.ceil((final_y-ypos)/10);
		ypos=ypos+dist;
	}
	if(ypos>final_y){
		var dist=Math.ceil((ypos-final_y)/10);
		ypos=ypos-dist;
	}
	elem.style.left=xpos+"px";
	elem.style.top=ypos+"px";
	//elementID不是变量，所以要加引号
	var repeat="moveElement('"+elementID+"',"+final_x+","+final_y+","+interval+")";
	//为元素创建属性 element.property=value
	elem.movement=setTimeout(repeat,interval);
}

function prepareSlideshow(){
	if(!document.getElementsByTagName) return false;
	if(!document.getElementById) return false;
	if(!document.getElementById("intro")) return false;
	var intro = document.getElementById("intro");
	var slideshow = document.createElement("div");
	slideshow.setAttribute("id","slideshow");
	var preview = document.createElement("img");
	preview.setAttribute("src","images/slideshow.gif");
	preview.setAttribute("alt","a glimpse of what awaits you");
	preview.setAttribute("id","preview");
	slideshow.appendChild(preview);
	insertAfter(slideshow,intro);

	var frame=document.createElement("img");
	frame.setAttribute("src","images/frame.gif")
	frame.setAttribute("alt","");
	frame.setAttribute("id","frame");
	slideshow.appendChild(frame);

	var links = document.getElementsByTagName("a");
	var destination;
	for(var i=0;i<links.length;i++){
		links[i].onmouseover=function(){
			destination=this.getAttribute("href");
			if(destination.indexOf("index.html")!=-1){
				moveElement("preview",0,0,5);
			}
			if(destination.indexOf("about.html")!=-1){
				moveElement("preview",-150,0,5);
			}
			if(destination.indexOf("photos.html")!=-1){
				moveElement("preview",-300,0,5);
			}
			if(destination.indexOf("live.html")!=-1){
				moveElement("preview",-450,0,5);
			}
			if(destination.indexOf("contact.html")!=-1){
				moveElement("preview",-600,0,5);	
			}
		}
	}
}
addLoadEvent(prepareSlideshow);

//about
function showSection(id){
	var section=document.getElementsByTagName("section");
	for(var i=0;i<section.length;i++){
		if(section[i].getAttribute("id")!=id){
			section[i].style.display="none";
		}else{
			section[i].style.display="block";
		}
	}
}

function prepareInternalnav(){
	if (!document.getElementsByTagName) return false;
	if (!document.getElementById) return false;
	var articles = document.getElementsByTagName("article");
	if(articles.length==0) return false;
	var navs=articles[0].getElementsByTagName("nav");
	if(navs.length==0) return false;
	var links=navs[0].getElementsByTagName("a");
	for(var i=0;i<links.length;i++){
		var sectionId=links[i].getAttribute("href").split("#")[1];
		if (!document.getElementById(sectionId)) return false;
		document.getElementById(sectionId).style.display="none";
		links[i].destination=sectionId;
		links[i].onclick=function(){
			//showSection(sectionId);不能直接传入sectionId，会使得传入的都是最后一个i的sectionId值
			showSection(this.destination);
			//document.getElementById(this.destination).style.display="block";
			//上面的写法会让隐藏只出现在初始化，display之后就没法隐藏回去了
			return false;
		}
	}
}
addLoadEvent(prepareInternalnav);

//photos
function preparePlaceholder(){
	if (!document.getElementById) return false;
	if (!document.createElement) return false;
	if (!document.createTextNode) return false;//createElement不要老是掉了create的e！！！
	if (!document.getElementById("imagegallery")) return false;
	
	var placeholder = document.createElement("img");
	placeholder.setAttribute("id","placeholder");
	placeholder.setAttribute("src","images/placeholder.gif");
	placeholder.setAttribute("alt","my placehold");
	var description = document.createElement("p");
	description.setAttribute("id","description");
	var desctext = document.createTextNode("Choose an image");
	description.appendChild(desctext);
	var gallery=document.getElementById("imagegallery");
	insertAfter(description,gallery);
	insertAfter(placeholder,description);
}
addLoadEvent(preparePlaceholder);

function showPic(whichpic){
	if(!document.getElementById("placeholder")) return true;//平稳退化，没有placeholder就在新标签页显示链接
	var placeholder=document.getElementById("placeholder");
	var source = whichpic.getAttribute("href");
	placeholder.setAttribute("src",source);
	if(!document.getElementById("description")) return false;
	if(whichpic.getAttribute("title")){
		var text=whichpic.getAttribute("title");
	}else{
		var text="";
	}
	var description=document.getElementById("description");
if(description.firstChild.nodeType==3){
	description.firstChild.nodeValue=text;
}
return false;//让a链接不要在新窗口打开。
}

function prepareGallery(){
	if(!document.getElementsByTagName) return false;
	if(!document.getElementById) return false;
	if(!document.getElementById("imagegallery")) return false;
	var gallery=document.getElementById("imagegallery");
	var links=gallery.getElementsByTagName("a");
	for(var i=0;i<links.length;i++){
		links[i].onclick=function(){
			return showPic(this);//不return,会使得showPic里的return false失效。
			//return false;
		}
	}
}
addLoadEvent(prepareGallery);

//Live
function stripeTables(){
	if(!document.getElementsByTagName) return false;
	//if(!document.getElementsByTagName("table")) return false;

	var tables=document.getElementsByTagName("table");
	if(!tables[0]) return false;
	var rows=tables[0].getElementsByTagName("tr");
	
	for(var i=0;i<rows.length;i++){
		if(i%2==1){
			addClass(rows[i],"odd");
		}
	}
	
}


addLoadEvent(stripeTables);

function highlightRows(){
	if(!document.getElementsByTagName) return false;
	//if(!document.getElementsByTagName("table")) return false;
	var tables=document.getElementsByTagName("table");
	if(!tables[0]) return false;
	var rows=tables[0].getElementsByTagName("tr");
	for(var i=0;i<rows.length;i++){
		rows[i].oldClassName=rows[i].className;//添加属性，保存鼠标滑过之前的类
		rows[i].onmouseover=function(){
			addClass(this,"high");
		}
		rows[i].onmouseout=function(){
			this.className=this.oldClassName;//此处只能用this，因为调用时i已为最大值。
		}
	}
}
addLoadEvent(highlightRows);

function displayAbbreviations(){

}

//Contact
//客户端验证的目的在于帮助用户填好表单，服务器端验证的目的在于保护数据库和后台系统安全。
function focusLabels(){
	if (!document.getElementsByTagName) return false;
	var labels=document.getElementsByTagName("label");
	if (labels.length==0) return false;
	for(var i=0;i<labels.length;i++){
		if(!labels[i].getAttribute("for")) continue;
		labels[i].onclick=function(){
			var id = labels[i].getAttribute("for");
			if(!document.getElementById("id")) return false;
			var elem=document.getElementById("id");
			elem.focus();
		}


	}
}
addLoadEvent(focusLabels);

function isFilled(field){
	if (field.value.replace(" ","").length==0) return false;
	var placeholder=field.placeholder;
	return(placeholder!=field.value);
}

function isEmail(field){
	return(field.value.indexOf("@")!=-1&&field.value.indexOf(".")!=-1);
}

function validateForm(whichform){
	var inputs=whichform.getElementsByTagName("input")
	for(var i=0;i<inputs.length;i++){
		var input=inputs[i];
		if(input.required){
			if(!isFilled(input)) {
				alert("you need to fill the"+input.name +"field");
				return false;
			}
		}
		if(input.type="email"){
			if(!isEmail(input)){
				alert("please input correct email");
				return false;
			}
		}
	}
	return true;
	
}

function prepareForms(){
	if (!document.getElementsByTagName) return false;
	var forms = document.getElementsByTagName("form");
	for (var i=0;i<forms.length;i++){
		forms[i].onsubmit=function(){
			return validateForm(this);
		}
	}
}
