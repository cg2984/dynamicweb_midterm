import React, {useEffect,useState} from 'react';

function Header() {
	return(
		<header className = "header">
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
		</header>
	)
}

export default Header 