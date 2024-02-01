import ScreenSize from "./helpers/ScreenSize.js";

const requestAnimationFrame = window.requestAnimationFrame || 
							window.mozRequestAnimationFrame || 
							window.webkitRequestAnimationFrame || 
							window.msRequestAnimationFrame;

const cancelAnimationFrame = window.cancelAnimationFrame || 
							window.mozCancelAnimationFrame || 
							window.webkitCanceltAnimationFrame || 
							window.msCancelAnimationFrame;

const Flyer = class Flyer{
    static flyerCounter = 0;
    static event = new Event('borderTouched')
    static node = document.querySelector("#toasters");

	constructor(posX, posY, color, active, replacement=undefined){
		this._posX = posX;
		this._posY = posY;
        this._color = color
        this._ID = Flyer.flyerCounter;
        this._speed = 1;
        this._active = active;
        this._replacement = replacement;
        Flyer.flyerCounter++;

        const element = document.createElement('div');
        element.id = this.ID;
        Flyer.node.append(element);
        element.style.left = posX+"px";
        element.style.bottom = posY+"px";
        if(active)
        {
            this.fly();
        }else{
            this.hide();
        }
    }

	set type(x){
		this._type = x;
	}

	get type(){
		return this._type;
	}

	set posX(x){
		this._posX = x;
        this.HTMLElement().style.left = x + "px";
	}

	get posX(){
		return this._posX;
	}

	set posY(x){
		this._posY = x;
        this.HTMLElement().style.bottom = this._posY + "px";
	}

	get posY(){
		return this._posY;
	}

	get ID(){
		return this._ID;
	}

    set color(color){
        this._color = color;
        this.updateColor()
    }

    get color(){
        return this.color;
    }

    get replacement()
    {
        return this._replacement;
    }

    set replacement(x)
    {
        this._replacement = x;
    }

    set active(x)
    {
        this._active = x;
    }

    get active()
    {
        return this._active;
    }

    updateColor(){}

    hide(){
        this.HTMLElement().style.display = "none";
    }

    show()
    {
        this.HTMLElement().style.display = "initial";
    }

    toggleActive()
    {
        if (this._replacement)
        {
            if(this.active)
            {
                this.stop();
                this.hide();
                this.replacement.posX = this.posX
                this.replacement.posY = this.posY;
                this.replacement.show();
                this.replacement.fly();
            }else
            {
                this.replacement.stop();
                this.replacement.hide();
                this.posX = this.replacement.posX;
                this.posY = this.replacement.posY;
                this.show();
                this.fly();
            }
            this.replacement.active = !this.replacement.active;
            this.active = !this.active;
        }
    }

    HTMLElement(){
		this._HTMLElement = document.getElementById(this._ID);
		return this._HTMLElement;
	}

	moveX(pxls){
		this.posX -= pxls;
	}

	moveY(pxls){
		this.posY -= pxls;
	}

	// Moves object until it reaches edges of the screen
	fly(){
		let elmnt = this.HTMLElement();
		const targetPos = -64;
		const animator = requestAnimationFrame(animate);
		this._animator = animator;
        const obj = this;
		function animate() {
            if(obj._active){
                if (obj.posX <= targetPos || obj.posY <= targetPos) {
                    if(obj.posX <= targetPos)
                    {
                        obj.posX = ScreenSize.scrnWidth;
                    }
                    if(obj.posY <= targetPos){
                        obj.posY = ScreenSize.scrnHeight;
                    }
                    elmnt.dispatchEvent(Flyer.event);
                    return;
                }else{
                    obj.moveX(obj._speed);
                    obj.moveY(obj._speed);
                }
                requestAnimationFrame(animate);
            }
		}
	}
	stop(){
		cancelAnimationFrame(this._animator);
	}
}

export default Flyer