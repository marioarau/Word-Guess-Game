
// Array holds all of the drinks available
var wordList = [
    "Coffee",
    "Espresso",
    "Cappuccino",
    "Steak",
    "Chicken",
    "Soccer",
    "Baseball",
    "Basketball",
    "Asia",
    "Africa",
    "Europe",
    "History",
    "Chocolate",
    "Coyote"
];

// 1. Create code that "grabs" the div with the matching id (#drink-options);

var won_sound = new Audio("assets/audio/alien-spaceship.mp3", 100, true);
var targetDiv = document.getElementById("word-options");
var wonLostDiv = document.getElementById("word-won-lost");
var incorrectLettersDiv = document.getElementById("incorrect-letters-guessed");
var chancesRemainDiv = document.getElementById("word-chances-remaining");
var restartBtn = document.getElementById("restart-button");
var winsDiv = document.getElementById("wins");
var lossesDiv = document.getElementById("losses");
var wins = 0;
var losses = 0;
var incorrectLetters = [];

document.getElementById("restart-button").onclick = function () {
    console.log("click restart button");
    init_game();
}
var wordGuessValue = "";
var lettersGuessed = [];
var chances_remaining = 10;
var gameOver = false;

// ...

function isLetter(str) {
    return str.length === 1 && str.match(/[a-z]/i);
}

function init_game() {

    // variables settings required to start a game
    console.log("init_game");
    targetDiv.textContent = "";
    wonLostDiv.textContent = "";
    chancesRemainDiv.textContent = "10";
    chances_remaining = 10;
    lettersGuessed = [];
    gameOver = false;
    
    numWords = wordList.length;
    //console.log(numWords);

    rndNum = Math.floor(Math.random() * numWords);
    //console.log(rndNum);

    wordToGuess = wordList[rndNum];
    wordToGuess = wordToGuess.toLowerCase();

    // initialize word to guess to underscores
    console.log(wordToGuess);
    numLetters = wordToGuess.length;
    console.log(numLetters);

    // create a blank word with the length of the actual word
    wordGuessValue = "";
    for (i = 0; i < wordToGuess.length; i++) {
        wordGuessValue = wordGuessValue + "_";
    }
    console.log("wordGuessValue: " + wordGuessValue)
    displayWordGuess(wordToGuess, wordGuessValue);
}

function displayWinsLosses() {

    winsDiv.textContent = "Wins: "+wins;
    lossesDiv.textContent = "Losses: "+losses;
    return;
}

function displayWordGuess(wordToGuess, wordGuessValue) {

    var wordToDisplay = "";
    //console.log("--------------------");
    //console.log("wordToGuess="+wordToGuess);
    //console.log("wordGuessValue="+wordGuessValue);
    //console.log("wordGuessValue.length="+wordGuessValue.length);

    // display the empty word with underscore for each of the letters in the word 
    if (wordGuessValue.length == 0) {
        for (i = 0; i < wordToGuess.length; i++) {
            wordToDisplay = wordToDisplay + wordGuessValue[i] + "_ ";
        }
    }
    else {
        // display the incomplete word with spaces after each letter
        for (i = 0; i < wordToGuess.length; i++) {
            wordToDisplay = wordToDisplay + wordGuessValue[i] + " ";
        }
    }
    //console.log("String to Display: "+wordToDisplay);
    // display the word in the html
    targetDiv.textContent = wordToDisplay;
    //console.log("--------------------");
    return;
}

// 2. Create a for loop that creates HTML content of all the drinks using JavaScript.
// HINT: You will need to use each of the following methods: createElement, textContent, appendChild
// ...

init_game();

document.onkeyup = function (event) {

    if (gameOver == true) {
        return;
    }
    // Determines which key was pressed.
    // we need to get a letter then save the letter
    var userGuess = event.key;
    // if the key pressed is a letter we do something otherwise we ignore.
    if (isLetter(userGuess)) {
        console.log("userGuess is a letter: " + userGuess)
        lettersGuessed.push(userGuess);
        console.log("lettersGuessed: " + lettersGuessed)
        // search word for letter.
        var n = wordToGuess.search(userGuess);
        console.log("letter in word: " + n);
        // letter not found
        if (n == -1) {
            lettersGuessed.push(userGuess);
            incorrectLettersDiv.textContent = "Incorrect Letters Guessed: "+lettersGuessed;
            console.log("letter not in word")
            chances_remaining--;
            chancesRemainDiv.textContent = chances_remaining;
            console.log("chances_remaining: " + chances_remaining);
            if (chances_remaining == 0) {
                losses++;
                wonLostDiv.textContent="Sorry you lost! Try again!";
                gameOver= true;
                displayWinsLosses();
            }
        }
        else {
            // letter was found so traverse the word and replace all occurances of the letter in the word we are trying to guess
            for (i = 0; i < wordToGuess.length; i++) {
                console.log("i=" + i + " wordToGuess[i]=" + wordToGuess[i] + " userGuess=" + userGuess)
                // traversing the string letter by letter we replace using the for loop each occurance of the letter
                if (wordToGuess[i] === userGuess) {
                    wordGuessValue = wordGuessValue.substring(0, i) + userGuess + wordGuessValue.substring(i + 1);
                    //wordGuessValue[i] = userGuess;
                    console.log("loop: i=" + i + " wordToGuess[i]=" + wordToGuess[i] + " userGuess=" + userGuess)
                    console.log("loop: wordGuessValue = " + wordGuessValue);
                }
            }
            displayWordGuess(wordToGuess, wordGuessValue);
            // no underscores means we have guessed all the letters and won the game.
            if (wordGuessValue.search("_") == -1) {
                wonLostDiv.textContent="Congratulation! You won!";
                won_sound.play();
                wins++;
                displayWinsLosses();
                var delayInMilliseconds = 4000; //1 second

                setTimeout(function() {
                    init_game();
                }, delayInMilliseconds);
            }
            else {
                //chances_remaining--;
                //chancesRemainDiv.textContent = chances_remaining;
                //console.log("chances_remaining: " + chances_remaining);
            }
        }
    }
    else {
        return;
    }
}
