/**
 * @author Dawood Butt
 * @description Function that determines if a string starts with an upper-case letter A-Z (UC)
 * @project upper Case (UC)
 */
var HELPSCOUT = HELPSCOUT || {};
HELPSCOUT.UC = {};
HELPSCOUT.UC = {
			Models: {},
			Collections: {},
			Views: {},
			Events: {},
			Constants: {},
			Variables: {},
			Functions: {}
		};

/////////////////////////////////////////////////////////////
//Function: isFirstUpperCase.							   //
/////////////////////////////////////////////////////////////
HELPSCOUT.UC.Functions.isFirstUpperCase = function(string) {
    var stringMatch = string.match(/^[A-Z]/);

	if  ( stringMatch != null ) {
	    return true;
	}else{
		return false;
	}
};// End of isFirstUpperCase.
