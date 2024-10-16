export default class PurchasingFileError extends Error {
    constructor(error:any) {
        super(`error purchasing file: ${error}`)
        this.name = 'PurchasingFileError'
    }
}