import React from 'react';
import '../style-sheet/Footer.css';
import { RiNetflixFill, RiReactjsFill, RiDatabase2Fill } from 'react-icons/ri';
export default function Footer() {
	return (
		<>
			<footer>
				<div>
        <RiReactjsFill /> by: Gustavo Lago 
					<br />
					<RiNetflixFill /> Copyright & Rights reserved to NetFlix  <br />
					<RiDatabase2Fill /> Database by: https://www.themoviedb.org/ 
				</div>
			</footer>
		</>
	);
}
