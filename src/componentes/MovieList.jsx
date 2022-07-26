import React, { useEffect, useState } from 'react';
import Tmdb from '../data/Tmdb.js';
import FeaturedMovie from './FeaturedMovie.jsx';
import Header from './Header.jsx';
import MovieRow from './MovieRow.jsx';
import '../style-sheet/MovieList.css';

export default function MovieList() {
	const [movieList, setMovieList] = useState([]);
	const [featuredMovie, setFeaturedMovie] = useState(null);
	const [blackHeader, setBlackHeader] = useState(false);

	//= Obtenemos la data de la API en una vez que el componente se cargue
	useEffect(() => {
		const loadData = async () => {
			//.Funcion que crea el asincronismo par esperar una respuesta de la API.
			let list = await Tmdb.getHomeList(); //.Esperamos la respuesta que viene desde Tmdb.js llamando a la funcion getHomeList. Guardamos la respuesta en una variable.

			setMovieList(list); //.Seteo la lista de peliculas en el state.

			//=Captando FeaturedMovie
			//.Filtramos solo proyectos de originais de Netflix, filtrando las listas que tenga como slug "originals".
			let originals = list.filter((i) => i.slug === 'originals');
			//.Agarro una peli de manera aleatoria generando un numero aleatorio entre 0 y la cantidad de indices que tenga la lista
			let randomMovie = Math.floor(
				Math.random() * (originals[0].items.results.length - 1)
			);
			let chosenMovie = originals[0].items.results[randomMovie]; //.Guardamos la peli elegida en una variable.

			let chosenInfo = await Tmdb.getMovieInfo(chosenMovie.id, 'tv'); //. Accedemos la informcion de esa peli elegida, pasando el ID de la peli y el tipo de dato que queremos (tv(serie)o movie(pelicula)).

			setFeaturedMovie(chosenInfo); //. Guardamos toda esa informacion en el state de featuredMovie.
		};
		loadData();
	}, []);

	//= Creo un segundo useEffect para controlar el estado de blackHeader
	useEffect(() => {
		const scrollListener = () => {
			//.Monitamos el scroll vertical de la pagina y su supera 50px, cambiamos el estado de blackHeader a true.
			if (window.scrollY > 50) {
				setBlackHeader(true);
			} else {
				setBlackHeader(false);
			}
		};

		//. Agregamos un evendtoListener para poder monitrear el scroll y ejecutar la funcion scrollListener
		window.addEventListener('scroll', scrollListener);

		return () => {
			//.Cuando el scroll vertical vuelve a su valor menor a 50px, eliminamos el eventoListener y la ejecucion de la funcion scrollListener
			window.removeEventListener('scroll', scrollListener);
		};
	}, []);

	return (
		<div className='home-page'>
			<Header blackHeader={blackHeader} />
			{featuredMovie && <FeaturedMovie featuredMovie={featuredMovie} />}
			<section className='lists'>
				{movieList.map((item, key) => (
					<div key={key}>
						<MovieRow title={item.title} items={item.items} />
					</div>
				))}
			</section>
			{/* Creamos una validacion para que el loading aparezca solo cuando no haya cargada la lista de peliculas. De esa manera, validamos un loading sin el uso de un state */}
			{movieList.length <= 0 && (
				<div className='loading'>
					<img
						src='https://media.wired.com/photos/592744d3f3e2356fd800bf00/master/w_2560%2Cc_limit/Netflix_LoadTime.gif'
						alt='loading'
					/>
				</div>
			)}
		</div>
	);
}
