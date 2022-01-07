import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  private users = [
    {username: "admin", password: "secret1234", role: ['ADMIN', 'USER']},
    {username: "user1", password: "12345", role: ['USER']},
    {username: "user2", password: "1234", role: ['USER']}

  ]
  public Authenticated: boolean = false;
  userAuthenticated;
  Admin: boolean = false;
  token:string="";

  constructor() {
  }

  public login(username: string, password: string) {
    let user;

    this.users.forEach(u => {
      if (u.username == username && u.password == password) {
        user = u;
        this.Authenticated = true
        this.token =btoa(JSON.stringify({username:u.username, role:u.role}));
      }

    });
    if (user) {
      this.isAuthenticated()
      this.Authenticated = true;
      this.userAuthenticated = user;
      console.log("IWORK  ", this.Authenticated)

    } else {
      this.Authenticated = false;
      this.userAuthenticated = undefined;
    }


  }

  public isAuthenticated() {
    return this.Authenticated;
  }




public isAdmin(){
  if (this.userAuthenticated) {
    if (this.userAuthenticated.role.indexOf("ADMIN") > -1)
      return true;
    }
  return  false
}

public saveAuthenticatedUser(){
  if (this.userAuthenticated){
    localStorage.setItem('authToken',this.token);
  }
}
public loadAuthenticatedUserFromLocalStorage(){
    let tok=localStorage.getItem('authToken');
    if (tok) {
      let user=JSON.parse(atob(tok));
      this.userAuthenticated= {username: user.username, role: user.role};
      this.Authenticated=true;
      this.token=tok;
    }

}
public removeRemoveTokenFromLocalStorage(){
    localStorage.removeItem('authToken');

    this.Authenticated=false;
    this.token="undefined";
    this.userAuthenticated=undefined

}


}
