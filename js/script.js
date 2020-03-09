const json2csv = function(json) {
	json = json.trim();

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

$('.open').click(function() {
	var file  = document.getElementById('read').files.item(0);

	if(!file) {
		return
	}
	else {
		var reader = new FileReader();

		reader.onload = function(e) {
			$('.input .text').val(e.target.result);
		}

		reader.readAsText(file);
	}
});

$('.save').click(function() {
	var text = $('.output .text').val();
	var blob = new Blob([text],{type:'csv'});
	var anchor = document.createElement('a');

	anchor.download = 'file.csv';
	anchor.href = (window.webkitURL || window.URL).createObjectURL(blob);
	anchor.dataset.downloadurl = ['text/plain', anchor.download, anchor.href].join(':');
	anchor.click();
});
