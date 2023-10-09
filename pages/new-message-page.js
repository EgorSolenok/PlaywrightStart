// @ts-check
const { expect } = require('@playwright/test')

exports.NewMessagePage = class NewMessagePage {

    constructor(page) {
        this.page = page;
        this.getMailToInput = page.getByRole('row', { name: 'To', exact: true }).getByRole('textbox')
        this.getMailSubjectInput = page.locator('#mailSubject')
        this.getAddAttachmentButton = page.getByText('Attachment')
        this.getComputerAttachementOption = page.locator('#new_email_attach input')
        this.getMailMessageInput = page.frameLocator('#gwt-uid-32').locator('#gwt-uid-32')
        this.getSendButton = page.getByText('Send')
    }

    async enterMailAddressee(mailAddressee) {
        await this.getMailToInput.fill(mailAddressee)
    }

    async enterMailSubject(mailSubject) {
        await this.getMailSubjectInput.fill(mailSubject)
    }

    async openAttachmentOptions() {
        await this.getAddAttachmentButton.click()
    }

    async addAttachementFromComputer(fileName) {
        await this.getComputerAttachementOption.setInputFiles(fileName)
    }

    async enterMessageBody(message) {
        await this.getMailMessageInput.fill(message)
    }
    
    async sendMessage() {
        await this.getSendButton.click()
    }
}
