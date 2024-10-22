import { useCallback, useRef } from 'react';

interface UseDebounceProps<T extends unknown[]> {
    callback: (...args: T) => void;
    delay: number;
}

function useDebounce<T extends unknown[]>({ callback, delay }: UseDebounceProps<T>) {
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const debouncedCallback = useCallback((...args: T) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            callback(...args);
        }, delay);
    }, [callback, delay]);

    return debouncedCallback;
}

export default useDebounce;