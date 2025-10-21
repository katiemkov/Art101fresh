// declaring an array with name myCommutes
let myCommutes = ["horse", "car", "scooter", "plane", "truck", "scateboard"];

// declaring an object with name myFavouriteCommute
let myFavouriteCommute = {
    type: "Spagetti",
    route: 23,
    print: "Pasta Mobile",
    hasMiddleDoor: true,
    drivers: ["Tony", "Luigi", "Mario"],
};

let megaSentence;

megaSentence = "<p>My two top commutes from the array are: " + myCommutes[0] + ", " + myCommutes[5] + "</p>";

megaSentence = megaSentence + "<p>My favourite commute possesses such characteristics: type - " + myFavouriteCommute.type + ", route number " + myFavouriteCommute.route + ", the best driver: " + myFavouriteCommute.drivers[0] + "</p>";
$("#output").html(megaSentence);