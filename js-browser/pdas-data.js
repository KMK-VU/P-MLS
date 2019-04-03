    
class dataframe {
  constructor(raw_data) {
    this.json_data = raw_data;
    this.isDataReady=true;
    this.shape = [];
    this.columns = [];
  }
 
 
 
  
  // read_csv : Function used to read csv file
  read_csv(arg, isfile=true){
   if (isfile){
   
     this.isDataReady = false;
     Papa.parse(arg, {
     header: true,
     dynamicTyping: true,
     complete: function(results) {
	// Execute when parsing is over
	this.json_data = results;
	this.isDataReady=true;
        console.log("Parsing Finished");
	console.log(this.json_data);
      }
    });
	
   }
   else{
 
   }
  }
  
  
  
  
  // show info about the dataframe in the log. Mainly for debugging
  show_log(){
	console.log(this.json_data);
  }
  
}
