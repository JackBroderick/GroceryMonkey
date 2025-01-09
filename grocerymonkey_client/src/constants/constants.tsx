
export const restAPIURL = process.env.NODE_ENV === 'production' ? '' : 'http://nodeserver:8080';

export const xheader = {
    "Content-Type": "application/json"
};

export const shared_Key = 13371;

export interface ImMonkeyData {
    groceryListItems: Array<ImMonkeyData_GroceryListItems>;
    users: Array<ImMonkeyData_Users>;
    groceryItemStatus: Array<ImMonkeyData_Status>;
    distinctGroceryListItems: Array<ImMonkeyData_Lookup>;
    emojilookup: Array<ImEmojiLookup>;
};

export interface ImMonkeyData_Users {
    user_id: number;
    name: string;
    pin?: string;
    email?: string;
    sms?: string;
    notify?: boolean;
    banana_count?: number;
};

export interface ImMonkeyData_Status {
    statusID: number;
    status: string;
    action_new: boolean;
    action_sameuser: boolean;
    action_type: number;
    status_verb: string;
    status_active: boolean;
};

export interface ImMonkeyData_Lookup {
    item: string;
    code: string;
    itemUpdate?: string;
};

export interface ImMonkeyData_GroceryListItems {
    grocery_list_id: number;
    date: string;
    item: string;
    count: number;
    code: string;
    notes: string;
    status_id: number;
    status: string;
    status_verb: string;
    status_active: boolean;
    user_id: number;
    username: string;
    photo: boolean;
    photo_location: string;
};

export interface ImMonkeyData_State {
    itemNew: boolean;
    itemActionType: number;
    itemID: number;
    itemDate: string;
    itemName: string;
    itemCount: number;
    itemCode: string;
    itemNotes: string;
    itemStatusID: number;
    itemStatus: string;
    itemStatusVerb: string;
    itemStatusActive: boolean;
    itemUserID: number;
    itemUserName: string;
    itemChanged: boolean;
    itemPhoto: boolean;
    itemPhotoURI: any;
};

export interface ImMonkeyData_UpdateParams {
    userName: string;
    userID: number;
    monkeyData: Array<ImMonkeyData_State>
}

export interface ImMonkeyBanana_History {
    banMonth: string;
    banUserID: number;
    banUserName: string;
    banCount: number;
}

export interface Imemoji_Match {
    item: string;
    match: string;
}

export interface ImConfig {
    configID: number;
    adminPin: string;
    notifications: boolean;
    emailUserName: string;
    emailUserPassword: string;
    smtpServer: string;
    portNumber: number;
    ssl: boolean;
    domain: string;
    emailAlias: string;
    appURL: string;
    httpPort: number;
    httpsPort: number;
}

export interface ImEmoji_Modes {
    modify: number;
    select: number;
}

export const emojiModeConstants:ImEmoji_Modes = {
    modify: 1,
    select: 2,
}

export interface ImEmojiLookup {
    code: string;
    key: string;
}

export interface IM_emoji {
    emoji: string;
    key: string;
}

