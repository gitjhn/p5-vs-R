 
 function loadJSON(url, callback) {   

    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open('GET', url, true); 
        xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
          // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
          var response = JSON.parse(xobj.responseText);
          callback(response);
        }
    };
    xobj.send(null);  
 }
 
