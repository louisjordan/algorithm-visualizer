function generateCode(source: string) {}

const DEFAULT_TRACER_TOKEN = 'tracer';

export function stripTracerParameter(
    source: string,
    name: string = DEFAULT_TRACER_TOKEN
) {
    return source;
}

export function stripTracerCalls(
    source: string,
    name: string = DEFAULT_TRACER_TOKEN
) {
    return source.replace(/tracer.+;/gim, '');
}
