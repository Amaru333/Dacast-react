import { NotificationType, Size } from '../../../../../components/Toast/ToastTypes';
import { Ad, ContentEngagementSettings, EngagementInfo } from '../../Settings/Engagement/types';

export enum ActionTypes {
    GET_CONTENT_ENGAGEMENT_SETTINGS = "@@content_engagement/GET_CONTENT_ENGAGEMENT_SETTINGS",
    SAVE_CONTENT_ENGAGEMENT_SETTINGS = "@@content_engagement/SAVE_CONTENT_ENGAGEMENT_SETTINGS",
    LOCK_SECTION = "@@content_engagement/LOCK_SECTION",
    SAVE_CONTENT_AD = "@@content_engagement/SAVE_CONTENT_AD",
    CREATE_CONTENT_AD = "@@content_engagement/CREATE_CONTENT_AD",
    DELETE_CONTENT_AD = "@@content_engagement/DELETE_CONTENT_AD",
    GET_UPLOAD_URL= "@@content_engagements/GET_UPLOAD_URL",
    UPLOAD_IMAGE= "@@content_engagements/UPLOAD_IMAGE",
    DELETE_IMAGE="@@content_engagements/DELETE_IMAGE"
}

export interface ContentEngagementContainerProps {
    contentEngagementState: ContentEngagementState;
    globalEngagementSettings: EngagementInfo;
    getContentEngagementSettings: (contentId: string, contentType: string) => Promise<void>;
    lockSection: (section: string, contentId: string, contentType: string, unlock?: boolean) => Promise<void>;
    saveContentEngagementSettings: (data: ContentEngagementSettings, contentType: string) => Promise<void>;
    saveContentAd: (data: Ad[], contentId: string, contentType: string) => Promise<void>;
    createContentAd: (data: Ad[], contentId: string, contentType: string) => Promise<void>;
    deleteContentAd: (data: Ad[], contentId: string, contentType: string) => Promise<void>;
    showToast: (text: string, size: Size, notificationType: NotificationType) => void;
    getUploadUrl: (uploadType: string, contentId: string, contentType: string) => Promise<void>;
    uploadContentImage: (data: File, uploadUrl: string) => Promise<void>;
    deleteContentImage: (targetId: string, contentType: string) => Promise<void>;
    getGlobalEngagementSettings: () => Promise<void>;
}

export interface EngagementComponentProps {
    globalEngagementSettings: EngagementInfo;
    localEngagementSettings: EngagementInfo;
    setLocalEngagementSettings: React.Dispatch<React.SetStateAction<EngagementInfo>>;
    setSettingsEdited: React.Dispatch<React.SetStateAction<boolean>>;
    lockSection?: (section: string, contentId: string, contentType: string, unlock?: boolean) => Promise<void>;
    contentId?: string;
    contentType?: string;
    saveContentEngagementSettings?: (data: ContentEngagementSettings, contentType: string) => Promise<void>;
    createAd?: (data: Ad[], contentId?: string, contentType?: string) => Promise<void>;
    saveAd?: (data: Ad[], contentId?: string, contentType?: string) => Promise<void>;
    deleteAd?: (data: Ad[], contentId?: string, contentType?: string) => Promise<void>;
    getUploadUrl?: (uploadType: string, contentId: string, contentType: string) => Promise<void>;
    uploadBrandImage?: (data: File, uploadUrl: string) => Promise<void>
    deleteFile?: (targetId: string, contentType?: string) => Promise<void>
    getEngagementSettings?: (contentId?: string, contentType?: string) => Promise<void>
}

export interface ContentEngagementState {
    [key: string]: {[key: string]: ContentEngagementSettings}
}