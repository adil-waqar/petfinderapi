// Add event listener
import fetchJsonp from 'fetch-jsonp';
let form = document.getElementById('form');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Grabbing onto the values of formn
    let pet = document.getElementById('pet').value.toLowerCase();
    let sex = document.getElementById('gender').value;

    // Fetch data
    fetchJsonp(`http://api.petfinder.com/pet.find?format=json&key=46b0e747b00d4debbf2135bfaeaf229d&animal=${pet}&gender=${sex}&location=99501&callback=cb`, {
        jsonpCallbackFunction: 'cb'
    })
    .then((res) => res.json())
    .then((data) => data.petfinder.pets.pet)
    .then((pets) => {
        console.log(pets);
        let output = `<div class="card-columns">`;
        pets.forEach(pet => {
            if(pet.description.$t == undefined){
                pet.description.$t = 'Description not available.';
            }
            output += `
            <div class="card">
            <img class="card-img-top" src="${pet.media.photos.photo[3].$t}" alt="Card image cap">
            <div class="card-body">
              <h5 class="card-title">${pet.name.$t}</h5>
              <p class="card-text">${pet.description.$t}</p>
            </div>
          </div>
            `;

        });
        output += '</div>';
        document.getElementById('output').innerHTML = output;
    })
    .catch(err => console.log(err))

    
});
