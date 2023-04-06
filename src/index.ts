const inquirer = require('inquirer');
const consola = require('consola')

enum Action {
  List = "list",
  Add = "add",
  Remove = "remove",
  Quit = "quit"
}
  
type InquirerAnswers = {
  action: Action
}

const startApp = () => {
  inquirer.prompt([{
    name: 'action',
    type: 'input',
    message: 'How can I help you?',
  }]).then(async (answers: InquirerAnswers ) => {
    console.log("Chosen action: " + answers.action);
    startApp();
    if (answers.action === "quit")
      return;
  });
}

class Message {
  constructor(private content: string) {}

  public show() {
    console.log(this.content)
  }

  public capitalize() {
    const capitilizedLetter = this.content.charAt(0);
    capitilizedLetter.toUpperCase();
    const remainingLetters = this.content.slice(1);
    return capitilizedLetter + remainingLetters;
  }

  public toLowerCase() {
    this.content.toLowerCase();
  }

  public toUpperCase() {
    this.content.toUpperCase();
  }

  static showColorized(MessageVariant: string, text: string) {
    if(MessageVariant === 'success') {
      consola.success(text);
    } else if(MessageVariant === 'error') {
      consola.error(text);
    } else if (MessageVariant === 'info') {
      consola.info(text);
    }
  }

}

enum MessageVariant {
  Success = 'success',
  Error = 'error',
  Info = 'info'
}

startApp();