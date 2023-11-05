const linkCloseSession = document.querySelector(".cerrarSesion");
let clickPlay = document.querySelector(".play");
let clickVolume = document.querySelector(".volume");

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
    document.querySelector(".nombreUsuario").textContent = usuarioEnSesion.nombre;
    if(usuarioEnSesion.sonando!=""){
        document.querySelector(".albumSonando").src = `img/${usuarioEnSesion.sonando}.jpg`
        document.querySelector(".albumSonando").alt = usuarioEnSesion.sonando;
        document.querySelector(".albumNombre").textContent = usuarioEnSesion.sonando;
    }
}

const actualizarCancionesFavoritas = () => {
    document.querySelector(".columna1").innerHTML += `<div class="tituloColumna"></div>`;
    document.querySelector(".columna2").innerHTML += `<div class="tituloColumna">Canción</div>`;
    document.querySelector(".columna3").innerHTML += `<div class="tituloColumna">Album</div>`;
    document.querySelector(".columna4").innerHTML += `<div class="tituloColumna">Duración</div>`;
    document.querySelector(".columna5").innerHTML += `<div class="tituloColumna">Reproducciones</div>`;
    usuarioEnSesion.canciones.forEach(element => {
        let play = `<div class="filas"><img src="img/play.png" alt="${element.album}" width="25px" height="25px" class="playSong"></div>`;
        let cancion = `<div class="filas"><img src="img/star_favorite.png" alt="${element.nombre}:${element.album}" width="25px" height="25px" class="songs">${element.nombre}</div>`;
        let album;
        let resultado = usuarioEnSesion.albums.some((album)=>album==element.album);
        if(resultado){
            album = `<div class="filas"><img src="img/star_favorite.png" alt="${element.album}" width="25px" height="25px" class="albumSong"><span class="filasAlbums">${element.album}</span></div>`;
        }else{
            album = `<div class="filas"><img src="img/star.png" alt="${element.album}" width="25px" height="25px" class="albumSong"><span class="filasAlbums">${element.album}</span></div>`;
        }   
        let duracion = `<div class="filas">4:00</div>`;
        let reproducciones = `<div class="filas">1995</div>`;
        document.querySelector(".columna1").innerHTML += play;
        document.querySelector(".columna2").innerHTML += cancion;
        document.querySelector(".columna3").innerHTML += album;
        document.querySelector(".columna4").innerHTML += duracion;
        document.querySelector(".columna5").innerHTML += reproducciones;
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
    let playCanciones = document.querySelectorAll(".playSong");
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
    let albumFavorito = Array.from(document.querySelectorAll(".albumSong"));
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

const clickCancionesFavoritas = (event) => {
    let cancionesFavoritas = document.querySelectorAll(".songs");
    cancionesFavoritas.forEach(element => {
        element.addEventListener("click", (event) => {
            let arrayCancion = String(element.getAttribute("alt")).split(":");
            let resultado = usuarioEnSesion.canciones.some((cancion)=> cancion.nombre==arrayCancion[0] && cancion.album==arrayCancion[1]);         
            if(resultado){    
                element.src = "img/star.png";
                for(let i=0; i<usuarioEnSesion.canciones.length; i++){
                    if(usuarioEnSesion.canciones[i].nombre==arrayCancion[0] && usuarioEnSesion.canciones[i].album==arrayCancion[1]){
                        usuarioEnSesion.canciones.splice(i, 1);
                    }
                }
                actualizarLocalStorage();
                location.reload();
            }          
        })
    })
 }      

const borrarCancionesNoFavoritas = () => {
    let columna1 = document.querySelector(".columna1");
    let columna2 = document.querySelector(".columna2");
    let columna3 = document.querySelector(".columna3");
    let columna4 = document.querySelector(".columna4");
    let columna5 = document.querySelector(".columna5");
    while(columna1.firstChild){
        columna1.removeChild(columna1.firstChild);
        columna2.removeChild(columna2.firstChild);
        columna3.removeChild(columna3.firstChild);
        columna4.removeChild(columna4.firstChild);
        columna5.removeChild(columna5.firstChild);
    }
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
actualizarCancionesFavoritas();

clickAlbumFavorito();
clickCancionesFavoritas();
clickPlaySong();