import React, {useEffect,useState} from 'react';

let display = "flex";

function Header(){
	return(
		<nav className = "CityNav">
				<a href="/?type=total">total</a>
				<a href="/?type=commercial">commercial</a>
				<a href="/?type=residential">residential</a>
		</nav>
	)
}

export default Header