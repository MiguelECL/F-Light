/// <reference types="vite/client" />

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            REACT_APP_SEARCHFLIGHTS_URL?: string,
            REACT_APP_GETRESULT_URL?: string
        }
    }
}