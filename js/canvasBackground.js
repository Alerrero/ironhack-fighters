class canvasBackground {
    constructor(ctx, canvasSize) {
        this.ctx = ctx
        this.canvasSize = canvasSize

        this.imageInstance = new Image()
        this.imageInstance.src = 'animation/backgroundanim.png'
        this.imageInstance.frames = 16
        this.imageInstance.framesIndex = 0
    }

    drawCanvasBackground(framesCounter) {
        this.ctx.drawImage(
            this.imageInstance,
            this.imageInstance.framesIndex * Math.floor(this.imageInstance.width / this.imageInstance.frames),
            0,
            Math.floor(this.imageInstance.width / this.imageInstance.frames),
            this.imageInstance.height,
            0,
            0,
            this.canvasSize.w,
            this.canvasSize.h
        )

        this.animate(framesCounter)
    }

    animate(framesCounter) {
        if (framesCounter % 5 == 0) {
            this.imageInstance.framesIndex++;
        }
        if (this.imageInstance.framesIndex > this.imageInstance.frames - 1) {
            this.imageInstance.framesIndex = 0
        }
    }
}