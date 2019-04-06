
class dataframe {


	constructor() {
		this.json_data = {};
		this.isDataReady=false;
		this.shape = {};
		this.columns = {};
	}

	/////////////////////////////////////////////////////////////////
	// read_csv : Function used to read big csv file  (streaming) //
	///////////////////////////////////////////////////////////////
	read_csv(arg){

		// Parsing papaparse data to the core data structures
		var result = {};
		var to_json = function to_json(papaparse){
			var indices = Object.keys(papaparse);
			var x = new Array(indices.length);
			var columns = Object.keys(papaparse[0]);
			x[0] = columns;
			for (var i = 1 ; i<indices.length; i++){
				var values = new Array(columns.length);
				for (var j = 0 ; j<columns.length; j++){
					values[j] = papaparse[i][columns[j]];
				}
				x[i] = values;
			};
		result["Sheet1"] = x;
		return result;
		};

		this.isDataReady = false;
		var self = this;
		Papa.parse(arg, { header: true, download:true, dynamicTyping: true,
      delimitersToGuess: [',', '\t', '|', ';', Papa.RECORD_SEP, Papa.UNIT_SEP]
}


		complete:function(results){self._update_data(to_json(results.data));}});

	}

	///////////////////////////////////////////////////////////////////////////////////
	// read_excel : Function used to read excel file small to medium excel/csv file //
	/////////////////////////////////////////////////////////////////////////////////
	read_excel(arg){
		this.isDataReady = false;
		// Parsing workbook result to the core data structure
		var to_json = function to_json(workbook) {
		var result = {};
		workbook.SheetNames.forEach(function(sheetName) {
			var roa = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {header:1});
			if(roa.length) result[sheetName] = roa;
		});
		return result;
		};
		var self = this;
		var reader = new FileReader();
		reader.onload = function(e) {
		var data = e.target.result;
		var converted = XLSX.read(data, {type : 'binary'});
		self._update_data(to_json(converted));
		};
		reader.readAsBinaryString(arg);
	}

	//////////////////////////////////////////////////////////////////////////////////////////
	// _update_data : Function used to update data structure when parsing task is finished //
	////////////////////////////////////////////////////////////////////////////////////////
	_update_data(json_object){
		var sheetnames = Object.keys(json_object);
		this.json_data = {};
		this.columns = {};
		this.shape = {};
		for (var i=0; i<sheetnames.length; i++){
			var sheetname = sheetnames[i]
			this.columns[sheetname] = json_object[sheetname][0]
			json_object[sheetname].shift();
			this.json_data[sheetname] = json_object[sheetname];
			this.shape[sheetname] = [this.json_data[sheetname].length,this.columns[sheetname].length];
		}
		this.isDataReady = true;
		console.log("Data updated");
	}




	/////////////////////////////////////////////////////////////////////
	// show info about the dataframe in the log. Mainly for debugging //
	///////////////////////////////////////////////////////////////////
	show_log(){
		console.log("data: ",this.json_data);
		console.log("variables: ",this.columns);
		console.log("shapes: ",this.shape);
	}

}
