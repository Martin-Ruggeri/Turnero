import { useState } from "react"

export class ErrorHandler {
    constructor(forceUpdate: () => any) {
        this.forceUpdate = forceUpdate
    }

    private forceUpdate: () => any

    // Es un error genérico de un formulario, no asociado a ningún componente visual particular
    public errorMessage?: string = undefined

    public newErrorGeneric(message: string){
        this.errorMessage = message;
        this.forceUpdate();
    }


    // Son errores de los componentes visuales, ej: Input email.
    private errors: Map<string, string> = new Map<string, string>();

    public add(component: string, message: string) {
        this.errors.set(component, message);
        this.forceUpdate();
    }

    // Limpia las validaciones actuales de errores
    public clean() {
        this.errorMessage = undefined;
        this.errors.clear();
        this.forceUpdate();
    }

    public getErrorClass(component: string, baseClass: string) {
        return baseClass + (this.getErrorText(component) ? " is-invalid" : "");
    }

    // Devuelve el texto del error de un elemento
    public getErrorText(item: string) {
        return this.errors.get(item);
    }

    public hasErrors() {
        return this.errors.size > 0 && !this.errorMessage;
    }
}

export function useErrorHandler(): ErrorHandler {
    const forceUpdate = useForceUpdate();
    const handler = useState(new ErrorHandler(forceUpdate))[0];
    return handler;
}


function useForceUpdate() {
    const setForceUpdate = useState(0)[1];

    return () => {
        setForceUpdate(Date.now);
    }
}