//= Llave de la API
const API_KEY = 'aefc968086d9585377ee3468ce6d9e65';
//= URL base de la API
const BASE_URL = 'https://api.themoviedb.org/3';

// originals
// trending
// top rated
// action
// comedy
// horror
// romance
// documentaries

//= Hacemos un Fetch para obtener la lista de peliculas.
const basicFetch = async (url) => {
	const response = await fetch(`${BASE_URL}${url}`); //. Hacemos la peticion a la API y guardamos toda su respuesta, es decir, toda la informacion de peliculas.
	const json = await response.json(); //. Convertimos la respuesta a JSON y guardamos en una variable.
	return json; //.Retornamos esa variable.
};

//= Creamos una funcion que solo guarda la informacion de las peliculas. Separamos esa informacion en grupos. Eso servira para mostrar la informacion en la Home del proyecto.
export default {
	getHomeList: async () => {
		return [
			{
				slug: 'originals', //.Grupo que filtra solo contenido original NetFlix. El fetch llama a una direccion que contiene todas las peliculas originales. Network=213 es el codigo de Netflix
				title: 'Original Netflix',
				items: await basicFetch(
					`/discover/tv?with_network=213&language=en-US&api_key=${API_KEY}`
				),
			},
			{
				slug: 'trending',
				title: 'Trending',
				items: await basicFetch(`/trending/all/week?api_key=${API_KEY}`),
			},
			{
				slug: 'top-rated',
				title: 'Top Rated',
				items: await basicFetch(
					`/movie/top_rated?language=en-US&api_key=${API_KEY}`
				),
			},
			{
				slug: 'action',
				title: 'Action',
				items: await basicFetch(
					`/discover/movie?with_genres=28&language=en-US&api_key=${API_KEY}`
				),
			},
			{
				slug: 'comedy',
				title: 'Comedy',
				items: await basicFetch(
					`/discover/movie?with_genres=35&language=en-US&api_key=${API_KEY}`
				),
			},
			{
				slug: 'horror',
				title: 'Horror',
				items: await basicFetch(
					`/discover/movie?with_genres=27&language=en-US&api_key=${API_KEY}`
				),
			},
			{
				slug: 'romance',
				title: 'Romance',
				items: await basicFetch(
					`/discover/movie?with_genres=10749&language=en-US&api_key=${API_KEY}`
				),
			},
			{
				slug: 'documentaries',
				title: 'Documentaries',
				items: await basicFetch(
					`/discover/movie?with_genres=99&language=en-US&api_key=${API_KEY}`
				),
			},
		];
	},

	//= Creamos una funcion donde toma la informacion de una unica seria o pelicula. Usando el ID del producto. Hacemos un fetch en el caso de ser movie u otro en el caso de que sea tv(serie)
	getMovieInfo: async (movieId, type) => {
		let info = {};

		if (movieId) {
			switch (type) {
				case 'movie':
					info = await basicFetch(
						`/movie/${movieId}?language=en-US&api_key=${API_KEY}`
					);
					break;
				case 'tv':
					info = await basicFetch(
						`/tv/${movieId}?language=en-US&api_key=${API_KEY}`
					);
					break;

				default:
					break;
			}
		}
		return info;
	},
};
