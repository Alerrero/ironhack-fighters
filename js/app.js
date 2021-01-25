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
        //this.attackPaterns()

    },

    render() {
        this.intervalID = setInterval(() => {
            this.clearScreen()
            this.lifeBars.forEach((elm, idx) => {
                elm.drawFramework()
                elm.setHealthBarWidth(this.players[idx].getPlayerHealth())
                elm.setHealthBarPos()
                elm.fillHealthBar()
            })
            this.players.forEach(elm => elm.drawPlayer(this.frameCount))
            this.setEventListener()

            if (this.hasDetectedCollision()) {
                console.log('colision')
                
                console.log(this.players[1].status)
                if (this.players[0].getStatus() === 'rest' && this.players[1].getStatus() === 'rest') {
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
            }
            if (e.key === this.keys.moveLeft) {
                this.players[0].movePlayer('left')
            }
            if (e.key === this.keys.kick) {
                this.players[0].setStatus('kick')
                this.attackKey = true

            }
            if (e.key === this.keys.punch) {
                this.players[0].setStatus('punch')
                this.attackKey = true

            }
        }
        document.onkeyup = e => {
            if (e.key === this.keys.kick || e.key === this.keys.punch) {
                this.players[0].setStatus('rest')
                this.attackKey = false
                this.attackTime = 0
                this.validAttack[0] = false
            }
        }

    },

    drawBackground() {

    },

    createPlayers() {
        this.players.push(new Player(this.ctx, this.canvasSize, 'player1', 'player1Run'))
        
    },

    createNPC() {
        this.players.push(new NPC(this.ctx, this.canvasSize, 'player2', 'player2Run'))
    },


    createLifeBars() {
        this.lifeBars.push(new LifeBar(this.ctx, this.canvasSize, this.players[0].getPlayerHealth(), this.players[0].getPlayerType()))
        this.lifeBars.push(new LifeBar(this.ctx, this.canvasSize, this.players[1].getPlayerHealth(), this.players[1].getPlayerType()))
    },

    hasDetectedCollision() {
        
        let borderPlayer1 = this.players[0].getRealBorder()
        let borderPlayer2 = this.players[1].getRealBorder()



        if (!(this.players[0].getStatus() === 'rest' && this.players[1].getStatus() === 'rest')) {
            
            if (this.players[0].getStatus() != 'rest') {
                borderPlayer1 += 20
            } if (this.players[1].getStatus() != 'rest') {
                borderPlayer2 -= 20
            }
        }
        
        console.log(borderPlayer1, borderPlayer2)
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
       
        this.lifeBars.forEach ((elm,idx) => {
            if (this.players[idx].getPlayerHealth() <= 0 ) {
                elm.drawFramework()
                clearInterval(this.intervalID)
                const endMsg = document.createElement('div')
                endMsg.setAttribute('class', 'end-msg')
                endMsg.textContent = 'END GAME'
                document.querySelector('.background').appendChild(endMsg)
        }
        })
                //this.restart()    
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
        document.getElementById('start-button').setAttribute('disabled', 'false')

    },

    clearScreen() {
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)
    },
}