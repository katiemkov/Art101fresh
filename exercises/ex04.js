let count = 0;
let colorIndex = 0;
let mood;
let colors = ["Orchid", "Coral", "HotPink", "Plum"];
$("#needy-button").click(function () {

   if (count < 5) { mood = "fresh and happy"; }
   else if ((count >= 5) && (count < 10)) { mood = "keep pushing"; }
   else { mood = "so tired!"; }

   $("#needy-button").html("Clicks: " + count + " Color: " + colors[colorIndex] + " - " + mood);
   $("body").css("background-color", colors[colorIndex]);

$("body").append("<img width='100' src='here'" + (count * 10) + "px;' />");

   count = count + 1;

   colorIndex = colorIndex + 1;

   if (colorIndex == 4) { colorIndex = 0; } 
});
