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

	list.removeWeekday('thuRsday');
	$('#calendar').append('</br></br>After removing thuRsday from the list.</br></br>');
	// list is now - monday -> TuEsday -> WEDNESDAY -> friday
	list.showAllWeekdays();

	list.insertWeekdayAtNthPositionFromHead(3, 'FRIDAY');
	$('#calendar').append('</br></br>After adding FRIDAY at position 3.</br></br>');
	// list is now - monday -> TuEsday -> FRIDAY -> WEDNESDAY -> friday
	list.showAllWeekdays();

	//This "removeWeekday" function has it's limitation:
	//It's starts searching from head to tail of the list.
	//As soon as it will find the criteria, than it will delete that weekday.
	//and will not try to search again, on the remaining values.
	list.removeWeekday('firdaY');
	$('#calendar').append('</br></br>After removing firdaY from the list.</br></br>');
	// list is now - monday -> TuEsday -> WEDNESDAY -> friday
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
		 },// End of function:showAllWeekdays

		/**
		* removes any Weekday from the list
		*/
		removeWeekday:function(val){
			if (dawoodCalendar.isValidContent(val))
			{
				var current, temp;
				if (this.head == null)
				{
					throw new Error('there are no Weekdays to remove');
				}
				else if (this.head.value == val)
				{
					this.head = this.head.next;
				}
				else
				{
					current = this.head;
					while(current != null)
					{
						if (current.next.value == val)
						{
							temp = current.next.next;
							current.next = temp;
							return;
						}
						current = current.next;
					}// End of While loop.
				}
			}// End of if of isValidContent.
		}, // End of function:removeWeekday

		/**
		* inserts a Weekday at nth position from head
		*/
		insertWeekdayAtNthPositionFromHead:function(n, val){
			if (dawoodCalendar.isValidContent(val))
			{
				var item = {
					value:val,
					next:null
				}, current = this.head, i = 1, temp;
	
				while(current.next != null)
				{
					if (i == n-1)
					{
						// insert new Weekday at this position
						temp = current.next;
						current.next = item;
						item.next = temp;
					}
					current = current.next;
					i++;
				}
			}// End of if of isValidContent.
		}// End of function:insertWeekdayAtNthPositionFromHead

}//End of Calendar List Class.