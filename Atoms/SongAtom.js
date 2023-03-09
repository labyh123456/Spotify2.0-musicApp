import { atom } from "recoil";
export const currentTrackIdState = atom({
    key: "currentTrackIdState",  // unique id (With Request to others atoms / selectors)
    default: null,
});

export const isPlayingState = atom({
    key: "isPlayingState",
    default: false
});