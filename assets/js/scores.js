//take string val from input box after quiz and add to li item in ol
//save to local storage

let highScoreList = document.getElementById("highscores");
let clearButton = document.getElementById("clear");

let clearHighScores = function(){
    localStorage.clear();
    highScoreList.innerHTML = "";
};

clearButton.addEventListener("click", (event) => {
    event.preventDefault;
    clearHighScores();
});

    let markup = Object.keys(localStorage).map(function(key){
    //iterates through unique date keys and outputs corresponding value which is
    // in the format of initials:score. Use split(":") to separate values by delimiter.
    let [user, userScore] = localStorage.getItem(key).split(":");
    return `<li>${user.trim()} - ${userScore.trim()} points </li>`
}).join("");

  // returns an array of two element arrays
    let playerScoreArray = Object.keys(localStorage).map(function(key){
    let [user , userScore] = localStorage.getItem(key).split(":");
    //trim whitespace, if any
    return [user.trim() , Number(userScore.trim())]
});

 //compareFn to use in sort method. Sorts in descending order.
 //compare scores between array elements in playerScoreArray (which are at index 1)
function compareByScore(a, b) {
    return b[1] - a[1];
};

// sort in order of score
playerScoreArray.sort(compareByScore);

let orderedMarkup = playerScoreArray.map((item) => {
    let [user, userScore] = item;
    return `<li>${user} - ${userScore} points </li>`
}).join("");

highScoreList.insertAdjacentHTML("afterbegin", orderedMarkup);