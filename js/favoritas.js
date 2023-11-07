const linkCloseSession = document.querySelector(".cerrarSesion");
let clickPlay = document.querySelector(".play");
let clickVolume = document.querySelector(".volume");

let usuarioEnSesion = JSON.parse(localStorage.getItem("usuarioEnSesion"));
let usuarios;

let listaFila = document.querySelectorAll(".filas");
let playCanciones = document.querySelectorAll(".playSong");
let albumFavorito = Array.from(document.querySelectorAll(".albumSong"));
let cancionesFavoritas = document.querySelectorAll(".songs");

const verificarListaDeUsuarios = () => {
    if(localStorage.usuarios && localStorage.usuarios!=""){
        usuarios = JSON.parse(localStorage.getItem("usuarios"));
    }else{
        usuarios = [];
    }
}

const actualizarDatos = () => {
    document.querySelector(".nombreUsuario").textContent = usuarioEnSesion.nombre;
    if(usuarioEnSesion.sonando!=""){
        document.querySelector(".albumSonando").src = `img/${usuarioEnSesion.sonando}.jpg`
        document.querySelector(".albumSonando").alt = usuarioEnSesion.sonando;
        document.querySelector(".albumNombre").textContent = usuarioEnSesion.sonando;
    }
    borrarCanciones();
    actualizarCanciones();
    actualizarAlbum();
}

const borrarCanciones = () => {
    listaFila.forEach(element => {
        let arrayFila = element.getAttribute("title").split("-");
        let resultado = usuarioEnSesion.canciones.some((cancion)=>cancion.nombre==arrayFila[1] && cancion.album==arrayFila[0]);
        if(!resultado){
            element.style.display = "none";
        }
    });
}

const actualizarCanciones = () => {
    cancionesFavoritas.forEach(element1 => {
        let arrayCancion = element1.getAttribute("alt").split("-");
        let resultado = usuarioEnSesion.canciones.some((cancion)=>cancion.nombre==arrayCancion[1] && cancion.album==arrayCancion[0]);
        if(resultado){
            element1.src = "img/star_favorite.png";
        }else{
            element1.src = "img/star.png";
        }
    });      
}

const actualizarAlbum = () => {
    albumFavorito.forEach(element3 => {
        let resultado = usuarioEnSesion.albums.some((album)=>album==element3.alt);
        if(resultado){
            element3.src = "img/star_favorite.png";
        }else{
            element3.src = "img/star.png";
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

const clickPlaySong = (event) => {
    playCanciones.forEach(element => {
        element.addEventListener("click", (event) => {
            document.querySelector(".albumSonando").src = `img/${element.alt}.jpg`
            document.querySelector(".albumSonando").alt = element.alt;
            document.querySelector(".albumNombre").textContent = element.alt;
            usuarioEnSesion.sonando = element.alt;           
        })
    });
}

const clickAlbumFavorito = (event) => { 
    albumFavorito.forEach(element=> {
        element.addEventListener("click", (event) => {
            let resultado = usuarioEnSesion.albums.some((album)=>album==element.alt);
            if(resultado){
                let filtrado1 = albumFavorito.filter(filtro1=>filtro1.getAttribute("alt")==element.alt);
                filtrado1.forEach(element1 => {
                    element1.src = "img/star.png";
                });
                usuarioEnSesion.albums.splice(usuarioEnSesion.albums.indexOf(element.alt), 1);
                actualizarLocalStorage();                
            }else{
                let filtrado2 = albumFavorito.filter(filtro2=>filtro2.getAttribute("alt")==element.alt);
                filtrado2.forEach(element2 => {
                    element2.src = "img/star_favorite.png"
                });
                usuarioEnSesion.albums.push(element.alt);
                actualizarLocalStorage();
            }
        })        
    });
}

let clickCancionesFavoritas = (event) => {
    cancionesFavoritas.forEach(element => {
        element.addEventListener("click", (event) => {
            let arrayCancion = String(element.getAttribute("alt")).split("-");
            let resultado = usuarioEnSesion.canciones.some((cancion)=> cancion.nombre==arrayCancion[1] && cancion.album==arrayCancion[0]);         
            if(resultado){    
                element.src = "img/star.png";
                for(let i=0; i<usuarioEnSesion.canciones.length; i++){
                    if(usuarioEnSesion.canciones[i].nombre==arrayCancion[1] && usuarioEnSesion.canciones[i].album==arrayCancion[0]){
                        usuarioEnSesion.canciones.splice(i, 1);
                    }
                }
                borrarCanciones();
                actualizarLocalStorage();
            }          
        })
    })
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

verificarListaDeUsuarios();
actualizarDatos();

clickAlbumFavorito();
clickCancionesFavoritas();
clickPlaySong();