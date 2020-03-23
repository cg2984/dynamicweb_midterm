import React, {useEffect,useState} from 'react';
import axios from 'axios';
const userName = "cg2984"
let profile = "";
let coordinates = "";
let endpoint = `styles/v1/mapbox/light-v10/static/-70.7008,42.5256,5.34/300x200`;
const token = "?access_token=pk.eyJ1IjoiY2cyOTg0IiwiYSI6ImNrN3o1N2FyaDAyYXMzZHBhbzZmank4cHYifQ.37Jvq7DeUfOCzyd92K33hw";
const baseUrl = "https://api.mapbox.com/"
let mapUrl = baseUrl+endpoint+token


	
function Maps() {
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


export default Maps;