interface TabSpecificProps {
    list: Array<string>;
    orientation: string;
    contentList: Array<React.FunctionComponent>;
}

export type TabProps = TabSpecificProps & React.HTMLAttributes<HTMLDivElement>;