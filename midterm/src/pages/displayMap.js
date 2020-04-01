//---REACT IMPORTS
import React, {useEffect,useState} from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import Header from "../components/header.js"


//---GHG VARIABLES
 const key = "UcUGqUyJDvEldhwGumvpyxxmNaIRgGRHjJqa8Tde";

// let endpoint = `styles/v1/mapbox/light-v10/static/${lon},${lat},${zoom}/1080x512`;
// const token = "?access_token=pk.eyJ1IjoiY2cyOTg0IiwiYSI6ImNrODRpbnNlbjAwOWczZm8ybXM5azBuZnYifQ.0cD8Ldn1qLXkLW5331lmCg";
// const baseUrl = "https://api.mapbox.com/";
// let mapUrl = baseUrl+endpoint+token;
	
function DisplayMap(){
	let history = useHistory();

	const[year,setYear] = useState("");
	const[type, setType] = useState("");
	const[GHGData, setGHGData] = useState({});
	const[emissions,setEmissions] = useState(0);
	const[usState,setUsState] = useState("");
	const[imgData,setImgData] = useState("");
	const[imgURL,setImgURL] = useState("");
	const[test,setTest] = useState("");
	const[test2,setTest2] = useState("");


	useEffect(() => {
		let mySearchParams = history.location.search;
		let urlParams = new URLSearchParams(mySearchParams);
		let type = urlParams.get('type');
		if(type){
			setType(type);
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
					console.log("request type",type);
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
			setYear(GHGData.data.result[0].start);
			setEmissions(GHGData.data.result[0].data[2000]);
			console.log(emissions,GHGData);
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
			console.log("giphy");
			console.log(response);
			setImgData(response);
			console.log(imgData);
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
		if(imgData.data){
			console.log("loaded");
			if(imgData.data.data[0]){
				console.log("loaded 2");
				console.log(imgData.data.data[0]);
				console.log(imgData.data.data[0].embed_url);
				setImgURL(imgData.data.data[0].embed_url);
				setTest(imgData.data.data[0].embed_url);
			}
		}
	},[imgData]);
	//console.log("test url",test.data[0].embed_url);
	console.log("mytest",test);
	let url = test;


	return(
		<main className = "main">
			<section className = "images">
				<iframe src={url} width="480" height="264" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/jasmyn-total-p-diddy-puff-daddy-xT5LMsI6f133qq5jdm">via GIPHY</a></p>
				
			</section>
			<p className = "description">IN 2017 THE NY <strong>{type}</strong> SECTOR EMITTED <strong>{emissions}</strong> million metric tons of CO2</p>
		</main>
	);
}


export default DisplayMap;