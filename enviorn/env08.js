var elements = ['fire','water','earth','air'];
var locations = ['your room','classroom','park','gym'];

var environment = {
  title: 'Hydration PSA',
  description: 'Remember to drink water throughout the day to stay hydrated and healthy!',
  backgroundColor: '#a0d8f1',
  elements: elements,
  locations: locations,
  weather: { temperatureC: 18, condition: 'partly cloudy', humidityPercent: 60 },
  sounds: ['dripping','wind','distant traffic']
};

var characters = [
  { id: 'frogwater', name: 'Hydro the Frog', role: 'mascot', likes: ['water','flies'] },
  { id: 'waterdrop', name: 'Dew Drop', role: 'helper', likes: ['sunlight'] }
];

function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

var randomElement = randomFrom(elements);
var randomLocation = randomFrom(locations);

$(document).ready(function() {

  // character info boxes
  var bgColors = ['#fff8dc','#e6f7ff','#f0fff0','#fff0f6'];

  characters.forEach(function(ch, index) {
    var img = $('#' + ch.id);
    if (img.length === 0) return;

    var box = $('<div></div>').css({
      background: bgColors[index % bgColors.length],
      padding: '8px',
      minWidth: '140px',
      fontSize: '16px',
      display: 'inline-block',
      verticalAlign: 'top',
      marginLeft: '10px'
    });

    box.append('<div style="font-weight:600">Name: ' + ch.name + '</div>');
    box.append('<div>Role: ' + ch.role + '</div>');
    box.append('<div>Likes: ' + ch.likes.join(', ') + '</div>');

    img.after(box);
  });

  // Pet Frog button
  var frog = $('#frogwater');
  if (frog.length > 0) {
    var btn = $('<button>Pet Frog</button>').css({ marginLeft: '10px' });
    frog.after(btn);

    btn.on('click', function() {
      var rib = $('<span> ribbit</span>').css({
        position: 'relative',
        display: 'inline-block',
        padding: '2px 6px'
      });

      btn.after(rib);

      $(rib)
        .animate({ top: '-20px' }, 150)
        .animate({ top: '0px' }, 150)
        .animate({ top: '-10px' }, 120)
        .animate({ top: '0px' }, 120);

      setTimeout(function() { rib.remove(); }, 1500);
    });
  }
// Custom cursor
  var circle = $('<div></div>').css({
    position: 'fixed',
    width: '25px',
    height: '25px',
    background: 'blue',
    borderRadius: '50%',
    pointerEvents: 'none',
    transform: 'translate(-50%, -50%)',
    zIndex: 9999
  }).appendTo('body');

  $(document).mousemove(function(e) {
    circle.css({
      left: e.pageX + 'px',
      top: e.pageY + 'px'
    });
  });

});
