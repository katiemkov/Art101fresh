var count = 0;
let colorCount = 0;
var colors = ["Orchid", "Coral", "HotPink", "Plum"];


function makeImage (imageName) {

 if (colors[colorCount] == imageName) {
       $("body").append("<img width=50 src='imgs/flower.jpg'" + imageName + ".png'>");
   }

}

function changeBackground (newColor) {
   $("body").css("background-color", newColor);
 }

$(".color-button").click( function () {
 
   changeBackground(this.id);

});

$(function(){
  
   const css = `#countdown-timer{position:fixed;right:12px;top:12px;background:rgba(255,255,255,0.9);padding:6px 10px;border-radius:6px;font-weight:700;z-index:9999}
   @keyframes explodeAnim{0%{transform:scale(1) rotate(0);opacity:1}100%{transform:scale(2) rotate(60deg);opacity:0}}
   .explode{animation:explodeAnim .7s ease-out forwards}`;
   $("head").append($('<style>').text(css));


   const $timer = $('<div id="countdown-timer">60</div>');
   $('body').append($timer);

   let timeLeft = 60;

   function explodeFlowers() {
      $('img').filter(function(){ var s = $(this).attr('src')||''; return s.indexOf('flower.jpg') !== -1; }).each(function(){
         var $img = $(this);
         $img.addClass('explode');
         setTimeout(function(){ $img.remove(); }, 800);
      });
   }

   function tick() {
      timeLeft -= 1;
      $timer.text(timeLeft);
      if (timeLeft <= 0) {
         clearInterval(intervalId);
         explodeFlowers();
      }
   }

   const intervalId = setInterval(tick, 1000);
});


function moody (moodyCount){
   let mood="";
   if (moodyCount < 5) { mood = "gresh and happy"; }
   else if ((moodyCount >= 5) && (moodyCount < 10)) { mood = "keep pushing"; }
   else { mood = "so tired"; }

   return mood;
}

// the button part
$("#needy-button").click(function () {

// move the mood deciding code outside as a seperate function and then call it from here, and use the result of the function for the button message
   let moodMessage=moody(count);

   $("#needy-button").html("Clicks: " + count + " Color: " + colors[colorCount] + " " + moodMessage);

   changeBackground( colors[colorCount] );

   makeImage("Coral"); 
   makeImage("Orchid"); 
   makeImage("Plum"); 


   count = count + 1;
   colorCount = colorCount + 1;
   if (colorCount == 4) { colorCount = 0; }
});

$(".color-button").click( function () {
 
   changeBackground(this.id);

});