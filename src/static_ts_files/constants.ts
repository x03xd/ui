declare global {
    interface Window {
        _env_: {
            PROTOCOL?: string;
            BACKEND_HOST?: string;
            FRONTEND_HOST?: string;
        };
    }
}

/* GLOBAL */
const protocol: string | undefined = window._env_.PROTOCOL;

/* BACKEND */
const backendServiceIP: string | undefined = window._env_.BACKEND_HOST;
export const backendURL: string = `${protocol}://${backendServiceIP}`;

/* BACKEND */
const frontendServiceIP: string | undefined = window._env_.FRONTEND_HOST;
export const frontendURL: string = `${protocol}://${frontendServiceIP}`;

