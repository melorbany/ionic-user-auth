import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";
import { LoadingController, AlertController } from "ionic-angular";

import { AuthService } from "../../services/auth";
import {UserServices} from "../../services/users";
import {User} from "../../models/user";

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {

  user : User;


  constructor(private authService: AuthService,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController,
              private usersService :UserServices) {
  }

  onSignup(form: NgForm) {
    const loading = this.loadingCtrl.create({
      content: 'Signing you up...'
    });
    loading.present();

    this.user = new User(form.value.name,form.value.email,form.value.company_name,form.value.password);

    this.usersService.signup(this.user)
      .subscribe(
        () => loading.dismiss(),
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
