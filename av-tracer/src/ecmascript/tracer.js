module.exports.Tracer = function Tracer() {
    var breakpoints = [];

    function pushBreakpoint(type, line, state) {
        breakpoints.push({
            type: type,
            line: line,
            state: JSON.parse(JSON.stringify(state)),
        });
    }

    return {
        declaration: function declaration(line, state) {
            pushBreakpoint("declaration", line, state);
        },
        assignment: function assignment(line, state) {
            pushBreakpoint("assignment", line, state);
        },
        write: function write() {
            require("fs").writeFileSync(require("process").env.TRACE_DEST, JSON.stringify(breakpoints));
        }
    };
};
