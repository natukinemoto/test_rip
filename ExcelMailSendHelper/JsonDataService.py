import json
import os

# JsonData取得
class GetJsonData:
    def get_jsonData(self, path):
        dirName = os.getcwd()
        jsonPath = os.path.join(dirName, *path)
        jsonOpen = open(jsonPath, "r", encoding="utf-8")
        return json.load(jsonOpen)
    
    def dump_jsonData(self, path, jsonList):
        dirName = os.getcwd()
        jsonPath = os.path.join(dirName, *path)
        jsonOpen = open(jsonPath, "w", encoding="utf-8")
        return json.dump(jsonList, jsonOpen, indent=4, ensure_ascii=False)