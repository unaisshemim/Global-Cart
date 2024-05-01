import { ElectronAPI } from '@electron-toolkit/preload'
interface Product {
  prize: string
  name: string
}
declare global {
  interface Window {
    electron: ElectronAPI
    api: unknown
    gemini: {
      gemini: (link: string) => Promise<Product>
    }
  }
}
