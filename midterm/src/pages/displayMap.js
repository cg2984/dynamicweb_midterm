//---REACT IMPORTS
import React, {useEffect,useState} from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import Header from "../components/header.js"

//---OTHER VARIABLES
//southmost longistude: 18.55
//northmost 71.23
let lat = 38.4506;
let lon = -96.1133;
let zoom = 3.4;
let pins = "pin-s-a+9ed4bd(-154.493062,63.588753),pin-s-b+000(-86.902298,32.318231),pin-s-b+000(-91.831833,35.20105),pin-s-b+000(-111.093731,34.048928),pin-s-b+000(-119.417932,36.778261),pin-s-b+000(-105.782067,39.550051),pin-s-b+000(-73.087749,41.603221),pin-s-b+000(-77.033418,38.905985)";

//---COLORS-----------------------
// #7b77fa
// #bd77fa
// #fa77f6
// #fa77b5
// #fa7b77
// #fabd77

// #f07e7e
// #f0b77e
// #f0f07e
// #b7f07e
// #7ef07e
// #7ef0b7

//---MAP VARIABLES
let endpoint = `styles/v1/mapbox/light-v10/static/${pins}/${lon},${lat},${zoom}/1080x512`;
const token = "?access_token=pk.eyJ1IjoiY2cyOTg0IiwiYSI6ImNrODRpbnNlbjAwOWczZm8ybXM5azBuZnYifQ.0cD8Ldn1qLXkLW5331lmCg";
const baseUrl = "https://api.mapbox.com/"
let mapUrl = baseUrl+endpoint+token

//---GHG VARIABLES
const key = "UcUGqUyJDvEldhwGumvpyxxmNaIRgGRHjJqa8Tde";
//let endpoint_GHG = `api/solar/solar_resource/v1.json?api_key=${key}&lat=${lat}&lon=${lon}`;

const stateArray = ["AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY","DC"];
const stateArrayLen = stateArray.length-1
//let i = 0;
	
function DisplayMap(){
	let history = useHistory();

	const[mapData,setMapData] = useState({});
	const[map,setMap] = useState("");
	const[year,setYear] = useState("");
	const[type, setType] = useState("total");
	const[GHGData, setGHGData] = useState({});
	const[mapTest,setMapTest] = useState("");
	const[emissions,setEmissions] = useState(0);

	useEffect(() => {
		let mySearchParams = history.location.search;
		let urlParams = new URLSearchParams(mySearchParams);
		let type = urlParams.get('type');
		if(type){
			setType(type);
			console.log("type",type);
		}
	},[history]);

	//getting the solar data 
	function getGHGData(){
		axios.get(`https://developer.nrel.gov/api/cleap/v1/state_co2_emissions?state_abbr=NY&type=${type}&api_key=${key}`)
				.then(function (response) {
				// handle success
				setGHGData(response);
			})
			.catch(function (error) {
				// handle error
				console.log(error);
			})
			.then(function () {
				// always executed
		});
	}	

	useEffect(() => {
		getGHGData();
	},[type]);

	
	// for(i=0;i < stateArrayLen;i++){
	// 	console.log(stateArray[i]);
	// 	getGHGData();
	// 	setTimeout(getGHGData(),5000);
	// }

	let ghgDataArray = [];

	//loading ghg data into variables, it automatically loads for each run of the for loop
	useEffect(() => {
		//must have the .data or else it will give you an error because it wont load properly
		if(GHGData.data){
			setYear(GHGData.data.result[0].start);
			setEmissions(GHGData.data.result[0].data[2000]);
			console.log(emissions,GHGData);
		}
	},[GHGData]);
	

	//getting the map data
	useEffect(() => {
		//normally its mapurl
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

	// useEffect(() => {
	// 	axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/NY.json?access_token=pk.eyJ1Ijoic2VhcmNoLW1hY2hpbmUtdXNlci0xIiwiYSI6ImNrN2Y1Nmp4YjB3aG4zZ253YnJoY21kbzkifQ.JM5ZeqwEEm-Tonrk5wOOMw&cachebuster=1585440334290&autocomplete=true&types=region`)
	// 		.then(function (response) {
	// 		// handle success
	// 		console.log("map geocoding");
	// 		console.log(response);
	// 		setMapData(response);
	// 	})
	// 	.catch(function (error) {
	// 		// handle error
	// 		console.log(error);
	// 	})
	// 	.then(function () {
	// 		//always executed
	// 	});
	// },[]);

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
			<div className = "data_circle"> 
				<p>{emissions}</p>
			</div>
		</main>
	)
}


export default DisplayMap;
	