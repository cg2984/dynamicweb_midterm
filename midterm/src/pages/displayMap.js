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
//---COLORS-----------------------
//250-201 => #FF431B
//200-151 => #FF7C1B
//150-101 => #FFB51B
//100-51 => #FFEE1B
//50-0 => #D7FF1B

//---MAP VARIABLES
let dataColorArray = [];
let pins = `pin-s-a+${dataColorArray[0]}(-154.493062,63.588753),pin-s-b+${dataColorArray[1]}(-86.902298,32.318231),pin-s-b+${dataColorArray[2]}(-91.831833,35.20105)`;
let endpoint = `styles/v1/mapbox/light-v10/static/${pins}/${lon},${lat},${zoom}/1080x512`;
const token = "?access_token=pk.eyJ1IjoiY2cyOTg0IiwiYSI6ImNrODRpbnNlbjAwOWczZm8ybXM5azBuZnYifQ.0cD8Ldn1qLXkLW5331lmCg";
const baseUrl = "https://api.mapbox.com/"
let mapUrl = baseUrl+endpoint+token

//---GHG VARIABLES
const key = "UcUGqUyJDvEldhwGumvpyxxmNaIRgGRHjJqa8Tde";
let dataColor = 0;
let dataArray = [];

//const stateArray = ["AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY","DC"];
const stateArray = ["NY","CT","NJ"];
let i = 0;


	
function DisplayMap(){
	let history = useHistory();

	const[mapData,setMapData] = useState({});
	const[map,setMap] = useState("");
	const[year,setYear] = useState("");
	const[type, setType] = useState(null);
	const[GHGData, setGHGData] = useState({});
	const[mapTest,setMapTest] = useState("");
	const[emissions,setEmissions] = useState(0);
	const[emissionsNY,setEmissionsNY] = useState(0);
	const[emissionsNJ,setEmissionsNJ] = useState(0);
	const[emissionsCT,setEmissionsCT] = useState(0);

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

	console.log(type);

	//getting the GHG data 
	function getGHGData(){
		axios.get(`https://developer.nrel.gov/api/cleap/v1/state_co2_emissions?state_abbr=${stateArray[i]}&type=${type}&api_key=${key}`)
			.then(function (response) {
				// handle success
					setGHGData(response);
					console.log(GHGData);
					console.log(type);
				})
				.catch(function (error) {
					// handle error
					console.log(error);
				})
				.then(function () {
					// always executed
			});
	}	

	//type != null here because when i put it on the axiox function it didnt work. this keeps it from loading the default value for type
	if (type!=null){
		for(i;i < 3;i++){
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
					if(250 > emissions > 201){
						dataColor="FF431B"
					} 
					if(200 > emissions > 151){
						dataColor="FF7C1B"
					}
					if(150 > emissions > 101){
						dataColor="FFB51B"
					} 
						
					if(100 > emissions > 51){
						dataColor="FFEE1B"
					}
					if(50 > emissions > 0){
						dataColor="D7FF1B"
					}
					else{
						dataColor = "FFFFFF";
					}
			dataArray.push(GHGData.data.result[0].data[2000]);
			dataColorArray.push(dataColor);
			console.log(dataColorArray);
			console.log(dataArray);
		}
	},[GHGData]);
	
	//250-201 => #FF431B
	//200-151 => #FF7C1B
	//150-101 => #FFB51B
	//100-51 => #FFEE1B
	//50-0 => #D7FF1B
//--MAPS--------------------------------------------------------------------------------------------------------

	//getting the map data
	useEffect(() => {
		if(dataArray.len==stateArray.len && dataArray.len > 0 && dataColorArray.len > 0){
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
			<img className="map" src={mapUrl} alt = "static map"/>
			<div className = "data_circle"> 
				<p>{emissions}</p>
			</div>
		</main>
	)
}


export default DisplayMap;
	