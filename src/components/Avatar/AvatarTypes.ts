type Size = "large" | "small";

export interface AvatarCustomProps {
    name: string;
    size: Size;
    userRole?: string
}

export type AvatarProps = AvatarCustomProps & React.HTMLAttributes<HTMLDivElement>;