console.log("inicia JS");

const container = document.querySelector(".game__container");
const score1 = document.querySelector(".gamer__1-score");
const score2 = document.querySelector(".gamer__2-score");
const flag1 = document.querySelector(".gamer__1 .flag");
const flag2 = document.querySelector(".gamer__2 .flag");
const endGame = document.querySelector(".end-game")


/*Puntaje inical*/
score1.setAttribute("value", 0);
score2.setAttribute("value", 0);

jugadores = ["gamer__1", "gamer__2"];

turno = jugadores[0];
flag1.classList.add("anim1");

function fisherYatesShuffle(arr) {
    for (let i = arr.length-1; i > 0; i--) {
        var j = Math.floor( Math.random() * (i + 1) ); //random index
        [arr[i], arr[j]] = [arr[j], arr[i]]; //swap
    }
    return arr
}

//Ejemplo //3*3 //6*6 //9*9
let colTotal = 4; // = 5 col
let rowTotal = 4; // = 3 row
var total = colTotal * rowTotal;

let expuestas = 0;
let valor = [];
let identificador = [];

/*Funcion Crear el tablero */
function crearTablero(colTotal, rowTotal){
    
    total = colTotal * rowTotal;

    var fragment = document.createDocumentFragment(); //Crea un DOM Virtual y temporal

    let valores = [];
    let repetir = 1;
    while (repetir <= 2) {
        for (let i = 0; i < total/2; i++) {
            valores.push(i);
        }
        repetir++;
    }
    fisherYatesShuffle(valores);
    let imagenes = [
    "home",
    "user",
    "apple-whole",
    "baby",
    "at",
    "yin-yang",
    "worm",
    "bacon",
    "moon",
    "basketball",
    "biohazard",
    "book-open-reader",
    "book-skull",
    "bottle-water",
    "bug",
    "calendar-days",
    "camera",
    "car",
    "car-tunnel",
    "car-on",
    "cat",
    "dog",
    "fish",
    "cow",
    "chess-knight",
    "chess",
    "church",
    "children",
    "clock",
    "cloud-rain",
    "dna",
    "door-open",
    "dove",
    "volcano",
    "wallet",
    "vial",
    "user-nurse",
    "trophy",
    "traffic-light",
    "tractor",
    "thumbs-up",
    "tent",
    "taxi",
    "teeth",
    "table",
    "table-tennis",
    "table-tennis-paddle-ball",
    "suitcase",
    "sun",
    "star",
    "stop",
    "stairs",
    "spoon",
    "spider",
    "soap",
    "shower",
    "shop",
    "school",
    "scissors",
    "ruler",
    "rocket",
    "road",
    "recycle",
    "pizza-slice",
    "phone",
    "person",
    "person-dress",
    "person-half-dress",
    "person-swimming",
    "person-snowboarding",
    "person-digging",
    "pen",
    "pencil",
    "passport",
    "newspaper",
    "mosquito",
    "motorcycle",
    "mountain"
    ]
    fisherYatesShuffle(imagenes);

    //console.log(valores.at(-1));//Es lo mismo que console.log(valores[valores.length-1]); pero mas moderno.
    //link https://es.stackoverflow.com/questions/274078/obtener-el-ultimo-elemento-de-un-array-javascript


    container.style.gridTemplateColumns = `repeat(${colTotal}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${rowTotal}, 1.25fr)`;
        // grid-template-columns: repeat(7,150px);
        // grid-template-rows: repeat(7, 200px);
    let cartaIndex = 0; //start en cero (0).

    for (let col = 0; col < colTotal; col++) {

        for (let row = 0; row < rowTotal; row++) {

            cartaIndex++
            let valor = valores.pop();
            
            let carta = document.createElement(`div`);
            carta.classList.add("game__card");
            carta.id = 'card-'+ cartaIndex;
            carta.setAttribute("val", valor);
            
            let cartaFront = document.createElement('div');
            cartaFront.classList.add("card__face");
            cartaFront.classList.add("card__face--front");

            let item1 = document.createElement('h2');
            item1.textContent = "Q-Memotest";
            cartaFront.appendChild(item1);
            
            carta.appendChild(cartaFront);

            let cartaBack = document.createElement('div');
            cartaBack.classList.add("card__face");
            cartaBack.classList.add("card__face--back");

            cartaBack.classList.add("card__face--size");//por usar fontawesome!

            // item1 = document.createElement('img');
            // item1.setAttribute('alt', 'imagen');

            item1 = document.createElement("I");
            item1.classList.add("fa-solid");
            item1.classList.add("fa-" + imagenes[valor]);

            cartaBack.appendChild(item1);
            
            carta.appendChild(cartaBack);
        
            fragment.appendChild(carta);


        }
    }

    container.appendChild(fragment); //agrega el fragmento al DOM

}
/*Evento de cartas */
function voltearCarta (e){ //el parametro "e" al parecer pasa por defecto al ser invocada por un addEventListener
    console.log(total);
    let card = "";
    if(e.target.classList.contains("game__container")){
        console.log("No clickeo ninguna card");
    }else{

        if (e.target.tagName == "H2"){
            card = e.target.parentNode.parentNode; //El padre del padre del elemento seleccionado en el evento.
            // console.log("H2");
        }else if(e.target.tagName == "DIV"){
            card = e.target.parentNode;
            // console.log("DIV");
        }
        if (!card.classList.contains("game__container")){
            identificador[expuestas] = card.id;
            if(identificador[0] != identificador[1]){//Simpre que no clicke la misma carta 2 veces
                console.log(card);
                if (expuestas<2){
                                            
                    
                    card.classList.toggle("flip");
                    valor[expuestas] = card.getAttribute("val");
                    

                    expuestas = expuestas + 1;
                
                    if (expuestas == 2){//Turno concluido. 

                        setTimeout(function() {
                            if((valor[0] == valor[1]) ){
                                console.log(`Congratulation!! >> you found a pair.`);
                                document.querySelector(`#${identificador[0]}`).removeEventListener("click", voltearCarta);
                                document.querySelector(`#${identificador[1]}`).removeEventListener("click", voltearCarta);
                                expuestas = 0; //inicializo el siguiente turno
                                if (turno == "gamer__1"){
                                    //definir clase css para agregar sombra inset o semi trasparatente
                                    document.querySelector(`#${identificador[0]}`).lastChild.classList.add("card-ok-1"); 
                                    document.querySelector(`#${identificador[1]}`).lastChild.classList.add("card-ok-1");
                                    score1.setAttribute("value", Number(score1.getAttribute("value")) + 10);
                                    console.log(turno);

                                    turno = jugadores[1];
                                    flag1.classList.toggle("anim1");
                                    flag2.classList.toggle("anim2");

                                }else{
                                    document.querySelector(`#${identificador[0]}`).lastChild.classList.add("card-ok-2"); 
                                    document.querySelector(`#${identificador[1]}`).lastChild.classList.add("card-ok-2");
                                    score2.setAttribute("value", Number(score2.getAttribute("value")) + 10);
                                    console.log(turno);

                                    turno = jugadores[0];
                                    flag1.classList.toggle("anim1");
                                    flag2.classList.toggle("anim2");
                                }

                                total -= 2;
                                
                                if (total <=0){//Fin del juego
                                    // console.log("Fin del juego.");
                                    finalizacion(Number(score1.getAttribute("value")),  Number(score2.getAttribute("value")));
                                }
                            }else{
                                console.log(`Error!! >> Sorry, keep traing.`);
                                document.querySelector(`#${identificador[0]}`).classList.remove("flip");
                                document.querySelector(`#${identificador[1]}`).classList.remove("flip");

                                if (turno == "gamer__1"){
                                    score1.setAttribute("value", Number(score1.getAttribute("value")) - 5);

                                    console.log(turno);

                                    turno = jugadores[1];
                                    flag1.classList.toggle("anim1");
                                    flag2.classList.toggle("anim2");
                                }else{
                                    score2.setAttribute("value", Number(score2.getAttribute("value")) - 5);

                                    console.log(turno);

                                    turno = jugadores[0];
                                    flag1.classList.toggle("anim1");
                                    flag2.classList.toggle("anim2");
                                }

                                val = [];
                                identificador=[];
                                expuestas = 0; //inicializo el siguiente turno
                            }
                        },1000);
                    }
                }
            }
    
        }
    }
}
/* Genera los eventos a las cartas */
function addEventCard(){
    var cards = document.querySelectorAll(".game__card");
    cards.forEach(card => {
        card.addEventListener("click", voltearCarta); //funciona //Debe ser invocada a modo de funcion explicita para poder removerla luego.
    });
}
/*Funcion Finalizacion del juego */
function finalizacion(puntaje1, puntaje2){

    /*Define quien gana */
    if(puntaje1 > puntaje2){
        console.log("Ganador Jugador 1!");
        endGame.children[1].children[0].innerHTML = "Yo";
        endGame.style.backgroundColor = "blue";
    }else if(puntaje1 < puntaje2){
        console.log("Ganador Jugador 2!");
        endGame.children[1].children[0].innerHTML = "Mi otro Yo";
        endGame.style.backgroundColor = "red";
    }else if(puntaje1 == puntaje2){
        console.log("Empate... Son 2 perdedores!!");
        endGame.children[1].children[0].innerHTML = "Nadie";
        endGame.style.backgroundColor = "grey";
    }
    
    flag1.classList.remove("anim1");
    flag2.classList.remove("anim2");

    endGame.style.position = "absolute";
    endGame.style.display = "flex";


}
/*Restart para empezar desde cero */
function restart(){
    container.innerHTML = ""
    endGame.style.display = "none";
    
    crearTablero(colTotal, rowTotal);
    addEventCard();
    
    score1.setAttribute("value", 0);
    score2.setAttribute("value", 0);

    turno = jugadores[0];
    flag1.classList.add("anim1");

}

/*Generar el tablero por primera vez */
crearTablero(colTotal, rowTotal);
/*Genera los eventos*/
addEventCard();

// container.addEventListener("click", voltearCarta); //funciona con un solo evento utilizando el concepto de la propagación y delegcion de eventos... pero no puedo quitarles los eventos luego a las cartas descubiertas.

endGame.children[2].addEventListener("click", restart);

