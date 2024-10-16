/**
/screen: Qualidade mais baixa, menor tamanho (para visualização em tela).
/ebook: Qualidade intermediária.
/printer: Qualidade maior, arquivos maiores (para impressão).
/prepress: Qualidade ainda maior (para pré-impressão profissional).
*/
const express = require('express')
const path = require('path');
const { check, validationResult } = require('express-validator');

import GenerateUniqueName from "./GenerateUniqueName";
import PDFCompressor from "./PDFCompressor";

const app = express()


app.get('/', function (req: any, res: any) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

app.post('/compressPDF', function (req: any, res: any) {
    console.log(req);return;
    const inputPDF = path.resolve(__dirname, '../src/CV.pdf');
    const outputPDF = path.join(__dirname, `../src/${GenerateUniqueName.exec()}.pdf`);
    const compressor = new PDFCompressor(inputPDF, outputPDF, 'screen');
    compressor.compress();
    res.send('Hello World')
})
app.listen(3000, () => {
    console.log('listening on port 3000')
})







