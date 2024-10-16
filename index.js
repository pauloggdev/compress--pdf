
const path = require('path');
const { v4: uuidv4 } = require('uuid');


const { exec } = require('child_process');

/**
/screen: Qualidade mais baixa, menor tamanho (para visualização em tela).
/ebook: Qualidade intermediária.
/printer: Qualidade maior, arquivos maiores (para impressão).
/prepress: Qualidade ainda maior (para pré-impressão profissional).
 */

function compressPDF(inputFilePath, outputFilePath, qualityView) {
  const gsCommand = `gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/${qualityView} -dNOPAUSE -dQUIET -dBATCH -sOutputFile=${outputFilePath} ${inputFilePath}`;

  const process = exec(gsCommand, { timeout: 600000 }, (error, stdout, stderr) => { // timeout em milissegundos (10 minutos)
    if (error) {
      console.error(`Erro ao comprimir o PDF: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Erro do Ghostscript: ${stderr}`);
      return;
    }
    console.log('PDF comprimido com sucesso!');
  });

  // Captura a saída em tempo real (caso deseje monitorar o progresso)
  process.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  process.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });
}


const inputPDF = path.join(__dirname, 'CV.pdf');
const outputPDF = path.join(__dirname, `${generateUniqueName()}.pdf`);


function generateUniqueName() {
    const timestamp = Date.now();
    return `${timestamp}_${uuidv4()}`;
}


// Chamando a função para comprimir o PDF
compressPDF(inputPDF, outputPDF, 'screen');
