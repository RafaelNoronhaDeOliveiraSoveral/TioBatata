import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

const readdir = promisify(fs.readdir);

export async function GET(req) {

    // local de origem
    const dirPath = path.join(process.cwd(), '/public/midias/fotos/imagens');
    
    
    try {
        const files = await readdir(dirPath);
        const imgPaths = files.map(file => `/midias/fotos/imagens/${file}`);
        
        // retro-comunicação da resposta JSON
        return new Response(JSON.stringify({ imagePaths: imgPaths }), {status: 200, headers: {"Content-Type": "application/json"}});
    } catch (err) {
        // manejamento do erro
        return new Response(JSON.stringify({ error: err.toString() }), {status: 500, headers: {"Content-Type": "application/json"}});
    }
}