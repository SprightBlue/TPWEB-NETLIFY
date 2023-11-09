const btnBack = document.querySelector("#volver");
const btnSave = document.querySelector("#guardar");
const linkClose = document.querySelector("#cerrarSesion");
const linkRemove = document.querySelector("#eliminarUsuario");
const dialogModal = document.querySelector("#dialogModal");
const btnClose = document.querySelector(".close");
const btnHome = document.querySelector(".home");
const dialogError = document.querySelector("#dialogError");
const btnCloseError = document.querySelector(".closeError");
const dialogRemove = document.querySelector("#dialogRemove");

let usuarioEnSesion = JSON.parse(localStorage.getItem("usuarioEnSesion"));
let usuarios;

const verificarListaDeUsuarios = () => {
    if(localStorage.usuarios && localStorage.usuarios!=""){
        usuarios = JSON.parse(localStorage.getItem("usuarios"));
    }else{
        usuarios = [];
    }
}

const actualizarDatos = () => {
    document.querySelector("#nombreUsuario").textContent = usuarioEnSesion.nombre;
    document.querySelector("#usuario").value = usuarioEnSesion.nombre;
    document.querySelector("#contraseña").value = usuarioEnSesion.repContra;
    document.querySelector("#repContraseña").value = usuarioEnSesion.repContra;
    document.querySelector("#fecha").value = usuarioEnSesion.fecha;
    document.querySelector("#email").value = usuarioEnSesion.email;
    if(usuarioEnSesion.premium == true){
        document.querySelector(".enlacePremium").style.display = "none";
    }
}

const cerrarSesion = (event) => {
    localStorage.removeItem("usuarioEnSesion");
}

const volverAlHome = (event) => {
    document.querySelector("#formPerfil").action = "home.html";
}

const guardarDatos = (event) => {
    let nombre = String(document.querySelector("#usuario").value);
    let contraseña = String(document.querySelector("#contraseña").value);
    let repContraseña = String(document.querySelector("#repContraseña").value);
    let email = String(document.querySelector("#email").value);
    if((verificarQueNoExistaUsuario(nombre) || verificarQueSeaElMismoUsuario(nombre)) && verificarContraseñas(contraseña, repContraseña) && verificarQueLosDatosNoSeanNulos(nombre, contraseña, email)){
        for(i in usuarios) {
            if(usuarioEnSesion.nombre == usuarios[i].nombre){
                usuarios.splice(i, 1);
            }
        }
        usuarioEnSesion.nombre = nombre;
        usuarioEnSesion.contraseña = encriptarContraseña(contraseña);
        usuarioEnSesion.email = email;
        usuarios.push(usuarioEnSesion);
        localStorage.setItem("usuarios", JSON.stringify(usuarios))
        localStorage.setItem("usuarioEnSesion", JSON.stringify(usuarioEnSesion));
        dialogModal.showModal();
    }else{
        dialogError.showModal();
    }
}

const cerrarModal = (event) => {
    dialogModal.close();
}

const volverHomeModal = (event) => {
    document.querySelector("#formPerfil").action = "home.html";
}

const cerrarModalError = (event) => {
    dialogError.close();
}

const verificarQueNoExistaUsuario = (nombre) => {
    let existe = true;
    usuarios.forEach(element => {
        if(element.nombre.toLowerCase() == nombre.toLowerCase()){
            existe = false;
        }
    });
    return existe;
}

const verificarQueSeaElMismoUsuario = (nombre) => {
    if(nombre.toLowerCase() == usuarioEnSesion.nombre.toLowerCase()){
        return true;
    }else{
        return false;
    }
}

const verificarContraseñas = (contra1, contra2) => {
    if(contra1 == contra2){
        return true;
    }else{
        return false;
    }
}

const encriptarContraseña = (contraseña) => {
    let primeraParte = contraseña.substring(contraseña.length/2);
    let segundaParte = contraseña.substring(0, contraseña.length/2);
    return primeraParte.concat(segundaParte);
}

const verificarQueLosDatosNoSeanNulos = (nombre, contraseña, email) => {
    if(nombre!="" && contraseña!="" && email!=""){
        return true;
    }else{
        return false;
    }
}

const eliminarUsuario = (event) => {
    for(i in usuarios) {
        if(usuarioEnSesion.nombre == usuarios[i].nombre){
            usuarios.splice(i, 1);
        }
    }    
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    localStorage.removeItem("usuarioEnSesion");
};

btnBack.addEventListener("click", volverAlHome);
btnSave.addEventListener("click", guardarDatos); 
linkClose.addEventListener("click", cerrarSesion);
linkRemove.addEventListener("click", eliminarUsuario);
btnClose.addEventListener("click", cerrarModal);
btnHome.addEventListener("click", volverHomeModal);
btnCloseError.addEventListener("click", cerrarModalError);

verificarListaDeUsuarios();
actualizarDatos();