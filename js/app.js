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
        this.lifeBars.push(new LifeBar(this.ctx, this.canvasSize, 100, 'player1'))
        this.lifeBars.push(new LifeBar(this.ctx, this.canvasSize, 100, 'player2'))
        this.lifeBars[0].drawFramework()
        this.lifeBars[1].drawFramework()
        this.lifeBars[0].setHealthBarPos()
        this.lifeBars[1].setHealthBarPos()
        this.lifeBars[0].fillHealthBar()
        this.lifeBars[1].fillHealthBar()
    
       // this.lifeBars[0].fillHealthBar()
        console.log(this.lifeBars[0])
        
    },

    render() {

    },

    setDimensions() {
        this.canvasDom.width = this.canvasSize.w
        this.canvasDom.height = this.canvasSize.h
    },

    setEventListener() {

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
}