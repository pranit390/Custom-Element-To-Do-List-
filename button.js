class myButton extends HTMLElement {
    static get observedAttributes() {
        return ['c'];
    }

    constructor() {
        super();
        const obj = this.attachShadow({ mode: 'open' })
        const button = document.createElement("button")
        const div = document.createElement('div');




        button.innerText = 'my-button';

        div.appendChild(button)

        const style = document.createElement('style');

        style.textContent = `
    button{
       
        height: 40px;
        width: 100px;
        border-radius: 10px;
       background-color: coral;
           }
         button:hover {
               background-color: yellow;
        }

   
    `;

        obj.appendChild(style)
        obj.appendChild(div)


    }


    connectedCallback() {
        console.log('button element added to page.');
        updateStyle(this);
    }

    disconnectedCallback() {
        console.log('button element removed from page.');
    }

    adoptedCallback() {
        console.log('button element moved to new page.');
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log('button element attributes changed.');
        updateStyle(this)
    }
}

function updateStyle(elem) {
    const shadow = elem.shadowRoot;
    shadow.querySelector('style').textContent = `
    button{
       
        height: 40px;
        width: 100px;
        border-radius: 10px;
       background-color: coral;
           }
         button:hover {
               background-color: yellow;
        }

    div {
       
        width: 200px;
        display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  border: 3px solid green;
        background-color: ${elem.getAttribute('c')};
      }
    `;
}

const add = document.querySelector('.add');
const update = document.querySelector('.update');
const remove = document.querySelector('.remove');
let button;

update.disabled = true;
remove.disabled = true;



add.onclick = () => {

    button = document.createElement('my-button');


    button.setAttribute('c', 'red');
    document.body.appendChild(button);

    update.disabled = false;
    remove.disabled = false;
    add.disabled = true;
};

remove.onclick = () => {

    document.body.removeChild(button);

    update.disabled = true;
    remove.disabled = true;
    add.disabled = false;
}
update.onclick = function () {


    button.setAttribute('c', `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`);
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}


window.addEventListener('DOMContentLoaded', () => {
    customElements.define('my-button', myButton);
});