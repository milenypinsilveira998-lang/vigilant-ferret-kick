/// <reference types="vite/client" />

interface Window {
  fbq?: (
    command: string,
    eventName: string,
    parameters?: Record<string, any>
  ) => void;
}