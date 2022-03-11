let beer = window.localStorage.getItem('beercollection')
beer = JSON.parse(beer)
// console.log(beer);

let ingredients = ''
let maltName =''
for (let i = 0; i < beer.ingredients.malt.length; i++) {
    ingredients = beer.ingredients.malt[i];
    maltName += ingredients.name +', '
}

let hops ='';
let hopsName='';
for (let i = 0; i < beer.ingredients.hops.length; i++) {
    hops = beer.ingredients.hops[i];
    hopsName += hops.name + ', '
    console.log(hopsName);
}

document.getElementById('ingredients').innerText = 'Ingredients:' + ' ' + maltName ;
document.getElementById('hops').innerText = 'Hops:' +' ' + hopsName;


let img = document.getElementById('beerImg')
img.src = beer.image_url
let name = document.getElementById('beerName').innerText = 'Name:' + ' ' + beer.name;
let descript = document.getElementById('description').innerText = 'Description:' + ' ' + beer.description;
let abv = document.getElementById('abv').innerText = 'Alcohol by volume:' + ' ' + beer.abv;
let foodPair = document.getElementById('foodpairing').innerText = 'Food to pair with:' + ' ' + beer.food_pairing;
let tips = document.getElementById('tips').innerText = 'Brewers tips:' + ' ' + beer.brewers_tips;
document.getElementById('homebtn').addEventListener('click', () => {
    location.href = 'beers.html'
})