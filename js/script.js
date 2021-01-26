window.onload = () => {
    document.getElementById('start-button').onclick = function() {
        document.getElementById('start-button').disabled = true
        startGame()
    }
    document.getElementById('restart-button').onclick = () => {
        restartGame();
    };
}

function startGame() {
    ironhackFighters.render()
}

function restartGame() {
    ironhackFighters.restart()
    ironhackFighters.render()

}

ironhackFighters.init('canvas')