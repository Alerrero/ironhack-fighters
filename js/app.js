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
            //this.attackPaterns()


    },

    render() {
        this.intervalID = setInterval(() => {
            this.clearScreen()
            this.canvasBackground.drawCanvasBackground(this.frameCount)
            this.lifeBars.forEach((elm, idx) => {
                elm.drawFramework()
                elm.setHealthBarWidth(this.players[idx].getPlayerHealth())
                elm.setHealthBarPos()
                elm.fillHealthBar()
            })
            this.players.forEach(elm => elm.drawPlayer(this.frameCount))
            this.setEventListener()

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
        //TODO
        //Preguntar
        // document.addEventListener('keydown', (event) => {
        //     if (event.key === this.keys.moveLeft) {
        //         this.players[0].movePlayer('left')
        //         console.log('keydown left detected')

        //     }
        //     if (event.key === this.keys.moveRight) {
        //         this.keydown = true
        //         this.players[0].movePlayer('right')
        //         console.log(`keydown right detected`)
        //     }
        //     if (event.key === this.keys.punch) {
        //         console.log('punch')
        //     }
        //     if (event.key === this.keys.kick) {
        //         console.log('kick')
        //     }
        // })
        // document.addEventListener('keyup', (event) => {
        //     event.key === this.keys.moveRight ? this.keydown = false : null
        // })
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

    drawBackground() {

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


    //AÑADIMOS ESTO EN PLAYER?
    // player1Attack(obk) {
    //     if (this.players[0].getStatus() != 'rest' && !this.validAttack[0]) {
    //         this.players[1].receiveDamage(this.players[0].getStatus())
    //         this.validAttack[0] = true
    //         for (let i = 0; i < 3; i++) {
    //             this.players[1].movePlayer('right')
    //         }
    //         setTimeout(() => this.validAttack[0] = false, 1000)
    //     }
    // },

    // player2Attack() {
    //     if (this.players[1].getStatus() != 'rest' && !this.validAttack[1]) {
    //         console.log('te estoy atacando!')
    //         this.players[0].receiveDamage(this.players[1].getStatus())
    //         this.validAttack[1] = true
    //         for (let i = 0; i < 3; i++) {
    //             this.players[0].movePlayer('left')
    //         }
    //         setTimeout(() => this.validAttack[1] = false, 1000)
    //     }
    // },

    detectEndGame() {

        this.lifeBars.forEach((elm, idx) => {
            if (this.players[idx].getPlayerHealth() <= 0) {
                elm.drawFramework()
                clearInterval(this.intervalID)
                document.querySelector('.end-game').style.display = 'block'
                document.getElementById('restart-button').disabled = false

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