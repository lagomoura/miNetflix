import React from 'react';
import '../style-sheet/FeaturedMovie.css';
import { ImPlay3} from 'react-icons/im';
import { GoPlus } from 'react-icons/go';

export default function FeaturedMovie({ featuredMovie }) {
	//. Agarramos el ano de lanzamiento del movieFeatured. La API manda la fecha en formato completo. Vamos a querer trabajar solo con el ano usando el metodo getFullYear().
	const firstDate = new Date(featuredMovie.first_air_date);

	//. Para acceder al objto genres, creamos una variable y guardamos cada nombre de genero en una variable i a cada vuelta que se ejecute el ciclo. Asi si un movie tiene mas de un genero, guardan todos como un array.
	const genres = [];
	for (let i in featuredMovie.genres) {
		//. El i se ira repetir cantas veces sea el numero de generos que tenga el movie.
		genres.push(featuredMovie.genres[i].name); //.El push guarda cada i generado en el aray genres.
	}

	//= Para controloar overviews muy largos, usamos el metodo substring() para que mostre desde el caracter 0 hasta el 200, concatenando el string de mensaje de leer mas.
	let description = featuredMovie.overview;
	if (description.length > 200) {
		description = description.substring(0,200) + '...';
	}


	return (
		<section
			className='featured'
			style={{
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				backgroundImage: `url(https://image.tmdb.org/t/p/original${featuredMovie.backdrop_path})`,
			}}>
			<div className='featured-vertical'>
				<div className='featured-horizontal'>
					<div className='featured-name'>{featuredMovie.original_name}</div>
					<div className='featured-info'>
						<div className='featured-rating'>
							{featuredMovie.vote_average} points
						</div>
						<div className='featured-season'>
							{/* <> Creamos una validacion caso haya solo una temporada, la palabra va en singular </> */}
							{featuredMovie.number_of_seasons}
							{featuredMovie.number_of_seasons !== 1 ? ' seasons' : ' season'}
						</div>
						<div className='featured-year'>{firstDate.getFullYear()}</div>
						<div className='featured-overview'>{description}<div className="btn text-light">Read more.</div></div>
						<div className='featured-buttons'>
							<a href={`/watch/${featuredMovie.id}`} className='btn-watch'>
								{' '}
								<ImPlay3 /> Play
							</a>
							<a href={`/list/add/${featuredMovie.id}`} className='btn-list'>
								<GoPlus /> My List
							</a>
						</div>
						<div className='featured-genres'>
							{/* <> Mostramos todo el contenido del array genres y separamos cada valor con una coma y un espacios */}
							<strong>Genres: {genres.join(', ')}</strong>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
