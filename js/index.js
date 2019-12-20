let playArea = document.getElementById("play-area");
let message = document.getElementById("message");
let score = document.getElementById("score");
let failrate = document.getElementById("failrate");
let resetButton = document.getElementById("reset-button");
let cardPickAmmount = 2;
let cardQuery;


failRate = 10;

checkWin = 0;

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
    score.innerHTML = 0;
    failrate.innerHTML = 1;
}

setupBoard(shuffleCards(arrayOfCards));

function handleClick() {
    let removeMessage = message.innerHTML;
;
    let firstCardPick;
    let secondCardPick;

    cardQuery = playArea.querySelectorAll(".cardFlipped");

    for(let i = 0; i < cardQuery.length; i++) {
        cardQuery[i].addEventListener("click", (event) => {
            if(cardPickAmmount === 2) {
                firstCardPick = event.target;
                // console.log('First Picked Card: ' + firstCardPick.innerText)
                event.target.className = 'card';
                cardPickAmmount--;
                // console.log('Flipped Cards: '+ cardPickAmmount)
            } else if(cardPickAmmount === 1) {
                secondCardPick = event.target;
                // console.log('Second Picked Card: ' + secondCardPick.innerText)
                event.target.className = 'card';
                cardPickAmmount--;
                // console.log('Flipped Cards: '+ cardPickAmmount)
                if(firstCardPick.innerText === secondCardPick.innerText) {
                    // console.log("success");
                    cardPickAmmount = 2;
                    score.innerHTML++;
                    if(score.innerHTML == 10) {
                        message.className = "wonMessage";
                        message.innerHTML = "You won!"
                        setTimeout(() => {
                            message.innerHTML = removeMessage;
                            cardPickAmmount = 2;
                            resetButton.click();
                        },2000)

                    }
                } else if(firstCardPick.innerText != secondCardPick.innerText) {
                    
                    // console.log("fail");
                    failrate.innerHTML--;
                    if(failrate.innerHTML == 0){
                        console.log('failed')
                        message.innerHTML = "GAME OVER";
                        message.className = "gameOver";
                        setTimeout(() => {
                            message.innerHTML = removeMessage;
                            cardPickAmmount = 2;
                            resetBoard();
                        },2000)
                    }else {
                        cardPickAmmount = 2;
                        message.innerHTML = "FAIL";
                        message.className = "failMessage";
                        setTimeout(() => {
                            firstCardPick.className = 'cardFlipped';
                            secondCardPick.className = 'cardFlipped';
                            message.innerHTML = removeMessage;
                            message.className = '';
                        },700)
                    }
                }
            }
        })
    }
}

handleClick();
