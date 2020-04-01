import React, {useEffect,useState} from 'react';
function Header({usState}){


	return(
		<div className = "header">
				<div className = "button">
					<a href = "/?type=NY">NEW YORK</a>
				</div>
				<div className = "button">
					<a href = "/?type=CT">CONNETICUT</a>
				</div>
				<div className = "button">
					<a href = "/?type=NJ">New jersey</a>
				</div>
				<div className = "button">
					<a href = "/?type=PA">Pennsylvania</a>
				</div>
				<div className = "button">
					<a href = "/?type=MA">Massachussets</a>
				</div>
		</div>
	);
}

export default Header