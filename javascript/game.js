

//  words to be used
var selectableWords = ['chocolate', 'car', 'bottle', 'machine', 'airplane', 'mouse', 'computer', 'truck', 'chair', 'house', 'dog', 'coding', 'image', 'pencil', 'computer'];

// zeroing
const maxTries = 10;            // Maximum number of tries player has
var guessedLetters = [];        // Stores the letters the user guessed
var currentWordIndex;           // Index of the current word in the array
var guessingWord = [];          // This will be the word we actually build to match the current word
var remainingGuesses = 0;       // How many tries the player has left  
var wins = 0;                   // How many wins has the player racked up
var flagStartGame = true;

// Reset variables
function resetGame() {
    var wins = 0; 
    remainingGuesses = maxTries;
    guessingWord = [];
    guessedLetters = [];
    // random a number from zero to selectableWords.length
    currentWordIndex = Math.floor(Math.random() * (selectableWords.length));
    // it has only the index 
    console.log(currentWordIndex);
    console.log(selectableWords[currentWordIndex]);
    //only for debugging purpose
    document.getElementById("wordChose").innerHTML = selectableWords[currentWordIndex];
    $("h3").css("background-color", "yellow");
    document.getElementById("wordChose").style.color = "#212529";

    // document.getElementById(id).style.property = new style
     // Build the guessing word
     for (var i = 0; i < selectableWords[currentWordIndex].length; i++) {
        console.log(selectableWords[currentWordIndex].length);
        guessingWord.push(" _ ");
    }
    console.log(guessingWord);
    // Clear out arrays
    updateDisplay();
    // flagStartGame = false;
};

// Reset variables
function starttGame() {
    // flagStartGame = true;
    updateDisplay();
};


//  Updates the display on the HTML Page
function updateDisplay() {

    document.getElementById("totalWins").innerHTML = wins;
    document.getElementById("currentWord").innerHTML = "";
    for (var i = 0; i < guessingWord.length; i++) {
        document.getElementById("currentWord").innerHTML += guessingWord[i];
    }
    document.getElementById("remainingGuesses").innerHTML = remainingGuesses;
    document.getElementById("guessedLetters").innerHTML = guessedLetters;
};

document.onkeydown = function(event) {

    // Check to make sure a-z was pressed.
    if(event.keyCode >= 65 && event.keyCode <= 90) {
        var keyPressed = (event.key.toLowerCase());
        console.log(event.key);
        console.log(keyPressed);
        if(guessedLetters.indexOf(keyPressed) === -1){
            guessedLetters.push("" + keyPressed + "");
            
            // Array to store positions of letters in string
            var positions = [];    
            // Loop through word finding guessed letter, store the indicies in an array.
            for (var i = 0; i < selectableWords[currentWordIndex].length; i++) {
                if(selectableWords[currentWordIndex][i] === keyPressed){
                    positions.push(i);
                } 
            }
                
            if (positions.length <= 0) {
                remainingGuesses--;
                if(remainingGuesses == 0){
                    document.getElementById("wordChose").style.color = "white";
                    updateDisplay();
                    alert("Game Over!");  
                }
                
            } else {
                    // replace the '_' with keyPressed.
                    for(var i = 0; i < positions.length; i++) {
                        guessingWord[positions[i]] = keyPressed;
                    }
                }
            }
        }
        updateDisplay();  
        checkWin();  
};


function checkWin() {
    if(guessingWord.indexOf(" _ ") === -1) {
        wins++;
        resetGame();
    }
};

