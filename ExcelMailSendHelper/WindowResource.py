from JsonDataService import GetJsonData
from Constant import Const

# windowのプロパティ
class Window:
    def __init__(self):
        # json取得
        path = Const().get_windowPath()
        pathMailEdit = Const().get_mailEditPath()
        json = GetJsonData().get_jsonData(path)
        jsonMailEdit = GetJsonData().get_jsonData(pathMailEdit)
        
        self.title = json[Const().get_windowTitle()]
        self.geometry = json[Const().get_windowGeometry()]
        icon = json[Const().get_windowIcon()]
        self.icon = icon
        self.folderName = icon[Const().get_windowFolderName()]
        self.FileName = icon[Const().get_windowFileName()]
        
        self.titleMailEdit = jsonMailEdit[Const().get_windowTitle()]
        self.geometryMailEdit = jsonMailEdit[Const().get_windowGeometry()]
        iconMailEdit = jsonMailEdit[Const().get_windowIcon()]
        self.iconMailEdit = iconMailEdit
        self.folderNameMailEdit = iconMailEdit[Const().get_windowFolderName()]
        self.FileNameMailEdit = iconMailEdit[Const().get_windowFileName()]
    
    # メインウィンドウ
    def get_title(self):
        return self.title
    def get_geometry(self):
        return self.geometry
    def get_icon(self):
        return self.icon
    def get_folderName(self):
        return self.folderName
    def get_FileName(self):
        return self.FileName
    
    # メール編集ウィンドウ
    def get_titleMailEdit(self):
        return self.titleMailEdit
    def get_geometryMailEdit(self):
        return self.geometryMailEdit
    def get_iconMailEdit(self):
        return self.iconMailEdit
    def get_folderNameMailEdit(self):
        return self.folderNameMailEdit
    def get_FileNameMailEdit(self):
        return self.FileNameMailEdit