const json2csv = function(json) {
	json = json.trim();
	if(json.startsWith("{")) json = json.substring(1);
	if(json.endsWith("}")) json = json.substring(0, json.length - 1 );

	if(json == "") {
		$('.input .error').css("color","white");
		$('.output .text').val("");
	}
	else {
		$('.input .error').css("color","black");
	}

	try {
		JSON.parse(json); 
	} 
	catch(err) {
		$('.input .error').css("color","white");
		$('.output .text').val("");
	}

	var arr = JSON.parse(json);
			
	var csv = "";
	for(i=0; i<arr.length ; i++) {
		if(typeof arr[i] == Array) {
			for(index = 0; index < arr[i].length; index++) {
				csv += arr[i][index] ;

				if(index + 1 < arr[i].length) csv += ",";
			}
			csv += " \n";
		}
		else {
			csv += arr[i];

			if(i + 1 < arr.length) csv += " \n";
		}
	}
	return csv;
}


$('.convert').click(function() {
	var str = $('.input .text').val();
			
	var csv = json2csv(str);

	$('.output .text').val(csv);
});

$('.clear').click(function() {
	$('.text').val("");
});