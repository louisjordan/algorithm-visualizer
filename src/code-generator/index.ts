export default function generateCode(source: string) {
    return stripTracerParameter(stripTracerCalls(source));
}

const DEFAULT_TRACER_TOKEN = 'tracer';

export function stripTracerParameter(
    source: string,
    name: string = DEFAULT_TRACER_TOKEN
) {
    return source
        .replace(/^\s*tracer:.+,\s/gm, '')
        .replace(/tracer:.+,\s?/g, '')
        .replace(/,\stracer:.+(?=\))/g, '')
        .replace(/tracer,\s?/g, '')
        .replace(/,\stracer(?=\))/g, '');
}

export function stripTracerCalls(
    source: string,
    name: string = DEFAULT_TRACER_TOKEN
) {
    return source.replace(/\s+tracer\..+?;/gms, '');
}
