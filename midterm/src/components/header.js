import React, {useEffect,useState} from 'react';

let display = "flex";

function Header() {
	// function CloseMenu(display){
	// 	console.log("click");
	// 	if(display=="none"){
	// 		let display = "flex";
	// 	}
	// 	else{
	// 		let display = "none";
	// 	}
	// };

	return(
		<div className = "header">
			<div className = "header_text">
				<h1 className = "headerLink">INDUSTRIAL</h1>
				<h1>GHG emissions in</h1>
				<h1 className = "headerLink">2000</h1>
			</div>
			<div style={{display:`${display}`}}className = "buttonWrapper">
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
				<div className = 'dates'>
				</div>
			</div>
		</div>
	)
}

export default Header