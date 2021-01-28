class Player {
    constructor(ctx, canvasSize, playerType, character) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.playerType = playerType
        this.playerSize = { w: 200, h: 134 }
        this.playerPos = {
            x: this.playerType === 'player1' ? 80 : 500,
            y: 350
        }
        this.health = 300
        this.status = 'rest'
        this.playerValidAttack = false

        this.images = [
            {name: 'move', frames:6},
            {name: 'punch', frames:5},
            {name: 'kick', frames:6},
            {name: 'rest', frames:4}
        ]

        this.imageInstance = new Image ()
        this.imageInstance.framesIndex = 0
        this.characters = []
        this.character = character

        this.audioKick = document.querySelector("#audio-kick")
        this.audioKick.volume = 0.7
        this.audioPunch= document.querySelector("#audio-punch")
        this.audioPunch.volume = 0.7
    }


    movePlayer(direction) {
        if (!this.hasPlayerReachBorder(direction)) {
            direction === 'right' ? this.playerPos.x += 10 : this.playerPos.x -= 10
        }
    }

    pushPlayer(direction){
        if (!this.hasPlayerReachBorder(direction)) {
            direction === 'right' ? this.playerPos.x += 30 : this.playerPos.x -= 30
        }
    }

    transformStatusToCamelCase(){
        return this.status.charAt(0).toUpperCase()+this.status.slice(1)
    }
    
//TODO
// sacar el string de src a una función
//dar un nombre más claro a this.images

    drawPlayer(frames) {
        
        this.imageInstance.src = `animation/${this.playerType}${this.character}${this.transformStatusToCamelCase()}.png`

        //TODO: preguntar Teo
        //const wantedObj = this.images.find(elm=>elm.name===this.status)

        this.imageInstance.frames = this.images.find(elm=>elm.name===this.status).frames

        this.ctx.drawImage(
            this.imageInstance,
            this.imageInstance.framesIndex * Math.floor(this.imageInstance.width / this.imageInstance.frames),
            0,
            Math.floor(this.imageInstance.width / this.imageInstance.frames),
            this.imageInstance.height,
            this.playerPos.x,
            this.playerPos.y,
            this.playerSize.w,
            this.playerSize.h
        )

        this.animate(frames)

    }

    animate(frames) {
        if (frames % 5 == 0) {
            this.imageInstance.framesIndex++;
        }
        if (this.imageInstance.framesIndex > this.imageInstance.frames - 1) {
            this.imageInstance.framesIndex = 0
        }
    }

    receiveDamage(attackType) {
        attackType === 'kick' ? this.health -= 25 : this.health -= 15
    }

    hasPlayerReachBorder(direction) {
        return direction === 'right' ? this.playerPos.x + 10 + this.playerSize.w > this.canvasSize.w : this.playerPos.x - 5 <= 0
    }

    playerAttack(playerObj, validAttack) { 
        
            if (!this.playerValidAttack&&this.status != 'rest' && this.status != 'move' && !validAttack) {

                playerObj.receiveDamage(this.status)
                this.playerValidAttack = true

                this.status==='punch' ? this.audioPunch.play() : this.audioKick.play()
               
                this.playerType === 'player1' ? playerObj.pushPlayer('right') : playerObj.pushPlayer('left')
                setTimeout(() => this.playerValidAttack = false, 1000)
            }
        
    }

    getPlayerType() {
        return this.playerType
    }

    setPlayerType(value) {
        this.playerType = value
    }

    getPosition() {
        return this.playerPos
    }

    getPlayerHealth() {
        return this.health
    }

    getStatus() {
        return this.status
    }

    setStatus(newStatus) {
        this.status = newStatus
    }

    getPlayerSize() {
        return this.playerSize
    }

    getRealBorder() {

        return this.playerType === 'player1' ? this.playerSize.w + this.playerPos.x - 52 : this.playerPos.x + 52
    }

    setPlayerInitialPos() {
        this.playerType === 'player1' ? this.playerPos.x = 10 : this.playerPos.x = this.canvasSize.w - 100 - this.playerSize.w
    }
  
}