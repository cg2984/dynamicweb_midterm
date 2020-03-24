//---REACT IMPORTS
import React, {useEffect,useState} from 'react';
import axios from 'axios';

//---OTHER VARIABLES
let lat = 38.5723
let lon = -77.3452

//---MAP VARIABLES
let endpoint = `styles/v1/mapbox/light-v10/static/${lon},${lat},5/300x200`;
const token = "?access_token=pk.eyJ1IjoiY2cyOTg0IiwiYSI6ImNrODRpbnNlbjAwOWczZm8ybXM5azBuZnYifQ.0cD8Ldn1qLXkLW5331lmCg";
const baseUrl = "https://api.mapbox.com/"
let mapUrl = baseUrl+endpoint+token

//---SOLAR VARIABLES
const key = "UcUGqUyJDvEldhwGumvpyxxmNaIRgGRHjJqa8Tde";
let endpoint_solar = `api/solar/solar_resource/v1.json?api_key=${key}&lat=${lat}&lon=${lon}`;




	
function Home() {
	const[mapData,setMapData] = useState({});
	const[map,setMap] = useState("");

	//getting the solar data 
	useEffect(() => {
		axios.get(`https://developer.nrel.gov/${endpoint_solar}`)
			.then(function (response) {
			// handle success
			console.log(response);
			console.log("solar data success");
		})
		.catch(function (error) {
			// handle error
			console.log(error);
		})
		.then(function () {
			// always executed
		});
	},[]);

	//getting the map data
	useEffect(() => {
		axios.get(mapUrl)
			.then(function (response) {
			// handle success
			console.log("map data success");
			console.log(response);
			setMapData(response);
		})
		.catch(function (error) {
			// handle error
			console.log(error);
		})
		.then(function () {
			//always executed
			console.log("Map Url",mapUrl);
		});
	},[]);

	useEffect(() => {
		if(mapData){
			setMap(mapData.data);
		}
	},[mapData]);

	return(
		<img className="map" src={mapUrl} alt = "static map"/>
	)
}


export default Home;
	