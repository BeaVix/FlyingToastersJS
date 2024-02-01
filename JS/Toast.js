import Flyer from "./Flyer.js";

const Toast = class Toast extends Flyer{
    static toastCounter = 0;
    constructor(posX, posY, color, burntness, active, replacement=undefined)
    {
        super(posX, posY, color, active, replacement);
        this._burntness = burntness;
        Toast.toastCounter++;
        this.updateColor();
    }

    set burntness(burntness)
    {
        this._burntness = burntness;
        this.updateColor();
    }

    get burntness()
    {
        return this._burntness;
    }

    updateColor()
    {
        const node = this.HTMLElement();
        node.className = "toast ";
        let colorClass = "tst";
        if(this._color)
        {
            colorClass += this._burntness;
        }else{
            colorClass += "NoColor"
        }
        node.className += colorClass
    }
}

export default Toast;