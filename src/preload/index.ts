import { contextBridge, ipcRenderer } from 'electron/renderer'

// Custom APIs for renderer

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
contextBridge.exposeInMainWorld('gemini', {
  gemini: (link: string) => ipcRenderer.invoke('getGemini', link)
})
