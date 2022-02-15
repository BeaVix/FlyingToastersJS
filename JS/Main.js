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

	moveX(pxls){
		let moveObj = this.HTMLElement();
		this._posX -= pxls;
		moveObj.style.left = this._posX + "px";
	}

	moveY(pxls){
		let moveObj = this.HTMLElement();
		this._posY -= pxls;
		moveObj.style.bottom = this._posY + "px";
	}
	
	// Changes object type and updates counters and element's classes accordingly
	changeType(type, newType, hasColor){
		if (this.type == type){
			let totalType = "total" + (type.replace(/\bt/, "T")) + "s", totalNewType = "total" + (newType.replace(/\bt/, "T")) + "s"; //eval + regex hackery
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

	// Randomizes type and attributes of object
	reset(){
		let choose = Math.floor(Math.random() * 2);
		let colorClass, newType, changeFrom, speedChoose; 
		switch (choose){
			case 0: //Object is toaster
				newType = "toaster";
				changeFrom = "toast";
				speedChoose = Math.floor(Math.random() * 4);

				switch(speedChoose){
					case 0:
						this.speed = 1;
						break;
					case 1:
						this.speed = 1.5;
						break;
					case 3:
						this.speed = 2;
						break;
				}

				switch(colorChecked) {
					case true:
						colorClass = "tstrColor";
						break;
					case false:
						colorClass = "tstrNoColor";
						break;
				}
			break;

			case 1: //Object is toast
				newType = "toast";
				changeFrom = "toaster";
				this.speed = 1;
				switch (colorChecked){ //checks color and current burntness status
					case true:
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
						break;
					case false:
						colorClass = "tstNoColor";
						break;
				}
			break;
		}
		this.changeType(changeFrom, newType, colorClass);
	}

	// Moves object until it reaches edges of the screen
	fly(){
		let actualPosX = this._posX, actualPosY = this._posY;
		let elmnt = this.HTMLElement();
		const targetPos = -64;
		const obj = this;
		const animator = requestAnimationFrame(animate);
		obj._animator = animator;
		function animate() {
			if (actualPosX <= targetPos) {
				elmnt.style.left = scrnWidth;
				obj._posX = scrnWidth;
				actualPosX = obj._posX;
				obj.reset()
			} else if (actualPosY <= targetPos) {
				elmnt.style.bottom = scrnHeight;
				obj._posY = scrnHeight;
				actualPosY = obj.posY;
				obj.reset();
			} else{
				obj.moveX(obj.speed);
				actualPosX = obj.posX;
				obj.moveY(obj.speed);
				actualPosY = obj.posY;
			}
			requestAnimationFrame(animate);
		}
	}
	stop(){
		cancelAnimationFrame(this._animator);
	}
}

const flyingObjsSlider = document.getElementById('flying-objects-slider'), flyingObjsCount = document.getElementById('flying-objects-count');
const color = document.getElementById('color'), checkbox = document.getElementById('checkbox');
const burntness = document.getElementById('burntness-slider'),burntStatus = document.getElementById('burntness-status');
const panel = document.getElementById('cntrlPnl'), header = document.getElementById('header'), exit = document.getElementById('exit');
const panelIcon = document.getElementById('panelIcon');
const node = document.getElementById('toasters');
const scrnWidth = window.screen.availWidth, scrnHeight = window.screen.availHeight;
const requestAnimationFrame = window.requestAnimationFrame || 
							window.mozRequestAnimationFrame || 
							window.webkitRequestAnimationFrame || 
							window.msRequestAnimationFrame;

const cancelAnimationFrame = window.cancelAnimationFrame || 
							window.mozCancelAnimationFrame || 
							window.webkitCanceltAnimationFrame || 
							window.msCancelAnimationFrame;

let flyingObjs = 15, totalToasters = 0, totalToasts = 0, totalFlyers = 0, totalHiddens = 0, colorChecked = true;

flyingObjsSlider.value = flyingObjs;
burntness.value = 0;

for (let i = 0; i < flyingObjs; i++) {
	spawnFlyers();
}

// Creates new flyer object and randomizes it's attributes
function spawnFlyers() {
	let choose = Math.floor(Math.random() * 2); //Chooses type of object
	let posX = Math.round(Math.random() * scrnWidth + 1), posY = Math.round(Math.random() * scrnHeight + 1); //Chooses X and Y position
	let type, speed, existsID, exists, pass;
	let HTMLFlyer = document.createElement('div');
	switch(choose){
		case 0: //Object is toaster
			totalToasters += 1;
			type = 'toaster';
			speed = Math.floor(Math.random() * 4);
			existsID = type + totalToasters;
			exists = document.getElementById(existsID);
			pass = 1;
			while (exists != null){
				existsID = type + (totalToasters + pass);
				exists = document.getElementById(existsID);
				pass += 1;
			}

			switch(speed){
				case 0:
					speed = 1;
					break;
				case 1:
					speed = 1.5;
					break;
				case 2:
					speed = 2;
					break;
			}

			switch (colorChecked) {
				case true:
				HTMLFlyer.className = "toaster tstrColor";
				break;
				case false:
				HTMLFlyer.className = "toaster tstrNoColor"
				break;
			}
			break;

		case 1: //Object is toast
			totalToasts += 1;
			type = 'toast';
			speed = 1;
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

// Updates classes of either all elements or only toast elements for sprite changing purposes
function spriteChange(toasterClass, toastClass, onlyToast){
	let toasters = document.getElementsByClassName('toaster'), toasts = document.getElementsByClassName('toast');
	for (let i = 0; i < toasts.length; i++) {
		toasts[i].className = "toast " + toastClass;
	}

	if (onlyToast == false) {
		for (let i = 0; i < toasters.length; i++) {
			toasters[i].className = "toaster " + toasterClass;
		}
	}
}

// Hides elements
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
	let HTMLToaster = obj.HTMLElement();
	HTMLToaster.className = "Hidden";
	obj.type = "Hidden";
	obj.stop()
	eval(objTotal + " -= 1");
	totalFlyers -= 1;
	totalHiddens += 1;
}

// Unhides elements
function unHide() {
	let pass = 0;
	let obj = eval("Flyer_" + pass);
	let objType = obj.type;
	let colorToaster;
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
	switch(colorChecked){
		case true:
			colorToaster = 'tstrColor';
			break;
		case false:
			colorToaster = 'tstrNoColor';
			break;
	}
	obj.changeType('Hidden', 'toaster', colorToaster);
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

// Updates the counter for flying objects in the control panel and shows/removes objects accordingly
flyingObjsSlider.oninput = function() {
	flyingObjsCount.innerHTML = this.value;
	flyingObjs = this.value;
	if (totalFlyers < flyingObjs) { // The number of currently visible objects is less than the flying objects counter
		for (let i = 0; i < (flyingObjs - totalFlyers); i++) {
			switch(unHide()){
				case true:
				spawnFlyers();
			}
		}
	} else if (totalFlyers > flyingObjs) { // The number of currently visible objects is more than the flying objects counter
		for (let i = 0; i < (totalFlyers - flyingObjs); i++) {
			hide();
		}
	}
}

// Makes control panel draggable
dragElement(panel);

function dragElement(elmnt) {
	let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
	header.onmousedown = dragMouseDown;

	function dragMouseDown(e) {
		header.style.cursor = "grabbing";
		e = e || window.event;
		e.preventDefault();
		// get the mouse cursor position at startup:
		pos3 = e.clientX;
		pos4 = e.clientY;
		document.onmouseup = closeDragElement;
		// call a function whenever the cursor moves:
		document.onmousemove = elementDrag;
	}

	function elementDrag(e) {
		e = e || window.event;
		e.preventDefault();
		// calculate the new cursor position:
		pos1 = pos3 - e.clientX;
		pos2 = pos4 - e.clientY;
		pos3 = e.clientX;
		pos4 = e.clientY;
		// set the element's new position:
		elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
		elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
}

	function closeDragElement() {
		/* stop moving when mouse button is released:*/
		document.onmouseup = null;
		document.onmousemove = null;
		header.style.cursor = "grab";
  }
}

// Changes sprites to black and white or full color when color checkbox is clicked
color.addEventListener("click", function () {
	let toasterColor, toastColor;
	switch (colorChecked) {
		case true:
		toasterColor = 'tstrNoColor';
		toastColor = 'tstNoColor';
		colorChecked = false;
		checkbox.setAttribute('src', 'imgs/checkbox.png');
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
		checkbox.setAttribute('src', 'imgs/checkboxChecked.png');
		colorChecked = true;
		break;
	}
	spriteChange(toasterColor, toastColor, false);
});

// Hides control panel and shows icon
exit.addEventListener("click", function() {
	panel.style.display = "none";
	panelIcon.style.display = "block";
});

// Shows control panel and hides icon
panelIcon.addEventListener("click", function() {
	panelIcon.style.display = "none";
	panel.style.display = "grid";
});