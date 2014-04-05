/*
 * Author: Dawood Butt
 * Description: String reversal JS
 */
var dawoodStringReversal = dawoodStringReversal || {};

//////////////////////////////////////////////////////////////////////////////////////////
//Function: binarySerch Algorithm.														//
//////////////////////////////////////////////////////////////////////////////////////////
dawoodStringReversal.martiansWords = function(earthlingsWords) {
    //return earthlingsWords.split("").reverse().join("");
	var martiansWords = [];
	for (var i = 0, len = earthlingsWords.length; i <= len; i++)
	{
		martiansWords.push(earthlingsWords.charAt(len - i));
	}
	return martiansWords.join('');
};// End of reversal.

//////////////////////////////////////////////////////////////////////////////////////////
//document ready function. 																//
//////////////////////////////////////////////////////////////////////////////////////////
$(document).ready(function(){

	//////////////////////////////////////////////////////////////////////////////////////////
	//Function: Reversal Button. 															//
	//////////////////////////////////////////////////////////////////////////////////////////
	$('#reversal').click(function () {
		var earthlingsWords = $('#ewords').val();
		$('#mwords').html(dawoodStringReversal.martiansWords(earthlingsWords));
	});// End of Reversal Button.

});// End of ready function.