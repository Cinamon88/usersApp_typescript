const inquirer = require('inquirer');

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

  public capitilize() {
    const capitilizedLetter = this.content.charAt(0);
    capitilizedLetter.toUpperCase();
    const remainingLetters = this.content.slice(1);
    return capitilizedLetter + remainingLetters;
  }

  public toUpperCase() {
    this.content.toUpperCase();
  }

  public toLowerCase() {
    this.content.toLowerCase();
  }

  
}



startApp();