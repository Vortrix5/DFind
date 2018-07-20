  		var jargonGen = ["bronchite", "toux" ,"forte", "colique néphrétique",
"vaccin","dépistage","grippe","arthrose", "mal de tête",
"grippe","frileux","migraine "," nausée","fièvre",
"nez qui coule ","nez bouché","yeux rouge","malaise",
"fatigué","digérer mal","gorge","inflammation",
"irritation","courbatures","rhume","yeux qui pique",
"gorge"," fait mal"," j'avale","bronchitis", "cough", "strong", "renal colic",
"vaccine", "screening" ," flu", "osteoarthritis", "headache",
"flu", "chilly", "migraine", "nausea", "fever",
"runny nose", "stuffy nose", "red eyes", "malaise",
"tired", "digest badly", "throat", "inflammation",
"irritation", "aches", "colds", "eyes that sting",
"throat", "hurts", "I swallow"];
        var jargonCardio = ["coeur ","essoufflement","fatigue","artère","artère",
"artère","veine","torse","mal à respirer","mal a respirer",
"thorax","palpitation", "crise cardiaque","cholestérol",
"insuffisance cardiaque",
"hypertension","oedème des jambes",
"tabac","varices","hémorroïdes",
"AVC","diabète","gonflement des pieds",
"transpiration intense", "toux très forte","heart", "shortness of breath", "tiredness", "artery", "artery",
"artery", "vein", "torso", "bad breath", "bad breath",
"thorax", "palpitation", "heart attack", "cholesterol",
"heart failure",
"hypertension", "leg edema",
"Tobacco", "varicose veins", "hemorrhoids",
"Stroke", "diabetes", "swelling of the feet",
"intense sweating", "very strong cough"];
        var jargonAnes = ['Anesthesia'];
        var compteurs = [0,0,0,0];
        var docGen = [];
        var docAnes = [];
        var docCardio = [];

        var docSugestion= [];

      
        document.getElementById('srch').addEventListener('click', lawij);

        function lawij(e){
          e.preventDefault();
          var myNode = document.getElementById("adds");
          while (myNode.firstChild) {
          myNode.removeChild(myNode.firstChild);
          }
          compteurs = [0,0,0,0];
          var keywords = document.getElementById('search').value.split(" ");
          // comparaison entre keyword et les jargons
          // indexof , ta3mel compteur yatla3 3ala kol kilma mawjoud fi keywords
          // w mawjoud fi les jargons, ba3d akthir compteur howa li tikhdim 3lih.
            for (let index = 0; index < keywords.length; index++) {
              if(jargonGen.indexOf(keywords[index])!= -1){ compteurs[0]++};
              if(jargonCardio.indexOf(keywords[index])!= -1){ compteurs[1]++};
              if(jargonAnes.indexOf(keywords[index])!= -1){ compteurs[2]++};
            }
            console.log(compteurs);
            let result = indexOfMax(compteurs);
            console.log(result);
            switch(result){
              case 0: 
                docSugestion = docGen;
                break;
              case 1:
              docSugestion = docCardio;
                break;
              case 2:
              docSugestion = docAnes;
                break;

            }
       		console.log(docSugestion);

            for (let index = 0; index < docSugestion.length; index++) {
              $('#adds').append(`<div class='col-md-4 col-xs-4 col-ms-4'>
          <div class='panel panel-primary'>
          <div class='panel-heading'>${docSugestion[index]["name"]}</div>
          <div class='panel-body'> <center><img src='res/avatar.png' style='border-radius: 300px; width: 150px;'></center>
          <label>Address</label> <p>${docSugestion[index]["address"]}</p> <label>Governorate:</label> <p>${docSugestion[index]["gov"]}</p>
          <label>Email:</label> <p>${docSugestion[index]["email"]}</p> 
          <label>Phone Number:</label> <p>${docSugestion[index]["phone"]}</p> 
          <label>Hours:</label> <p>From ${docSugestion[index]["hoursFrom"]} to ${docSugestion[index]["hoursTo"]}</p> 
          <label>Speciality:</label> <p>${docSugestion[index]["speciality"]}</p>    
          </div> 
          </div> </div>`);
            }
           
        
        }

        function indexOfMax(arr) {
if (arr.length === 0) {
    return -1;
}

var max = arr[0];
var maxIndex = 0;

for (var i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
        maxIndex = i;
        max = arr[i];
    }
}

return maxIndex;
}
 var config = {
    apiKey: "AIzaSyC57ataWWa1RHNwh75u-QqKPajadxp6oJg",
    authDomain: "wizard-90218.firebaseapp.com",
    databaseURL: "https://wizard-90218.firebaseio.com",
    projectId: "wizard-90218",
    storageBucket: "wizard-90218.appspot.com",
    messagingSenderId: "1070532524828"
  };
  firebase.initializeApp(config);
  // setTimeout(tableme,1000);
var doctors="";
  var query = firebase.database().ref("doctors");
function tableme(){
    query.once("value")
      .then(function(snapshot) {
        snapshot.forEach(renderSingleSnapshot);  
  })
    var renderSingleSnapshot = function(singleSnapshot){
        var data = singleSnapshot.val();
         switch(data.speciality){
         	  case "Generalist": 
                docGen.push(data);
                break;
              case "Anesthesiologist":
              docAnes.push(data);
                break;
              case "Cardiologist":
              docCardio.push(data);
                break;
        }
        if(doctors.indexOf(singleSnapshot.key)== -1){
        $("#adds").append(`<div class='col-md-4 col-xs-4 col-ms-4'>
          <div class='panel panel-primary'>
          <div class='panel-heading'>${data.name}</div>
          <div class='panel-body'> <center><img src='res/avatar.png' style='border-radius: 300px; width: 150px;'></center>
          <label>Address</label> <p>${data.address}</p> <label>Governorate:</label> <p>${data.gov}</p>
          <label>Email:</label> <p>${data.email}</p> 
          <label>Phone Number:</label> <p>${data.phone}</p> 
          <label>Hours:</label> <p>From ${data.hoursFrom} to ${data.hoursTo}</p> 
          <label>Speciality:</label> <p>${data.speciality}</p>    
          </div> 
          </div> </div>`)
        doctors+=(singleSnapshot.key);
        

}
      }
    }


$("#gov").change(function(){
		$("#adds").html('')
		query.once("value")
      .then(function(snapshot) {
        snapshot.forEach(function(singleSnapshot) {

        var data = singleSnapshot.val();
        if($("#gov").val()==="All"){      
        console.log("works");  	
        $("#adds").append(`<div class='col-md-4 col-xs-4 col-ms-4'>
          <div class='panel panel-primary'>
          <div class='panel-heading'>${data.name}</div>
          <div class='panel-body'> <center><img src='res/avatar.png' style='border-radius: 300px; width: 150px;'></center>
          <label>Address</label> <p>${data.address}</p> <label>Governorate:</label> <p>${data.gov}</p>
          <label>Email:</label> <p>${data.email}</p> 
          <label>Phone Number:</label> <p>${data.phone}</p> 
          <label>Hours:</label> <p>From ${data.hoursFrom} to ${data.hoursTo}</p> 
          <label>Speciality:</label> <p>${data.speciality}</p>    
          </div> 
          </div> </div>`)
        doctors+=(singleSnapshot.key);

        }else if (data.gov === $('#gov').val()) {
    

        $("#adds").append(`<div class='col-md-4 col-xs-4 col-ms-4'>
          <div class='panel panel-primary'>
          <div class='panel-heading'>${data.name}</div>
          <div class='panel-body'> <center><img src='res/avatar.png' style='border-radius: 300px; width: 150px;'></center>
          <label>Address</label> <p>${data.address}</p> <label>Governorate:</label> <p>${data.gov}</p>
          <label>Email:</label> <p>${data.email}</p> 
          <label>Phone Number:</label> <p>${data.phone}</p> 
          <label>Hours:</label> <p>From ${data.hoursFrom} to ${data.hoursTo}</p> 
          <label>Speciality:</label> <p>${data.speciality}</p>    
          </div> 
          </div> </div>`)
        doctors+=(singleSnapshot.key);
        
		}
})
		        }); 

})
$("#special").change(function(){
		$("#adds").html('')
console.log('here')
		query.once("value")
      .then(function(snapshot) {
        snapshot.forEach(function(singleSnapshot) {

        var data = singleSnapshot.val();
	    if($("#special").val()==="All"){      
        console.log("works");  	
        $("#adds").append(`<div class='col-md-4 col-xs-4 col-ms-4'>
          <div class='panel panel-primary'>
          <div class='panel-heading'>${data.name}</div>
          <div class='panel-body'> <center><img src='res/avatar.png' style='border-radius: 300px; width: 150px;'></center>
          <label>Address</label> <p>${data.address}</p> <label>Governorate:</label> <p>${data.gov}</p>
          <label>Email:</label> <p>${data.email}</p> 
          <label>Phone Number:</label> <p>${data.phone}</p> 
          <label>Hours:</label> <p>From ${data.hoursFrom} to ${data.hoursTo}</p> 
          <label>Speciality:</label> <p>${data.speciality}</p>    
          </div> 
          </div> </div>`)
        doctors+=(singleSnapshot.key);

        }else if (data.speciality === $('#special').val()) {
    
        console.log("ay haja")

        $("#adds").append(`<div class='col-md-4 col-xs-4 col-ms-4'>
          <div class='panel panel-primary'>
          <div class='panel-heading'>${data.name}</div>
          <div class='panel-body'> <center><img src='res/avatar.png' style='border-radius: 300px; width: 150px;'></center>
          <label>Address</label> <p>${data.address}</p> <label>Governorate:</label> <p>${data.gov}</p>
          <label>Email:</label> <p>${data.email}</p> 
          <label>Phone Number:</label> <p>${data.phone}</p> 
          <label>Hours:</label> <p>From ${data.hoursFrom} to ${data.hoursTo}</p> 
          <label>Speciality:</label> <p>${data.speciality}</p>    
          </div> 
          </div> </div>`)
        doctors+=(singleSnapshot.key);
        
		}
})
}); 

})
function findSpec(data) {
	data.speciality.forEach((el) => {
		return el;
	})
}

tableme()
