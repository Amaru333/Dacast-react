import { Button, Grid, Paper } from "@material-ui/core";
import * as React from "react";
import { ValidatorForm, TextValidator,  } from "react-material-ui-form-validator";
import { AddTodoAction } from "../../redux-flow/store/Todos";

export interface TodoAddProps {
    addTodo: (value: string) => AddTodoAction;
}
export interface TodoAddState {
    inputTodoValue: string;
}

export default class TodoAdd extends React.Component<TodoAddProps, TodoAddState> {

    private formRef = React.createRef<ValidatorForm>();

    constructor(props: TodoAddProps) {
        super(props);

        this.handleTodoValueChange = this.handleTodoValueChange.bind(this);
        this.handleAddTodo = this.handleAddTodo.bind(this);

        this.state = {
            inputTodoValue: "",
        };
    }

    handleTodoValueChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            inputTodoValue: event.target.value,
        });
    }

    handleAddTodo() {
        this.props.addTodo(this.state.inputTodoValue);
        this.setState({
            inputTodoValue: "",
        });
    }

    render() {
        return (
            <Paper style={{ margin: 16, padding: 16 }} >
                <ValidatorForm
                    ref={this.formRef}
                    onSubmit={this.handleAddTodo}
                >
                    <Grid container={true}>
                        <Grid xs={10} md={11} item={true} style={{ paddingRight: 16 }}>
                            <TextValidator
                                name="Test123"
                                errorMessages={["Min. 4 characters"]}
                                placeholder="Add Todo here"
                                value={this.state.inputTodoValue}
                                onChange={this.handleTodoValueChange}
                                fullWidth={true}
                                validators={["minStringLength:4"]}
                            />
                        </Grid>
                        <Grid xs={2} md={1} item={true} >
                            <Button
                                fullWidth={true}
                                color="secondary"
                                variant="outlined"
                                type="submit"
                            >
                                Add
                            </Button>
                        </Grid>
                    </Grid>
                </ValidatorForm>
            </Paper>
        );
    }
}
