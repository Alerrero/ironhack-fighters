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
    player1Character: 'Red',
    canvasBackground: undefined,
    keys: {
        punch: 'a',
        kick: 'd',
        left: 'ArrowLeft',
        jump: 'ArrowUp',
        right: 'ArrowRight',
        
    },
    documentKeys: document.querySelectorAll('.punch, .kick, .left, .jump, .right'),
    intervalID: undefined,
    keydown: false,
    attackTime: 0,
    validAttack: [false, false],
    validJump: [false, false],
    frameCount: 0,
    characters: ['Wizard', 'Red', 'Warrior'],

    init(canvasID) {
        this.canvasDom = document.getElementById(`${canvasID}`)
        this.ctx = this.canvasDom.getContext('2d')
        this.setDimensions()
        this.createPlayers()
        this.createNPC()
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

    //#region aux functions
	isValidKey(key) {
		return Object.values(this.keys).includes(key)
	},
	getDOMKeyInterface(key) {
		return this.documentKeys[Object.values(this.keys).indexOf(key)]
	},
	animateDOMButton(domElm) {
		domElm.classList.add('pushed')
	},
	getAction(key) {
		return `${Object.keys(this.keys)[Object.values(this.keys).indexOf(key)]}`
	},
	//#endregion aux functions

    setEventListener() {
       
        document.onkeydown = e => {

            if (this.isValidKey(e.key)) {
				this.animateDOMButton(this.getDOMKeyInterface(e.key))
				switch (e.key) {
					case this.keys.right:
					case this.keys.left:
						this.players[0].movePlayer(this.getAction(e.key))
						this.players[0].setStatus('move')
						break
					default:
						this.players[0].setStatus(this.getAction(e.key))
				}
            }
            
            if (e.key === this.keys.jump) {
                this.validJump[0] = true
                setTimeout( () => {
                    this.validJump[0] = false
                }, 2000)
            }
		}
		document.onkeyup = e => {
			if (e.key === this.keys.kick || e.key === this.keys.punch) {
				this.attackTime = 0
				this.validAttack[0] = false
			}
			this.players[0].setStatus('rest')
			this.documentKeys.forEach(elm => elm.classList.remove('pushed'))
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
        this.players.push(new Player(this.ctx, this.canvasSize, 'player1', this.player1Character))
    },

    createNPC() {
        const availableCharacters = this.characters.filter(elm => elm != this.player1Character)
        const player2Character = availableCharacters[Math.floor(Math.random()*(availableCharacters.length))]  
        this.players.push(new NPC(this.ctx, this.canvasSize, 'player2', player2Character))
    },


    createLifeBars() {
        this.lifeBars.push(new LifeBar(this.ctx, this.canvasSize, this.players[0].getPlayerHealth(), this.players[0].getPlayerType()))
        this.lifeBars.push(new LifeBar(this.ctx, this.canvasSize, this.players[1].getPlayerHealth(), this.players[1].getPlayerType()))
    },

    hasDetectedCollision() {
        let borderPlayer1 = this.players[0].getRealBorder()
        let borderPlayer2 = this.players[1].getRealBorder()

            if (this.players[0].getStatus() === 'kick' || this.players[0].getStatus() === 'punch') {
                borderPlayer1 += 52
            }
            if (this.players[1].getStatus() === 'kick' || this.players[1].getStatus() === 'punch') {
                borderPlayer2 -= 52
            }
        
        return borderPlayer1 >= borderPlayer2
        
    },

    manageCollision(){
        if ((this.players[0].getStatus() != 'kick' && this.players[0].getStatus() != 'punch') && (this.players[1].getStatus() != 'kick' && this.players[1].getStatus() != 'punch')) {
            this.players[0].movePlayer('left')
            this.players[1].movePlayer('right')
        } else {
            this.playersAttack()
        }
        this.attackTime = 0
    },

    playersAttack() {
        this.players[0].playerAttack(this.players[1], this.validAttack[0], this.validJump[1])
        this.players[1].playerAttack(this.players[0], this.validAttack[1], this.validJump[0])
    },

    detectEndGame() {

        this.lifeBars.forEach((elm, idx) => {
            if (this.players[idx].getPlayerHealth() <= 0) {
                elm.drawBottomFramework()
                elm.drawTopFramework()
                clearInterval(this.intervalID)
                document.querySelector('.end-game').style.display = 'block'
                document.getElementById('restart-button').disabled = false
                document.querySelector('.end-game p').innerText = this.players[0].getPlayerHealth() <= 0 ? 'YOU LOSE' : 'YOU WIN'
            }
        })
    },

    restart() {
        this.lifeBars = []
        this.players = []
        this.intervalID = undefined
        this.keydown = false
        this.attackTime = 0
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
        const audio = document.querySelector("#audio-fight");
        audio.play();
        audio.volume= 0.1;  
        startGame()
        };

    
    document.getElementById('restart-button').onclick = () => {
        restartGame();
    };
    document.getElementById('Wizard').onclick = function() {
        document.querySelector('.character-selection').style.display = 'none'
        ironhackFighters.setPlayer1Character('Wizard')
    };
    document.getElementById('Red').onclick = function() {
        document.querySelector('.character-selection').style.display = 'none'
        ironhackFighters.setPlayer1Character('Red')
    }
    document.getElementById('Warrior').onclick = function() {
        document.querySelector('.character-selection').style.display = 'none'
        ironhackFighters.setPlayer1Character('Warrior')
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

