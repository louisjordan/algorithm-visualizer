import * as fs from 'fs';
import * as path from 'path';
import generateCode from '../';
import { algorithmPaths } from './utilities';

algorithmPaths().forEach(({ algorithmPath }) => {
    const files: string[] = fs.readdirSync(algorithmPath);
    const index = files.find((file) => file.startsWith('index'));
    if (!index) {
        throw new Error(`No index file found in ${algorithmPath}`);
    }
    const indexPath = path.join(algorithmPath, index);
    const content = fs.readFileSync(indexPath, 'utf-8');
    const functions = content.match(/^function.+^}/gms);

    if (!functions) {
        throw new Error('No functions to read');
    }

    const outputPath = path.join(algorithmPath, 'source.json');
    const output = JSON.stringify(
        {
            functions: functions.map(generateCode),
        },
        null,
        4
    );

    fs.writeFileSync(outputPath, output);
});
