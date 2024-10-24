/**
/screen: Qualidade mais baixa, menor tamanho (para visualização em tela).
/ebook: Qualidade intermediária.
/printer: Qualidade maior, arquivos maiores (para impressão).
/prepress: Qualidade ainda maior (para pré-impressão profissional).
*/
const express = require('express')
const path = require('path');
const cors = require('cors');
import multer from 'multer';
const fs = require('fs');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = path.join(__dirname, 'public/uploads'); // Caminho absoluto
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // Mantém o nome original do arquivo
    }
});
const upload = multer({ storage: storage });


const { check, validationResult } = require('express-validator');

import GenerateUniqueName from "./GenerateUniqueName";
import PDFCompressor from "./PDFCompressor";
import { removeFile } from './RemoveFile';

const app = express()
app.use(cors());


app.get('/', function (req: any, res: any) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

app.post('/compressPDF', upload.single('file'), async function (req: any, res: any) {
    if (!req.file) {
        return res.status(400).send('Nenhum arquivo foi enviado.');
    }
    const inputPDF = req.file.path;
    //const inputPDF = path.resolve(__dirname, '../src/CV.pdf');
    const outputPDF = path.join(__dirname, `public/uploads/${GenerateUniqueName.exec()}.pdf`);
    const compressor = new PDFCompressor(inputPDF, outputPDF, 'screen');
    await compressor.compress();
    removeFile(inputPDF);

    // if(response.statusCode === 200) {
    // removeFile(inputPDF)
    //}
    // res.send('Hello World')
})
app.listen(3000, () => {
    console.log('listening on port 3000')
})







