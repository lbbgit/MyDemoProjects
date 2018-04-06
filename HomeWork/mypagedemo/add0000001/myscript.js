function MyRdm(name){ 
	document.body.style.backgroundColor = "#" + (Math.random() * 0xffffff << 0).toString(16);   
};   

var rdmColor=new function(){
    document.body.style.backgroundColor = "#" + (Math.random() * 0xffffff << 0).toString(16);
};

rdmColor();