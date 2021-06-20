import os
import sys
from tkinter.constants import ANCHOR
import TkinterDnD2 as tkdnd2
import DragAndDropService
if sys.version > "3.0":
    import tkinter as tk
else:
    import Tkinter as tk
from tkinter import StringVar, messagebox
from tkinter import ttk
from MailSendService import MailSend
from WindowResource import Window
from WindowFrameService import WindowFrame
from Constant import Const
from MailResource import Mail
from JsonDataService import GetJsonData
from ExcelHelperService import ExcelHelper
from OptionResource import Option

# ウィジェットの作成及び設置

input   # インプットフォームを引き継ぐためのグローバル変数

class EventHandler:
    def __init__(self):
        # json取得
        self.mailPath = Const().get_mailPath()
        self.optionPath = Const().get_optionPath()
        self.json = GetJsonData().get_jsonData(self.mailPath)
        self.jsonOption = GetJsonData().get_jsonData(self.optionPath)
        self.x = 0
        self.editX = 0
        self.radioCheckSaturday = StringVar(value = Option().get_optionRadioCheckSaturday())   # 第二土曜日チェックボックス初期値
        
    # Excelパス入力フォーム
    def input_path(self, frame):
        global input # excelのファイルパス
        self.Annotation = ttk.Label(frame, text="Excelファイルをドロップまたはパスを入力してください")
        self.labelPath = ttk.Label(frame, text="Excelパス：")
        input = ttk.Entry(frame)
        #input = tk.Text(frame, width=Const().get_mailEditWidth(), height=3)
        self.Annotation.grid(row=self.x, column=0, columnspan=2, padx=0, pady=5)
        self.x = self.x + 1
        self.labelPath.grid(row=self.x, column=0, padx=0, pady=5)
        input.grid(row=self.x, column=1, padx=0, pady=5)
        self.x = self.x + 1
    def insert_path(self):
        input.delete(0, tk.END)
        input.insert(tk.END, DragAndDropService.inputPath)
        
    # 送信ボタン
    def button_send(self, frame):
        self.button = ttk.Button(frame, text="送信", command=self.action_asksend)
        self.button.grid(row=self.x, columnspan=2, padx=0, pady=5)
        self.x = self.x + 1
    def action_asksend(self):
        self.button.config(state="disable")
        self.buttonCreateMailEdit.config(state="disable")
        ask = messagebox.askyesno("送信確認", "入力した内容でメールを送信いたします")
        if ask == True:
            self.action_send()
        else:
            self.button.config(state="able")
            self.buttonCreateMailEdit.config(state="able")
    def action_send(self):
        self.buttonCreateMailEdit
        ExcelHelper().save_excelCopy(input.get())   # コピー
        if self.radioCheckSaturday.get() == "自動":
            ExcelHelper().add_secondSaturday(input.get())
        #MailSend().Send(input.get("1.0", tk.END))
        MailSend().Send(input.get())
        self.Diside_option()
        ExcelHelper().save_excelComplete(input.get())   # 編集済みexcelを保存
        os.remove(input.get())
        messagebox.showinfo("Information", "送信完了。アプリを終了いたします")
        sys.exit()
        
    # mail編集ボタン
    def button_mailEdit(self, frame):
        self.buttonCreateMailEdit = ttk.Button(frame, text="メール設定編集", command=self.action_mailEdit)
        self.buttonCreateMailEdit.grid(row=self.x, columnspan=2, padx=0, pady=5)
        self.x = self.x + 1
    def action_mailEdit(self):
        # ウィンドウプロパティ取得
        window = Window()
        # GUIの作成(アプリケーションのタイトル設定)
        self.apiMailEdit = tk.Toplevel()
        self.apiMailEdit.title(window.get_titleMailEdit())
        # アプリケーションのウィンドウサイズの設定
        self.apiMailEdit.geometry(window.get_geometryMailEdit())
        # アプリケーションアイコンの設定
        WindowFrame().cleate_mainIconMailEdit(self.apiMailEdit)
        # フレームの作成
        frame = WindowFrame().get_frame(self.apiMailEdit)
        # ウィジェットの作成及び設置
        self.input_editSmtpHost(frame)
        self.input_editSmtpPort(frame)
        self.input_editUserName(frame)
        self.input_editPassWord(frame)
        self.input_editFromAddress(frame)
        self.input_editToAddress(frame)
        self.input_editCc(frame)
        self.input_editBcc(frame)
        self.input_editSubject(frame)
        self.input_editMailBody(frame)
        self.button_disideMailEdit(frame)
        self.apiMailEdit.grab_set()  # その他のウィンドウの制御をロックする
    # メール更新処理
    def button_disideMailEdit(self, frame):
        self.buttonMailEdit = ttk.Button(frame, text="更新", command=self.action_askMailEdit)
        self.buttonBackMailEdit = ttk.Button(frame, text="戻る", command=self.apiMailEdit.destroy)
        self.buttonMailEdit.grid(row=self.editX, column=0, padx=0, pady=5)
        self.buttonBackMailEdit.grid(row=self.editX, column=1, padx=0, pady=5)
        self.editX = self.editX + 1
    def action_askMailEdit(self):
        self.buttonMailEdit.config(state="disable")
        ask = messagebox.askyesno("設定確認", "入力した内容で設定を更新いたします")
        if ask == True:
            self.action_disideMailEdit()
        else:
            self.buttonMailEdit.config(state="able")
    def action_disideMailEdit(self):
        self.Diside_mailEdit()
        messagebox.showinfo("Information", "メール設定を更新いたしました")
        self.apiMailEdit.destroy()
    def Diside_mailEdit(self):
        self.json[Const().get_mailSmtpHost()] = self.inputSmtpHost.get("1.0", tk.END).strip("\n")
        self.json[Const().get_mailSmtpPort()] = self.inputSmtpPort.get("1.0", tk.END).strip("\n")
        self.json[Const().get_mailUserName()] = self.inputUserName.get("1.0", tk.END).strip("\n")
        self.json[Const().get_mailPassWord()] = self.inputPassWord.get()
        self.json[Const().get_mailFromAddress()] = self.inputFromAddress.get("1.0", tk.END).strip("\n")
        self.json[Const().get_mailToAddress()] = [self.inputToAddress.get("1.0", tk.END).strip("\n")]
        self.json[Const().get_mailCc()] = [self.inputCc.get("1.0", tk.END).strip("\n")]
        self.json[Const().get_mailBcc()] = [self.inputBcc.get("1.0", tk.END).strip("\n")]
        self.json[Const().get_mailSubject()] = self.inputSubject.get("1.0", tk.END).strip("\n")
        self.json[Const().get_mailBody()] = self.inputMailBody.get("1.0", tk.END).strip("\n")
        GetJsonData().dump_jsonData(self.mailPath, self.json)
    # mail編集項目
    def input_editSmtpHost(self, frame):
        self.labelSmtpHost = ttk.Label(frame, text="SmtpHost：")
        self.inputSmtpHost = tk.Text(frame, width=Const().get_mailEditWidth(), height=3)
        self.inputSmtpHost.insert(tk.END, Mail().get_smtpHost())    # 初期値
        self.labelSmtpHost.grid(row=self.editX, column=0, padx=0, pady=5)
        self.inputSmtpHost.grid(row=self.editX, column=1, padx=0, pady=5)
        self.editX = self.editX + 1
    def input_editSmtpPort(self, frame):
        self.labelSmtpPort = ttk.Label(frame, text="SmtpPort：")
        self.inputSmtpPort = tk.Text(frame, width=Const().get_mailEditWidth(), height=3)
        self.inputSmtpPort.insert(tk.END, Mail().get_smtpPort())    # 初期値
        self.labelSmtpPort.grid(row=self.editX, column=0, padx=0, pady=5)
        self.inputSmtpPort.grid(row=self.editX, column=1, padx=0, pady=5)
        self.editX = self.editX + 1
    def input_editUserName(self, frame):
        self.labelUserName = ttk.Label(frame, text="UserName：")
        self.inputUserName = tk.Text(frame, width=Const().get_mailEditWidth(), height=3)
        self.inputUserName.insert(tk.END, Mail().get_userName())    # 初期値
        self.labelUserName.grid(row=self.editX, column=0, padx=0, pady=5)
        self.inputUserName.grid(row=self.editX, column=1, padx=0, pady=5)
        self.editX = self.editX + 1
    def input_editPassWord(self, frame):
        self.labelPassWord = ttk.Label(frame, text="PassWord：")
        self.inputPassWord = ttk.Entry(frame, show="*", width=50)
        self.inputPassWord.insert(tk.END, Mail().get_passWord())    # 初期値
        self.labelPassWord.grid(row=self.editX, column=0, padx=0, pady=5)
        self.inputPassWord.grid(row=self.editX, column=1, padx=0, pady=5)
        self.editX = self.editX + 1
    def input_editFromAddress(self, frame):
        self.labelFromAddress = ttk.Label(frame, text="FromAddress(自分のメールアドレス)：")
        self.inputFromAddress = tk.Text(frame, width=Const().get_mailEditWidth(), height=3)
        self.inputFromAddress.insert(tk.END, Mail().get_fromAddress())    # 初期値
        self.labelFromAddress.grid(row=self.editX, column=0, padx=0, pady=5)
        self.inputFromAddress.grid(row=self.editX, column=1, padx=0, pady=5)
        self.editX = self.editX + 1
    def input_editToAddress(self, frame):
        self.labelToAddress = ttk.Label(frame, text="ToAddress(宛先)：\n(複数指定の場合はカンマで区切って入力)")
        self.inputToAddress = tk.Text(frame, width=Const().get_mailEditWidth(), height=3)
        self.inputToAddress.place(x=10,y=5, width=10, height=5)
        self.inputToAddress.insert(tk.END, Mail().get_toAddress())    # 初期値
        self.labelToAddress.grid(row=self.editX, column=0, padx=0, pady=5)
        self.inputToAddress.grid(row=self.editX, column=1, padx=0, pady=5)
        self.editX = self.editX + 1
    def input_editCc(self, frame):
        self.labelCc = ttk.Label(frame, text="Cc：\n(複数指定の場合はカンマで区切って入力)")
        self.inputCc = tk.Text(frame, width=Const().get_mailEditWidth(), height=3)
        self.inputCc.insert(tk.END, Mail().get_cc())    # 初期値
        self.labelCc.grid(row=self.editX, column=0, padx=0, pady=5)
        self.inputCc.grid(row=self.editX, column=1, padx=0, pady=5)
        self.editX = self.editX + 1
    def input_editBcc(self, frame):
        self.labelBcc = ttk.Label(frame, text="Bcc：\n(複数指定の場合はカンマで区切って入力)")
        self.inputBcc = tk.Text(frame, width=Const().get_mailEditWidth(), height=3)
        self.inputBcc.insert(tk.END, Mail().get_bcc())    # 初期値
        self.labelBcc.grid(row=self.editX, column=0, padx=0, pady=5)
        self.inputBcc.grid(row=self.editX, column=1, padx=0, pady=5)
        self.editX = self.editX + 1
    def input_editSubject(self, frame):
        self.labelSubject = ttk.Label(frame, text="Subject(件名)：")
        self.inputSubject = tk.Text(frame, width=Const().get_mailEditWidth(), height=3)
        self.inputSubject.insert(tk.END, Mail().get_subject())    # 初期値
        self.labelSubject.grid(row=self.editX, column=0, padx=0, pady=5)
        self.inputSubject.grid(row=self.editX, column=1, padx=0, pady=5)
        self.editX = self.editX + 1
    def input_editMailBody(self, frame):
        self.labelMailBody = ttk.Label(frame, text="MailBody(本文)：")
        self.inputMailBody = tk.Text(frame, width=Const().get_mailEditWidth())
        self.inputMailBody.insert(tk.END, Mail().get_mailBody())    # 初期値
        self.labelMailBody.grid(row=self.editX, column=0, padx=0, pady=5)
        self.inputMailBody.grid(row=self.editX, column=1, padx=0, pady=5)
        self.editX = self.editX + 1
        
    # 第２土曜日講習会出勤オートチェック
    def lavelFrame_saturday(self, frame):
        self.labelFrameSaturday = ttk.Labelframe(frame, text="第二土曜日講習会オートチェック")
        self.radio_onSaturday(self.labelFrameSaturday)
        self.radio_offSaturday(self.labelFrameSaturday)
        self.labelFrameSaturday.grid(row=self.x, columnspan=2, padx=0, pady=5)
        self.x = self.x + 1
    def radio_onSaturday(self, frame):
        self.onSaturday = ttk.Radiobutton(frame, text="自動", value="自動", variable=self.radioCheckSaturday)
        self.onSaturday.grid(row=self.x, column=0, padx=0, pady=5)
    def radio_offSaturday(self, frame):
        self.offSaturday = ttk.Radiobutton(frame, text="手動", value="手動", variable=self.radioCheckSaturday)
        self.offSaturday.grid(row=self.x, column=1, padx=0, pady=5)
        
    # オプション
    def Diside_option(self):
        self.jsonOption[Const().get_optionRadioCheckSaturday()] = self.radioCheckSaturday.get()
        GetJsonData().dump_jsonData(self.optionPath, self.jsonOption)