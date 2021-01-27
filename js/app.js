const ironhackFighters = {
    name: 'Ironhack Fighters',
    author: 'Alex*2 y Barbara',
    version: '0.0.1',
    license: undefined,
    canvasDOM: undefined,
    /** @type {CanvasRenderingContext2D} */
    ctx: undefined,
    canvasSize: { w: 900, h: 600 },
    lifeBars: [],
    players: [],
    player1Character: 'Green',
    canvasBackground: undefined,
    keys: {
        moveLeft: 'ArrowLeft',
        moveRight: 'ArrowRight',
        punch: 'a',
        kick: 'd'
    },
    documentKeys: [document.querySelector('.left'), document.querySelector('.right'), document.querySelector('.punch'), document.querySelector('.kick')],
    intervalID: undefined,
    keydown: false,
    attackTime: 0,
    attackKey: false,
    validAttack: [false, false],
    frameCount: 0,
    characters: ['Green', 'Red'],

    init(canvasID) {
        this.canvasDom = document.getElementById(`${canvasID}`)
        this.ctx = this.canvasDom.getContext('2d')
        this.setDimensions()
        this.createPlayers()
        this.createNPC()
        this.players.forEach(elm => elm.selectCharacter())
        this.players[1].createPattern()
        this.players[0].setPlayerInitialPos()
        this.players[1].setPlayerInitialPos()
        this.createLifeBars()
        this.canvasBackground = new canvasBackground(this.ctx, this.canvasSize)
        this.setEventListener()
        


    },

    render() {
        this.intervalID = setInterval(() => {
            this.clearScreen()
            this.drawAll()
           
            if (this.hasDetectedCollision()) {
                this.manageCollision()              
            }
            this.frameCount++
            if (this.frameCount % 60 === 0) {
                this.players[1].attackPattern()
            }
            this.frameCount === 6000 ? this.frameCount = 0 : null
            this.detectEndGame()
        }, 1000 / 60)
    },
    

    setDimensions() {
        this.canvasDom.width = this.canvasSize.w
        this.canvasDom.height = this.canvasSize.h
    },

    setEventListener() {
       
        document.onkeydown = e => {
            if (e.key === this.keys.moveRight) {
                this.players[0].movePlayer('right')
                this.players[0].setStatus('move')
                const rightKey = document.querySelector('.right')
                rightKey.classList.add('pushed')
            }
            if (e.key === this.keys.moveLeft) {
                this.players[0].movePlayer('left')
                this.players[0].setStatus('move')
                const leftKey = document.querySelector('.left')
                leftKey.classList.add('pushed')
            }
            if (e.key === this.keys.kick) {
                this.players[0].setStatus('kick')
                this.attackKey = true
                const kickKey = document.querySelector('.kick')
                kickKey.classList.add('pushed')
            }
            if (e.key === this.keys.punch) {
                this.players[0].setStatus('punch')
                this.attackKey = true
                const punchKey = document.querySelector('.punch')                             
                punchKey.classList.add('pushed')
            }
        }
        document.onkeyup = e => {
            if (e.key === this.keys.kick || e.key === this.keys.punch) {
                this.attackKey = false
                this.attackTime = 0
                this.validAttack[0] = false
            }
            this.players[0].setStatus('rest')
            this.documentKeys.forEach(elm => {
                elm.classList.remove('pushed')
            })
        }

    },

    drawAll() {
        this.canvasBackground.drawCanvasBackground(this.frameCount)
        this.lifeBars.forEach((elm, idx) => {
            elm.drawBottomFramework()
            elm.setHealthBarWidth(this.players[idx].getPlayerHealth())
            elm.setHealthBarPos()
            elm.fillHealthBar()
            elm.drawTopFramework()
        })
        this.players.forEach(elm => elm.drawPlayer(this.frameCount))


    },

    setPlayer1Character(character){
        this.player1Character = character


    },



    createPlayers() {
        this.players.push(new Player(this.ctx, this.canvasSize, 'player1', 'player1', this.player1Character))

    },

    createNPC() {
        //const player1Character = this.players[0].getCharacter()
        //const player1Index = this.players.indexOf(player1Character)
        const availableCharacters = this.characters.filter(elm => elm != this.player1Character)
        const player2Character = availableCharacters[Math.floor(Math.random()*(availableCharacters.length))]  
        this.players.push(new NPC(this.ctx, this.canvasSize, 'player2', 'player2', player2Character))
    },


    createLifeBars() {
        this.lifeBars.push(new LifeBar(this.ctx, this.canvasSize, this.players[0].getPlayerHealth(), this.players[0].getPlayerType()))
        this.lifeBars.push(new LifeBar(this.ctx, this.canvasSize, this.players[1].getPlayerHealth(), this.players[1].getPlayerType()))
    },

    hasDetectedCollision() {

        let borderPlayer1 = this.players[0].getRealBorder()
        let borderPlayer2 = this.players[1].getRealBorder()



        if (!((this.players[0].getStatus() === 'rest' || this.players[0].getStatus() === 'move') && (this.players[1].getStatus() === 'rest' || this.players[1].getStatus() === 'move'))) {

            if (this.players[0].getStatus() != 'rest' && this.players[0].getStatus() != 'move') {
                borderPlayer1 += 52
            }
            if (this.players[1].getStatus() != 'rest' && this.players[1].getStatus() != 'move') {
                borderPlayer2 -= 52
            }
        }

        return borderPlayer1 >= borderPlayer2
    },
    manageCollision(){
        if ((this.players[0].getStatus() === 'rest' || this.players[0].getStatus() === 'move') && (this.players[1].getStatus() === 'rest' || this.players[1].getStatus() === 'move')) {
            this.players[0].movePlayer('left')
            this.players[1].movePlayer('right')
        } else {
            this.playersAttack()
        }
        this.attackTime = 0
    },

    playersAttack() {
        this.players[0].playerAttack(this.players[1], this.validAttack[0])
        this.players[1].playerAttack(this.players[0], this.validAttack[1])
    },

    detectEndGame() {

        this.lifeBars.forEach((elm, idx) => {
            if (this.players[idx].getPlayerHealth() <= 0) {
                elm.drawBottomFramework()
                elm.drawTopFramework()
                clearInterval(this.intervalID)
                document.querySelector('.end-game').style.display = 'block'
                document.getElementById('restart-button').disabled = false
                if (this.players[0].getPlayerHealth() <= 0) {
                    document.querySelector('.end-game p').innerText = 'YOU LOSE'
                } else {
                    document.querySelector('.end-game p').innerText = 'YOU WIN'

                }
            }
        })
    },

    restart() {
        this.lifeBars = []
        this.players = []
        this.intervalID = undefined
        this.keydown = false
        this.attackTime = 0
        this.attackKey = false
        this.validAttack = [false, false]
        this.init('canvas')


    },

    clearScreen() {
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)
    },


}
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
    ironhackFighters.init('canvas')
    ironhackFighters.render()
}

function restartGame() {
    document.querySelector('.end-game').style.display = 'none'
    document.getElementById('start-button').disabled = true

    ironhackFighters.restart()
    ironhackFighters.render()

}

