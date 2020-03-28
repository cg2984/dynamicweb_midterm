//---REACT IMPORTS
import React, {useEffect,useState} from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";

//---OTHER VARIABLES
//southmost longistude: 18.55
//northmost 71.23
let lat = 38.5192;
let lon = -95.3241;
let zoom = 3.4;

//---MAP VARIABLES
let endpoint = `styles/v1/mapbox/light-v10/static/${lon},${lat},${zoom}/1080x512`;
const token = "?access_token=pk.eyJ1IjoiY2cyOTg0IiwiYSI6ImNrODRpbnNlbjAwOWczZm8ybXM5azBuZnYifQ.0cD8Ldn1qLXkLW5331lmCg";
const baseUrl = "https://api.mapbox.com/"
let mapUrl = baseUrl+endpoint+token

//---GHG VARIABLES
const type = "industrial"
const key = "UcUGqUyJDvEldhwGumvpyxxmNaIRgGRHjJqa8Tde";
//let endpoint_GHG = `api/solar/solar_resource/v1.json?api_key=${key}&lat=${lat}&lon=${lon}`;
let endpoint_GHG = `api/cleap/v1/state_co2_emissions?state_abbr=NY&type=${type}&api_key=${key}`

	
function DisplayMap(){

	//let history = useHistory();

	const[mapData,setMapData] = useState({});
	const[map,setMap] = useState("");
	const[year,setYear] = useState("");
	const[type, setType] = useState("total");
	const[GHGData, setGHGData] = useState({});
	const[mapTest,setMapTest] = useState("");

	// useEffect(() => {
	// 	let mySearchParams = history.location.search;
	// 	let urlParams = new URLSearchParams(mySearchParams);
	// 	let type = urlParams.get('type');
	// 	if(type){
	// 		setType(type);
	// 	}
	// },[history]);

	//getting the solar data 
	useEffect(() => {
		axios.get(`https://developer.nrel.gov/${endpoint_GHG}`)
			.then(function (response) {
			// handle success
			console.log("GHG data success axios");
			setGHGData(response);
		})
		.catch(function (error) {
			// handle error
			console.log(error);
		})
		.then(function () {
			// always executed
		});
	},[]);

	//loading ghg data into variables
	useEffect(() => {
		//must have the .data or else it will give you an error because it wont load properly
		if(GHGData.data){
			console.log("GHG data in",GHGData);
			setType(GHGData.status);
			setYear(GHGData.data.result[0].start);
		}
	},[GHGData]);
	

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
		});
	},[]);

	//loading map data into variables
	useEffect(() => {
		if(mapData.config){
			setMap(mapData.data);
			console.log(mapData.config.url);
		}
	},[mapData]);

	return(
		<main>
			<img className="map" src={mapUrl} alt = "static map"/>
			<p>{mapTest} Status</p>
			<p>{type} Status</p>
			<p>{year} Year</p>
		</main>
	)
}


export default DisplayMap;
	