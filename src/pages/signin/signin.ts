import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";
import { LoadingController, AlertController } from "ionic-angular";
import {UserServices} from "../../services/users";


@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html'
})
export class SigninPage {

  constructor(private userService: UserServices,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController) {
  }

  onSignin(form: NgForm) {

    console.log("sigin in");
    const loading = this.loadingCtrl.create({
      content: 'Signing you in...'
    });
    loading.present();
    this.userService.signin(form.value.email, form.value.password)
      .subscribe(
        response => {
          console.log(response);
          loading.dismiss()
        },

        error => {
          loading.dismiss();
          this.handleError(error.json().error);
        }
      );
  }


  private handleError(errorMessage: string) {
    const alert = this.alertCtrl.create({
      title: 'An error occurred!',
      message: errorMessage,
      buttons: ['Ok']
    });
    alert.present();
  }
}
