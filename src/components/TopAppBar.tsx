import { AppBar, IconButton, Toolbar, Typography } from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import * as React from "react";

export class TopAppBar extends React.Component<{}> {

    render() {
        return (
            <AppBar position="static">
                <Toolbar>
                    <IconButton color="inherit" aria-label="Menu">
                        <Menu />
                    </IconButton>
                    <Typography variant="h6" color="inherit">
                        Todo App React / Redux / Typescript
                    </Typography>
                </Toolbar>
            </AppBar>
        );
    }
}
