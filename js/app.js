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

    init(canvasID) {
        this.canvasDom = document.getElementById(`${canvasID}`)
        this.ctx = this.canvasDom.getContext('2d')
        this.setDimensions()
        this.players.push(new Player (this.ctx, this.canvasSize, 'player1','popino'))
        this.lifeBars.push(new LifeBar(this.ctx, this.canvasSize, this.players[0].getPlayerHealth(),this.players[0].getPlayerType()))
        this.lifeBars.push(new LifeBar(this.ctx, this.canvasSize, 300, 'player2'))
        this.render()
    
       // this.lifeBars[0].fillHealthBar()
        
    },

    render() {
        setInterval(() => {
            this.clearScreen()
            this.lifeBars[0].drawFramework()
            this.lifeBars[1].drawFramework()
            this.lifeBars[0].setHealthBarWidth(this.players[0].getPlayerHealth())
            //this.lifeBars[1].setHealthBarWidth(this.players[1].getPlayerHealth())
            this.lifeBars[0].setHealthBarPos()
            //this.lifeBars[1].setHealthBarPos()
            this.lifeBars[0].fillHealthBar()
            //this.lifeBars[1].fillHealthBar()
            this.players[0].drawPlayer()
            this.setEventListener()


           
        }, 1000)

    },

    setDimensions() {
        this.canvasDom.width = this.canvasSize.w
        this.canvasDom.height = this.canvasSize.h
    },

    setEventListener() {
        document.addEventListener('keydown', (event) => { 
            if (event.key === this.keys.moveLeft) {
                this.players[0].movePlayer('left')
                
            }
            if (event.key === this.keys.moveRight) {
                this.players[0].movePlayer('right')             
            }
            if (event.key === this.keys.punch) {
                console.log('punch')              
            }
            if (event.key === this.keys.kick) {
                console.log('kick')              
            }
        })

    },

    drawBackground() {

    },

    createPlayer() {

    },

    createLifeBar() {

    },

    detectCollision() {

    },

    dictateEndGame() {

    },

    restart() {

    },
    clearScreen() {
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)


    },
}