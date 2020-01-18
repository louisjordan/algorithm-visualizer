import { useRef, useEffect } from 'react';

export function useInterval(callback: () => void, delay: number | null) {
    const callbackRef = useRef(callback);

    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    useEffect(() => {
        function tick() {
            callbackRef.current();
        }

        if (delay !== null) {
            const timer = setInterval(tick, delay);
            return () => clearInterval(timer);
        }
    }, [delay]);
}
