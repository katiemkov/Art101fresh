var $creature = $("#creature");
var $status = $("#status");

function setStatus(msg) {
  $status.text(msg);
}

$creature.on("click", function () {
  setStatus("You clicked me! 🐾");
  $creature.css("background", "lavender");
});

$creature.hover(
  function () { setStatus("You’re close... 👀"); },
  function () { setStatus("You left me :("); }
);

$creature.on("dblclick", function () {
  setStatus("You woke me up!! 😳");
  $creature.css("transform", "scale(1.2)");
});

$(document).on("keydown", function (event) {
  setStatus("You pressed: " + event.key);
});

$(document).on("mousemove", function (event) {
  $creature.css({
    left: event.pageX - 60,
    top: event.pageY - 60,
    position: "absolute"
  });
});
