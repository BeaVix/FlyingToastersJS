import Flyer from "./Flyer.js";
import Toast from "./Toast.js";
import Toaster from "./Toaster.js";
import ScreenSize from "./helpers/ScreenSize.js";

const flyingObjsSlider = document.getElementById('flying-objects-slider')
const flyingObjsCount = document.getElementById('flying-objects-count');
const color = document.getElementById('color')
const checkbox = document.getElementById('checkbox');
const burntness = document.getElementById('burntness-slider')
const burntStatus = document.getElementById('burntness-status');
const panel = document.getElementById('cntrlPnl')
const header = document.getElementById('header')
const exit = document.getElementById('exit');
const panelIcon = document.getElementById('panelIcon');

let flyingObjs = 15, objects=[], toasts=[], toasters=[], shown=[], hidden=[], colorChecked = true;

flyingObjsSlider.value = flyingObjs;
burntness.value = 0;

for (let i = 0; i < flyingObjs; i++) {
	spawnFlyers();
}

// Creates new flyer object and randomizes it's attributes
function spawnFlyers() {
	const choose = Math.floor(Math.random() * 2); //Chooses type of object
	let posX = Math.round(Math.random() * ScreenSize.scrnWidth + 1); //Random x position
	let posY = Math.round(Math.random() * ScreenSize.scrnHeight + 1); //Random y position
	while((shown.find(element=>element.posX >= posX && element.posX < posX+64)) || (shown.find(element=>element.posY > posY && element.posY < posY+64)))
	{
		posY = Math.round(Math.random() * ScreenSize.scrnWidth + 1);
		posX = Math.round(Math.random() * ScreenSize.scrnHeight + 1);
	}

	let obj;
	switch(choose){
		case 0: //Object is toaster
			obj = new Toaster(posX, posY, colorChecked, true, randSpeed())
			obj.replacement = new Toast(obj.posX, obj.posY, colorChecked, burntStatus.textContent, false, obj);
			toasters.push(obj);
			toasts.push(obj.replacement);
			break;

		case 1: //Object is toast
			obj = new Toast(posX, posY, colorChecked, burntStatus.textContent, true);
			obj.replacement = new Toaster(obj.posX, obj.posY, colorChecked, false, randSpeed(), obj);
			toasts.push(obj);
			toasters.push(obj.replacement);
			break;
	}
	objects.push(obj);
	shown.push(obj);
	objects.push(obj.replacement);
	const objElement = obj.HTMLElement()
	const borderEventHandler = (e)=>{
		const element = e.target;
		const objectElement = objects.find(elmnt=>elmnt.ID == parseInt(element.id));
		const choice = Math.floor(Math.random()*2);
		if((choice && objectElement instanceof Toaster) || (!choice && objectElement instanceof Toast))
		{
			objectElement.toggleActive();
			shown.splice(shown.findIndex(element=>element == objectElement), 1);
			shown.push(objectElement.replacement);
		}else{
			objectElement.fly();
		}
	}
	objElement.addEventListener(Flyer.event.type, borderEventHandler);
	obj.replacement.HTMLElement().addEventListener(Flyer.event.type, borderEventHandler);
}

function randSpeed()
{
	let speed = Math.floor(Math.random() * 4);
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
	return speed;
}

//Updates toasts burntness and slider text when the slider's value changes
burntness.oninput = function() {
	if (this.value == "1" || this.value < 50) {
		burntStatus.innerHTML = "Light";

	} else if (this.value == "50" || this.value < 100) {
		burntStatus.innerHTML = "Medium";

	} else if (this.value == "100"){
		burntStatus.innerHTML = "Burnt"
	}
	if(colorChecked)
	{
		toasts.forEach(toast=>{
			toast.burntness = burntStatus.textContent;
		})
	}
}

// Updates the counter for flying objects in the control panel and shows/removes objects accordingly
flyingObjsSlider.oninput = function() {
	flyingObjsCount.innerHTML = this.value;
	const flyingObjs = this.value;
	if (shown.length < flyingObjs) { // The number of currently visible objects is less than the flying objects counter
		for (let i = 0; i < (flyingObjs - shown.length); i++) {
			if(hidden.length)
			{
				const element = hidden.pop()
				element.active = true;
				element.show();
				element.fly();
				shown.push(element);
			}else{
				spawnFlyers();
			}
		}
	} else if (shown.length > flyingObjs) { // The number of currently visible objects is more than the flying objects counter
		for (let i = 0; i < (shown.length - flyingObjs); i++) {
			const element = shown.pop();
			element.active = false;
			element.hide();
			hidden.push(element);
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
	colorChecked = !colorChecked
	checkbox.className = colorChecked ? "checked" : "unchecked"
	objects.forEach(element=>{
		element.color = colorChecked;
	})
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