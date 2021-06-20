import os
import os.path
import sys
if sys.version > "3.0":
    import tkinter as tk
else:
    import Tkinter as tk
from tkinter import ttk
from WindowResource import Window

class WindowFrame:
    # フレームの作成
    def get_frame(self, api):
        self.frame = ttk.Frame(api)
        self.frame.pack(padx=10,pady=10)
        return self.frame
    
    # アイコン設定
    def cleate_mainIcon(self, api):
        # ウィンドウプロパティ取得
        window = Window()
        dirName = os.getcwd()
        icon = [window.get_folderName(), window.get_FileName()]
        iconPath = os.path.join(dirName, *icon)
        api.iconphoto(True, tk.PhotoImage(file = iconPath))
    def cleate_mainIconMailEdit(self, api):
        # ウィンドウプロパティ取得
        window = Window()
        dirName = os.getcwd()
        icon = [window.get_folderNameMailEdit(), window.get_FileNameMailEdit()]
        iconPath = os.path.join(dirName, *icon)
        api.iconphoto(True, tk.PhotoImage(file = iconPath))