let pagina = 1;
const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');

btnSiguiente.addEventListener('click', ()=>{
    if(pagina < 100){
        pagina += 1;
        cargarPeliculas();
    }
});

btnAnterior.addEventListener('click', ()=>{
    if(pagina > 1){
        pagina -= 1;
        cargarPeliculas();
    }
});



const cargarPeliculas = async() => {
    try {
        const respuesta = await fetch (`https://api.themoviedb.org/3/movie/popular?api_key=192e0b9821564f26f52949758ea3c473&page=${pagina}`);
        console.log(respuesta);

        if(respuesta.status === 200){
            const datos = await respuesta.json();
            
            //results es un campo de la API de IMDB
            console.log(datos.results); 

            /*** forEach para traer los datos ***/
            let peliculas = " "; // por cada película, se ira creando en "let" gracias al forEach
            datos.results.forEach(pelicula => {
                peliculas = peliculas + `
                    <div class="pelicula">
                        <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
                    </div>
                    <h3 class="titulo">${pelicula.title}</h3>`;
                // shorthand:
                //peliculas += `<h1>${pelicula.title}</h1>`;
            });

            document.getElementById('contenedor').innerHTML = peliculas;


        } else if (respuesta.status === 401){
            console.log('codigo de película erroneo');
        } else if (respuesta.status === 404){
            console.log('La película no existe');
        } 
    } catch (error){
        console.log(error);
    }
}

cargarPeliculas();