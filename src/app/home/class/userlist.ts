import { User } from './user';
export class UserList {
  users: User[] = [];
  addUser(name: string, money: number) {
    if (money >= 0) {
      this.users.push(new User(name, money));
    } else 
    throw new Error('Money<0');
  }
  getMinMaxMoney() {
    let max = 0;
    let min = 10000000;
    this.users.forEach((element: any) => {
      if (element['money'] > max) {
        max = element['money'];
      }
      if (element['money'] < min) {
        min = element['money'];
      }
    });
    return [max, min];
  }
}
