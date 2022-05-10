import {cardArrayOptions , generateCards , drawCards , shuffle , flipCard , isUserWon , gameCheck , guessBad ,flipAgain , setTime , restart , pad , startTimer} from './game.js'

const tableGame = document.querySelector('.grid');
const newGame = document.querySelector('button');

newGame.addEventListener('click', restart);
tableGame.addEventListener('click', gameCheck);
tableGame.addEventListener('click', startTimer);

let gameCards = generateCards(cardArrayOptions);
drawCards(gameCards, tableGame);