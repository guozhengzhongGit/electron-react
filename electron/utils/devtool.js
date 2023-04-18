import { app, BrowserWindow, session } from "electron";
import fs from "fs";
import os, { homedir } from "os";
import path, { join } from "path";

const REACT_DEVELOPER_TOOLS = "fmkadmapgofadopljbjfkapdkoienihi";
const VUE_JS_DEVTOOLS = "nhdogjmejiglipccpnnnanhbledajbpd";

const home = homedir();
const dir = (...paths) => join(home, ...paths);


 // 在 macOS 下
 // 在 macOS下为~/Library/Application Support/Google/Chrome/Default/Extensions。
 /** Chrome 用户数据基础目录 */
const ChromeUseDataBaseDirMap = {
  darwin: dir("/Library/Application Support/Google/Chrome"),
};

const profileDirRegex = /^Default$|^Profile \d+$/;
const chromeUseDataBaseDir = ChromeUseDataBaseDirMap[process.platform];


export function loadDevTools () {
  // if (app.isPackaged) return;
  // if (session.defaultSession.getExtension(REACT_DEVELOPER_TOOLS)) return;
  // if (!fs.existsSync(chromeUseDataBaseDir)) return;

  // const profilePaths = [];
  // fs.readdirSync(chromeUseDataBaseDir).forEach((it) => {
  //   if (!profileDirRegex.test(it)) return;

  //   const path = join(chromeUseDataBaseDir, it);
  //   const dir = fs.statSync(path);

  //   if (dir.isDirectory()) profilePaths.push(path);

  // });

  // const reactDevToolPath = profilePaths
  //   .map((it) => {
  //     const path = join(it, "Extensions", REACT_DEVELOPER_TOOLS);

  //     if (!fs.existsSync(path)) return false;

  //     return fs
  //       .readdirSync(path)
  //       .map((it) => {
  //         const sp = join(path, it);
  //         const dir = fs.statSync(path);

  //         if (dir.isDirectory() && fs.existsSync(join(sp, "manifest.json")))
  //           return sp;

  //         return;
  //       })
  //       .filter(Boolean)[0];
  //   })
  //   .filter(Boolean)[0];

  // 在 macOS 下
const reactDevToolsPath = path.join(
  os.homedir(),
  '/Library/Application Support/Google/Chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/4.27.3_0'
)

    // if (reactDevToolPath) {
      console.log(`React DevTools Path:>> `, reactDevToolsPath);
      session.defaultSession.loadExtension(reactDevToolsPath,  { allowFileAccess: true });
    // }
}

/**
 * 打开 Devtools
 */
export function openDevTools($win) {
  if (!$win) return;
  if (app.isPackaged) return;

  $win.webContents.openDevTools({ mode: "detach" });
}

/**
 * 关闭 Devtools
 */
export function closeDevTools($win) {
  if (!$win) return;
  if (app.isPackaged) return;

  $win.webContents.closeDevTools();
}