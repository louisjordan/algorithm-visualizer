import { deepFreeze } from 'utilities';

type Trace<State> = { state: State; line: number };

export class Tracer<State> {
    state: State;
    history: Trace<State>[];

    constructor() {
        this.state = {} as State;
        this.history = [];
    }

    reset() {
        this.state = {} as State;
        this.history = [];
    }

    assign<T extends keyof State>(key: T, value: State[T]) {
        this.state[key] = value;
        return this;
    }

    get<T extends keyof State>(key: T): State[T] {
        return this.state[key];
    }

    at(index: number): Trace<State> | null {
        if (index >= 0) {
            return this.history[index] || null;
        } else {
            return this.history[this.history.length + index] || null;
        }
    }

    break(line: number) {
        this.history.push({
            state: deepFreeze(JSON.parse(JSON.stringify(this.state))),
            line,
        });
    }
}
