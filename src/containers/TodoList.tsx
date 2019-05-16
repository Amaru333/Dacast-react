import { connect } from "react-redux";
import { TodoList } from "../components/Todos/TodoList";
import { ThunkDispatch } from 'redux-thunk';

import { ApplicationState } from "../redux-flow/store";
import { Action, addTodo, toggleTodo, toggleTodoTimeout } from "../redux-flow/store/Todos";

export function mapStateToProps( state: ApplicationState) {
    return {
        todos: state.todos.data,
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        addTodo: (name: string) => dispatch( addTodo(name) ),
        toggleTodo: (todoId: number) => dispatch( toggleTodo(todoId) ),
        toggleTodoTimeout: (todoId: number) => dispatch( toggleTodoTimeout(todoId) ),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
