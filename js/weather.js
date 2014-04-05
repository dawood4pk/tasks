/*
 * Author: Dawood Butt
 * Description: Computing weather data JS
 */
var dawoodWeatherAlgo = dawoodWeatherAlgo || {};

dawoodWeatherAlgo.weatherFileName = "weather.dat";
dawoodWeatherAlgo.weatherDataHeader = [];
dawoodWeatherAlgo.weatherDataLines = [];

//////////////////////////////////////////////////////////////////////////////////////////
//Function: countStartBlanks. 															//
//////////////////////////////////////////////////////////////////////////////////////////
dawoodWeatherAlgo.countStartBlanks = function(arg) {
	return arg.match(/^ */)[0].length;
	var i = 0;
	while (i < arg.length && arg[i] === ' ')
	{
		i++;
	}
	return i;
};// End of countStartBlanks.

//////////////////////////////////////////////////////////////////////////////////////////
//Function: parseWeatherData. 															//
//////////////////////////////////////////////////////////////////////////////////////////
dawoodWeatherAlgo.parseWeatherData = function(data) {
	var lines = data.split("\n");
	var headerLine = lines[0].trim().split(" ");

	var spaceCounter = dawoodWeatherAlgo.countStartBlanks(lines[0])+1;

	for (var i = 0, len = headerLine.length; i < len; i++)
	{
		if (headerLine[i].trim() !== "")
		{
			if (i < headerLine.length)
			{
				for (var j = i+1, len = headerLine.length; j < len; j++)
				{
					if (headerLine[j] == "")
					{
						spaceCounter = spaceCounter+1;
					}
					else
					{
						break;
					}
				}
			}
			dawoodWeatherAlgo.weatherDataHeader.push({ title : headerLine[i].trim(), space : spaceCounter });
			spaceCounter = 1;
		}
	}

	for (var i = 2, len = lines.length; i < len-2; i++)
	{
		var linePosition = 0;
		if (lines[i].trim() != "")
		{
			for (var idHeader in dawoodWeatherAlgo.weatherDataHeader)
			{
				var headingPosition = parseInt(dawoodWeatherAlgo.weatherDataHeader[idHeader]['title'].length) + parseInt(dawoodWeatherAlgo.weatherDataHeader[idHeader]['space']);
				if (idHeader == dawoodWeatherAlgo.weatherDataHeader.length-1)
				{
					if (typeof(dawoodWeatherAlgo.weatherDataLines[i]) != "undefined")
					{
						dawoodWeatherAlgo.weatherDataLines[i] = dawoodWeatherAlgo.weatherDataLines[i]+','+lines[i].slice(linePosition-1,linePosition+headingPosition-1).trim();
					}
					else
					{
						dawoodWeatherAlgo.weatherDataLines[i] = lines[i].slice(linePosition-1,linePosition+headingPosition-1).trim();
					}
					
				}
				else
				{
					if (typeof(dawoodWeatherAlgo.weatherDataLines[i]) != "undefined")
					{
						dawoodWeatherAlgo.weatherDataLines[i] = dawoodWeatherAlgo.weatherDataLines[i]+','+lines[i].slice(linePosition,linePosition+headingPosition-1).trim();
					}
					else
					{
						dawoodWeatherAlgo.weatherDataLines[i] = lines[i].slice(linePosition,linePosition+headingPosition-1).trim();
					}
				}
				linePosition = linePosition+headingPosition;
			}// End of Inner For loop (Read the Header to get the positions of each line).

		}//End of If line is not empty.
	}// End of outer for loop. Line to line parsing.

	var DayNumber,MaxTemp,MinTemp,AvgTemp;
	for (var id in dawoodWeatherAlgo.weatherDataLines)
	{
		if (typeof(DayNumber) != "undefined")
		{
			DayNumber =  DayNumber+','+dawoodWeatherAlgo.weatherDataLines[id].split(',')[0].replace("*","").trim();
		}
		else
		{
			DayNumber =  dawoodWeatherAlgo.weatherDataLines[id].split(',')[0].replace("*","").trim();
		}
		
		if (typeof(MaxTemp) != "undefined")
		{
			MaxTemp = MaxTemp+','+dawoodWeatherAlgo.weatherDataLines[id].split(',')[1].replace("*","").trim();
		}
		else
		{
			MaxTemp = dawoodWeatherAlgo.weatherDataLines[id].split(',')[1].replace("*","").trim();
		}
		
		if (typeof(MinTemp) != "undefined")
		{
			MinTemp = MinTemp+','+dawoodWeatherAlgo.weatherDataLines[id].split(',')[2].replace("*","").trim();
		}
		else
		{
			MinTemp = dawoodWeatherAlgo.weatherDataLines[id].split(',')[2].replace("*","").trim();
		}
		
		if (typeof(AvgTemp) != "undefined")
		{
			AvgTemp = AvgTemp+','+dawoodWeatherAlgo.weatherDataLines[id].split(',')[3].replace("*","").trim();
		}
		else
		{
			AvgTemp = dawoodWeatherAlgo.weatherDataLines[id].split(',')[3].replace("*","").trim();
		}
	}

	var DayNumberArray = DayNumber.split(',');
	var MaxTempArray = MaxTemp.split(',');
	var MinTempArray = MinTemp.split(',');
	var AvgTempArray = AvgTemp.split(',');

	//Math.max.apply(Math,AvgTempArray);
	//alert(Math.min.apply(Math,AvgTempArray));
	//var index = AvgTempArray.indexOf(lowest.toString());

	var lowestMaxTempArray = Math.min.apply(Math, MaxTempArray);		
	var indexMaxTempArray = jQuery.inArray(lowestMaxTempArray.toString(), MaxTempArray);
	
	var lowestMinTempArray = Math.min.apply(Math, MinTempArray);		
	var indexMinTempArray = jQuery.inArray(lowestMinTempArray.toString(), MinTempArray);
	
	var lowestAvgTempArray = Math.min.apply(Math, AvgTempArray);		
	var indexAvgTempArray = jQuery.inArray(lowestAvgTempArray.toString(), AvgTempArray);
	
	$('#weather').append('Day: <b>'+DayNumberArray[indexMaxTempArray]+'</b> have the smallest temperature spread based on the MxT column.</br>');
	$('#weather').append('Day: <b>'+DayNumberArray[indexMinTempArray]+'</b> have the smallest temperature spread based on the MnT column.</br>');		
	$('#weather').append('Day: <b>'+DayNumberArray[indexAvgTempArray]+'</b> have the smallest temperature spread based on the AvT column. (What I think this will answer your question.)');

};// End of parseWeatherData.

//////////////////////////////////////////////////////////////////////////////////////////
//$.get: get Method is using to read the data from the "weather.dat" file. 		    	//
//////////////////////////////////////////////////////////////////////////////////////////
$.get(dawoodWeatherAlgo.weatherFileName ,function(data,status){
	if (status == "success")
	{
		dawoodWeatherAlgo.parseWeatherData(data);
	}
	else
	{
		$('#weather').html(status);
	}
}).fail(function() {
    $('#weather').html('weather.dat file is missing or you are not running this application under server environment.');
  });// End of $.get