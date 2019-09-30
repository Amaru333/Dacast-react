import { ColorsApp } from "../../styled/types";

type Size = "large" | "small";

interface ModalCustomProps {
    size: string;
    title: string;
    icon?: { name: string; color: ColorsApp };
    opened: boolean;
    toggle: () => void;
}

export type ModalProps = ModalCustomProps & React.HTMLAttributes<HTMLDivElement>;

export interface ModalCardCustomProps {
    size: Size;
    title: string;
    icon?: { name: string; color: ColorsApp };
}

export type ModalCardProps = ModalCardCustomProps & React.HTMLAttributes<HTMLDivElement>