const linkCloseSession = document.querySelector(".cerrarSesion");
let clickPlay = document.querySelector(".play");
let clickVolume = document.querySelector(".volume");

let usuarioEnSesion = JSON.parse(localStorage.getItem("usuarioEnSesion"));
let usuarios;

let favoritos = document.querySelectorAll(".songs");
let albumFavorito = document.querySelectorAll(".albumSong")

const verificarListaDeUsuarios = () => {
    if(localStorage.usuarios && localStorage.usuarios!=""){
        usuarios = JSON.parse(localStorage.getItem("usuarios"));
    }else{
        usuarios = [];
    }
}

const actualizarDatos = () => {
    document.querySelector(".nombreUsuario").textContent = usuarioEnSesion.nombre;
}


const actualizarAlbum = () => {
    const album = new URL(window.location.href).searchParams.get("album");
    document.querySelector(".titulo").textContent = `${album}`;
    if(album!=null){
        document.querySelector(".albumSonando").src = `img/${album}.jpg`;
        document.querySelector(".albumSonando").alt = `${album}`
        document.querySelector(".albumNombre").textContent = `${album}`;        
    }

    let nombreAlbums = document.querySelectorAll(".filasAlbums");
    nombreAlbums.forEach(element1 => {
        element1.textContent = `${album}`;
    });
    albumFavorito.forEach(element2 => {
        element2.alt = `${album}`;
    });
    albumFavorito.forEach(element3 => {
        let resultado = usuarioEnSesion.albums.some((album)=>album==element3.alt);
        if(resultado){
            element3.src = "img/star_favorite.png";
        }else{
            element3.src = "img/star.png";
        }
    });
    usuarioEnSesion.sonando = String(album);
    actualizarLocalStorage();
}

const actualizarCanciones = (event) => {
    favoritos.forEach(element1 => {
        let resultado = usuarioEnSesion.canciones.some((cancion)=>cancion.nombre==element1.alt && cancion.album==usuarioEnSesion.sonando);
        if(resultado){
            element1.src = "img/star_favorite.png";
        }else{
            element1.src = "img/star.png";
        }
    });  
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

const clickAlbumFavorito = (event) => {
    albumFavorito.forEach(element1=> {
        element1.addEventListener("click", (event) => {
            let resultado = usuarioEnSesion.albums.some((album)=>album==element1.alt);
            if(resultado){
                albumFavorito.forEach(element3 => {
                    element3.src = "img/star.png";
                });
                usuarioEnSesion.albums.splice(usuarioEnSesion.albums.indexOf(element1.alt), 1);
                actualizarLocalStorage();                
            }else{
                albumFavorito.forEach(element2 => {
                    element2.src = "img/star_favorite.png";
                });
                usuarioEnSesion.albums.push(element1.alt);
                actualizarLocalStorage();
            }
        })        
    });
}

const clickCancionesFavoritas = (event) => {
    favoritos.forEach(element1 => {
        element1.addEventListener("click", (event) => {
            let resultado = usuarioEnSesion.canciones.some((cancion)=> cancion.nombre==element1.alt && cancion.album==usuarioEnSesion.sonando);
            let cancionVar = {
                nombre: element1.alt,
                album: usuarioEnSesion.sonando
            }           
            if(resultado){
                element1.src = "img/star.png";
                for(let i=0; i<usuarioEnSesion.canciones.length; i++){
                    if(usuarioEnSesion.canciones[i].nombre==element1.alt && usuarioEnSesion.canciones[i].album==usuarioEnSesion.sonando){
                        usuarioEnSesion.canciones.splice(i, 1);
                    }
                }
                actualizarLocalStorage();               
            }else{
                element1.src = "img/star_favorite.png";
                usuarioEnSesion.canciones.push(cancionVar);
                actualizarLocalStorage();
            }
        })
    });
}

linkCloseSession.addEventListener("click", (event) => {
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

clickAlbumFavorito();
clickCancionesFavoritas();

verificarListaDeUsuarios();
actualizarDatos();
actualizarAlbum();
actualizarCanciones();