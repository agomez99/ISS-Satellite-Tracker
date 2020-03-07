$(document).ready(function(){


//LAST FIVE DAYS APOD
var space = "https://api.nasa.gov/planetary/apod?api_key=CScJj85NGTPLG7hllUbm393T3rjnQO8ke11aHB2m&start_date=2020-03-02&end_date=2020-03-02"

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




  $.ajax({
    url: cords,
    method: "GET"
  }).then(function(response) {
    // create a element
    //console.log(response.positions[0].satlatitude);
    // add this element to the body
    $("#stat1").html("latitude " + response.positions[0].satlatitude);
    $("#stat2").html("longitude " + response.positions[0].satlongitude);


    
  });





})