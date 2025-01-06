let randomNumber = Math.floor(Math.random() * 100) + 1;
const checkBtn = document.getElementById('checkBtn');
const restartBtn = document.getElementById('restartBtn');
const message = document.getElementById('message');

checkBtn.addEventListener('click', function() {
    const userGuess = parseInt(document.getElementById('guess').value);
    if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
        message.textContent = "Please enter a number between 1 and 100.";
        return;
    }

    if (userGuess === randomNumber) {
        message.textContent = "Congratulations! You guessed the number!";
        message.style.color = "green";
    } else if (userGuess < randomNumber) {
        message.textContent = "Too low! Try again.";
        message.style.color = "red";
    } else {
        message.textContent = "Too high! Try again.";
        message.style.color = "red";
    }
});

restartBtn.addEventListener('click', function() {
    randomNumber = Math.floor(Math.random() * 100) + 1;
    message.textContent = "";
    document.getElementById('guess').value = '';
});