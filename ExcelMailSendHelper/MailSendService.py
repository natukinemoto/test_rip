import base64
import smtplib
import os
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.application import MIMEApplication
from email.utils import formatdate
from MailResource import Mail
from Constant import Const

# メール送信処理
class MailSend:
    def Send(self, filePath):
        smtp_host = Mail().get_smtpHost()
        smtp_port = Mail().get_smtpPort()
        username = Mail().get_userName()
        password = Mail().get_passWord()
        from_address = Mail().get_fromAddress()  #差出人
        to_address = Mail().get_toAddress()      #宛先
        cc = Mail().get_cc()
        bcc = Mail().get_bcc()
        subject = Mail().get_subject()    #タイトル
        body = Mail().get_mailBody()      #本文
        
        charset = Const().get_mailCharset()
        message = MIMEMultipart()
        body = MIMEText(body, "plain", charset)
        message["Subject"] = subject
        message["From"] = from_address
        message["To"] = ",".join(to_address)
        message["Cc"] = ",".join(cc)
        message["Bcc"] = ",".join(bcc)
        message["Date"] = formatdate(None,True)
        message.attach(body)
        
        with open(filePath, "r", encoding=Const().get_mailCharset(), errors="ignore") as fileOpen:
            mIMEApplication = MIMEApplication(fileOpen.read())
            filename = os.path.basename(filePath)
            mIMEApplication.add_header("Content-Disposition", "attachment", filename=filename)
            message.attach(mIMEApplication)
            
        #charset = "utf-8"
        #if charset == "utf-8":
            #message = MIMEText(body, "plain", charset)
        #    message = MIMEText(body, "html", charset)
        #elif charset == "iso-2022-jp":
            #message = MIMEText(base64.b64encode(body.encode(charset, "ignore")), "plain", charset)
        #    message = MIMEText(base64.b64encode(body.encode(charset, "ignore")), "html", charset)
            
        ssl = smtplib.SMTP_SSL(smtp_host, smtp_port)
        ssl.login(username, password)
        ssl.sendmail(from_address, to_address, message.as_string())