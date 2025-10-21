let count = 0;
let colors = ["Orchid", "Coral", "HotPink", "Plum"]; // new line tp add

$("#needy-button").click(function () {

    let reminder = count % colors.length; 

    $("#needy-button").html( "Clicks: " + count + " Color: " + colors[count] ); 
   // new line tp add

    count = count + 1;

$("body").css 
("background-color", colors[reminder]);

});

