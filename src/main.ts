import path from "path";
import { BrowserWindow, app } from "electron";

// 開発モードの場合はホットリロードする
if (process.env.NODE_ENV === "development") {
  const execPath =
    process.platform === "win32"
      ? "../node_modules/electron/dist/electron.exe"
      : "../node_modules/.bin/electron";

  require("electron-reload")(__dirname, {
    electron: path.resolve(__dirname, execPath),
  });
}

// BrowserWindow インスタンスを作成する関数
const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 1328,
    height: 900,
    webPreferences: {
      preload: path.resolve(__dirname, "preload.js"),
    },
  });

  // レンダラープロセスをロード
  mainWindow.loadFile("dist/index.html");
};

// アプリの起動イベント発火で上の関数を実行
app.whenReady().then(createWindow);

// すべてのウィンドウが閉じられたらアプリを終了する
app.once("window-all-closed", () => app.quit());
