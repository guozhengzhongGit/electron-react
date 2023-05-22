import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import { autoUpdater } from 'electron-updater';
import { showDialog2PickSavePath } from '../utils/dialog-pick-save-path';
// import { projectRoot } from '../utils';
import CustomScheme from './registerScheme';
let mainWindow;

const messageMap = {
  error: '检查更新出错',
  checking: '正在检查更新……',
  updateAva: '检测到新版本，正在下载……',
  updateNotAva: '现在使用的就是最新版本，不用更新'
};

function changeSaveDir(a, b) {
  const res = showDialog2PickSavePath();
  return res;
}

function sendUpdateMessage(text) {
  mainWindow.webContents.send('update:message', text);
}
autoUpdater.autoDownload = false;
autoUpdater.on('error', (error) => {
  sendUpdateMessage(`${messageMap.error}: ${error}`);
});
autoUpdater.on('checking-for-update', () => {
  sendUpdateMessage(messageMap.checking);
});
autoUpdater.on('update-available', (info) => {
  dialog
    .showMessageBox({
      type: 'info',
      title: '应用有新的版本',
      message: '发现新版本，是否现在更新？',
      buttons: ['是', '否']
    })
    .then((res) => {
      if (res.response === 0) {
        autoUpdater.downloadUpdate();
        sendUpdateMessage(messageMap.updateAva);
      }
    });
});

app.whenReady().then(() => {
  ipcMain.handle('dialog:change-save-dir', changeSaveDir);
  ipcMain.handle('path:get-default-save-path', () => app.getPath('desktop'));
  ipcMain.on('update:checkForUpdate', () => {
    console.log('检测更新');
    autoUpdater.checkForUpdates();
  });
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
    // mainWindow.webContents.openDevTools({ mode: 'undocked' });
  }
});
