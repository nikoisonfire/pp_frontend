import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {ThemeProvider} from "@material-tailwind/react";
import {ErrorBoundary} from "react-error-boundary";
import ErrorFallback from "./components/ErrorFallback";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <ThemeProvider>
            <ErrorBoundary
                FallbackComponent={ErrorFallback}>
                <App/>
            </ErrorBoundary>
        </ThemeProvider>
    </React.StrictMode>,
)
