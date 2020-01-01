import * as fs from 'fs';
import * as path from 'path';

const algorithmsRoot = path.join(__dirname, '../../algorithms/');

export function algorithmPaths() {
    return fs.readdirSync(algorithmsRoot).map((algorithm: string) => ({
        algorithm,
        algorithmPath: path.join(algorithmsRoot, algorithm),
    }));
}
