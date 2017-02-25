import {User} from "../models/user";
import {Response, Http} from "@angular/http";
import {Injectable} from "@angular/core";
import {AuthService} from "./auth";
import 'rxjs/Rx';

@Injectable()
export class UserServices {


  private authorized : boolean = false;

  constructor(private http: Http, private authService: AuthService) {}


   signup(user : User){

    let link = 'http://192.168.100.9:8000/api/v1/signup';

    return this.http.post(link, user)
      .map((response: Response) => response.json());
  }



  signin(email:string , password:string){


    console.log(email);
    let link = 'http://192.168.100.9:8000/api/v1/signin';

    return this.http.post(link, {email : email, password : password})
      .map((response: Response) => response.json());
  }


  setAuthorized ( authorized : boolean){
    this.authorized = authorized ;
  }

  isAuthorized(){ return this.authorized}
}
