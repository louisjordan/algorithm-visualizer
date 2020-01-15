import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        fonts: {
            headers: string;
            body: string;
        };

        colours: {
            // [0] = base colour
            // [1->n] = lighter/dark variations
            background: string[];
            button: string[];
            primary: string[];
            headers: string[];
            body: string[];
        };
    }
}
