//---REACT IMPORTS
import React, {useEffect,useState} from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import Header from "../components/header.js"

//---OTHER VARIABLES
//southmost longistude: 18.55
//northmost 71.23
let lat = 40.730610;
let lon = -73.935242;
let zoom = 5;

//---GHG VARIABLES
const key = "UcUGqUyJDvEldhwGumvpyxxmNaIRgGRHjJqa8Tde";

let endpoint = `styles/v1/mapbox/light-v10/static/${lon},${lat},${zoom}/1080x512`;
const token = "?access_token=pk.eyJ1IjoiY2cyOTg0IiwiYSI6ImNrODRpbnNlbjAwOWczZm8ybXM5azBuZnYifQ.0cD8Ldn1qLXkLW5331lmCg";
const baseUrl = "https://api.mapbox.com/";
let mapUrl = baseUrl+endpoint+token;
	
function DisplayMap(){
	let history = useHistory();

	const[mapData,setMapData] = useState({});
	const[map,setMap] = useState("");
	const[year,setYear] = useState("");
	const[type, setType] = useState(null);
	const[GHGData, setGHGData] = useState({});
	const[emissions,setEmissions] = useState(0);
	const[usState,setUsState] = useState("");

	useEffect(() => {
			let mySearchParams = history.location.search;
			let urlParams = new URLSearchParams(mySearchParams);
			//using method get from search params api 
			let type = urlParams.get('type');
			//makes sure that tte city exists
			if(type){
				setType(type);
			}
	},[history]);

		

	//type != null here because when i put it on the axios function it didnt work. this keeps it from loading the default value for type
	useEffect(() => {
		console.log("type",type);
		console.log("state",usState);
		axios.get(`https://developer.nrel.gov/api/cleap/v1/state_co2_emissions?state_abbr=CT&type=${type}&api_key=${key}`)
			.then(function (response) {
				// handle success
					setGHGData(response);
					console.log(GHGData);
					console.log("request type",type);
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
		if(GHGData.data){
			setYear(GHGData.data.result[0].start);
			setEmissions(GHGData.data.result[0].data[2000]);
			console.log(emissions,GHGData);
		}
	},[GHGData]);

//--MAPS--------------------------------------------------------------------------------------------------------
	
	function getMapData(){
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
	}

	//loading map data into variables
	useEffect(() => {
		if(mapData.config){
			setMap(mapData.data);
			console.log(mapData.config.url);
		}
	},[mapData]);

	return(
		<main>
			<Header type={type}/>
			<img className="map" src={mapUrl} alt = "static map"/>
			<p>{type}</p>
			<p>{emissions}</p>
		</main>
	)
}


export default DisplayMap;
	