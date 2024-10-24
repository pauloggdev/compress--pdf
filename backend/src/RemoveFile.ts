import { Request, Response } from "express";
const fs = require('fs');

export function removeFile(filePath: string):void {
    fs.unlink(filePath, (err: any) => {
        if (err) {
            throw new Error(`Erro ao remover o arquivo: ${err.message}` )
        }
    });
}
