type LogMethod = (...args: unknown[]) => void;

const timestamp = () => new Date().toISOString();

const createMethod = (sink: LogMethod, silent: boolean) => {
    return (...args: unknown[]) => {
        if (silent) {
            return;
        }

        sink(`[${timestamp()}]`, ...args);
    };
};

export const logger = {
    info: createMethod(
        console.info.bind(console),
        process.env.NODE_ENV !== "development",
    ),
    warn: createMethod(console.warn.bind(console), false),
    error: createMethod(console.error.bind(console), false),
} as const;
