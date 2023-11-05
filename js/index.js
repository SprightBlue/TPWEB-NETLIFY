const btnSubmit = document.querySelector("#inicio");
const dialogIndex = document.querySelector("#dialogIndex");
const btnClose = document.querySelector(".close");

let usuarios;

const verificarListaDeUsuarios = () => {
    if(localStorage.usuarios && localStorage.usuarios!=""){
        usuarios = JSON.parse(localStorage.getItem("usuarios"));
    }else{
        usuarios = [];
    }
}

const iniciarSesion = (event) => {
    let nombre = String(document.querySelector("#usuario").value);
    let contraseña = String(document.querySelector("#contraseña").value);
    let usuario = buscarUsuario(nombre);
    if(usuario!=null && encriptarContraseña(contraseña)==usuario.contraseña){
        localStorage.setItem("usuarioEnSesion", JSON.stringify(usuario));
        document.querySelector("#formInicio").action = "home.html";
    }else{
        dialogIndex.showModal();
    }
}

const cerrarModal = (event) => {
    dialogIndex.close();
}

const buscarUsuario = (nombre) => {
    let encontrado = null;
    usuarios.forEach(element => {
        if(element.nombre.toLowerCase() == nombre.toLowerCase()){
            encontrado = element;
        }
    });
    return encontrado;
}

const encriptarContraseña = (contraseña) => {
    let primeraParte = contraseña.substring(contraseña.length/2);
    let segundaParte = contraseña.substring(0, contraseña.length/2);
    return primeraParte.concat(segundaParte);
}

btnSubmit.addEventListener("click", iniciarSesion);
btnClose.addEventListener("click", cerrarModal);

verificarListaDeUsuarios();