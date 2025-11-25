// memorize all creatures in array
let allCreatures = [];

// random name api
async function getRandomName() {

   const response = await fetch(
"https://api.gofakeit.com/funcs/petname", 
{method: "GET",});

   const nameRandom = await response.text();
   console.log("Got name:", nameRandom);
   return nameRandom;
}


// random creature
async function randomizeCreature() {

   const eyesRandom = Math.floor(Math.random() * 5) + 1;
   const nameRandom = await getRandomName();
   const colorRandom = "grey";

   const randomCreature = {
       name: nameRandom,
       color: colorRandom,
       eyesNum: eyesRandom
   };

   return randomCreature;
}

// grabs data from the form
function getCreatureFromForm() {
    const freshCreature = {
        name: $("#crName").val(),
        color: $("#crColor").val(),
        eyesNum: $("#crEyesNum").val()
    };

    return freshCreature;
};

// prepare HTML for a single creature (does NOT add to the page)
function renderCreature(creature) {
  let crEyesHTML = "";

  for (let i = 0; i < creature.eyesNum; i++) {
    crEyesHTML = crEyesHTML + "<div class='eye'>.</div>";
  }

  const html=`
<div class="creature">
  <div class="creature-body" style="background: ${creature.color}">
${crEyesHTML}
  </div>
  <div class="creature-info">❤️${creature.name}</div>
</div>
`;
  return html;
}


// append one creature to the DOM using its HTML
function addCreatureToDOM(creature) {
  html = renderCreature(creature);
  $("#creature-list").append(html);

}

// check if creature data is valid
function isCreatureValid(creature) {
  if (creature.name === "") return false;
  if (creature.name.length > 12) return false;
  if (creature.eyesNum=="" || creature.eyesNum > 5) return false;
  return true;  
}

// clear all form fields
function clearForm() {
  $("#crName").val("");
  $("#crColor").val("#ee7dea");  // or keep previous if you prefer
  $("#crEyesNum").val(1);
}



// BUTTON HANDLERS

$("#add-creature").click(
    async function () {

 
    let newCreature;

   // choose the source for a creature
    if( $("#crRandom").is(':checked') ) 
    { newCreature= await randomizeCreature();}
    else 
    { newCreature= getCreatureFromForm(); }

    // do checks, exit function if something is wrong
   if ( isCreatureValid(newCreature)==false) {
    return;
   }
   
   allCreatures.push(newCreature);   // remember it
   addCreatureToDOM(newCreature);    // show it
   clearForm();

    });



//wanderAllCreatures(); // wander them