//***********Globals */
document.getElementById('random-beer').addEventListener('click', btnBeerInfo)
document.getElementById('homebtn').addEventListener('click', homebtn)
let container = document.getElementById('searchedBeer')
let nextPageBtn = document.getElementById('nextPage')
let searchInput = document.getElementById('search')
let prevPageBtn = document.getElementById('prevPage')

let perPage = 10;
let page = 1;
let param, selectedIndex, input;




//*************Random Beer function */
function btnBeerInfo() {

    fetch('./beers.json')
        .then(res => res.json())
        .then((data) => {
            let beerList = data
            for (let i = 0; i < beerList.length; i++) {
                let randomBeer = beerList[Math.floor(Math.random() * beerList.length)];

                let img = document.getElementById('beerImg')
                img.src = randomBeer.image_url
                document.getElementById('beerName').innerText = randomBeer.name
                document.getElementById('product').style.display = 'block'
                document.getElementById('homebtn').style.display = 'block'
                // document.getElementById('random-beer').style.display = 'block'
                document.getElementById('chosen').style.display = 'block'
                document.getElementById('choice').style.display = 'none'
                document.querySelector('header').style.display = 'none'

                document.querySelector('body').style.backgroundImage = "url('Beerhug1.jpg')"
                document.querySelector('body').style.backgroundSize = "cover"


                let infoBeer = document.getElementById('infoBtn')
                infoBeer.addEventListener('click', () => {
                    window.localStorage.setItem('beercollection', JSON.stringify(randomBeer))
                    location.href = 'beercollection.html';
                })


            }
        })
}


// ********************* search beer function*****////
function updateParams() {
    // dropdown
    param = document.getElementById('dropDown');
    selectedIndex = param.selectedIndex;
    param = param.options[selectedIndex].value;
    // container.innerHTML = ''
    input = searchInput.value;

}


/***advent listener */

//next page

nextPageBtn.addEventListener('click', async function () {
    page = page + 1;

    let input = searchInput.value;
    let beers = await getBeer(param, input)
    container.innerHTML = ''
    console.log(beers.length);


    updateParams();
    updateBeer(beers);
})

//previous page
prevPageBtn.addEventListener('click', async function () {
    page = page - 1;

    let input = searchInput.value;
    let beers = await getBeer(param, input)
    container.innerHTML = ''
    console.log(page);

    updateParams();
    updateBeer(beers);

    // if (page === 1) {
    //     prevPageBtn.disabled = true
    // } else if (page === 1) {
    //     prevPageBtn.disabled = true

    // }
})





searchInput.addEventListener('keyup', async (e) => {
    if (e.key === 'Enter') {

        updateParams();
        let input = searchInput.value;

        let beers = await getBeer(param,input)
        updateBeer(beers);
        console.log(beers);


    }
})

//****** sluuut på adl */

function updateBeer(beers) {
    beers.forEach(beer => {
        document.getElementById('choice').style.display = 'none'
        document.querySelector('header').style.display = 'none'
        document.getElementById('searchedBeer').style.visibility = 'visible'
        document.getElementById('homebtn').style.display = 'block'
        nextPageBtn.style.visibility = 'visible'

        // nextPageBtn.addEventListener('click', () => {
        //     prevPageBtn.style.display = 'block'
        // })

        if (beers.length < perPage) {
            nextPageBtn.style.display = 'none'
        }else if(page >= 2){
            prevPageBtn.style.display = 'block'
        }else if (page <=1 ){
            prevPageBtn.style.display = 'none'
        }



        document.querySelector('body').style.backgroundImage = "url('https://i.pinimg.com/originals/74/0d/d7/740dd7b82705ceb032ffa3b299d9f709.gif')"
        document.querySelector('body').style.backgroundSize = 'cover'

        let beerImg = document.createElement('img')
        beerImg.setAttribute('src', beer.image_url)
        container.appendChild(beerImg)
        let name = document.createElement('h3')
        name.innerHTML = 'Name:' + ' ' + beer.name
        container.appendChild(name)
        let moreBtn = document.createElement('button')
        moreBtn.textContent = 'More about this beer'
        container.appendChild(moreBtn)

        moreBtn.addEventListener('click', () => {
            window.localStorage.setItem('beercollection', JSON.stringify(beer))
            location.href = 'beercollection.html';
        })

    })
}


async function getBeer(param, value) {
    let baseUrl = 'https://api.punkapi.com/v2/'
    try {
        let res = await fetch(`${baseUrl}beers?${param}=${value}&page=${page}&per_page=${perPage}`)
        let data = await res.json()
        return await data
        // console.log(data);
    } catch (err) {
        console.error(err);
    }

}


function homebtn() {
    window.location.reload();
}