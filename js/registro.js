const btnSubmit = document.querySelector("#registro");
const dialogRegistration = document.querySelector("#dialogRegistration");
const btnClose = document.querySelector(".close");

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
    if(usuarioEnSesion==null || usuarioEnSesion.premium == true){
        document.querySelector(".enlacePremium").style.display = "none";
    }
}

const registrarUsuario = (event) => {
    let usuario = {
        nombre: String(document.querySelector("#nombre").value),
        contraseña: String(document.querySelector("#contraseña").value),
        repContra: String(document.querySelector("#repContraseña").value),
        email: String(document.querySelector("#email").value),
        fecha: String(document.querySelector("#fecha").value),
        albums: [],
        canciones: [],
        sonando: "",
        premium: false
    }
    if(verificarQueNoExistaUsuario(usuario.nombre) && verificarContraseñas(usuario.contraseña, usuario.repContra) && verificarQueLosDatosNoSeanNulos(usuario.nombre, usuario.contraseña, usuario.email, usuario.fecha)){     
        usuario.contraseña = encriptarContraseña(usuario.contraseña);
        usuarios.push(usuario);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        document.querySelector("#formRegistro").action = "index.html";
    }else{
        dialogRegistration.showModal();
    }
}

const cerrarModal = (event) => {
    dialogRegistration.close();
}

const verificarQueNoExistaUsuario = (usuario) => {
    let existe = true;
    usuarios.forEach(element => {
        if(element.nombre.toLowerCase() == usuario.toLowerCase()){
            existe = false;
        }
    });
    return existe;
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

const verificarQueLosDatosNoSeanNulos = (nombre, contraseña, email, fecha) => {
    if(nombre!="" && contraseña!="" && email!="" && fecha!=""){
        return true;
    }else{
        return false;
    }
}

btnSubmit.addEventListener("click", registrarUsuario);
btnClose.addEventListener("click", cerrarModal);

verificarListaDeUsuarios();
actualizarDatos();