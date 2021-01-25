class NPC extends Player {
    constructor(ctx, canvasSize, playerType, imageName) {

        super(ctx, canvasSize, playerType, imageName)
        this.attackActions = []
        this.attackActionsIndex = 0

    }

    createPattern() {
        this.attackActions.push('left', 'right', 'punch', 'kick')
    }

    attackPattern() {
        switch (this.attackActions[this.attackActionsIndex]) {
            case 'left':
            case 'right':
                this.movePlayer(this.attackActions[this.attackActionsIndex])
                this.setStatus('rest')
                break;
        
            default:
                this.setStatus(this.attackActions[this.attackActionsIndex])
                break;
        }                
        this.attackActionsIndex === this.attackActions.length - 1 ? this.attackActionsIndex = 0 : this.attackActionsIndex++
    }

}
