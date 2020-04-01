import React, {useEffect,useState} from 'react';
function Header({usState}){


	return(
		<div className = "header">
			<div className = "header_text">
				<h1 className = "headerLink">{usState}</h1>
				<h1>GHG EMISSIONS IN</h1>
				<h1 className = "headerLink">2000</h1>
			</div>
			<div className = "buttonWrapper_type">
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
		</div>
	);
}

export default Header