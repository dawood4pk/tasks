/*
 * Author: Dawood Butt
 * Description: Flatten array JS
 */
var dawoodFlattenArray = dawoodFlattenArray || {};
dawoodFlattenArray.flattenArray = [];

//////////////////////////////////////////////////////////////
//Function: isArray.									   //
//Dawood: In Case: if Array.isArray not natively available.//
/////////////////////////////////////////////////////////////
if (!Array.isArray) {
  Array.isArray = function(arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
  };
}// End of isArray.

//////////////////////////////////////////////////////////////
//Function: flatten.									   //
/////////////////////////////////////////////////////////////
dawoodFlattenArray.flatten = function( nestedArrays ) {
	var nestedArraysLength = nestedArrays.length;
	for ( var i = 0; i < nestedArraysLength; i++ ) {
		if( Array.isArray( nestedArrays[i] ) )
		{
			dawoodFlattenArray.flatten( nestedArrays[i] );
		}
		else
		{
			dawoodFlattenArray.flattenArray.push( nestedArrays[i] );
		}
	}
};// End of flatten.

//////////////////////////////////////////////////////////////
//document ready function. 									//
//////////////////////////////////////////////////////////////
$(document).ready(function(){

	//////////////////////////////////////////////////////////////
	// Function: Flatten Array Button. 								//
	//////////////////////////////////////////////////////////////
	$('#flatten').click(function () {
		try
		{
			var nestedArrays =  JSON.parse( $('#nestedarrays').val() );
			if ( nestedArrays && typeof nestedArrays === "object" && nestedArrays !== null )
			{
				dawoodFlattenArray.flatten( nestedArrays );
				$('#flattenarray').html( 'Flatten Array: '+dawoodFlattenArray.flattenArray );
				dawoodFlattenArray.flattenArray = [];
			}
			else
			{
				$('#flattenarray').html( 'Error:Not a valid array' );
			}
		}
		catch ( e )
		{
			$('#flattenarray').html( e );
		}

	});// End of Flatten Array Button.

});// End of ready function.