//---REACT IMPORTS
import React, {useEffect,useState} from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import Header from "../components/header.js"

//---OTHER VARIABLES
let lat = 40.730610;
let lon = -73.935242;
let zoom = 5;


//---GHG VARIABLES
const key = "UcUGqUyJDvEldhwGumvpyxxmNaIRgGRHjJqa8Tde";

//MAP
let endpoint = `styles/v1/mapbox/light-v10/static/${lon},${lat},${zoom}/1080x512`;
const token = "?access_token=pk.eyJ1IjoiY2cyOTg0IiwiYSI6ImNrODRpbnNlbjAwOWczZm8ybXM5azBuZnYifQ.0cD8Ldn1qLXkLW5331lmCg";
const baseUrl = "https://api.mapbox.com/";
let mapUrl = baseUrl+endpoint+token;
	
let mapData;

function DisplayMap(){
	let history = useHistory();
	const[GHG,setGHG] = useState({});
	const[mapData,setMapData] = useState({});
	const[map,setMap] = useState("");
	const[emissions,setEmissions] = useState(0)
	const[color,setColor] = useState("FFFFFF")
	const[usState,setUsState] = useState("NY");


	// useEffect(() => {
	// 	let mySearchParams = history.location.search;
	// 	let urlParams = new URLSearchParams(mySearchParams);
	// 	let usState = urlParams.get('usState');
	// 	setType(usState);
	// },[history]);

	useEffect(() => {
		axios.get(`https://developer.nrel.gov/api/cleap/v1/state_co2_emissions?state_abbr=NY&type=total&api_key=${key}`)
			.then(function (response) {
			// handle success
			console.log(response);
			setGHG(response);
			console.log("success",GHG);
		})
		.catch(function (error) {
			// handle error
			console.log(error);
		})
		.then(function () {
			// always executed
		});
	},[]);

	useEffect(() => {
		axios.get(mapUrl)
			.then(function (response) {
			// handle success
			console.log(response);
			setMapData(response);
			console.log("mapData",mapData);
		})
		.catch(function (error) {
			// handle error
			console.log(error);
		})
		.then(function () {
			// always executed
		});
	},[]);

	
	//loading ghg data into variables. without this only a proto object thing will load
	useEffect(() => {
		//must have the .data or else it will give you an error because it wont load properly and it will give undefined error
		if(GHG.data){
			setEmissions(GHG.data.result[0].data[2000]);
			console.log("emissions",emissions,GHG);
		}
	},[GHG]);


	// //loading map data into variables
	// useEffect(() => {
	// 	if(mapData.config){
	// 		setMap(mapData.data);
	// 	}
	// },[mapData]);

	return(
		<main>
			<img className="map" src={mapUrl} alt = "static map"/>
			<div className = "data_circle"> 
				<p>{emissions}</p>
			</div>
		</main>
	);
}


export default DisplayMap;
	