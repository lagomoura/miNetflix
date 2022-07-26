import React from 'react';
import '../style-sheet/Header.css';

export default function Header({ blackHeader }) {
	return (
		<>
			{/* Dejamos la clase de manera dinamica, trayendo el state desde MovieList */}
			<header className={blackHeader ? 'black' : ''}>
				<div className='header-logo'>
					<a href='/'>
						<img
							src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1200px-Netflix_2015_logo.svg.png'
							alt='Netflix'
						/>
					</a>
				</div>
				<div className='header-user'>
					<a href='/'>
						<img
							src='https://i.pinimg.com/564x/db/70/dc/db70dc468af8c93749d1f587d74dcb08.jpg'
							alt='User'
						/>
					</a>
				</div>
			</header>
		</>
	);
}
