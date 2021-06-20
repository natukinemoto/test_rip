import sys
import os
import os.path
import TkinterDnD2 as tkdnd2
if sys.version > "3.0":
    import tkinter as tk
else:
    import Tkinter as tk
from tkinter import ttk
from WindowResource import Window
from DragAndDropService import DnD2Helper
from EventHandlerService import EventHandler
from WindowFrameService import WindowFrame

# ウィンドウプロパティ取得
window = Window()

# ドラッグアンドドロップコントローラの呼び出し
DnD2 = DnD2Helper()

# GUIの作成(アプリケーションのタイトル設定)
api = tkdnd2.TkinterDnD.Tk(className = window.get_title())

# アプリケーションアイコンの設定
WindowFrame().cleate_mainIcon(api)

# アプリケーションのウィンドウサイズの設定
api.geometry(window.get_geometry())

# メインフレームの作成
frame = WindowFrame().get_frame(api)

# ウィジェットの作成及び設置
eventHandler = EventHandler()
eventHandler.input_path(frame)
eventHandler.button_send(frame)
eventHandler.button_mailEdit(frame)
eventHandler.lavelFrame_saturday(frame)

frame.pack()

# ドラッグアンドドロップコントローラのバインド
api.drop_target_register(tkdnd2.DND_FILES)
api.dnd_bind('<<DropEnter>>', DnD2.drop_enter)
api.dnd_bind('<<DropLeave>>', DnD2.drop_leave)
api.dnd_bind('<<DropPosition>>', DnD2.drop_position)
api.dnd_bind('<<Drop>>', DnD2.drop)

api.mainloop()