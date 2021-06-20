from EventHandlerService import EventHandler

# ドラッグアンドドロップ制御

inputPath = ""  # ドロップされたファイルのパスを監視するグローバル変数

class DnD2Helper:
    def drop_enter(self, event):
        event.widget.focus_force()
        return event.action
    
    def drop_leave(self, event):
        event.widget._root().focus_force()
        return event.action
    
    def drop_position(self, event):
        return event.action
    
    def drop(self, event):
        if event.data:
            global inputPath
            inputPath = event.data
            EventHandler().insert_path()
            return event.action