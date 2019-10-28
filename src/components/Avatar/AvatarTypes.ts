type Size = "large" | "small";

export interface AvatarCustomProps {
    name: string;
    size: Size;
}

export type AvatarProps = AvatarCustomProps & React.HTMLAttributes<HTMLDivElement>;