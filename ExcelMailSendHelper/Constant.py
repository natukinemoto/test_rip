# 定数
class Const:
    def __init__(self):
        # window
        self.windowPath = ["json", "window.json"]
        self.windowTitle = "title"
        self.windowGeometry = "geometry"
        self.windowIcon = "icon"
        self.windowFolderName = "folderName"
        self.windowFileName = "fileName"
        # mail
        self.mailPath = ["json", "mail.json"]
        self.mailSmtpHost = "smtpHost"
        self.mailSmtpPort = "smtpPort"
        self.mailUserName = "userName"
        self.mailPassWord = "password"
        self.mailFromAddress = "fromAddress"
        self.mailToAddress = "toAddress"
        self.mailCc = "cc"
        self.mailBcc = "bcc"
        self.mailSubject = "subject"
        self.mailBody = "body"
        #self.mailCharset = "ISO-2022-JP" # 日本語環境におけるメール送信で一般的に用いられる文字コード
        self.mailCharset = "shift_jis"
        # mailEdit
        self.mailEditPath = ["json", "windowMailEdit.json"]
        self.mailEditWidth = 50
        # excelHelper
        self.excelSheetName = "勤務表"
        self.excelHelperCopySavePath = ["TemporarySave", "Copy.xlsm"]
        self.excelHelperCompleteSavePath = ["TemporarySave", "Complete.xlsm"]
        # option
        self.optionPath = ["json", "option.json"]
        self.optionRadioCheckSaturday = "radioCheckSaturday"
        
    # window
    # jsonPathの定数を定義
    def get_windowPath(self):
        return self.windowPath
    # jsonのプロパティ名を定義
    def get_windowTitle(self):
        return self.windowTitle
    def get_windowGeometry(self):
        return self.windowGeometry
    def get_windowIcon(self):
        return self.windowIcon
    def get_windowFolderName(self):
        return self.windowFolderName
    def get_windowFileName(self):
        return self.windowFileName
    # mail
    # mailPathの定数を定義
    def get_mailPath(self):
        return self.mailPath
    # jsonのプロパティ名を定義
    def get_mailSmtpHost(self):
        return self.mailSmtpHost
    def get_mailSmtpPort(self):
        return self.mailSmtpPort
    def get_mailUserName(self):
        return self.mailUserName
    def get_mailPassWord(self):
        return self.mailPassWord
    def get_mailFromAddress(self):
        return self.mailFromAddress
    def get_mailToAddress(self):
        return self.mailToAddress
    def get_mailCc(self):
        return self.mailCc
    def get_mailBcc(self):
        return self.mailBcc
    def get_mailSubject(self):
        return self.mailSubject
    def get_mailBody(self):
        return self.mailBody
    def get_mailCharset(self):
        return self.mailCharset
    # mailEdit
    def get_mailEditPath(self):
        return self.mailEditPath
    def get_mailEditWidth(self):
        return self.mailEditWidth
    # excelHelper
    def get_excelHelperSheetName(self):
        return self.excelSheetName
    def get_excelHelperCopySavePath(self):
        return self.excelHelperCopySavePath
    def get_excelHelperCompleteSavePath(self):
        return self.excelHelperCompleteSavePath
    # option
    def get_optionPath(self):
        return self.optionPath
    def get_optionRadioCheckSaturday(self):
        return self.optionRadioCheckSaturday