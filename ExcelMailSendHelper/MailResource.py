from JsonDataService import GetJsonData
from Constant import Const

# Mailのプロパティ
class Mail:
    def __init__(self):
        # json取得
        path = Const().get_mailPath()
        json = GetJsonData().get_jsonData(path)
        
        self.smtpHost = json[Const().get_mailSmtpHost()]
        self.smtpPort = json[Const().get_mailSmtpPort()]
        self.userName = json[Const().get_mailUserName()]
        self.passWord = json[Const().get_mailPassWord()]
        self.fromAddress = json[Const().get_mailFromAddress()]
        self.toAddress = json[Const().get_mailToAddress()]
        self.cc = json[Const().get_mailCc()]
        self.bcc = json[Const().get_mailBcc()]
        self.subject = json[Const().get_mailSubject()]
        self.mailBody = json[Const().get_mailBody()]
        
    def get_smtpHost(self):
        return self.smtpHost
    def get_smtpPort(self):
        return self.smtpPort
    def get_userName(self):
        return self.userName
    def get_passWord(self):
        return self.passWord
    def get_fromAddress(self):
        return self.fromAddress
    def get_toAddress(self):
        return self.toAddress
    def get_cc(self):
        return self.cc
    def get_bcc(self):
        return self.bcc
    def get_subject(self):
        return self.subject
    def get_mailBody(self):
        return self.mailBody