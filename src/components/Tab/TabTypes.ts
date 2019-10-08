interface TabSpecificProps {
    list: string[];
    orientation: string;
    contentList: Function[];
}

export type TabProps = TabSpecificProps & React.HTMLAttributes<HTMLDivElement>;