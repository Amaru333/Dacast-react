import { Routes } from '../../containers/Navigation/NavigationTypes';

interface TabSpecificProps {
    list: Routes[];
    orientation: string;
    history: any;
}

export type TabProps = TabSpecificProps & React.HTMLAttributes<HTMLDivElement>;

// action: "POP"
// block: ƒ block(prompt)
// createHref: ƒ createHref(location)
// go: ƒ go(n)
// goBack: ƒ goBack()
// goForward: ƒ goForward()
// length: 50
// listen: ƒ listen(listener)
// location: {pathname: "/mainsettings/security", search: "", hash: "", state: undefined}
// push: ƒ push(path, state)
// replace: ƒ replace(path, state)