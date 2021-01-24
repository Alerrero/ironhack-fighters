window.onload = () => {
    document.getElementById('start-button').onclick = function() {
        document.getElementById('start-button').setAttribute('disabled', 'true')
        startGame()
    }
}

function startGame() {
    ironhackFighters.render()
}

ironhackFighters.init('canvas')