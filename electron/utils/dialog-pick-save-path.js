import { app, dialog } from 'electron';
export function showDialog2PickSavePath() {
  return dialog.showOpenDialogSync({
    properties: ['openDirectory'],
    title: '对话框窗口的标题',
    defaultPath: app.getPath('downloads'), // 打开文件选择器的哪个路径 需要输入一个有效路径
    buttonLabel: '选定目录'
  });
}
