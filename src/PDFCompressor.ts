import GhostscriptError from "./GhostscriptError";
import PurchasingFileError from "./PurchasingFileError";

const { exec } = require('child_process');

export default class PDFCompressor {
    constructor(readonly inputFilePath: any, readonly outputFilePath: any, readonly qualityView: any) {
        this.inputFilePath = inputFilePath;
        this.outputFilePath = outputFilePath;
        this.qualityView = qualityView;
    }

    async compress() {
        const gsCommand = `gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/${this.qualityView} -dNOPAUSE -dQUIET -dBATCH -sOutputFile=${this.outputFilePath} ${this.inputFilePath}`;

        await exec(gsCommand, { timeout: 600000 }, (error: any, stdout: any, stderr: any) => {
            if (error) {
               throw new PurchasingFileError(error);
            }
            if (stderr) {
                throw new GhostscriptError(error);
            }
            console.log('PDF comprimido com sucesso!');
        });
    }
}

