import * as path from 'path';
import { execSync } from 'child_process';
import { algorithmPaths } from './utilities';

describe('Algorithm code generator', () => {
    describe('matches snapshots', () => {
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
