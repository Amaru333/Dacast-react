import { NotificationType, Size } from '../../../../../components/Toast/ToastTypes';
import { ContentType } from '../../Common/types';
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
    getContentEngagementSettings: (contentId: string, contentType: ContentType) => Promise<void>;
    lockSection: (section: string, contentId: string, contentType: ContentType, unlock?: boolean) => Promise<void>;
    saveContentEngagementSettings: (data: ContentEngagementSettings, contentType: ContentType) => Promise<void>;
    saveContentAd: (data: Ad[], contentId: string, contentType: ContentType) => Promise<void>;
    createContentAd: (data: Ad[], contentId: string, contentType: ContentType) => Promise<void>;
    deleteContentAd: (data: Ad[], contentId: string, contentType: ContentType) => Promise<void>;
    showToast: (text: string, size: Size, notificationType: NotificationType) => void;
    getUploadUrl: (contentId: string, contentType: ContentType) => Promise<void>;
    uploadContentImage: (data: File, uploadUrl: string) => Promise<void>;
    deleteContentImage: (targetId: string, contentType: ContentType) => Promise<void>;
    getGlobalEngagementSettings: () => Promise<void>;
}

export interface EngagementComponentProps {
    globalEngagementSettings: EngagementInfo;
    localEngagementSettings: EngagementInfo;
    setLocalEngagementSettings: React.Dispatch<React.SetStateAction<EngagementInfo>>;
    setSettingsEdited: React.Dispatch<React.SetStateAction<boolean>>;
    lockSection?: (section: string, contentId: string, contentType: ContentType, unlock?: boolean) => Promise<void>;
    contentId?: string;
    contentType?: ContentType;
    saveContentEngagementSettings?: (data: ContentEngagementSettings, contentType: ContentType) => Promise<void>;
    createAd?: (data: Ad[], contentId?: string, contentType?: ContentType) => Promise<void>;
    saveAd?: (data: Ad[], contentId?: string, contentType?: ContentType) => Promise<void>;
    deleteAd?: (data: Ad[], contentId?: string, contentType?: ContentType) => Promise<void>;
    getUploadUrl?: (contentId: string, contentType: ContentType) => Promise<void>;
    uploadBrandImage?: (data: File, uploadUrl: string) => Promise<void>
    deleteFile?: (targetId: string, contentType?: ContentType) => Promise<void>
    getEngagementSettings?: (contentId?: string, contentType?: ContentType) => Promise<void>
}

export type EngagementSectionsLock = 'brand-image' | 'ads' | 'brand-text' | 'end-screen-text';

export interface ContentEngagementState {
    [key: string]: {[key: string]: ContentEngagementSettings}
}