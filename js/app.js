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
    keys: {
        moveLeft: 'ArrowLeft',
        moveRight: 'ArrowRight',
        punch: 'a',
        kick: 'd'
    },
    intervalId: undefined,
    keydown: false,

    init(canvasID) {
        this.canvasDom = document.getElementById(`${canvasID}`)
        this.ctx = this.canvasDom.getContext('2d')
        this.setDimensions()
        this.players.push(new Player(this.ctx, this.canvasSize, 'player1', 'popino'))
        this.players.push(new Player(this.ctx, this.canvasSize, 'player2', 'popino'))
        this.players[0].setPlayerInitialPos()
        this.players[1].setPlayerInitialPos()
        this.lifeBars.push(new LifeBar(this.ctx, this.canvasSize, this.players[0].getPlayerHealth(), this.players[0].getPlayerType()))
        this.lifeBars.push(new LifeBar(this.ctx, this.canvasSize, this.players[1].getPlayerHealth(), this.players[1].getPlayerType()))
        this.render()

    },

    render() {
        setInterval(() => {
            this.clearScreen()
            this.lifeBars[0].drawFramework()
            this.lifeBars[1].drawFramework()
            this.lifeBars[0].setHealthBarWidth(this.players[0].getPlayerHealth())
            this.lifeBars[1].setHealthBarWidth(this.players[1].getPlayerHealth())
            this.lifeBars[0].setHealthBarPos()
            this.lifeBars[1].setHealthBarPos()
            this.lifeBars[0].fillHealthBar()
            this.lifeBars[1].fillHealthBar()
            this.players[0].drawPlayer()
            this.players[1].drawPlayer()

            this.setEventListener()
            if (this.hasDetectedCollision()) {
                console.log('colision')
                if (this.players[0].getStatus() === 'rest' && this.players[1].getStatus() === 'rest') {
                    this.players[0].movePlayer('left')
                    this.players[1].movePlayer('right')
                } else {
                    this.playersAttack()
                }
            }
        }, 1000 / 60)

    },

    setDimensions() {
        this.canvasDom.width = this.canvasSize.w
        this.canvasDom.height = this.canvasSize.h
    },

    setEventListener() {
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
            }
            if (e.key === this.keys.moveLeft) {
                this.players[0].movePlayer('left')
            }
            if (e.key === this.keys.kick) {
                this.players[0].setStatus('kick')
            }
            if (e.key === this.keys.punch) {
                this.players[0].setStatus('punch')
            }
        }
        document.onkeyup = e => {
            if (e.key === this.keys.kick || e.key === this.keys.punch) {
                this.players[0].setStatus('rest')
                console.log(this.players[0].getStatus())
            }
        }

    },

    drawBackground() {

    },

    createPlayers() {
        this.players.push(new Player(this.ctx, this.canvasSize, 'player1', 'popino'))
        this.players.push(new Player(this.ctx, this.canvasSize, 'player2', 'popino'))
            // console.log('create player')
    },

    createLifeBars() {
        this.players.push(new Player(this.ctx, this.canvasSize, 'player1', 'popino'))
        this.players.push(new Player(this.ctx, this.canvasSize, 'player2', 'popino'))
    },

    hasDetectedCollision() {
        const posPlayer1 = this.players[0].getPosition().x
        const posPlayer2 = this.players[1].getPosition().x
        const borderPlayer1 = posPlayer1 + this.players[0].getPlayerSize().w
        const borderPlayer2 = posPlayer2
        return borderPlayer1 >= borderPlayer2
    },

    playersAttack() {
        if (this.players[0].getStatus() != 'rest') {
            this.players[1].receiveDamage(this.players[0].getStatus())
            console.log('player 1 has attacked player 2')
        }
        if (this.players[1].getStatus() != 'rest') {
            this.players[0].receiveDamage(this.players[1].getStatus())
        }
    },

    detectEndGame() {

    },

    restart() {

    },
    clearScreen() {
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)
    },
}