    
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
     var self = this;
     Papa.parse(arg, {
     header: true,
     dynamicTyping: true,
     complete: function(results) {
	self._update_data(results);
      }
    });
	
   }
   else{
 
   }
  }
  
   // _update_data : Function used to update data structure when parsing task is finished
  _update_data(json_object){
  this.json_data = json_object;
  this.isDataReady = true;
  console.log("Data updated");
  }
  
  
  // show info about the dataframe in the log. Mainly for debugging
  show_log(){
	console.log(this.json_data);
  }
  
}
