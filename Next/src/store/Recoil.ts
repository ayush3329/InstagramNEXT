import { atom } from "recoil";

export const error = atom({
    key: "error",
    default: false
})

export const errorMessage = atom({
    key: "errorMessage",
    default: ""
})

export const webSocketRef = atom<WebSocket|null>({
    key: "webSocketRef",
    default: null
})

export const LogoutModal = atom({
    key: 'LogoutModalState',
    default: false
})

export const showOnlyLogo = atom({
    key: 'showOnlyLogo',
    default: true
})

export const createSectionState = atom({
    key: "createSectionState",
    default: true,
});
  
export const loaderState = atom({
    key: "loaderState",
    default: false,
});

export const Random = atom<string>({
    key: "Random",
    default: "ayush"
})
  