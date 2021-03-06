import Interactable from './interactable.js';
import TextUtils from './../text-util.js';

let Treasure = function(g, name, desc, action) {
    let act = () => {
        this.open();
        action();
    };
    Interactable.call(this, g, act, {});
    this.name = name;
    this.desc = desc;
    this.sprite = g.rectangle(32, 32, 'gold');
    this.img = g.text('💰', '32px times');
    this.img.visible = false;
    this.img.layer = 5;
    this.sprite.visible = false;
    this.scene = {};
    this.textUtils = new TextUtils(g);
};

Treasure.prototype = Object.create(Interactable.prototype);

Treasure.prototype.open = function() {
    const g = this.g;
    let y = g.canvas.height / 4;
    // this.sprite.fillStyle = "brown";
    this.img.content = '📦';
    let modal = g.rectangle(g.canvas.width, g.canvas.height / 2, 'teal', 'teal', 1, 0, y - 50);
    let title = this.textUtils.centeredTexts([`You found a`, `${this.name}`], 48, 'black', y, 50);
    let content = this.textUtils.centeredTexts([`${this.desc}`], 32, 'black', y + 100, 35);
    this.scene = g.group(modal, title[0], title[1], content[0]);
    this.g.wait(1500, () => this.hideModal());
};

Treasure.prototype.hideModal = function() {
    this.scene.visible = false;
};

export default Treasure;