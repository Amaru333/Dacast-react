import { List } from "@material-ui/core";
import * as React from "react";
import { AddTodoAction, Todo, ToggleTodoAction } from "../../redux-flow/store/Todos";
import TodoAdd from "./TodoAdd";
import TodoItem from "./TodoItem";

export interface TodoListProps {
    todos: Todo[];
    toggleTodo: (todoId: number) => ToggleTodoAction;
    addTodo: (value: string) => AddTodoAction;
    toggleTodoTimeout: (todoId: number) => ToggleTodoAction;
}

export class TodoList extends React.Component<TodoListProps> {

    render() {
        const renderItems = () => {
            return this.props.todos.map((todo) => 
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    id={todo.id}
                    toggleTodo={this.props.toggleTodo}
                    toggleTodoTimeout={this.props.toggleTodoTimeout}
                />
            )
        };

        return (
            <List>
                <TodoAdd addTodo={this.props.addTodo} />
                {renderItems()}
            </List>
        );
    }
}
