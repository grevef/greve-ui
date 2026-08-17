import type { NuiMessage } from '../types';

// The game's CEF browser injects `invokeNative`; it's absent when the page
// is just opened in a regular dev browser tab.
export const isEnvBrowser = (): boolean => !(window as unknown as { invokeNative?: unknown }).invokeNative;

// Simulates the client script's SendNUIMessage by re-dispatching a
// `message` event, so the app reacts exactly as it would in-game.
export const sendMockMessage = (message: NuiMessage): void => {
  window.postMessage(message, '*');
};
