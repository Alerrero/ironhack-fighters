class Player {
    constructor(ctx, canvasSize, playerType, imageName) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.playerType = playerType
        this.imageName = imageName
        this.playerSize = { w: 0, h: 0 }
        this.playerPos = { x: 0, y: 0 }
        this.health = 100
        this.status = 'rest'
        this.imageInstance = new Image()
        this.imageInstance.src = `img/${this.imageName}`

    }

    movePlayer(direction) {
        if (!this.hasReachBorder(direction)) {
            direction === 'right' ? this.playerPos.x += 5 : this.playerPos.x -=5
        }
    }

    drawPlayer() {    
        this.ctx.drawImage(this.imageInstance, this.playerPos.x, this.playerPos.y, this.playerSize.w, this.playerSize.h)
    }

    receiveDamage(attackType) {
        attackType === 'kick' ? this.health -= 10: this.health -= 5                
    }

    hasPlayerReachBorder(direction) {
        if (direction === 'right') {
            return (this.playerPos.x + 5 - this.playerPos.w > this.canvasSize.w)
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