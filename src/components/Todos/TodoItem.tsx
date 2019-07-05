import { Checkbox, ListItem, ListItemText } from "@material-ui/core";
import * as React from "react";
import { ToggleTodoAction } from "../../redux-flow/store/Todos";

export interface TodoItemProps {
    todo: { name: string; done: boolean };
    id: number;
    toggleTodo: (todoId: number) => ToggleTodoAction;
    toggleTodoTimeout: (todoId: number) => ToggleTodoAction;
}

export default class TodoItem extends React.Component<TodoItemProps> {

    constructor(props: TodoItemProps) {
        super(props);
    }

    render() {
        const item = this.props.todo;
        return (
            <ListItem key={this.props.id} role={undefined} dense={true} button={true} onClick={this.toggleTodoBind}>
                <Checkbox
                    checked={item.done}
                    tabIndex={-1}
                    disableRipple={true}
                />
                <ListItemText primary={item.name} />
            </ListItem>
        );
    }

    toggleTodoBind = () => {
        this.props.toggleTodo(this.props.id);
    }
}
