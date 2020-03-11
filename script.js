$(document).ready(function(){

//LAST FIVE DAYS APOD
var space = "https://api.nasa.gov/planetary/apod?api_key=CScJj85NGTPLG7hllUbm393T3rjnQO8ke11aHB2m&start_date=2020-03-03&end_date=2020-03-08"

//TODAY APOD
var space2 = "https://api.nasa.gov/planetary/apod?api_key=CScJj85NGTPLG7hllUbm393T3rjnQO8ke11aHB2m"
//ISS Future positions
var cords = "https://www.n2yo.com/rest/v1/satellite/positions/25544/41.702/-76.014/0/300/&apiKey=AFQ4CY-H89EGX-EFBHPT-4BII"

$.ajax({
    url: space2,
    method: "GET"
  }).then(function(response) {
    $("#spaceTitle").html(response.title);
    $("#Sdate").html(response.date);
    $("#info").html(response.explanation);
    $("#spaceImg").attr("src",response.url);
  });

  $.ajax({
    url: cords,
    method: "GET"
  }).then(function(response) {

	$("#satName").html("Satelite Name: " + response.info.satname);


//LAST FIVE DAYS APOD
var space = "https://api.nasa.gov/planetary/apod?api_key=CScJj85NGTPLG7hllUbm393T3rjnQO8ke11aHB2m&"

var cords = "https://www.n2yo.com/rest/v1/satellite/positions/25544/41.702/-76.014/0/300/&apiKey=AFQ4CY-H89EGX-EFBHPT-4BII"



$.ajax({
    url: space,
    method: "GET"
  }).then(function(response) {
    // create a element
    console.log(response[0]);
    // add this element to the body
    $("#spaceTitle").html(response[0].title);
    $("#Sdate").html(response[0].date);
     $("#info").html(response[0].explanation);
    $("#spaceImg").attr("src",response[0].url);

    
  });

$("#satName").html("Satelite Name: " + response.info.satname);


    for (i in response.positions) {
    y = response.positions[i].satlatitude;
    x = response.positions[i].satlongitude;
//$("#stat1").html("latitude: " + y);
//$("#stat2").html("longitude: "+x);


}
var times = response.positions[0].timestamp;
var ts = times;
var ts_ms = ts * 1000;
var date_ob = new Date(ts_ms);
var year = date_ob.getFullYear();
var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
var date = ("0" + date_ob.getDate()).slice(-2);
var hours = ("0" + date_ob.getHours()).slice(-2);
var minutes = ("0" + date_ob.getMinutes()).slice(-2);
var seconds = ("0" + date_ob.getSeconds()).slice(-2);

$("#timeStamp").html("time stamp "  + year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds);
  });

})

   



