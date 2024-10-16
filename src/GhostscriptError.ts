export default class GhostscriptError extends Error {
    constructor(error:any) {
        super(`GhostscriptError: ${error}`)
        this.name = 'GhostscriptError'
    }
}