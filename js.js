//Asigna elementos HTML
    var dice1 = document.querySelector(".img1");
    var dice2 = document.querySelector(".img2");
    var ganador = document.querySelector("h1");

//Establecer el valor de los dados
    let valorD1 = Math.floor((Math.random()*6)+1);
    let valorD2 = Math.floor((Math.random()*6)+1);

//Vincula las imagenes a cada elemento
    dice1.setAttribute("src", "images/dice"+valorD1+".png")
    dice2.setAttribute("src", "images/dice"+valorD2+".png")

//Determina cual jugador ganó.
    if (valorD1 > valorD2){
        //Gana jugador 1
        dice1.classList.add("winner");
        dice1.parentElement.firstElementChild.classList.add("winner");
        dice2.parentElement.firstElementChild.style.textDecoration = "line-through";
        ganador.style.color = "blue";
        ganador.innerHTML = "The <strong>" + "winner".toUpperCase() + "</strong > is <strong>" + "player 1".toUpperCase() + "</strong>";
    }else if(valorD1 === valorD2){
        //Empate
        ganador.innerHTML = "Tie!! Opps. <strong>Try again.</strong>";
        dice1.parentElement.firstElementChild.style.textDecoration = "line-through";
        dice2.parentElement.firstElementChild.style.textDecoration = "line-through";

    }else {
        //Gana jugador 2
        dice2.classList.add("winner");
        dice2.parentElement.firstElementChild.classList.add("winner");
        dice1.parentElement.firstElementChild.style.textDecoration = "line-through";
        ganador.style.color = "red";
        ganador.innerHTML = "The <strong>" + "winner".toUpperCase() + "</strong> is <strong>" + "player 2".toUpperCase() + "</strong>";

    }

