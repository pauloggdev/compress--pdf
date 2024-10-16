const { v4: uuidv4 } = require('uuid');
export default class GenerateUniqueName {
    static exec() {
        const timestamp = Date.now();
        return `${timestamp}_${uuidv4()}`;
    }

}