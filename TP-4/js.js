/* BOTON HAMBURGUESA */
let nav = document.querySelector('#hamburguer button');

nav.addEventListener('click', e => {
    nav.classList.toggle('open');
});

document.addEventListener('DOMContentLoaded', function () {
    const sidebar = document.querySelector('.sidebar');
    const sidebarItems = document.querySelectorAll('.sidebar-item');

    nav.addEventListener('click', function () {
        if (sidebar.style.width === '300px') {
            sidebar.style.width = '0';
            sidebarItems.forEach(item => {
                item.style.opacity = '0';
                item.style.transform = 'translateX(-100%)';
            });
        } else {
            sidebar.style.width = '300px';
            sidebarItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateX(0)';
                }, (index + 1) * 500);
            });
        }
    });
});



/* ANIMACION LOGO NAV BAR */

document.addEventListener("DOMContentLoaded", function () {
    var logo = document.querySelector('.logo');
    var nav = document.querySelector('nav');

    window.addEventListener('scroll', function () {
        var scrollPos = window.scrollY;

        if (scrollPos > 200) {
            logo.style.display = "block";
            nav.style.backgroundImage = 'url("img/fondoinicio.png")';
        } else {
            logo.style.display = "none";
            nav.style.backgroundImage = '';
        }
    });
})


/* DUENDE VERDE */

document.addEventListener("DOMContentLoaded", function () {
    var duende = document.getElementById('duende');

    window.addEventListener('scroll', function () {
        var scrollPos = window.scrollY;
        var speed = 0.09; // Ajusta la velocidad según tus preferencias

        // Calcula la nueva posición del duende verde en función del scroll
        var translateY = scrollPos * speed;

        // Aplica la transformación para mover el duende verde
        duende.style.transform = 'translateY(' + translateY + 'px)';
    });
});

/* PARALLAX HEADER */

document.addEventListener('DOMContentLoaded', function () {
    const layers = document.querySelectorAll('.parallax-layer');
    peter = document.querySelector('.peter');
    gwen = document.querySelector('.gwen');
    miles = document.querySelector('.miles');
    logo = document.querySelector('.layer-logo');
    window.addEventListener('scroll', function () {
        const yOffset = window.pageYOffset;
        speedP =0.2 ;
        yPosP = -yOffset * speedP;
        scale = 1+yPosP*0.01
        logo.style.transform  = 'scale(' + scale+')';
        peter.style.transform = 'translate3d(0px, ' + yPosP + 'px, 0px)';
        gwen.style.transform = 'translate3d('+ yPosP +'px, ' + yPosP*2 + 'px, 0px)';
        miles.style.transform = 'translate3d('+ -yPosP +'px, ' + yPosP*2 + 'px, 0px)';
        layers.forEach(function (layer, index) {
            const speed = 0.1 * (index + 1);
            const yPos = -yOffset * speed;
            layer.style.transform = 'translateY(' + -yPos + 'px)';
      });

    });
  });


/* SECCION PERSONAJES */

  document.addEventListener('DOMContentLoaded', function () {
    const characters = document.querySelectorAll('.character');
  
    function fadeInOnScroll() {
      characters.forEach(function (character) {
        const elementTop = character.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (elementTop < windowHeight) {
          character.classList.add('active');
        } else {
          character.classList.remove('active');
        }
      });
    }
  
    window.addEventListener('scroll', fadeInOnScroll);
  });
//////////////////////////////////////////////////////////////////////////
  document.addEventListener("scroll", () => {
    function clean() {
        document.querySelectorAll(".img-ma").forEach((s) => {
            s.classList.remove("showImg");
        });
        document.querySelectorAll(".texto").forEach((s) => {
            s.classList.remove("showTexto");
        });
    }
    if (window.scrollY < 4600) {
        clean();
        document.querySelector("#ma-img-1").classList.add("showImg");
        document.querySelector("#text-1").classList.add("showTexto");
    }
    if (window.scrollY > 4600 && window.screenY < 4800) {
        clean();
        document.querySelector("#ma-img-2").classList.add("showImg");
        document.querySelector("#text-2").classList.add("showTexto");
    }
    if (window.scrollY > 4800 && window.screenY < 5600) {
        clean();
        document.querySelector("#ma-img-3").classList.add("showImg");
        document.querySelector("#text-3").classList.add("showTexto");
    }
    if (window.scrollY > 5600) {
        clean();
        document.querySelector("#ma-img-4").classList.add("showImg");
        document.querySelector("#text-4").classList.add("showTexto");
    }
});

window.addEventListener('scroll', function() {
    var miles = document.getElementById('animacion-miles');
    
    var posicion = miles.getBoundingClientRect().top;

    // Ajusta la posición en la que quieres que se active la animación
    if (posicion < window.innerHeight ) {
        miles.classList.add('animar-activa');
    } else {
        miles.classList.remove('animar-activa');
    }
});

var animacionmiles = document.getElementById('animacion-miles');
var animacionpeter = document.getElementById('animacion-peter');
animacionpeter.addEventListener('mouseover',() => {
    animacionmiles.classList.remove('animar-activa');
    animacionmiles.classList.remove('final');
    animacionmiles.classList.add('pegar');
    animacionpeter.classList.add('defensa');
} )
animacionmiles.addEventListener('mouseover',() => {
    animacionmiles.classList.remove('animar-activa');
    animacionmiles.classList.remove('final');
    animacionmiles.classList.add('pegar');
    animacionpeter.classList.add('defensa');
} )

animacionpeter.addEventListener('mouseout',() => {
    animacionmiles.classList.remove('pegar');
    animacionmiles.classList.add('final');
    animacionpeter.classList.remove('defensa');
} )
animacionmiles.addEventListener('mouseout',() => {
    animacionmiles.classList.remove('pegar');
    animacionmiles.classList.add('final');
    animacionpeter.classList.remove('defensa');
} )


function parallax(event) {
    let layers = document.querySelectorAll('.vengadores > div');
    layers.forEach(layer => {
        let speed = layer.getAttribute('data-speed');
        let x = (window.innerWidth - event.pageX * speed) / 100;
        let y = (window.innerHeight - event.pageY-1 * speed) / 50;
        layer.style.transform = `translate(${x}px, ${y}px)`;
    });
}

carpeter= document.getElementById('peter').addEventListener('mousemove',()=>{
    document.querySelector('.section-8').style.backgroundColor = 'rgba(37, 82, 200, 1)'
    
})
cargwen= document.getElementById('gwen').addEventListener('mousemove',()=>{
    document.querySelector('.section-8').style.backgroundColor = 'rgba(201, 43, 148, 1)'

})
carmiles= document.getElementById('miles').addEventListener('mousemove',()=>{
    document.querySelector('.section-8').style.backgroundColor = 'rgba(48, 76, 113, 1)'
})
