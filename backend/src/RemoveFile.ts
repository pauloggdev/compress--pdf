import { response } from "express";

const fs = require('fs');
export function removeFile(filePath: string) {
    fs.unlink(filePath, (err: any) => {
        if (err) {
            throw new Error(`Erro ao remover o arquivo: ${err.message}`);
        }
        return response.json({ statusCode: 200, message: `Arquivo ${filePath} removido com sucesso` })
    });
}