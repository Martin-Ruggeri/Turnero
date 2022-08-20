import React from "react";

export class Login extends React.Component{

    constructor(props: {}){
        super(props);

        this.state = {newIten: false}
    }

    render(): React.ReactNode {
        return(
            <div className="container">
                Hoola login
            </div>
        );
    }
}