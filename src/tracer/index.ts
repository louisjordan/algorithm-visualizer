export class Tracer<State> {
    state: State;
    history: { state: State; line: number }[];

    constructor() {
        this.state = {} as State;
        this.history = [];
    }

    reset() {
        this.state = {} as State;
        this.history = [];
    }

    set<T extends keyof State>(key: T, value: State[T]) {
        this.state[key] = value;
        return this;
    }

    get<T extends keyof State>(key: T): State[T] {
        return this.state[key];
    }

    at(index: number) {
        return this.history[index];
    }

    update(line: number) {
        this.history.push({
            state: JSON.parse(JSON.stringify(this.state)),
            line,
        });
    }
}
