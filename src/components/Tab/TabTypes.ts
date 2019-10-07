interface TabSpecificProps {
    list: Array<string>;
    orientation: string;
    contentList: Array<Function>;
}

export type TabProps = TabSpecificProps & React.HTMLAttributes<HTMLDivElement>;