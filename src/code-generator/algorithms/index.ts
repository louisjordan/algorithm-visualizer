import * as fs from 'fs';
import * as path from 'path';
import generateCode from '../';
import { algorithmPaths } from './utilities';

algorithmPaths().forEach(({ algorithmPath }) => {
    const files: string[] = fs.readdirSync(algorithmPath);
    const algorithmFile = files.find((file) => file.startsWith('algorithm.'));
    if (!algorithmFile) {
        throw new Error(`No algorithm file found in ${algorithmPath}`);
    }
    const algorithmFilePath = path.join(algorithmPath, algorithmFile);
    const content = fs.readFileSync(algorithmFilePath, 'utf-8');
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

    let currentContent = '';
    try {
        currentContent = fs.readFileSync(outputPath, 'utf-8');
    } catch (e) {}

    if (output !== currentContent) {
        fs.writeFileSync(outputPath, output);
    }
});
