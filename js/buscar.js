const linkCloseSession = document.querySelector(".cerrarSesion");
let clickPlay = document.querySelector(".play");
let clickVolume = document.querySelector(".volume");
let search = document.querySelector("#buscar");

let usuarioEnSesion = JSON.parse(localStorage.getItem("usuarioEnSesion"));
let usuarios;

let contenedorLista = document.querySelector(".albums"); 
let listaAlbums = document.querySelectorAll(".listAlbum");
let favoritos = document.querySelectorAll(".star");

const verificarListaDeUsuarios = () => {
    if(localStorage.usuarios && localStorage.usuarios!=""){
        usuarios = JSON.parse(localStorage.getItem("usuarios"));
    }else{
        usuarios = [];
    }
}

const actualizarDatos = () => {
    document.querySelector(".nombreUsuario").textContent = usuarioEnSesion.nombre;
    favoritos.forEach(element => {
        let resultado = usuarioEnSesion.albums.some((album)=>album==element.alt);
        if(resultado){
            element.src = "img/star_favorite.png";
        }else{
            element.src = "img/star.png";
        }
    });
    if(usuarioEnSesion.sonando!=""){
        document.querySelector(".albumSonando").src = `img/${usuarioEnSesion.sonando}.jpg`
        document.querySelector(".albumSonando").alt = usuarioEnSesion.sonando;
        document.querySelector(".albumNombre").textContent = usuarioEnSesion.sonando;
    }
}

const clickFavoritos = () => {
    favoritos.forEach(element => {
        element.addEventListener("click", (event) => {
            let resultado = usuarioEnSesion.albums.some((album)=>album==element.alt);
            if(resultado){
                element.src = "img/star.png";
                usuarioEnSesion.albums.splice(usuarioEnSesion.albums.indexOf(element.alt), 1);
                actualizarLocalStorage();
            }else{
                element.src = "img/star_favorite.png";
                usuarioEnSesion.albums.push(element.alt);
                actualizarLocalStorage();                
            }
        })
    });
}

const borrarAlbums = () => {
    while(contenedorLista.firstChild){
        contenedorLista.removeChild(contenedorLista.firstChild);
    }
}

const actualizarLocalStorage = (event) => {
    for(i in usuarios) {
        if(usuarioEnSesion.nombre == usuarios[i].nombre){
            usuarios.splice(i, 1);
        }
    }
    usuarios.push(usuarioEnSesion);
    localStorage.setItem("usuarioEnSesion", JSON.stringify(usuarioEnSesion));
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

linkCloseSession.addEventListener("click", (event) =>{
    localStorage.removeItem("usuarioEnSesion");
})
clickPlay.addEventListener("click", (event) => {
    if(clickPlay.getAttribute("src") == "img/play.png"){
        clickPlay.src = "img/pause.png";
    }else{
        clickPlay.src = "img/play.png";
    }
})
clickVolume.addEventListener("click", (event) => {
    if(clickVolume.getAttribute("src") == "img/volume.png"){
        clickVolume.src = "img/volume_off.png";
    }else{
        clickVolume.src = "img/volume.png";
    }
})

search.addEventListener("keyup", (event) => {
    let albumArray = Array.from(listaAlbums);
    borrarAlbums();   
    let resultadoBusqueda = albumArray.filter(element1=>element1.getAttribute("title").toLowerCase().includes(search.value.toLowerCase()));
    resultadoBusqueda.forEach(element2 => {
        contenedorLista.appendChild(element2);
    });
})

verificarListaDeUsuarios();
actualizarDatos();
clickFavoritos();