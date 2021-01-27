window.onload = () => {
    document.getElementById('start-button').onclick = function() {
        document.getElementById('start-button').disabled = true
        const audio = document.querySelector("#audio-pelea1");
        audio.play();
        audio.volume= 0.2;  
        startGame()
        };

    
    document.getElementById('restart-button').onclick = () => {
        restartGame();
    };
    document.getElementById('Green').onclick = function() {
        document.querySelector('.character-selection').style.display = 'none'
        ironhackFighters.setPlayer1Character('Green')
    };
    document.getElementById('Red').onclick = function() {
        document.querySelector('.character-selection').style.display = 'none'
        ironhackFighters.setPlayer1Character('Red')
    }

}

function startGame() {
    ironhackFighters.render()
}

function restartGame() {
    document.querySelector('.end-game').style.display = 'none'
    document.getElementById('start-button').disabled = true

    ironhackFighters.restart()
    ironhackFighters.render()

}

ironhackFighters.init('canvas')