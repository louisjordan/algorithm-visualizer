export interface Tracer {
    state: { [key: string]: any };
    set(key: string, value: any): Tracer;
    get(key: string): any;
    update: {
        (): void;
        (key: string, value: any): void;
    };
}

export class MockTracer implements Tracer {
    state: { [key: string]: any };
    constructor() {
        this.state = [];
    }
    set(key: string, value: any) {
        return this;
    }
    get(key: string) {}
    update(key?: string, value?: any) {
        return this;
    }
}

export class StateTracer implements Tracer {
    state: { [key: string]: any };
    history: { value: { [key: string]: any } }[];

    constructor() {
        this.state = {};
        this.history = [];
    }

    set(key: string, value: any) {
        this.state[key] = JSON.parse(JSON.stringify(value));
        return this;
    }

    get(key: string) {
        return this.state[key];
    }

    at(index: number) {
        return this.history[index];
    }

    update(key?: string, value?: any) {
        console.log(arguments.length ? Array.from(arguments) : 'n/a');

        if (arguments.length === 2) {
            this.set(arguments[0], arguments[1]);
        }

        this.history.push({ value: JSON.parse(JSON.stringify(this.state)) });
    }
}
