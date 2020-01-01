export default function generateCode(source: string) {
    return stripTracerParameter(stripTracerCalls(source));
}

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
