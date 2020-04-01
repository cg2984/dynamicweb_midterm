//---REACT IMPORTS
import React, {useEffect,useState} from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import Header from "../components/header.js"


//---GHG VARIABLES
 const key = "UcUGqUyJDvEldhwGumvpyxxmNaIRgGRHjJqa8Tde";

function DisplayMap(){
	let history = useHistory();

	const[year,setYear] = useState("");
	const[type, setType] = useState("");
	const[GHGData, setGHGData] = useState({});
	const[emissions,setEmissions] = useState(0);
	const[usState,setUsState] = useState("");
	const[imgData,setImgData] = useState("");
	const[imgURL,setImgURL] = useState("");


	useEffect(() => {
		let mySearchParams = history.location.search;
		let urlParams = new URLSearchParams(mySearchParams);
		let type = urlParams.get('type');
		let year = urlParams.get("year");
		if(type){
			setType(type);
		}
		if(year){
			setYear(year);
		}
	},[history]);

	//getting the GHG data 
	useEffect(() => {
		console.log("state",type);
		axios.get(`https://developer.nrel.gov/api/cleap/v1/state_co2_emissions?state_abbr=NY&type=${type}&api_key=${key}`)
			.then(function (response) {
				// handle success
					setGHGData(response);
					console.log(GHGData);
				})
			.catch(function (error) {
				// handle error
				console.log(error);
			})
			.then(function () {
			// always executed
		});
	},[type]);
	
//loading ghg data into variables. without this only a proto object thing will load
	useEffect(() => {
		//must have the .data or else it will give you an error because it wont load properly and it will give undefined error
		if(GHGData.data){
			setEmissions(GHGData.data.result[0].data[year]);
		}
	},[GHGData]);



//--GIPHY--------------------------------------------------------------------------------------------------------
	console.log("test",type);

	//loading map data into variables
	useEffect(() => {
		console.log("inside giphy useState",type);
		axios.get(`https://api.giphy.com/v1/gifs/search?api_key=g1OOW9lkN0JhxAV7khTNRwAiFSG4OTQt&q=${type}&limit=10&offset=0&rating=G&lang=en`)
		.then(function (response) {
			// handle success
			console.log(response);
			setImgData(response);
		})
		.catch(function (error) {
			// handle error
			console.log(error);
		})
		.then(function () {
			//always executed
		});
	},[type]);

	useEffect(() => {
		//random integer generator from MDN docs
		let number = Math.floor(Math.random()*(9-0+1))+0;;
		//need the nested if statements for it to load properly
		if(imgData.data){
			if(imgData.data.data[number]){
				setImgURL(imgData.data.data[number].embed_url);
			}
		}
	},[imgData]);
	let url = imgURL;


	return(
		<main className = "main">
			<section className = "images">
				<iframe src={url} width="720" height="396" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href={url}>via GIPHY</a></p>	
			</section>
			<p className = "description">IN 2017 THE NY <strong>{type}</strong> SECTOR EMITTED <strong>{emissions}</strong> million metric tons of CO2</p>
		</main>
	);
}


export default DisplayMap;