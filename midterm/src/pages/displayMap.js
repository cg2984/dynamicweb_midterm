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

//---COLORS-----------------------
//250-201 => #FF431B
//200-151 => #FF7C1B
//150-101 => #FFB51B
//100-51 => #FFEE1B
//50-0 => #D7FF1B


//---GHG VARIABLES
const key = "UcUGqUyJDvEldhwGumvpyxxmNaIRgGRHjJqa8Tde";
let dataColor = 0;
let dataArray = [];

//const stateArray = ["AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY","DC"];
const stateArray = ["NY","CT","NJ","PA"];
let i = 0;
let j = 0;

let pin0 = "";
let pin1 = "";
let pin2 = "";
let pin3 = "";


let dataColorArray = [];
let pins = null;
let endpoint = `styles/v1/mapbox/light-v10/static/${pins}/${lon},${lat},${zoom}/1080x512`;
const token = "?access_token=pk.eyJ1IjoiY2cyOTg0IiwiYSI6ImNrODRpbnNlbjAwOWczZm8ybXM5azBuZnYifQ.0cD8Ldn1qLXkLW5331lmCg";
const baseUrl = "https://api.mapbox.com/";
let mapUrlInitial = baseUrl+endpoint+token;
	
function DisplayMap(){
	let history = useHistory();

	const[mapData,setMapData] = useState({});
	const[map,setMap] = useState("");
	const[year,setYear] = useState("");
	const[type, setType] = useState(null);
	const[GHGData, setGHGData] = useState({});
	const[mapTest,setMapTest] = useState("");
	const[emissions,setEmissions] = useState(0);


	useEffect(() => {
		let mySearchParams = history.location.search;
		let urlParams = new URLSearchParams(mySearchParams);
		let type = urlParams.get('type');
		setType(type);
		// let year = urlParams.get('year');
		// if(type && year){
		// 	setType(type);
		// 	console.log("type",type);
		// 	setYear(year);
		// }
	},[history]);

	//getting the GHG data 
	function getGHGData(){
		axios.get(`https://developer.nrel.gov/api/cleap/v1/state_co2_emissions?state_abbr=${stateArray[i]}&type=${type}&api_key=${key}`)
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
	}	

	//type != null here because when i put it on the axios function it didnt work. this keeps it from loading the default value for type
	if (type!=null){
		for(i;i < 4;i++){
		getGHGData();
	 	console.log(i,stateArray[i]);
		}
	}
	
	
	
//loading ghg data into variables. without this only a proto object thing will load
	useEffect(() => {
		//must have the .data or else it will give you an error because it wont load properly and it will give undefined error
		if(GHGData.data){
			setYear(GHGData.data.result[0].start);
			setEmissions(GHGData.data.result[0].data[2000]);
			console.log(emissions,GHGData);
			dataArray.push(emissions);
			//console.log("dataColor",dataColor);
			//dataColorArray.push(dataColor);
			//console.log("dataArray", dataArray);
		}
	},[GHGData]);

//--MAPS--------------------------------------------------------------------------------------------------------
	function colorSet(){
		for(j;j < 5;j++){
			if(250 > dataArray[j] > 201){
				dataColor="FF431B"
			} 
			if(200 > dataArray[j] > 151){
				dataColor="FF7C1B"
			}
			if(150 > dataArray[j] > 101){
				dataColor="FFB51B"
			} 					
			if(100 > dataArray[j] > 51){
				dataColor="FFEE1B"
			}
			if(50 > dataArray[j] > 0){
				dataColor="D7FF1B"
			}
			else{
				dataColor = "FFFFFF";
			}

			dataColorArray.push(dataColor);
			console.log(dataColorArray)
		}
		let pins = `pin-s-a+${dataColorArray[0]}(-75.420735,43.145888),pin-s-b+${dataColorArray[1]}(-74.4057,40.0583),pin-s-b+${dataColorArray[2]}(-73.0877,41.6032),pin-s-b+${dataColorArray[3]}(-77.466611,40.873649)`;
	}	

	
	function getMapData(){
		//if(pins != null){
			//normally its mapurl
			axios.get(mapUrlInitial)
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
		//}	
	}


	//getting the map data
	useEffect(() => {
	   if(pins != null){
	   		colorSet();
			getMapData();
		}
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
			<Header type={type}/>
			<img className="map" src={mapUralInitial} alt = "static map"/>
			<div className = "data_circle"> 
				<p>{emissions}</p>
			</div>
		</main>
	)
}


export default DisplayMap;
	