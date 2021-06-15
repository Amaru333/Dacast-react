export type Size = "flexible" | "fixed";
export type NotificationType = "error" | "success" | "information" | "warning" | "notification" | "other";
export type NotificationPosition = "left" | "center" | "right";

export interface ToastType {
    text: string;
    timestamp: number;
    className?: string;
    size: Size;
    notificationType: NotificationType;
    permanent?: boolean;
    position?: NotificationPosition;
}

export interface ToastProps {
    toast: ToastType;
    hideToast: React.EventHandler<React.MouseEvent<HTMLDivElement>>;
}