let deckId

let computerScore = 0
let myScore = 0
const cardsContainer = document.getElementById("cards")
const newDeckBtn = document.getElementById("new-deck")
const drawCardBtn = document.getElementById("draw-cards")
const header = document.getElementById("header")
const remainingText = document.getElementById("remaining")
const computerScoreEl = document.getElementById("computer-score")
const myScoreEl = document.getElementById("my-score")

// Get the deck from the API
function handleClick(){
    fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
        .then(res => res.json())
        .then(data => {
            // save the deck_ id as the api ocumentation requires
            deckId = data.deck_id
            console.log(data);
        })
}

newDeckBtn.addEventListener('click', handleClick)


drawCardBtn.addEventListener("click", ()=>{
    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
        .then(res => res.json())
        .then(data => {

            // Display the remaining card form the deck using the data remaining 
            remainingText.textContent = `Remaining cards: ${data.remaining}`
            // populate the carrd slot using children[] property
            // see data info for the index
            cardsContainer.children[0].innerHTML =`
                <img src=${data.cards[0].image} class="card"/>
            `
            cardsContainer.children[1].innerHTML =`
                <img src=${data.cards[1].image} class="card"/>
            `

            // add determineCardWinner fucntion to start the game
            const winnerText = determineCardWinner(data.cards[0], data.cards[1])
            header.textContent = winnerText
            
            // disable the draw button when there is 0 remaining card 
            if (data.remaining === 0) {
                drawCardBtn.disabled = true
            }
            
        })
})

// 
function determineCardWinner(card1, card2) {
    const valueOptions = ["2", "3", "4", "5", "6", "7", "8", "9", 
    "10", "JACK", "QUEEN", "KING", "ACE"]
    const card1ValueIndex = valueOptions.indexOf(card1.value)
    const card2ValueIndex = valueOptions.indexOf(card2.value)
    
    // determine who's the winner and adds up his score
    if (card1ValueIndex > card2ValueIndex) {
        computerScore++
        computerScoreEl.textContent = `Computer score: ${computerScore}`
        return "Computer wins!"
    } else if (card1ValueIndex < card2ValueIndex) {
        myScore++
        myScoreEl.textContent = `My score: ${myScore}`
        return "You win!"
    } else {
        return "War!"
    }
}