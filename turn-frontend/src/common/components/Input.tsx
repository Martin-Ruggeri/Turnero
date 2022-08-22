import React from "react"
import { ErrorHandler } from "../utils/errorHandler"
import ErrorLabel from "./ErrorLabel"

interface InputProps {
    type?: "text" | "number" | "button" | "checkbox" | "date" | "email" | "file" | "password" | "radio",
    label: string,
    name: string,
    errorHandler: ErrorHandler,
    value?: string | undefined,
    onChange?: any,
    placeholder?: string,
    isDisabled?: boolean,
}

export function Input(props: InputProps) {
    return (
        <div className="form-group mb-4">
            <label htmlFor={props.name} className="form-label">{props.label}</label>
            <input id={props.name}
                name={props.name}
                type={props.type ? props.type : "text"}
                value={props.value}
                onChange={props.onChange}
                className={props.errorHandler.getErrorClass(props.name, "form-control")}
                placeholder = {props.placeholder}
                disabled = {props.isDisabled}>
            </input>
            <ErrorLabel message={props.errorHandler.getErrorText(props.name)} />
        </div>
    )
}