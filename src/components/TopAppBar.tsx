import { AppBar, IconButton, Toolbar, Typography } from "@material-ui/core";
import * as React from "react";

export class TopAppBar extends React.Component<{}> {

    render() {
        return (
            <AppBar position="static">
                <Toolbar>
                    <IconButton color="inherit" aria-label="Menu">
                    </IconButton>
                    <Typography variant="h6" color="inherit">
                        Todo App React / Redux / Typescript
                    </Typography>
                </Toolbar>
            </AppBar>
        );
    }
}
