import React, {useEffect,useState} from 'react';

function Header() {
	return(
		<header className = "header">
			<nav className = "year">
				<h1 className = "yearNum">1980</h1>
				<div className = "button">
					<a href = "/?type=industrial&year=1980">INDUSTRIAL</a>
				</div>
				<div className = "button">
					<a href = "/?type=commercial&year=1980">COMMERCIAL</a>
				</div>
				<div className = "button">
					<a href = "/?type=electric&year=1980">ELECTRIC</a>
				</div>
				<div className = "button">
					<a href = "/?type=residential&year=1980">RESIDENTIAL</a>
				</div>
				<div className = "button">
					<a href = "/?type=transportation&year=1980">TRANSPORTATION</a>
				</div>
				<div className = "button">
					<a href = "/?type=total&year=1980">TOTAL</a>
				</div>
			</nav>
			<nav className = "year">
				<h1 className = "yearNum">1990</h1>
				<div className = "button">
					<a href = "/?type=industrial&year=1990">INDUSTRIAL</a>
				</div>
				<div className = "button">
					<a href = "/?type=commercial&year=1990">COMMERCIAL</a>
				</div>
				<div className = "button">
					<a href = "/?type=electric&year=1990">ELECTRIC</a>
				</div>
				<div className = "button">
					<a href = "/?type=residential&year=1990">RESIDENTIAL</a>
				</div>
				<div className = "button">
					<a href = "/?type=transportation&year=1990">TRANSPORTATION</a>
				</div>
				<div className = "button">
					<a href = "/?type=total&year=1990">TOTAL</a>
				</div>
			</nav>
			<nav className = "year">
				<h1 className = "yearNum">2000</h1>
				<div className = "button">
					<a href = "/?type=industrial&year=2000">INDUSTRIAL</a>
				</div>
				<div className = "button">
					<a href = "/?type=commercial&year=2000">COMMERCIAL</a>
				</div>
				<div className = "button">
					<a href = "/?type=electric&year=2000">ELECTRIC</a>
				</div>
				<div className = "button">
					<a href = "/?type=residential&year=2000">RESIDENTIAL</a>
				</div>
				<div className = "button">
					<a href = "/?type=transportation&year=2000">TRANSPORTATION</a>
				</div>
				<div className = "button">
					<a href = "/?type=total&year=2000">TOTAL</a>
				</div>
			</nav>
			<nav className = "year">
				<h1 className = "yearNum">2017</h1>
				<div className = "button">
					<a href = "/?type=industrial&year=2017">INDUSTRIAL</a>
				</div>
				<div className = "button">
					<a href = "/?type=commercial&year=2017">COMMERCIAL</a>
				</div>
				<div className = "button">
					<a href = "/?type=electric&year=2017">ELECTRIC</a>
				</div>
				<div className = "button">
					<a href = "/?type=residential&year=2017">RESIDENTIAL</a>
				</div>
				<div className = "button">
					<a href = "/?type=transportation&year=2017">TRANSPORTATION</a>
				</div>
				<div className = "button">
					<a href = "/?type=total&year=2017">TOTAL</a>
				</div>
			</nav>
		</header>
	)
}

export default Header 