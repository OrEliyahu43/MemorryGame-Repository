const tableGame = document.querySelector('.grid');
const guessesGood = document.querySelector("#correct-score");
const guessesBed = document.querySelector("#incorrect-score");
const message = document.querySelector('#header')
const minutesLabel = document.getElementById("minutes");
const secondsLabel = document.getElementById("seconds");


export const cardArrayOptions = ['ace', 'seven', 'queen', 'prince', 'ten', 'two'];
let totalSeconds = 0;
let toStop = false;
let lastFlippedCard = null;
let guessesRight = 0;
let guessesWrong = 0;


export function generateCards(cardArrayOptions) {
    const cardArray = [];
    for (let i = 0; i < cardArrayOptions.length; i++) {
        cardArray.push(cardArrayOptions[i]);
        cardArray.push(cardArrayOptions[i]);
    }
    const generatedCards = shuffle(cardArray);
    return generatedCards
}
export function shuffle(originalArray) {
    const array = [].concat(originalArray);
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

export function drawCards(gameCards, element) {

    for (let i = 0; i < gameCards.length; i++) {
        const cardToDraw = document.createElement('div')
        cardToDraw.setAttribute('type', gameCards[i]);
        cardToDraw.setAttribute('data-type', 'card');
        cardToDraw.setAttribute('class', 'flipped-card');
        element.appendChild(cardToDraw);
    }

}

export function flipCard(event) {
    if (event.target.getAttribute('type')) {
        const element = event.target;
        element.setAttribute('class', element.getAttribute('type'));
    }

}

export function isUserWon() {
    if (guessesRight === cardArrayOptions.length) {
        message.innerHTML = 'You Won!!!!!!!!💪💪💪💪💪 go find harder game'
        toStop = true;
    }
}

export function gameCheck(event) {
    if (event.target.getAttribute('data-type')==='card' && event.target.getAttribute('type') !== "disable" && lastFlippedCard !== event.target) {
        flipCard(event)
        if (lastFlippedCard === null) {
            lastFlippedCard = event.target;
        }
        else if (lastFlippedCard.getAttribute('type') === event.target.getAttribute('type')) {
            guessRight(event)
        }
        else {
            guessBad(event);
        }
    }
}


export function guessBad(event) {
    tableGame.removeEventListener('click', gameCheck);
    guessesBed.innerHTML = ++guessesWrong;
    setTimeout(() => { flipAgain(lastFlippedCard, event.target) }, 1000);

}

export function guessRight(event) {
    lastFlippedCard.setAttribute('type', 'disable');
    event.target.setAttribute('type', "disable")
    guessesGood.innerHTML = ++guessesRight;
    isUserWon();
    lastFlippedCard = null;
}

export function flipAgain(card1, card2) {
    card1.setAttribute('class', 'flipped-card')
    card2.setAttribute('class', 'flipped-card')
    tableGame.addEventListener('click', gameCheck);
    lastFlippedCard = null

}

export function setTime() {
    const toStopTimer = toStop;
    if (toStopTimer) {
        secondsLabel.innerHTML = pad(totalSeconds % 60);
        minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
    }
    else {
        totalSeconds++;
        secondsLabel.innerHTML = pad(totalSeconds % 60);
        minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
        setTimeout(setTime, 1000);
    }


}

export function restart() {
    guessesRight = 0;
    guessesWrong = 0
    guessesGood.innerHTML = guessesRight;
    guessesBed.innerHTML = guessesWrong;
    totalSeconds = -1;
    tableGame.innerHTML = '';
    const gameCards = generateCards(cardArrayOptions);
    drawCards(gameCards, tableGame);
    if (toStop) {
        toStop = false;
        setTime();
    }
    message.innerHTML = 'FLIP IT';

}
export function pad(val) {

    let valString = val + "";
    if (valString.length < 2) {
        return "0" + valString;
    } else {
        return valString;
    }

}

export function startTimer() {
    toStop = false;
    totalSeconds = -1;
    tableGame.removeEventListener('click', startTimer);
    setTime()

}

