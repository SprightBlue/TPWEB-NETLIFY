const linkClose = document.querySelector("#cerrarSesion");
const btnCancelar = document.querySelector("#cancelar");
const btnPagar = document.querySelector("#pagar");
const dialogPagar = document.querySelector("#dialogPagar");
const btnAceptar = document.querySelector(".aceptarModal");
const dialogError = document.querySelector("#dialogError");
const btnCerrarModal = document.querySelector(".cerrarModal");

let usuarioEnSesion = JSON.parse(localStorage.getItem("usuarioEnSesion"));

let usuarios;

const verificarListaDeUsuarios = () => {
    if(localStorage.usuarios && localStorage.usuarios!=""){
        usuarios = JSON.parse(localStorage.getItem("usuarios"));
    }else{
        usuarios = [];
    }
}

const actualizarDatos = (event) => {
    document.querySelector("#nombreUsuario").textContent = usuarioEnSesion.nombre;
}

const cerrarSesion = (event) => {
    localStorage.removeItem("usuarioEnSesion");
}

const actulizarPlan = (event) => {
    const plan = new URL(window.location.href).searchParams.get("plan");
    document.querySelector("h1").textContent = `Elegiste el ${plan}`;
    if(String(plan) == "Plan Mensual"){
        document.querySelector(".planCover").src = "img/planMensual.gif";
        document.querySelector(".planDescripcion").textContent = "30 dias de SPOTILAM Premium";
    }else if(String(plan) == "Plan Anual"){
        document.querySelector(".planCover").src = "img/planAnual.gif";
        document.querySelector(".planDescripcion").textContent = "1 año de SPOTILAM Premium";
    }else if(String(plan) == "Plan Vitalicio"){
        document.querySelector(".planCover").src = "img/planVitalicio.gif"
        document.querySelector(".planDescripcion").textContent = "SPOTILAM Premium de por vida";
    }
}

const cancelarPago = (event) => {
    document.querySelector("#formPagar").action = "home.html";
}

const validarPago = (event) => {
    let tarjeta = String(document.querySelector("#tarjeta").value);
    let vto = String(document.querySelector("#vto").value);
    let cvc = String(document.querySelector("#cvc").value);
    let nombre = String(document.querySelector("#nombre").value);
    if(verificarQueLosDatosNoSeanNulos(tarjeta, vto, cvc, nombre) && verificarCVC(cvc) && verificarTarjeta(tarjeta)){
        dialogPagar.showModal();
    }else{
        dialogError.showModal();
    }
}

const aceptarModal = (event) => {
    if(usuarioEnSesion==null){
        document.querySelector("#formPagar").action = "index.html";
    }else{
        for(i in usuarios) {
            if(usuarioEnSesion.nombre == usuarios[i].nombre){
                usuarios.splice(i, 1);
            }
        }
        usuarioEnSesion.premium = true;
        usuarios.push(usuarioEnSesion);
        localStorage.setItem("usuarios", JSON.stringify(usuarios))
        localStorage.setItem("usuarioEnSesion", JSON.stringify(usuarioEnSesion));     
        document.querySelector("#formPagar").action = "home.html";
    }
}

const verificarQueLosDatosNoSeanNulos = (tarjeta, vto, cvc, nombre) => {
    if(tarjeta!="" && vto!="" && cvc!="" && nombre!=""){
        return true;
    }else{
        return false;
    }
}

const verificarTarjeta = (tarjeta) => {
    let patron = /^[0-9]{16}$/;
    if(patron.test(tarjeta)){
        return true;
    }else{
        return false;
    }
}

const verificarCVC = (cvc) => {
    let patron = /^[0-9]{3}$/;
    if(cvc!="999" && cvc!="000" && patron.test(cvc)){
        return true;
    }else{
        return false;
    }
}

linkClose.addEventListener("click", cerrarSesion);
btnCancelar.addEventListener("click", cancelarPago);
btnPagar.addEventListener("click", validarPago);
btnAceptar.addEventListener("click", aceptarModal);
btnCerrarModal.addEventListener("click", (event) => {
    dialogError.close();
})

verificarListaDeUsuarios();
actualizarDatos();
actulizarPlan();