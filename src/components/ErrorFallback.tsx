import React from 'react';
import {FallbackProps} from "react-error-boundary";
import {Alert, Button} from "@material-tailwind/react";

function ErrorFallback({error, resetErrorBoundary}: FallbackProps) {
    // Call resetErrorBoundary() to reset the error boundary and retry the render.

    return (
        <div className="flex justify-between items-center my-12 mx-auto w-1/3"><Alert color="red">
            <div className="flex justify-between items-center">
                <div>{error.message}</div>
                <Button variant="outlined" color="white" onClick={resetErrorBoundary}>Try again</Button></div>
        </Alert></div>
    );
}

export default ErrorFallback;