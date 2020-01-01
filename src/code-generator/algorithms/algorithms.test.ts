import * as path from 'path';
import { exec } from 'child_process';
import { algorithmPaths } from './utilities';

describe('Algorithm code generator', () => {
    describe('matches snapshots', () => {
        beforeAll(() => {
            exec('npm run build-sources');
        });

        algorithmPaths().forEach(({ algorithm, algorithmPath }) => {
            it(`should match ${algorithm} snapshot`, () => {
                expect(
                    JSON.stringify(
                        require(path.join(algorithmPath, 'source.json'))
                    )
                ).toMatchSnapshot();
            });
        });
    });
});
