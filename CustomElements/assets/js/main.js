 //autonomous custom element class
 class PopupInfo extends HTMLElement {
     constructor() {
         //Always call super first in contructor
         super();
         //create a shadow root
         let shadow = this.attachShadow({
             mode: 'open'
         });
         const wrapper = document.createElement('span');
         wrapper.setAttribute('class', 'wrapper');
         const icon = wrapper.appendChild(document.createElement('span'));
         icon.setAttribute('class', 'icon');
         icon.setAttribute('tabindex', 0);
         //insert icon from defined attribute or default icon 
         const img = icon.appendChild(document.createElement('img'));
         img.src = this.hasAttribute('img') ? this.getAttribute('img') : 'assets/img/default.png';
         const info = wrapper.appendChild(document.createElement('span'));
         info.setAttribute('class', 'info');
         //take attribute content and put it inside the info span
         info.textContent = this.getAttribute('data-text');
         //create some css to apply to the shadow dom
         // const style = document.createElement('style');
         // style.textContent = `.wrapper {`
         const link = document.createElement('link');
         link.setAttribute('rel', 'stylesheet');
         link.setAttribute('href', 'assets/styles/style.css');
         shadow.append(link, wrapper); //this.shadowRoot.append()
     }
 }
 //define the new element
 customElements.define('popup-info', PopupInfo);