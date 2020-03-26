import React, {useEffect,useState} from 'react';
import axios from 'axios';

//----OTHER VARIABLES
let lat = 42.702;
let lon = -75.8598;
let zoom = 5.46;

//---MAP VARIABLES
let endpoint = `styles/v1/mapbox/light-v10/static/${lon},${lat},${zoom}/512x512`;
const token = "?access_token=pk.eyJ1IjoiY2cyOTg0IiwiYSI6ImNrODRpbnNlbjAwOWczZm8ybXM5azBuZnYifQ.0cD8Ldn1qLXkLW5331lmCg";
const baseUrl = "https://api.mapbox.com/"
let mapUrl = baseUrl+endpoint+token
	
function ChoiceMap() {
	const[mapData,setMapData] = useState({});
	const[map,setMap] = useState("");
	//taking the map data that axios gets and assigning it to the useEffect and useState function
	useEffect(() => {
		axios.get(mapUrl)
			.then(function (response) {
			// handle success
			console.log("success");
			console.log(response);
			setMapData(response);
		})
		.catch(function (error) {
			// handle error
			console.log(error);
		})
		.then(function () {
			//always executed
		});
	},[]);

	useEffect(() => {
		if(mapData){
			setMap(mapData.data);
		}
	},[mapData]);

 
  return (
    <div>
    	<img src={mapUrl} alt = "static map"/>
    </div>
  );
}


export default ChoiceMap;