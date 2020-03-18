import React, {useEffect,useState} from 'react';
import axios from 'axios';
const key = "UcUGqUyJDvEldhwGumvpyxxmNaIRgGRHjJqa8Tde";

	
function Home() {
	// Make a request for a user with a given ID
	axios.get(`https://developer.nrel.gov/api/building-case-studies/project.json?api_key=${key}&province=NY`)
	  .then(function (response) {
	    // handle success
	    console.log(response);
	    console.log("success");
	  })
	  .catch(function (error) {
	    // handle error
	    console.log(error);
	  })
	  .then(function () {
	    // always executed
	});
  return (
    <div>
    	<p> my home page </p>
    </div>
  );
}


export default Home;
	