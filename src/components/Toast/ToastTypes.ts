export type Size = "flexible" | "fixed";
export type NotificationType = "error" | "success" | "information" | "warning" | "other";

export interface ToastType {
    text: string;
    timestamp: number;
    className?: string;
    size: Size;
    notificationType: NotificationType;
}

export interface ToastProps {
    toast: ToastType;
    hideToast: React.EventHandler<React.MouseEvent<HTMLDivElement>>;
}