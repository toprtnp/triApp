import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(public alertController: AlertController) { }
  todo = {
    A: null,
    B: null,
    C: null
  }

  angle = {
    A: null,
    B: null,
    C: 90
  }

  text = {
    A: null,
    B: null,
    C: null,
    a: null,
    b: null,
    c: '=90'
  }

  results = 0
  text_ang_a = ''
  text_ang_b = ''
  text_ang_c = ''
  area = ''


  toDegrees(angle) {
    return angle * (180 / Math.PI);
  }

  clcForm() {
    this.todo.A = null
    this.todo.B = null
    this.todo.C = null
    this.text.A = null
    this.text.B = null
    this.text.C = null
    this.text.a = null
    this.text.b = null
    this.text.c = '=90'
    this.text_ang_a = ''
    this.text_ang_b = ''
    this.text_ang_c = ''
    this.area = ''
  }

  async presentAlert(head, text) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: head,
      message: text,
      buttons: ['ตกลง']
    });

    await alert.present();
  }


  logForm() {
    console.log(this.todo)
    if ((this.todo.A == null && this.todo.B == null) || (this.todo.A == null && this.todo.C == null) || (this.todo.B == null && this.todo.C == null)) {
      this.todo.A = null
      this.todo.B = null
      this.todo.C = null
      console.error('error1')
      this.presentAlert('ท่านกรอกข้อมูลไม่ครบ', 'กรุณากรอกข้อมูลให้ครบ 2 ช่อง');
    } else if (this.todo.A != null && this.todo.B != null && this.todo.C != null) {
      console.error('error2')
      this.presentAlert('ท่านกรอกข้อมูลเกิน', 'กรุณากรอกข้อมูลแค่ 2 ช่อง');
      this.clcForm();
    } else {
      if (this.todo.C == null) {
        this.results = Math.sqrt((this.todo.A * this.todo.A) + (this.todo.B * this.todo.B))
        console.log(this.results)
        this.todo.C = this.results
      }
      if (this.todo.B == null) {
        this.results = Math.sqrt((this.todo.C * this.todo.C) - (this.todo.A * this.todo.A))
        console.log(this.results)
        this.todo.B = this.results
      }
      if (this.todo.A == null) {
        this.results = Math.sqrt((this.todo.C * this.todo.C) - (this.todo.B * this.todo.B))
        console.log(this.results)
        this.todo.A = this.results
      }
      this.angle.A = Math.round((this.toDegrees(Math.asin(this.todo.A / this.todo.C)) + Number.EPSILON) * 100) / 100
      this.angle.B = 180 - (this.angle.A + this.angle.C)

      this.text.A = '=' + Math.round((this.todo.A + Number.EPSILON) * 100) / 100
      this.text.B = '=' + Math.round((this.todo.B + Number.EPSILON) * 100) / 100
      this.text.C = '=' + Math.round((this.todo.C + Number.EPSILON) * 100) / 100
      this.text.a = '=' + Math.round((this.angle.A + Number.EPSILON) * 100) / 100
      this.text.b = '=' + Math.round((this.angle.B + Number.EPSILON) * 100) / 100

      this.text_ang_a = 'มุม a = ' + this.angle.A + ' องศา'
      this.text_ang_b = 'มุม b = ' + this.angle.B + ' องศา'
      this.text_ang_c = 'มุม c = ' + this.angle.C + ' องศา'
      this.area = 'พื้นที่ ' + ((this.todo.A * this.todo.B) / 2) + ' ตารางหน่วย'
    }
  }

}
