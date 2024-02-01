import Flyer from "./Flyer.js";

const Toaster = class Toaster extends Flyer{
    static toasterCounter = 0;
    constructor(posX, posY, color, active, speed, replacement=undefined)
    {
        super(posX, posY, color, active, replacement);
        this._speed = speed;
        Toaster.toasterCounter++;
        this.updateColor()
    }

    set speed(speed)
    {
        this._speed = speed;
    }

    get speed()
    {
        return this._speed;
    }

    updateColor()
    {
        const element = this.HTMLElement();
        element.className = "toaster "
        element.className += this._color ? "tstrColor" : "tstrNoColor";
    }
}

export default Toaster;