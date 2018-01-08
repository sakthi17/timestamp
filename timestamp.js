var express = require('express')
var app = express();

app.get('/:inputDate',function(req,res){
  var inputDate = req.params.inputDate; 
  var isUnixInput = false;
  var unix = "";
  
  if( Number(inputDate) ){ 
    isUnixInput = true;
    unix = Number(inputDate);
  }  
  
  var datestr = isUnixInput ? unix * 1000 : inputDate; 
  var date = new Date(datestr);
      
  if( isNaN(date.valueOf()) ){  
    var outputDate = { 
      unix    : null , 
      natural : null
    };
    res.send(outputDate);
  }
  else if( isUnixInput ){
   // inputDate is unix    
    var outputDate = {
      unix     :  inputDate,
      natural  :  date.toDateString().split(' ').slice(1).join(' ')
    };
    res.send(outputDate); 
  }
  else{
    // inputDate is natural date
    var outputDate = {
      unix    : date.valueOf() / 1000 ,
      natural : inputDate
    };
    res.send(outputDate);
  } 
});

module.exports = app;

