let playArea = document.getElementById("play-area");
let message = document.getElementById("message");
let score = document.getElementById("score");
let failrate = document.getElementById("failrate");
let resetButton = document.getElementById("reset-button");
let removeMessage = message.innerHTML;
let cardPickAmmount;

arrayOfCards = ['1','1','2','2','3','3','4','4','5','5','6','6','7','7','8','8','9','9','10','10'];

function resetBoard() {
    resetButton.disabled = true;
    while(playArea.firstChild) {
        playArea.removeChild(playArea.firstChild);
    }
    setTimeout(() => {
        setupBoard(shuffleCards(arrayOfCards));
        handleClick();
        resetButton.disabled = false;
    },1000)

}
    resetButton.addEventListener("click", resetBoard);

function shuffleCards(cards) {
    for (var i = cards.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = cards[i];
        cards[i] = cards[j];
        cards[j] = temp;
    }
    return cards;
}

function setupBoard(cards) {
    let temporary;
    for(let i = 0; i < cards.length; i++){
        temporary = document.createElement('div');
        temporary.className = 'cardFlipped';
        temporary.innerHTML = cards[i];
        playArea.appendChild(temporary);
    }
    cardPickAmmount = 2;
    score.innerHTML = 0;
    failrate.innerHTML = 20;
    handleClick();
}

setupBoard(shuffleCards(arrayOfCards));

function checkWin() {
    message.className = "wonMessage";
    message.innerHTML = "You won!"
    setTimeout(() => {
        message.innerHTML = removeMessage;
        cardPickAmmount = 2;
        resetBoard();
    },2000)
}

function checkLoss() {
    console.log('failed')
    message.innerHTML = "GAME OVER";
    message.className = "gameOver";
    setTimeout(() => {
        message.innerHTML = removeMessage;
        cardPickAmmount = 2;
        resetBoard();
    },2000)
}

function checkCards(cardOne, cardTwo){
    if(cardOne.innerHTML === cardTwo.innerHTML) {
        score.innerHTML++;
        if(score.innerHTML > 1) {
            checkWin();
        } else {
            cardPickAmmount = 2;
        }
    } else if(cardOne.innerHTML != cardTwo.innerHTML){
        failrate.innerHTML--;
        if(failrate.innerHTML < 1) {
            checkLoss();
        } else {
            message.innerHTML = "FAIL";
            message.className = "failMessage";
            setTimeout(() => {
                cardOne.className = 'cardFlipped';
                cardTwo.className = 'cardFlipped';
                cardPickAmmount = 2;
                message.innerHTML = removeMessage;
                message.className = '';
            },700)
        }
    }
}

function handleClick() {
    let cardQuery = Array.from(playArea.querySelectorAll(".cardFlipped"));
    let firstCardPick;
    let secondCardPick;

    console.log(cardPickAmmount)

    cardQuery.forEach(card => {
        card.addEventListener("click", () => {
                if(cardPickAmmount === 2 && card.className === 'cardFlipped') {
                    firstCardPick = card;
                    card.className = 'card';
                    cardPickAmmount--;
                    console.log(cardPickAmmount)
                } else if(cardPickAmmount === 1  && card.className === 'cardFlipped') {
                    secondCardPick = card;
                    card.className = 'card';
                    cardPickAmmount--;
                    checkCards(firstCardPick, secondCardPick);
                }
        })
    })
}






