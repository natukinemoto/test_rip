from JsonDataService import GetJsonData
from Constant import Const

# Mailのプロパティ
class Option:
    def __init__(self):
        # json取得
        path = Const().get_optionPath()
        json = GetJsonData().get_jsonData(path)
        
        self.optionRadioCheckSaturday = json[Const().get_optionRadioCheckSaturday()]
        
    def get_optionRadioCheckSaturday(self):
        return self.optionRadioCheckSaturday