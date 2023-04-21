import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import { showDialog2PickSavePath } from '../utils/dialog-pick-save-path';
// import { projectRoot } from '../utils';
import CustomScheme from './registerScheme';
let mainWindow;

function changeSaveDir(a, b) {
  const res = showDialog2PickSavePath();
  return res;
}

app.whenReady().then(() => {
  ipcMain.handle('dialog:change-save-dir', changeSaveDir);
  ipcMain.handle('path:get-default-save-path', () => app.getPath('desktop'));
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false,
      contextIsolation: false
      // preload: path.join(__dirname, '../preload/index.js'),
    }
  });
  if (process.argv[2]) {
    mainWindow.loadURL(process.argv[2]);
    mainWindow.webContents.openDevTools({ mode: 'undocked' });
  } else {
    CustomScheme.registerScheme();
    mainWindow.loadURL('electron-react://index.html');
    mainWindow.webContents.openDevTools({ mode: 'undocked' });
  }
});
