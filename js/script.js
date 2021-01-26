window.onload = () => {
    document.getElementById('start-button').onclick = function() {
        document.getElementById('start-button').disabled = true
        const audio = document.querySelector("#audio-pelea1");
        startGame()
        console.log (audio);
        setTimeout(() =>{
        audio.play();  
       }, 2000);
       };

    
    document.getElementById('restart-button').onclick = () => {
        restartGame();
    };
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