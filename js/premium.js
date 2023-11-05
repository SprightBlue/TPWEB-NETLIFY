const linkClose = document.querySelector("#cerrarSesion");
const btnCancelar = document.querySelector(".cancelar");
const btnAvanzar = document.querySelector(".avanzar");

const dialogPremium = document.querySelector("#dialogPremium");
const cerrarModal = document.querySelector(".cerrarModal");

const planMensual = document.querySelector("#planMensual");
const planAnual = document.querySelector("#planAnual");
const planVitalicio = document.querySelector("#planVitalicio");

let usuarioEnSesion = JSON.parse(localStorage.getItem("usuarioEnSesion"));

const actualizarDatos = (event) => {
    document.querySelector("#nombreUsuario").textContent = usuarioEnSesion.nombre;
}

const cerrarSesion = (event) => {
    localStorage.removeItem("usuarioEnSesion");
}

linkClose.addEventListener("click", cerrarSesion);
btnCancelar.addEventListener("click", (event) => {
    document.querySelector("#formPlanes").action = "home.html"
})
btnAvanzar.addEventListener("click", (event) => {
    if(planMensual.checked==true || planAnual.checked==true || planVitalicio.checked==true){
        document.querySelector("#formPlanes").action = "pagar.html";
    }else{
        dialogPremium.showModal();
    }
    
})
cerrarModal.addEventListener("click", (event) => {
    dialogPremium.close();
})

actualizarDatos();