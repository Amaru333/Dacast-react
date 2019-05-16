import * as React from "react";
import { Provider } from "react-redux";
import { Store } from "redux";

import { TopAppBar } from "./components/TopAppBar";
import TodoList from "./containers/TodoList";
import { ApplicationState } from "./redux-flow/store";

// Import Main styles for this application
import "./scss/style.scss";

// Any additional component props go here.
interface MainProps {
    store: Store<ApplicationState>;
}

// Create an intersection type of the component props and our Redux props.
const Main: React.FC<MainProps> = ({ store }: MainProps) => {
    return (
        <Provider store={store}>
            <TopAppBar/>
            <TodoList />
        </Provider>
    );
};

// Normally you wouldn't need any generics here (since types infer from the passed functions).
// But since we pass some props from the `index.js` file, we have to include them.
// For an example of a `connect` function without generics, see `./containers/LayoutContainer`.
export default Main;
