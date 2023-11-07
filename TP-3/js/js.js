function App() {}

window.onload = function (event) {
    var app = new App();
    window.app = app;
};
window.Location
App.prototype.processingButton = function(event) {
    const btn = event.currentTarget;
    const slickList = event.currentTarget.parentNode;
    const track = event.currentTarget.parentNode.querySelector('#track');
    const slick = track.querySelectorAll('.slick');

    const slickWidth = slick[0].offsetWidth;
    
    const trackWidth = track.offsetWidth;
    const listWidth = slickList.offsetWidth;

    track.style.left == ""  ? leftPosition = track.style.left = 0 : leftPosition = parseFloat(track.style.left.slice(0, -2) * -1);

    btn.dataset.button == "button-prev" ? prevAction(leftPosition,slickWidth,track) : nextAction(leftPosition,trackWidth,listWidth,slickWidth,track)
}

let prevAction = (leftPosition,slickWidth,track) => {
    if(leftPosition > 0) {
        console.log("entro 2")
        track.style.left = `${-1 * (leftPosition - slickWidth)}px`;
    }
}

let nextAction = (leftPosition,trackWidth,listWidth,slickWidth,track) => {
    if(leftPosition < (trackWidth - listWidth)) {
        track.style.left = `${-1 * (leftPosition + slickWidth)}px`;
    }
}
var percent = document.querySelector('.percent');
var progress = document.querySelector('.progress');
var load = document.querySelector('.loading')
var count = 4;
var per = 16;
var loading = setInterval(animate, 50);
function animate(){
  if(count == 100 && per == 400){
    clearInterval(loading);
    setTimeout(ocultarLoading,1000);
  }else{
    per = per + 4;
    count = count + 1;
    progress.style.width = per + 'px';
    percent.textContent = count + '%';
  }
}
function ocultarLoading(){
  load.classList.add("hiden")
}

/*******login***********/

const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('containerl');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});




/*****registrar*******/
let button = document.querySelector('.registerbutton');
let animacion = document.querySelector('.wrapper');


button.addEventListener("click", ()=>{
  animacion.style.display="flex";
  setTimeout(function() {
    window.location.href = 'index.html';
  }, 2000);
});
