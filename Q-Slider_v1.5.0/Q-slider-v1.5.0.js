const slideList = document.querySelectorAll(".slider__item");

// CREACIÓN automática de los botones (tipo punto)

        var fragment = document.createDocumentFragment();

        for(let i = 1; i<slideList.length+1; i++){
            let elemento = document.createElement("span");
            elemento.classList.add("slider__btn");
            elemento.classList.add(`btn-${i}`);
            if(i==1){
                elemento.classList.add(`btn-show`);
            }
            fragment.appendChild(elemento);
            //= `<span class="slider__btn btn-${i}"></span>`
        }
        document.querySelector(".slider__buttons").appendChild(fragment);


const sliderBtnList = document.querySelectorAll(".slider__btn");
const btnPrev = document.querySelector(".slider__btn-prev");
const btnNext = document.querySelector(".slider__btn-next");
const btnPlay = document.querySelector(".slider__btn-play");


var efecto = ""; //clase de efecto sobre el slide. // opcional "deslizar"
var slideAct = 0; //comienzo con // La primera es 0, como un array


//Condiciones iniciales de sistema de reproducion automatica
let contador = slideAct + 1;
let sentido = true;
let interval = 2000; //Milisegundos
// ´alternate´ es una clase que se integra al slider (contendor general) y es opcional.


if(document.querySelector(".slider").classList.contains("deslizar")){
    efecto = "deslizar";
}

// ----------------------EVENTOS----------------------

if(efecto == "deslizar"){ //Efecto tipo deslizar
    // inicializa las posiciones para el efecto
    for (let index = 0; index < slideList.length; index++) {
         if (index < slideAct){
            slideList[index].classList.remove("showing");
            slideList[index].classList.remove("showing-next");
            slideList[index].classList.add("showing-prev");
         }else if(index > slideAct){
            slideList[index].classList.remove("showing");
            slideList[index].classList.remove("showing-prev");
            slideList[index].classList.add("showing-next");
         }else if(index == slideAct ){
            slideList[index].classList.remove("showing-prev");
            slideList[index].classList.remove("showing-next");
            slideList[index].classList.add("showing");
         }
    }

//BTN tipo puntos
    for (let index = 0; index < sliderBtnList.length; index++) {
        sliderBtnList[index].addEventListener("click", (event)=>{
            let elementoSeleccionado = index;

            if (elementoSeleccionado > slideAct ){
                for (let i = 0; i < elementoSeleccionado; i++) {
                    // alert("i: " + i + "|| select: " + elementoSeleccionado);
                    slideList[i].classList.remove("showing");
                    slideList[i].classList.remove("showing-next");
                    slideList[i].classList.add("showing-prev");
                }
                slideList[elementoSeleccionado].classList.add("showing");
                slideList[elementoSeleccionado].classList.remove("showing-next");
                slideList[elementoSeleccionado].classList.remove("showing-prev");

            }else if (elementoSeleccionado < slideAct ){
                for (let i = elementoSeleccionado; i < slideList.length; i++) {
                    // alert(elementoSeleccionado);
                    slideList[i].classList.remove("showing");
                    slideList[i].classList.remove("showing-prev");
                    slideList[i].classList.add("showing-next");
                }
                slideList[elementoSeleccionado].classList.add("showing");
                slideList[elementoSeleccionado].classList.remove("showing-next");
                slideList[elementoSeleccionado].classList.remove("showing-prev");
            }
            sliderBtnList.forEach(btn =>{
                btn.classList.remove("btn-show");
            });
            event.target.classList.add("btn-show");
            slideAct = elementoSeleccionado;
            contador = elementoSeleccionado

        });
    }

// PREV
    btnPrev.addEventListener("click", ()=>{
        if(slideAct != 0){
            nueva = slideAct - 1;
    
            slideList[slideAct].classList.remove("showing");
            slideList[slideAct].classList.add("showing-next");
            slideList[nueva].classList.add("showing");
            slideList[nueva].classList.remove("showing-prev");
        
            sliderBtnList.forEach(btn =>{
                btn.classList.remove("btn-show");
            });
            sliderBtnList[nueva].classList.add("btn-show");
            slideAct = nueva;
            contador = nueva;
        }
    });

// NEXT
    btnNext.addEventListener("click", ()=>{
        if(slideAct != slideList.length-1){
            nueva = slideAct + 1;

            slideList[slideAct].classList.remove("showing");
            slideList[slideAct].classList.add("showing-prev");
            slideList[nueva].classList.add("showing");
            slideList[nueva].classList.remove("showing-next");

            sliderBtnList.forEach(btn =>{
                btn.classList.remove("btn-show");
            });
            sliderBtnList[nueva].classList.add("btn-show");
            slideAct = nueva;
            contador = nueva;

        }   
    });

}else{ //Efecto por defecto.

    for (let index = 0; index < sliderBtnList.length; index++) {
            sliderBtnList[index].addEventListener("click", (event)=>{
                
                    slideList.forEach(slide => {
                        if (slide.classList.item(1) == slideList[index].classList.item(1)){
                            // console.log("Iguales")
                            slideList[index].classList.add("showing");
                        }else{
                            // console.log("Diferentes");
                            slide.classList.remove("showing");
                        }
                    });
                    sliderBtnList.forEach(btn =>{
                        btn.classList.remove("btn-show");
                    });
                    event.target.classList.add("btn-show");
                    slideAct = index;
                    contador = index;

                    console.log("Actual slide " + slideAct);

            });
    }
    // console.log("Actual slide " + slideAct);
    btnPrev.addEventListener("click", ()=>{
        if(slideAct != 0){
            slideAct--;
            contador = slideAct;
            console.log("Actual slide " + slideAct);
            
            //Remueve todo
            slideList.forEach(slide => {
                slide.classList.remove("showing");
            });
            sliderBtnList.forEach(btn =>{
                btn.classList.remove("btn-show");
            });
            slideList[slideAct].classList.add("showing");
            sliderBtnList[slideAct].classList.add("btn-show");
        }
    });
    btnNext.addEventListener("click", ()=>{
        if(slideAct != (slideList.length-1)){
            slideAct++;
            contador = slideAct;
            console.log("Actual slide " + slideAct);
            
            //Remueve todo
            slideList.forEach(slide => {
                slide.classList.remove("showing");
            });
            sliderBtnList.forEach(btn =>{
                btn.classList.remove("btn-show");
            });
            slideList[slideAct].classList.add("showing");
            sliderBtnList[slideAct].classList.add("btn-show");
        }
    });

}


// ----------------------Automatización----------------------

btnPlay.addEventListener("click", ()=>{
    if(btnPlay.classList.contains("btn-play-on")){
        btnPlay.classList.remove("btn-play-on");
        btnPlay.innerHTML = "Stop";
    }else{
        btnPlay.classList.add("btn-play-on");
        btnPlay.innerHTML = "Playing";
    }
});


setInterval(()=>{
    
    if (btnPlay.classList.contains("btn-play-on")){
        if (document.querySelector(".slider").classList.contains("alternate")){
            
            // sliderBtnList[contador].click();

            if(contador>=0 && sentido == true){
                if (contador != sliderBtnList.length-1){
                    contador++;
                }
                console.log(contador);
                btnNext.click();
                if (contador >= (sliderBtnList.length-1)){
                    sentido = false;
                }
            }else if(contador<= sliderBtnList.length-1 && sentido == false){
                if (contador != 0){
                    contador--;
                }
                console.log(contador);
                btnPrev.click();
                if (contador <= 0){
                    sentido = true;
                }
            }
        }else{
            if (contador >= sliderBtnList.length){ contador = 0; }
            sliderBtnList[contador].click();
            contador++
        }
    }
}, interval);



// console.clear();