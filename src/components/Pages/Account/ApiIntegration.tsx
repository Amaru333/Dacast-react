import * as React from "react";

export interface ApiIntegrationProps {
    // Your props here
}

export class ApiIntegration extends React.Component<ApiIntegrationProps> {

    constructor(props: ApiIntegrationProps) {
        super(props);
        console.log(props)
    }

    render() {
        return (
            <React.Fragment>
                {/** Render here */}
            </React.Fragment>
        );
    }
}

