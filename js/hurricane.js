/*
 * Author: Dawood Butt
 * Description: Parsing hurricane data JS
 */

var dawoodHurricaneAlgo = dawoodHurricaneAlgo || {};

dawoodHurricaneAlgo.hurricaneFileName = "hurdat2-nencpac-1949-2012-040513.txt";
dawoodHurricaneAlgo.season = "2009";

//Given to find the data for: [Eastern North Pacific region]
dawoodHurricaneAlgo.basin = "EP,CP";	//[EP – Northeast Pacific], [CP – North Central Pacific]
dawoodHurricaneAlgo.latitudeHemisphere = "N,S"; //[N - North], [S - South]
dawoodHurricaneAlgo.longitudeHemisphere = "W,E"; //[W - West], [E - East]
dawoodHurricaneAlgo.seasonLines = [];

//////////////////////////////////////////////////////////////////////////////////////////
//Function: binarySerch Algorithm.														//
//////////////////////////////////////////////////////////////////////////////////////////
dawoodHurricaneAlgo.binarySerch = function(arr, searchElement) {
	var minIndex = 0;
	var maxIndex = arr.length - 1;
	var currentIndex;
	var currentElement;
	
	while (minIndex <= maxIndex)
	{
		currentIndex = (minIndex + maxIndex) / 2 | 0;
		currentElement = arr[currentIndex];

		if (currentElement < searchElement)
		{
			minIndex = currentIndex + 1;
		}
		else if (currentElement > searchElement)
		{
			maxIndex = currentIndex - 1;
		}
		else
		{
			return currentIndex;
		}
	}
	return -1;
};// End of binarySerch.

//////////////////////////////////////////////////////////////////////////////////////////
//Function: knotsIntoKMperHour.															//
//////////////////////////////////////////////////////////////////////////////////////////
dawoodHurricaneAlgo.knotsIntoKMperHour = function(knots) {
		return (1.852*knots).toFixed(2);
};// end of knotsIntoKMperHour.

//////////////////////////////////////////////////////////////////////////////////////////
//Function: optionsIntoName.															//
//////////////////////////////////////////////////////////////////////////////////////////
dawoodHurricaneAlgo.optionsIntoName = function(option) {
	if (option == "TD")
	{
		return "Tropical cyclone of tropical depression intensity";
	}
	else if (option == "TS")
	{
		return "Tropical cyclone of tropical storm intensity";
	}
	else if (option == "HU")
	{
		return "Tropical cyclone of hurricane intensity";
	}
	else if (option == "EX")
	{
		return "Extratropical cyclone";
	}
	else if (option == "SD")
	{
		return "Subtropical cyclone of subtropical depression intensity";
	}
	else if (option == "SS")
	{
		return "Subtropical cyclone of subtropical storm intensity";
	}
	else if (option == "LO")
	{
		return "A low that is neither a tropical cyclone, a subtropical cyclone, nor an extratropical cyclone";
	}
	else if (option == "DB")
	{
		return "Disturbance (of any intensity)";
	}
	else
	{
		return "";
	}
};// End of optionsIntoName.



//////////////////////////////////////////////////////////////////////////////////////////
//document ready function. 																//
//////////////////////////////////////////////////////////////////////////////////////////
$(document).ready(function(){
	//var arr = [0, 1, 2, 4, 5, 6, 6.5, 7, 8, 9];
	//document.body.textContent = dawoodHurricaneAlgo.binarySerch (arr, 3);
});// End of ready function.


//////////////////////////////////////////////////////////////////////////////////////////
//Function: parseHurricaneData. 														//
//////////////////////////////////////////////////////////////////////////////////////////
dawoodHurricaneAlgo.parseHurricaneData = function(data) {
	var lines = data.split("\n");
	var hurricaneBasin = '';

	for (var lineNumber in lines)
	{
		if (lines[lineNumber].split(',').length <=4 )
		{
			var headerLineArray = lines[lineNumber].split(',');
			hurricaneBasin = headerLineArray[0].slice(0,2).trim();
			//var cycloneNumber = headerLineArray[0].slice(2,4).trim();
			//var cycloneYear = headerLineArray[0].slice(4,8).trim();
			////var name = headerLineArray[1].trim();
			////var bestTrackEntries = parseInt(headerLineArray[2].trim());
		}
		else
		{
			var dataLinesArray = lines[lineNumber].split(',');
			var trackYear = dataLinesArray[0].slice(0,4).trim();
			var statusOfSystem = dataLinesArray[3].trim();
			var hurricaneLatHemisphere = dataLinesArray[4].slice(5,6).trim();
			var hurricaneLongHemisphere = dataLinesArray[5].slice(6,7).trim();

			var stormName = dawoodHurricaneAlgo.optionsIntoName(statusOfSystem);
			var maxSustainedWind = dawoodHurricaneAlgo.knotsIntoKMperHour(dataLinesArray[6].trim().trim());
			var minPressure = dataLinesArray[7].trim().trim();
			var isPush = false;

			if (trackYear == dawoodHurricaneAlgo.season)
			{
				isPush = true;
				if (dawoodHurricaneAlgo.basin != "")
				{
					if (dawoodHurricaneAlgo.basin.indexOf(hurricaneBasin) == -1)
					{
						isPush = false;
					}
				}
				if (dawoodHurricaneAlgo.latitudeHemisphere != "")
				{
					if (dawoodHurricaneAlgo.latitudeHemisphere.indexOf(hurricaneLatHemisphere) == -1)
					{
						isPush = false;
					}
				}
				if (dawoodHurricaneAlgo.longitudeHemisphere != "")
				{
					if ( dawoodHurricaneAlgo.longitudeHemisphere.indexOf(hurricaneLongHemisphere) == -1 )
					{
						isPush = false;
					}
				}
			}

			if (isPush)
			{
				dawoodHurricaneAlgo.seasonLines.push({ StormName : stormName, MaxSustainedWind : maxSustainedWind, MinPressure: minPressure });
			}
		}
	}// End of for loop for lines.

	$('#hurricane').append('<b>'+dawoodHurricaneAlgo.seasonLines.length+'</b> storms in <b>'+dawoodHurricaneAlgo.season+'</b> season.</br></br>');
	for (var id in dawoodHurricaneAlgo.seasonLines)
	{
		$('#hurricane').append('<b>Storm Name:</b> '+dawoodHurricaneAlgo.seasonLines[id]['StormName']+'.</br>'
							+'<b>Maximum Sustained Surface Windspeed:</b> '+dawoodHurricaneAlgo.seasonLines[id]['MaxSustainedWind']+' km/h.</br>'
							+'<b>Minimum Pressure:</b> '+dawoodHurricaneAlgo.seasonLines[id]['MinPressure']+' (millibars).</br></br>');
	}// End of for loop for dawoodHurricaneAlgo.seasonLines.
};// End of parseHurricaneData.

///////////////////////////////////////////////////////////////////////////////////////////////
//get Method is using to read the data from the "hurdat2-nencpac-1949-2012-040513.txt" file. //
///////////////////////////////////////////////////////////////////////////////////////////////
$.get(dawoodHurricaneAlgo.hurricaneFileName ,function(data,status){
	if (status == "success")
	{
		dawoodHurricaneAlgo.parseHurricaneData(data);
	}
	else
	{
		$('#hurricane').html(status);
	}
}).fail(function() {
    $('#hurricane').html('hurdat2-nencpac-1949-2012-040513.txt file is missing or you are not running this application under server environment.');
  });// End of $.get