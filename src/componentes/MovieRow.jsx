import React from 'react';
import { useState } from 'react';
import '../style-sheet/MovieRow.css';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';

export default function MovieRow({ title, items }) {
	const [scrollX, setScrollX] = useState(0);

	const handleBackArrow = () => {
		let x = scrollX + Math.round(window.innerWidth / 2);
		if (x > 0) {
			x = 0;
		}
		setScrollX(x);
	};

	const handleNextArrow = () => {
		let x = scrollX - Math.round(window.innerWidth / 2);
		let listW = items.results.length * 150;
		if (window.innerWidth - listW > x) {
			x = window.innerWidth - listW - 60;
		}
		setScrollX(x);
	};

	return (
		<>
			<div className='movieRow'>
				<h2>{title}</h2>
				<div className='back-arrow'>
					<MdNavigateBefore
						style={{ fontSize: 50 }}
						onClick={handleBackArrow}
					/>
				</div>
				<div className='next-arrow'>
					<MdNavigateNext style={{ fontSize: 50 }} onClick={handleNextArrow} />
				</div>
				<div className='movieRow-listArea'>
					<div
						className='movieRow-list'
						style={{ marginLeft: scrollX, width: items.results.length * 150 }}>
						{items.results.length > 0 &&
							items.results.map((item, key) => (
								<div className='movieRow-item' key={key}>
									<img
										src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
										alt={item.original_tittle}
										key={key}
									/>
								</div>
							))}
					</div>
				</div>
			</div>
		</>
	);
}
