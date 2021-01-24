class Player {
    constructor(ctx, canvasSize, playerType, imageName) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.playerType = playerType
        this.imageName = imageName
        this.playerSize = { w: 90, h: 150 }
        this.playerPos = { x: 80, y: 350 }
        this.health = 410
        this.status = 'rest'
        this.imageInstance = new Image()
        this.imageInstance.src = `img/${this.imageName}.jpg`

    }

    movePlayer(direction) {
        if (!this.hasPlayerReachBorder(direction)) {
            direction === 'right' ? this.playerPos.x += 5 : this.playerPos.x -=5
        } console.log(this.playerPos)
    }

    drawPlayer() {    
        this.ctx.drawImage(this.imageInstance, this.playerPos.x, this.playerPos.y, this.playerSize.w, this.playerSize.h)
    }

    receiveDamage(attackType) {
        attackType === 'kick' ? this.health -= 10: this.health -= 5                
    }

    hasPlayerReachBorder(direction) {
        if (direction === 'right') {
            return (this.playerPos.x + 5 + this.playerSize.w > this.canvasSize.w)
        } else { return this.playerPos.x -5 <= 0 }
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

    setPlayerInitialPos() {
        this.playerType === 'player1' ? this.playerPos.x = 10 : this.playerPos.x = this.canvasSize.w - 10 - this.playerSize.w
    }
}