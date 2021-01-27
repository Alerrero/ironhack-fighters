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


                if ((this.players[0].getStatus() === 'rest' || this.players[0].getStatus() === 'move') && (this.players[1].getStatus() === 'rest' || this.players[1].getStatus() === 'move')) {
                    this.players[0].movePlayer('left')
                    this.players[1].movePlayer('right')
                } else {
                    this.playersAttack()
                }
                this.attackTime = 0
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
                const audio = document.querySelector("#audio-kick");
                audio.play();
                audio.volume= 0.7; 
                kickKey.classList.add('pushed')


            }
            if (e.key === this.keys.punch) {
                this.players[0].setStatus('punch')
                this.attackKey = true
                const punchKey = document.querySelector('.punch')
                const audio = document.querySelector("#audio-punch");
                audio.play();
                audio.volume= 0.7;  
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

    createPlayers() {
        this.players.push(new Player(this.ctx, this.canvasSize, 'player1', 'player1'))

    },

    createNPC() {
        this.players.push(new NPC(this.ctx, this.canvasSize, 'player2', 'player2'))
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