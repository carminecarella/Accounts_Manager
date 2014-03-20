function convertDate (inputDate) {
	//var date = new Date(parseInt(inputDate.substr(6)));
	var date = new Date(inputDate);
	var formatted = date.getFullYear() + " - " + 
						("0" + (date.getMonth() + 1)).slice(-2) + " - " + 
						("0" + date.getDate()).slice(-2); 
						//+ " " + date.getHours() + ":" + 
						//date.getMinutes();
	return formatted;
};