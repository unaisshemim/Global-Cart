import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import puppeteer from 'puppeteer'
const { GoogleGenerativeAI } = require('@google/generative-ai')

const dotenv = require('dotenv')
dotenv.config()

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    center: true,
    title: 'UNICART',

    vibrancy: 'under-window',
    visualEffectState: 'active',

    trafficLightPosition: { x: 10, y: 10 },

    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: true,
      contextIsolation: true
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.

app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test

  ipcMain.handle('getGemini', async (_, link: string) => {
    return gemini(link)
  })

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.

//screenshot
const screenshot = async (link): Promise<string> => {
  // Launch the browser and open a new blank page

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  })
  const page = await browser.newPage()
  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36'
  )

  await page.setViewport({ width: 1100, height: 800 })

  await page.goto(link)

  const screenshotBase64 = await page.screenshot({ encoding: 'base64' })
  await browser.close()
  return screenshotBase64
}

const gemini = async (link: string): Promise<object> => {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API)
  const model = genAI.getGenerativeModel({ model: 'gemini-pro-vision' })

  function base64ToGenerativePart(base64Data, mimeType): object {
    return {
      inlineData: {
        data: base64Data,
        mimeType
      }
    }
  }
  async function getProductData(link): Promise<object> {
    const screenshotBase64 = await screenshot(link)
    const imageParts = [base64ToGenerativePart(screenshotBase64, 'image/png')]
    const prompt =
      'i will send you a screenshot of product page you should return me a json string  that contain only  product prize and product full name which exaclty look like {prize:{prize},name:{product name}}'
    const result = await model.generateContent([prompt, ...imageParts])
    const response = result.response
    const text = response.text()
    const cleanedJsonString = text.replace(/^json\s*/, '').replace(/`/g, '')
    const hi = cleanedJsonString.replace(/^json\s*/, '').trim()
    const cleanedString = hi.replace(/^json\n/, '').replace(/\n$/, '')

    // Parse the cleaned JSON string into a JavaScript object
    const jsonObject = JSON.parse(cleanedString)

    return jsonObject
  }
  const data = getProductData(link)
  console.log(data)

  return data
}
