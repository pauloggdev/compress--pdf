/**
/screen: Qualidade mais baixa, menor tamanho (para visualização em tela).
/ebook: Qualidade intermediária.
/printer: Qualidade maior, arquivos maiores (para impressão).
/prepress: Qualidade ainda maior (para pré-impressão profissional).
*/

import GenerateUniqueName from "./GenerateUniqueName";
import PDFCompressor from "./PDFCompressor";
const path = require('path');
const inputPDF = path.resolve(__dirname, '../src/CV.pdf');
const outputPDF = path.join(__dirname, `../src/${GenerateUniqueName.exec()}.pdf`);

const compressor = new PDFCompressor(inputPDF, outputPDF, 'screen');
compressor.compress();





