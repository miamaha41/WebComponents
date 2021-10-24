class Square extends HTMLElement {
    // Specify observed attributes so that attributeChangedCallback will work
    static get obseredAttributes() {
        return ['c', 'l'];
    }
    constructor() {
        //alway call super first in constructor
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        const div = document.createElement('div');
        const style = document.createElement('style');
        shadow.appendChild(style);
        shadow.appendChild(div);
    }
    updateStyle() {
        this.shadowRoot.querySelector('style').textContent = `
        div {
            margin:20px;
            width: ${this.getAttribute('l')}px;
            height:${this.getAttribute('l')}px;
            background-color: ${this.getAttribute('c')};
        }
        `;
    }
    connectedCallback() {
        console.log('Custom square element added to page');
        this.updateStyle();
    }
    disconnectedCallback() {
        console.log('Custom square element removed from page');
    }
    adoptedCallback() {
        console.log('Custom square element move to new page');
    }
    attributeChangedCallback(name, oldValue, newValue) {
        console.log('Custom square element attributes changed');
        this.updateStyle();
    }
}
customElements.define('custom-square', Square);
const add = document.querySelector('.add');
const update = document.querySelector('.update');
const remove = document.querySelector('.remove');
let square;
update.disabled = true;
remove.disabled = true;

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
add.onclick = () => {
    //Create a custom square element
    square = document.createElement('custom-square');
    square.setAttribute('l', '100');
    square.setAttribute('c', 'red');
    document.body.appendChild(square);
    update.disabled = false;
    remove.disabled = false;
    add.disabled = true;
};
update.onclick = () => {
    //random update square's attributes
    square.setAttribute('l', random(50, 200));
    square.setAttribute('c', `rgb(${random(0,255)},${random(0,255)},${random(0,255)})`);
    document.body.appendChild(square);
};
remove.onclick = () => {
    //remove the square
    document.body.removeChild(square);
    update.disabled = true;
    remove.disabled = true;
    add.disabled = false;
};