import { execSync } from 'child_process';

// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';

// build algorithm source files
execSync('npm run build-sources');

// mock README imports
jest.mock(`!raw-loader!./README.md`, () => '', { virtual: true });
