/*
 * Author: Dawood Butt
 * Description: Calendar JS
 */
var dawoodCalendar = dawoodCalendar || {};

//////////////////////////////////////////////////////////////////////////////////////////
//document ready function. 																//
//////////////////////////////////////////////////////////////////////////////////////////
$(document).ready(function(){
	var list = new dawoodCalendar.CalendarList();
	list.insertWeekday('monday');
	list.insertWeekday('TuEsday');
	list.insertWeekday('WEDNESDAY');
	list.insertWeekday('thuRsday');
	list.insertWeekday('friday');

	$('#calendar').append('After adding 5 Weekdays.</br></br>');
	// list has - monday -> TuEsday -> WEDNESDAY -> thuRsday -> friday
	list.showAllWeekdays();

});// End of ready function.

//////////////////////////////////////////////////////////////////////////////////////////
//Function: isValidContent. 															//
//////////////////////////////////////////////////////////////////////////////////////////
dawoodCalendar.isValidContent = function(content) {
	if (content.toLowerCase().trim() == 'monday')
	{
		return true;
	}
	else if (content.toLowerCase().trim() == 'tuesday')
	{
		return true;
	}
	else if (content.toLowerCase().trim() == 'wednesday')
	{
		return true;
	}
	else if (content.toLowerCase().trim() == 'thursday')
	{
		return true;
	}
	else if (content.toLowerCase().trim() == 'friday')
	{
		return true;
	}
	else
	{
		return false;
	}
	
};// End of isValidContent.

//////////////////////////////////////////////////////////////////////////////////////////
// Calendar List Class.																	//
//////////////////////////////////////////////////////////////////////////////////////////
dawoodCalendar.CalendarList = function() {
    this.head = null;
}
dawoodCalendar.CalendarList.prototype = {
    /**
     * inserts a weekday at the tail of the calendar list
     */
    insertWeekday:function(val){
		if (dawoodCalendar.isValidContent(val))
		{
			var item = {
				value:val,
				next:null
			}
		
			if (this.head == null)
			{
				this.head = item;
				return;
			}
			else
			{
				current = this.head;
				while(current.next != null)
				{
					current = current.next;
				}// end of while
				current.next = item;
			}
		}// End of if of isValidContent.
    }, // End of function:insertWeekday

    /**
     * shows all weekdays of the calendar list
     */
    showAllWeekdays:function(){
        if (this.head == null)
		{
			return;
		}
        var current = this.head, i = 1;
        while(current.next != null)
		{
			$('#calendar').append('The weekday at position ' + i + ' has value ' + current.value+'</br>');
            current = current.next;
            i++;
        }
        // printing the last weekday
		$('#calendar').append('The weekday at position ' + i + ' has value ' + current.value+'</br>');
     }// End of function:showAllWeekdays

}//End of Calendar List Class.