class flyer{
	constructor(type, posX, posY, speed, ID){
		this._type = type;
		this._posX = posX;
		this._posY = posY;
		this._speed = speed;
		this._nro = ID;
	}

	set type(x){
		this._type = x;
	}

	get type(){
		return this._type;
	}

	set posX(x){
		this._posX = x;
	}

	get posX(){
		return this._posX;
	}

	set posY(x){
		this._posY = x;
	}

	get posY(){
		return this._posY;
	}

	set speed(x){
		this._speed = x;
	}

	get speed(){
		return this._speed;
	}

	get ID(){
		return this._nro;
	}

	HTMLElement(){
		this._HTMLElement = document.getElementById(this._nro);
		return this._HTMLElement;
	}

	moveX(){
		let moveObj = this.HTMLElement();
		this._posX -= 1;
		moveObj.style.left = this._posX + "px";
	}

	moveY(){
		let moveObj = this.HTMLElement();
		this._posY -= 1;
		moveObj.style.bottom = this._posY + "px";
	}
	
	changeType(type, newType, hasColor){ //'type' argument is the type expected to change from, not neccesarly the type of the object.
	if (this.type == type){
		let totalType = "total" + (type.replace(/\bt/, "T")) + "s";
		let totalNewType = "total" + (newType.replace(/\bt/, "T")) + "s";
		let existsID = eval("newType + " + totalNewType);
		let elmnt = this.HTMLElement();
		let exists = document.getElementById(existsID);
		let pass = 1;
		eval(totalNewType + " += 1");
		eval(totalType + " -= 1");
		this.type = newType;
		elmnt.className = newType + " " + hasColor;
		while(exists != null){
			existsID = eval("newType + ( " + totalNewType + " + pass)");
			exists = document.getElementById(existsID);
			pass += 1;
		}
		this.nro = existsID;
		elmnt.id = this._nro;
	}
}

reset(){
	let choose = Math.floor(Math.random() *2);
	let colorClass;
	let speed =  Math.floor(Math.random() * 3) + 1;
	switch (choose){
		case 0:
		switch(colorChecked) {
			case true:
			colorClass = "tstrColor";
			break;
			case false:
			colorClass = "tstrNoColor";
			break;
		}
		this.changeType("toast", "toaster", colorClass);		
		switch(speed){
			case 1:
			this.speed = 30;
			break;
			case 2:
			this.speed = 15;
			break;
			case 3:
			this.speed = 6;
			break;
		}
		break;
		case 1:
		if (colorChecked == true) {
			switch (burntStatus.textContent){
				case "Light":
				colorClass = "tstLight";
				break;
				case "Medium":
				colorClass = "tstMedium";
				break;
				case "Burnt":
				colorClass = "tstDark";
				break
			}
		} else{
			colorClass = "tstNoColor";
		}
		this.changeType("toaster", "toast", colorClass);
		this.speed = 30;
		break;
	}
	this.fly();
}

fly(){
	let actualPosX = this._posX;
	let actualPosY = this._posY;
	let elmnt = this.HTMLElement();
	const targetPos = -64;
	const obj = this;
	const animator = setInterval(function() {
		if (actualPosX == targetPos) {
			clearInterval(animator);
			elmnt.style.left = scrnWidth;
			obj._posX = scrnWidth;
			actualPosX = obj._posX;
			obj.reset()
		} else if (actualPosY == targetPos) {
			clearInterval(animator);
			elmnt.style.bottom = scrnHeight;
			obj._posY = scrnHeight;
			actualPosY = obj.posY;
			obj.reset();
		} else{
			obj.moveX();
			actualPosX = obj.posX;
			obj.moveY();
			actualPosY = obj.posY;
		}
	}, obj.speed);
	this._interval = animator;
} 

stop(){
	clearInterval(this._interval);
}
}
const flyingObjsSlider = document.getElementById('flying-objects-slider');
const flyingObjsCount = document.getElementById('flying-objects-count');
const color = document.getElementById('color');
const burntness = document.getElementById('burntness-slider');
const burntStatus = document.getElementById('burntness-status');
const exit = document.getElementById('exit');
const panel = document.getElementById('cntrlPnl');
const header = document.getElementById('header');
const scrnWidth = window.screen.availWidth;
const scrnHeight = window.screen.availHeight;
const node = document.getElementById('toasters');

let flyingObjs = 15;
let totalToasters = 0;
let totalToasts = 0;
let totalFlyers = 0;
let totalHiddens = 0;
let colorChecked = true;


function spawnFlyers() {
	let choose = Math.floor(Math.random() * 2);
	let posX = Math.round(Math.random() * scrnWidth + 1);
	let posY = Math.round(Math.random() * scrnHeight + 1);
	let type;
	let speed;
	let existsID;
	let exists;
	let pass;
	let HTMLFlyer = document.createElement('div');;
	switch(choose){
		case 0:
		totalToasters += 1;
		type = 'toaster';
		speed = (Math.floor(Math.random() * 3)) + 1;
		switch(speed){
			case 1:
			speed = 30;
			break;
			case 2:
			speed = 15;
			break;
			case 3:
			speed = 6;
			break;
		}
		existsID = type + totalToasters;
		exists = document.getElementById(existsID);
		pass = 1;
		while (exists != null){
			existsID = type + (totalToasters + pass);
			exists = document.getElementById(existsID);
			pass += 1;
		}

		switch (colorChecked == true) {
			case true:
			HTMLFlyer.className = "toaster tstrColor";
			break;
			case false:
			HTMLFlyer.className = "toaster tstrNoColor"
			break;
		}
		break;

		case 1:
		totalToasts += 1;
		type = 'toast';
		speed = 30;
		existsID = type + totalToasts;
		exists = document.getElementById(existsID);
		pass = 1;
		while (exists != null){
			existsID = type + (totalToasts + pass);
			exists = document.getElementById(existsID);
			pass += 1;
		}

		switch (colorChecked) {
			case true:
			switch (burntStatus.textContent){
				case "Light":
				HTMLFlyer.className = "toast tstLight";
				break;
				case "Medium":
				HTMLFlyer.className = "toast tstMedium";
				break;
				case "Burnt":
				HTMLFlyer.className = "toast tstDark";
				break;
			}
			break;
			case false:
			HTMLFlyer.className = "toast tstNoColor"
			break;
		}
		break;
	}
	eval("Flyer_" + totalFlyers + " = new flyer(type, posX, posY, speed, existsID)");
	eval("var newFlyer = Flyer_" + totalFlyers);
	totalFlyers += 1;

	HTMLFlyer.id = newFlyer.ID;
	HTMLFlyer.style.left = newFlyer.posX + "px";
	HTMLFlyer.style.bottom = newFlyer.posY + "px";
	node.appendChild(HTMLFlyer);
	newFlyer.fly();
}

function spriteChange(toasterClass, toastClass, onlyToast){
	let toasters = document.getElementsByClassName('toaster');
	let toasts = document.getElementsByClassName('toast');
	for (let i = 0; i < toasts.length; i++) {
		toasts[i].className = "toast " + toastClass;
	}

	if (onlyToast == false) {
		for (let i = 0; i < toasters.length; i++) {
			toasters[i].className = "toaster " + toasterClass;
		}
	}
}


function changeColor() {
	let toasterColor;
	let toastColor;
	switch (colorChecked) {
		case true:
		toasterColor = 'tstrNoColor';
		toastColor = 'tstNoColor';
		colorChecked = false;
		break;

		case false:
		toasterColor = 'tstrColor';
		switch (burntStatus.textContent){
			case 'Light':
			toastColor = 'tstLight';
			break;
			case 'Medium':
			toastColor = 'tstMedium';
			break;
			case 'Burnt':
			toastColor = 'tstDark';
			break;
		}
		colorChecked = true;
		break;
	}
	spriteChange(toasterColor, toastColor, false);
}

function hide() {
	let pass = 0;
	let obj = eval("Flyer_" + pass);
	let objType = obj.type;
	while(objType == "Hidden"){
		try {
			obj = eval("Flyer_" + pass);
			pass += 1;
		}
		catch(err){
			return true;
		}
		objType = obj.type;
	}
	let objTotal = "total" + (objType.replace(/\bt/, "T")) + "s";		
	eval(objTotal + " -= 1");
	obj.type = "Hidden";
	obj.stop()
	totalFlyers -= 1;
	let HTMLToaster = obj.HTMLElement();
	HTMLToaster.className = "Hidden";	
}

function unHide() {
	let pass = 0;
	let obj = eval("Flyer_" + pass);
	let objType = obj.type;
	while(objType != 'Hidden'){
		pass += 1;
		try {
			obj = eval("Flyer_" + pass);
		}
		catch(err){
			return true;
		}
		objType = obj.type;
	}
	obj.changeType('Hidden', 'toaster', 'tstrColor');
	obj.reset();
	totalFlyers += 1;
}

burntness.oninput = function() {
	let toastColor;
	if (this.value == "1" || this.value < 50) {
		burntStatus.innerHTML = "Light";
		toastColor = 'tstLight';

	} else if (this.value == "50" || this.value < 100) {
		burntStatus.innerHTML = "Medium";
		toastColor = 'tstMedium';

	} else if (this.value == "100"){
		burntStatus.innerHTML = "Burnt"
		toastColor = 'tstDark';
	}
	switch (colorChecked) {
		case true:
		spriteChange("", toastColor, true);
		break;
	}
}

flyingObjsSlider.oninput = function() {
	flyingObjsCount.innerHTML = this.value;
	flyingObjs = this.value;
	if (totalFlyers < flyingObjs) {
		for (let i = 0; i < (flyingObjs - totalFlyers); i++) {
			switch(unHide()){
				case true:
				spawnFlyers();
			}
		}
	} else if (totalFlyers > flyingObjs) {
		for (let i = 0; i < (totalFlyers - flyingObjs); i++) {
			hide();
		}
	}
}

function closePanel(){
	panel.style.display = "none";
}

color.addEventListener("click", changeColor);
exit.addEventListener("click", closePanel);

for (let i = 0; i < flyingObjs; i++) {
	spawnFlyers();
}