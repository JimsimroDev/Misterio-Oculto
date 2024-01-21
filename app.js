//funcion generica
let numeroSecreto = 0;
let intentos = 0;
let intentosPermitidos = 5;
let listaNumerosSorteados = [];
let numeroMaximo = 10;
console.log(listaNumerosSorteados);

function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

function verificarIntento() {
    let numeroDeUsuario = parseInt((document.getElementById('valorUsuario')).value);
    console.log(intentos);
    if (numeroDeUsuario === numeroSecreto) {
        asignarTextoElemento('p', `Acertaste el numero en ${intentos} ${(intentos === 1) ? 'intento' : 'intentos'}`);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        //el usuario no acerto
        if (numeroDeUsuario > numeroSecreto) {
            disminuirIntentos();
            asignarTextoElemento('p', `El numero secreto es menor, te quedan ${intentosPermitidos} intentos`)
        } else {
            disminuirIntentos();
            asignarTextoElemento('p', `El numero secreto es mayor, te quedan ${intentosPermitidos} intentos`)
        }
        if (intentosPermitidos == 0) {
            asignarTextoElemento('p', `Te quedan ${intentosPermitidos} intentos Perdiste el juego`);
            document.getElementById('reiniciar').removeAttribute('disabled');
            return;
        }
        intentos++;
        limpiarCaja();
    }
    return;
}

function generarNumeroSecreto() {
    let numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1;

    console.log(numeroGenerado);
    console.log(listaNumerosSorteados);
    //si y asoteamos todos los numeros
    if (listaNumerosSorteados.length == numeroMaximo) {
        asignarTextoElemento('p', 'Ya se sortearon todos los numeros posibles');
    } else {
        //Si el numero generado esta incluido en la lista 
        if (listaNumerosSorteados.includes(numeroGenerado)) {
            return generarNumeroSecreto();
        } else {
            listaNumerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }
}

function limpiarCaja() {
    document.querySelector('#valorUsuario').value = '';
}

function condicionesInciales() {
    intentosPermitidos = 5;
    asignarTextoElemento('h1', 'Juego del número secreto!');
    asignarTextoElemento('p', `Elegie un numero entre 1 y ${numeroMaximo} solo tienes ${intentosPermitidos} intentos`);
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;
}

function reiniciarJuego() {
    //limpiar la caja
    limpiarCaja();
    //indicae mensaje de intervalo de numeros
    //Generar el numero aleatorio
    //inicializar el numero intentos
    condicionesInciales();
    //Deshabilitar el boton de nuevo juego
    document.querySelector('#reiniciar').setAttribute('disabled', true);
}

function disminuirIntentos() {
    if (intentosPermitidos > 0) {
        intentosPermitidos--;
    }
}
condicionesInciales();