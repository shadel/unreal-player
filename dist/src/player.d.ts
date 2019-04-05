interface UnrealWebRTCPlayer {
    Play: () => void;
    Stop: () => void;
}
export interface UPlayerOptions {
    remoteVideo: HTMLVideoElement;
    alias: string;
    sid: string;
    ipAddress: string;
    port: string;
    useSecureWebsocket: boolean;
    useSingleWebRTCPort: boolean;
    WebRTCProtocol: string;
    onError?: (type: U_ERROR_TYPE, err?: any) => void;
}
export declare enum U_ERROR_TYPE {
    CREATE_SESSION_DESCRIPTION = 0,
    CONNECTION_FAILED = 1,
    CREATE_WEBSOCKET = 2,
    CONNECT_UNREAL_FAILED = 3,
    ERROR_FROM_WEBSOCKET = 4
}
declare const UnrealWebRTCPlayer: new (options: UPlayerOptions) => UnrealWebRTCPlayer;
export default UnrealWebRTCPlayer;
