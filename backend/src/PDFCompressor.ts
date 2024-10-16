import GhostscriptError from "./GhostscriptError";
import PurchasingFileError from "./PurchasingFileError";

const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

export default class PDFCompressor {
    constructor(readonly inputFilePath: any, readonly outputFilePath: any, readonly quality: any) {
        this.inputFilePath = inputFilePath;
        this.outputFilePath = outputFilePath;
        this.quality = quality;
    }

    async compress() {
        const gsCommand = `gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/${this.quality} -dNOPAUSE -dQUIET -dBATCH -sOutputFile=${this.outputFilePath} ${this.inputFilePath}`;

        try {
            // Usando exec com promessas para esperar a execução sem bloquear
            const { stdout, stderr } = await execPromise(gsCommand, { timeout: 600000 });
            
            if (stderr) {
                throw new GhostscriptError(stderr); // Corrigindo para usar stderr
            }

            console.log('PDF comprimido com sucesso!', stdout);
            return stdout;
        } catch (error) {
            throw new PurchasingFileError(error); // Se houver um erro, lança um erro personalizado
        }
    }
}
