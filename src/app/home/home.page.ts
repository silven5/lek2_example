import { Component } from '@angular/core';
// Для вікна alert
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  myDate: Date = new Date;
  isBossHappy: boolean = true;
  bonus = new Object();
  dataUrl = 'https://api.jsonbin.io/v3/b/63e252e1ebd26539d07844a1';
  data_users: any = [];
  // Створюємо новий контролер для вікна alert при створенні класу
  constructor(private alertController: AlertController) { }
  sync() {
    let myDate = new Date();
    let myDate1 = new Date();
    //! Дуже погано не робіть цього!!!!
    for (let i = 0; i < 10000000; i++) {
      let date = new Date();
      myDate = date
    }
    console.log(myDate1);
    console.log(myDate);
    this.myDate = myDate;
  }
  async1() {
    console.log("Hello");
    setTimeout(function () { console.log("world!!!") }, 2000);
    console.log("I am!!!");
    setTimeout(function () { console.log("world123!!!") }, 1000);
  }
  getBonus(isBossHappy: boolean) {
    return new Promise((resolve, reject) => {
      if (isBossHappy) {
        this.bonus = { size: "big", price: 2000 };

        resolve(this.bonus);
      }
      else {
        var reason = new Error("Boss is not happy. Премії не буде");
        reject(reason);
      }
    }
    )
  }
  getBonusTeam = ((bonus: any) => {
    let message: string;
    message = "I have bonus size=" + bonus.size + " price=" + bonus.price + "$";
    return Promise.resolve(message);
  }
  )
  async_promise() {
    this.getBonus(this.isBossHappy)
      .then(function (fulfilled) {
        console.log(fulfilled);
      })
      .catch(function (error) {
        console.log(error.message);
      });
  }
  async_promise_team() {
    console.log("Boss is not Happy!!!");
    this.getBonus(this.isBossHappy)
      .then(this.getBonusTeam)
      .then((fulfilled) => { console.log(fulfilled); })
      .catch((error) => { console.log(error.message); })
    console.log("Boss is Happy!!!");
    console.log("Boss is Happy!!!");
    console.log("Boss is Happy!!!");
    console.log("Boss is Happy!!!");


  }
  async async_await_promise_team() {
    try {
      console.log("Boss is not Happy!!!");
      let bonus = await this.getBonus(this.isBossHappy);
      let message = await this.getBonusTeam(bonus);
      console.log(message);
      console.log("Boss is Happy!!!");
    }
    catch (error) {
      console.log("error.message");
    }
  }
  getMinMaxMoney() {
    let max = 0;
    let min = 10000000;
    this.data_users.forEach((element: any) => {
      if (element["money"] > max) { max = element["money"]; }
      if (element["money"] < min) { min = element["money"]; }
    }
    )
    return [max, min];
  }
  //функція зчитування
  async load() {
    this.data_users = [];
    //Отримання запиту асинхроно
    fetch(this.dataUrl)
      .then(response => response.json())
      .then(data => {
        // Обробка отриманих даних
        console.log(data);
        data = data.record;
        console.log(data);
        let i = 0;
        while (data[i] != undefined) {
          this.data_users.push(data[i][0]);
          i++;
        }

      })
      .catch(error => {
        this.presentAlert();
        console.error('Помилка:', error);
      });

  }
  getColor(a: number) {
    let rezult = this.getMinMaxMoney();
    if (a == rezult[0]) return 'green';
    else
      if (a == rezult[1]) return 'red';
      else
        return '';
  }
  // Створення вікна с повідомленням
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Помилка',
      subHeader: '',
      message: 'Виникла помилка при читанні файлу',
      buttons: ['OK'],
    });

    await alert.present();
  }
}

