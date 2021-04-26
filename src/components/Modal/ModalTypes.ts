import { ColorsApp } from "../../styled/types";

type Size = "large" | "medium" | "small";

interface ModalCustomProps {
    size: string;
    modalTitle: string;
    icon?: { name: string; color: ColorsApp };
    opened: boolean;
    hasClose: boolean;
    toggle: () => void;
    overlayIndex? : number;
    allowNavigation: boolean;
}

export type ModalProps = ModalCustomProps & React.HTMLAttributes<HTMLDivElement>;

export interface ModalCardCustomProps {
    size: Size;
    title: string;
    icon?: { name: string; color: ColorsApp };
}

export type ModalCardProps = ModalCardCustomProps & React.HTMLAttributes<HTMLDivElement>

export interface PaymentModalCustomProps {
    toggle: () => void;
    opened: boolean
}

export type PaymentModalProps = PaymentModalCustomProps & React.HTMLAttributes<HTMLDivElement>
