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

interface User {
  name: string;
  age: number;
}

class UsersData implements User {
  name: any;
  age: any;
  data: User[] = [];

  public showAll() {
    Message.showColorized(MessageVariant.Info, "Users data")
    this.data ? (console.table(this.data)) : (console.log("No data"));
  }

  public add(user: User) {
    if(user.name.length > 0 && user.age > 0) {
      this.data.push(user);
      Message.showColorized(MessageVariant.Success, "User has been successfully added!");
    } else {
      Message.showColorized(MessageVariant.Error, "Wrong data!");
    }
  }

  public remove(name: string) {
    if(this.data.find((user) => user.name === name)) {
      this.data = this.data.filter((user) => user.name !== name);
      Message.showColorized(MessageVariant.Success, "User deleted!");
    } else {
      Message.showColorized(MessageVariant.Error, "User not found...");
    }
  }
}


startApp();