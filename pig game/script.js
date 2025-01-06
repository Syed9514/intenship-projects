let scores, currentScore, activePlayer, playing;

const init = () => {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    document.getElementById('score--0').textContent = 0;
    document.getElementById('score--1').textContent = 0;
    document.getElementById('current--0').textContent = 0;
    document.getElementById('current--1').textContent = 0;

    document.querySelector('.dice').style.display = 'none';

    document.querySelector('.player-0').classList.add('active');
    document.querySelector('.player-1').classList.remove('active');
};

const switchPlayer = () => {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    document.querySelector('.player-0').classList.toggle('active');
    document.querySelector('.player-1').classList.toggle('active');
};

document.getElementById('btn--roll').addEventListener('click', () => {
    if (playing) {
        const dice = Math.trunc(Math.random() * 6) + 1;

        const diceElement = document.getElementById('dice');
        diceElement.src = `dice-${dice}.png`;
        diceElement.style.display = 'block';

        if (dice !== 1) {
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            switchPlayer();
        }
    }
});

document.getElementById('btn--hold').addEventListener('click', () => {
    if (playing) {
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        if (scores[activePlayer] >= 100) {
            playing = false;
            document.getElementById(`name--${activePlayer}`).textContent = 'Winner!';
            document.getElementById('dice').style.display = 'none';
        } else {
            switchPlayer();
        }
    }
});

document.getElementById('btn--new').addEventListener('click', init);

init();