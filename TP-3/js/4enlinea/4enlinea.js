let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d')
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;
ctx.font = "30px arial";
ctx.fillStyle = "rgb(208,113,26)";
ctx.textAlign = "center";
let characterPic_1;
let characterPic_2;
let timer;
let gameData;
let game ;
let board = [];
let squarePos = [];
let boardPositions ;

let characters = [
    {
        name: "ELJoker",
        chip: "./img/cuatroenlinea/chip/chipj1.png",
    },
    {
        name: "JokerYakuza",
        chip: "./img/cuatroenlinea/chip/chipj2.png",
    },
    {
        name: "MarthaWayne",
        chip: "./img/cuatroenlinea/chip/chipj3.png",
    },
    {
        name: "CreedQuinn",
        chip: "./img/cuatroenlinea/chip/chipj4.png",
        
    },
    {
        name: "BatmanGrimKnight",
        chip: "./img/cuatroenlinea/chip/chipb1.png",
    },
    {
        name: "BatmanQueRie",
        chip: "./img/cuatroenlinea/chip/chipb2.png",
    },
    {
        name: "BatmaTheDawnBreaker",
        chip: "./img/cuatroenlinea/chip/chipb3.png",
    },
    {
        name: "Batman",
        chip: "./img/cuatroenlinea/chip/chipb4.png",
    }
]

//FUNCION PARA EL BOTON RESET PARA QUE SE MUESTRE EL FORMULARIO DEL JUEGO Y SE OCULTE LA PANTALLA DEL GANADOR
document.getElementById('reset-btn').onclick = function() {
    document.querySelector('form').style.display = "flex"
    document.getElementById("ganador").style.display = "none";
    clearAll();
}


//FUNCION QUE DA INICO AL JUEGO CUANDO SE MANDA EL FORM DE LA PAGINA 
let formData = document.querySelector('form')
.addEventListener('submit', e => {
    e.preventDefault()
    const data = Object.fromEntries(
        new FormData(e.target)
    )
    gameData = data;
    init(data)
})



//ESTE METODO SE ENCARGA DE INICIAR EL JUEGO
function init(data) {
    document.querySelector('form').style.display = "none"
    game = new Game();
    boardPositions = game.getBoardPositions();
    setRules(data);
}




//ESTE METODO SE ENCARGA DE ASIGNAR LOS JUGADORES
function setCharacters(player_1, player_2, cant){
    let player_character_1 = characters.find(o => o.name === player_1)
    let player_character_2 = characters.find(o => o.name === player_2)
    let chips_1 = player_character_1.chip
    let chips_2 = player_character_2.chip

    characterPic_1 = document.querySelector(`#${player_character_1.name}Pic`)
    characterPic_2 = document.querySelector(`#${player_character_2.name}Pic`)

    game.addPlayers(player_character_1, player_character_2)
    createChips(cant, chips_1, chips_2)
}


//ESTE METODO SE ENCARGA DE CREAR EL TABLERO PONIENDO TODO EN NULL
function chargueBoard(row,column){
    for (let i = 0; i < row; i++) {
        let row = []
        for (let j = 0; j < column; j++) {
            row.push(null)
        }
        boardPositions.push(row);    
    }
}

//ESTE METODO SE ENCARGA DE LA FUNCIONALIDAD DEL TIMER 
function drawTimer(data) {
    let i = data.timer;
    interval = setInterval(function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBoard()
        drawChips()
        let x = 530
        ctx.fillText(`${i} segundos`, x, 30);
        ctx.fillText(` : `, x +100, 30);
        ctx.fillText(`reiniciar`,  x+200 ,30);
        i--;
        if(i === 0) {
            let winnerScreen = document.getElementById('ganador')
            let winnerName = document.getElementById('ganador-name')
            winnerScreen.style.display = "flex";
            winnerScreen.style.backgroundImage = "url('./img/cuatroenlinea/empate.webp')";
            winnerName.innerHTML = `<h1>EMPATE</h1>`;
        }
    }, 1000);
}
//ESTE METODO SE ENCARGA DE SETEAR LAS OPCIONES DEL JUEGO CON LAS QUE INGRESO EL JOGADOR EN EL FORM
function setRules(data){
    switch (data.connect) {
        case "4":{chargueBoard(6,7);
            setCharacters(data.player_1, data.player_2, 21);
            drawTimer(data)
            break;
        }
        case "5":{chargueBoard(7,8);
            setCharacters(data.player_1, data.player_2, 28);
            drawTimer(data)
            break;
        }
        case "6":{
            chargueBoard(8,9);
            setCharacters(data.player_1, data.player_2, 36);
            drawTimer(data)
            break;
        }
        default:{break;}   
    }
}

//ESTE METODO SE ENCARGA DIBUJAR EL TABLERO Y LAS CELDAS DONDE EL JUGADOR VA A TENER QUE LANZAR LA FICHA
function drawBoard(){
    let img = document.getElementById('connect4-img');
    let arrow = document.getElementById('arrow');    
    squarePos = [];
    let pos = canvas.width - 850 ;
    let posy= canvas.height-450;
    for (let i = 0; i < boardPositions.length; i++) {
        let row = boardPositions[i]
        for (let j = 0; j < row.length; j++) {
            if(row[j] != null){
                row[j].setX((pos + j*51)+ (60/2) )
                row[j].setY((posy + i*51)+ (60/2))
            }
            ctx.drawImage(img,pos + j*51,posy + i*51, 50 ,50)
            
            if(i == 0){
                let throwPos = {x: pos + j*51, y: posy - 51, w : 50,h : 50}
                squarePos.push(throwPos)
                ctx.drawImage(arrow,pos + j*51,posy - 51, 50 ,50)
            }
        }
    }
}

//ESTE METODO SE ENCARGA DE CREAR  LAS FICHAS DE LOS JUGADORES
function createChips(cant, chips_1, chips_2) {
    let players = game.getPlayers();
    let y = 400;
    let x = 200;
    let x2 =1100;
    for (let j = 0; j < players.length; j++) {
        for (let i = 0; i < cant; i++) {
            if (players[j].getId() === 1) {
                let img = chips_1;
                let chip = new Chip(x,y,img,players[j].getId(),players[j].getIsPlaying());
                players[j].addChip(chip);
            } else {
                let img = chips_2;
                let chip = new Chip(x2,y,img, players[j].getId(),players[j].getIsPlaying());
                players[j].addChip(chip);
            }
            y-=6;
        }
        drawChips();
        y=400;
    }
}
//ESTE METODO SE ENCARGA DE DIBUJAR LAS FICHAS DE LOS JUGADORES
function drawChips() {
    let players = game.getPlayers();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillText(`${gameData.player_1}`, 200 , 60);
    ctx.fillText(`${gameData.player_2}`, 1100 , 60);
    drawBoard();
    for (let j = 0; j < players.length; j++) {
        let chips = players[j].getChips();
        for (let i = 0; i < chips.length; i++) {
            chips[i].draw();
        }
    }
}
//ESTE METODO SE ENCARGA DE CHEQUEAR SI EL JUGADOR DROPEO LA FICHA EN LAS CELDAS CORRECTAS Y EN CUAL
//ADEMAS SE ENCARGA DE VERIFICAR SI HAY UN GANADOR
canvas.addEventListener('mouseup', (e) => {
    if(game.getIsDraggin()){
        let x = e.pageX - canvas.offsetLeft;
        let y = e.pageY - canvas.offsetTop;
        let columnPos = isDropped(x,y)
        if(columnPos >= 0){
            let rowPos = checkPos(columnPos)
            addChip(rowPos, columnPos)
            drawChips();
            game.setTurn();
            let winner = game.checkWinner(columnPos, rowPos , gameData.connect)
            if(winner != undefined) {
                if(winner[0] === true) {
                    let winnerScreen = document.getElementById('ganador')
                    let winnerName = document.getElementById('ganador-name')
                    winnerScreen.style.display = "flex";
                    if (winner[1] =="1") {
                        winnerScreen.style.backgroundImage = "url('./img/cuatroenlinea/batmanwin.jpg')";
                        winnerName.innerHTML = `<h1>BATMAN WIN</h1>`
                    }
                    if (winner[1] =="2") {
                        winnerScreen.style.backgroundImage = "url('./img/cuatroenlinea/jokerwin.jpg')";
                        winnerName.innerHTML = `<h1>JOKER WIN</h1>`
                    }
                }
            }
        }else{
            game.getPreviusSelectedChip().resetPosition();
            drawChips();
        }
    }
    game.setIsDragging(false)
})

//SE ENCARGA DE VERIFICAR EN QUE COLUMNA DE LAS CELDAS PARA SOLTAR LAS FICHAS SE SOLTO LA FICHA
//DEVUELBE LA COLUMNA EN LA QUE SE DROPEO LA FICHA 
function isDropped(x,y){
    for (let i = 0; i < squarePos.length; i++) {
        if(!(x < squarePos[i].x || x > squarePos[i].x + squarePos[i].w || y < squarePos[i].y || y > squarePos[i].y + squarePos[i].h)){
            return i
        }
    }
    return -1;
}
//SE ENCARGA DE PONER LAS FICHAS EN EL TABLERO
function addChip(rowPos, columnPos){
    boardPositions[rowPos][columnPos] = game.getPreviusSelectedChip();
}
//SE ENCARGA DE VER CUAL ES LA CELDA DONDE SE TIEN QUE PONER LA FICHA DROPEADA 
//DEVUELVE LA FILA EN LA QUE VA LA FICHA
function checkPos(pos){
    let i;
    for (let index = 0; index < boardPositions.length; index++) {
       let aux = boardPositions[index]
        for (let j = 0; j < aux.length; j++) {
            if(j == pos && aux[j] != null){
                return index-1
            }
        }
        i = index
    }
    return i;
}
//SE ENCARGA DE RESETEAR EL JUEGO 
function clearAll(){
    boardPositions = [];
    game.removePlayers();
    clearInterval(interval)
}

//VERIFICA SI SE HACE CLICK EN LAS FICHAS DEL JUGADOR CORRECTO O, SI SE CLICKEO EL RESET, SE ENCARGA DE RESETEAR EL JUEGO
canvas.addEventListener('mousedown', (e) => {
    let players = game.getPlayers();
    let clickX = e.pageX - canvas.offsetLeft;
    let clickY = e.pageY - canvas.offsetTop;
    let previousSelectedChip = game.getPreviusSelectedChip();
    let clickedChip = findClicked(clickX, clickY);
    if (clickedChip != null) {
        if (clickedChip.getTurn()) {
            if (previousSelectedChip != null) {
                previousSelectedChip.setIsSelected(false)
            }
            game.setPreviusSelectedChip(clickedChip)
            for (let p = 0; p < players.length; p++) {
                if (players[p].getIsPlaying() == true) {
                    if (clickedChip.getOwner() === players[p].getId()) {
                        clickedChip.setIsSelected(true);
                        drawChips();
                        game.setIsDragging(true);
                    }
                }
            }
        }
    }
    else if(checkResetArea(clickX, clickY)){
       clearAll();
       setRules(gameData)
    }
})

//VERIFICA SI SE CLICKEO EL AREA DONDE ESTA EL RESET
function checkResetArea(clickX, clickY){
    let x = canvasWidth -530
    let y = -20
    if(!(clickX < x || clickX > x + 60 || clickY > 60 || clickY > y + 60)){
        return true
    }
    return false
}

//SE ENCAGA DE IR CORRIENDO LA FICHA SELECCIONADA
canvas.addEventListener('mousemove', (e) => {
    if (game.getIsDraggin()) {
        if (game.getPreviusSelectedChip() != null) {
            let x = e.pageX - canvas.offsetLeft;
            let y = e.pageY - canvas.offsetTop;
            game.getPreviusSelectedChip().setX(x);
            game.getPreviusSelectedChip().setY(y);
            drawChips();
        }
    }
})

//DEVUELVE LA FICHA EN LA QUE SE HIZO CLICK 
function findClicked(clickX, clickY) {
    let players = game.getPlayers();
    for (let p = 0; p < players.length; p++) {
        let chips = players[p].getChips();
        for (let i = chips.length - 1; i >= 0; i--) {
            let chip = chips[i];
            if (chip.isClicked(clickX, clickY)) {
                return chip;
            }
        }
    }
}