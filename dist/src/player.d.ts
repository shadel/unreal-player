interface UnrealWebRTCPlayer {
    Play: () => void;
    Stop: () => void;
}
declare const UnrealWebRTCPlayer: new (remoteVideo: HTMLVideoElement, alias: string, sid: string, ipAddress: string, port: string, useSecureWebsocket: boolean, useSingleWebRTCPort: boolean, WebRTCProtocol: string) => UnrealWebRTCPlayer;
export default UnrealWebRTCPlayer;
