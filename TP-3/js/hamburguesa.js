document.querySelector(".bars__menu").addEventListener("click", animateBars);

var line1__bars = document.querySelector(".line1__bars-menu");
var line2__bars = document.querySelector(".line2__bars-menu");
var line3__bars = document.querySelector(".line3__bars-menu");

function animateBars(){
    line1__bars.classList.toggle("activeline1__bars-menu");
    line2__bars.classList.toggle("activeline2__bars-menu");
    line3__bars.classList.toggle("activeline3__bars-menu");
}

const nav = document.querySelector(".hamburguesa");
const abrir = document.querySelector(".bars__menu");

abrir.addEventListener("click", () => {
    nav.classList.add("abrir-menu");
    nav.classList.toggle("hamburguesa");
})



const viewBtn = document.querySelector(".view-modal"),
        popup = document.querySelector(".popup"),
        close = popup.querySelector(".close"),
        field = popup.querySelector(".field"),
        input = field.querySelector("input"),
        copy = field.querySelector("button");
        viewBtn.onclick = ()=>{
          popup.classList.toggle("show");
        }
        close.onclick = ()=>{
          viewBtn.click(); 
        }
        copy.onclick = ()=>{
          input.select(); //select input value
          if(document.execCommand("copy")){ //if the selected text copy
            field.classList.add("active");
            copy.innerText = "Copiado";
            setTimeout(()=>{
              window.getSelection().removeAllRanges(); //remove selection from document
              field.classList.remove("active");
              copy.innerText = "Copiar";
            }, 3000);
          }
        }