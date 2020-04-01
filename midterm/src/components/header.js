import React, {useEffect,useState} from 'react';

function Header() {
	return(
		<header className = "header">
			<nav className = "types">
				<div className = "button">
					<a href = "/?type=industrial">INDUSTRIAL</a>
				</div>
				<div className = "button">
					<a href = "/?type=commercial">COMMERCIAL</a>
				</div>
				<div className = "button">
					<a href = "/?type=electric">ELECTRIC</a>
				</div>
				<div className = "button">
					<a href = "/?type=residential">RESIDENTIAL</a>
				</div>
				<div className = "button">
					<a href = "/?type=transportation">TRANSPORTATION</a>
				</div>
				<div className = "button">
					<a href = "/?type=total">TOTAL</a>
				</div>
			</nav>
			<nav className = "years">
				<div className = "button">
					<a href = "&year=1980">1980</a>
				</div>
				<div className = "button">
					<a href = "&year=1990">1990</a>
				</div>
				<div className = "button">
					<a href = "&year=2000">2000</a>
				</div>
				<div className = "button">
					<a href = "&year=2017">2017</a>
				</div>
			</nav>
		</header>
	)
}

export default Header 