
import { JwtHelper } from 'angular2-jwt';
// app/auth.service.ts

import { Injectable }      from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';

// Avoid name not found warnings
//declare var Auth0Lock:any;
import  Auth0Lock  from 'auth0-lock';


@Injectable()
export class Auth {
  profile: any;
  private roles: string[] = []; 

  // Configure Auth0
  lock = new Auth0Lock('HsbQuJeWGFoNaE6EvRA4S65i6yuAE5Bl', 'vega-project.au.auth0.com', {});

//   constructor() {    
//     this.readUserFromLocalStorage();

//     this.lock.on("authenticated", (authResult:any) => this.onUserAuthenticated(authResult));
//   }

//   private onUserAuthenticated(authResult:any) {
//     console.log('authResult',authResult);

//     if (typeof(authResult.idToken)!= 'undefined'){
//         if (authResult.idToken.length > authResult.accessToken.length){
//             localStorage.setItem('token', authResult.idToken)
//         }
//         else {
//             localStorage.setItem('token', authResult.accessToken)
//         }
//     } else {
//         localStorage.setItem('token', authResult.accessToken);
//     }
    
//     this.lock.getUserInfo(authResult.accessToken, (error:any, profile:any) => {
//       if (error)
//         throw error;

//       localStorage.setItem('profile', JSON.stringify(profile));

//       this.readUserFromLocalStorage();
//     });
//   }

//   private readUserFromLocalStorage() {
//     this.profile = JSON.parse((String)(localStorage.getItem('profile')));
//     console.log("1");
//     var token = localStorage.getItem('token');
//     if (token) {
//       var jwtHelper = new JwtHelper();
//       var decodedToken = jwtHelper.decodeToken(token);
//       console.log(typeof(decodedToken));
//       console.log(decodedToken);

//       if (decodedToken['https://vega.com/roles']){
//         this.roles = decodedToken['https://vega.com/roles']||[]
//       }
//       else {
//         var payload = JSON.parse(decodedToken['idTokenPayload']);
//         console.log('payload',payload);
//         //var payload = decodedToken['idTokenPayload']
//         this.roles =  payload['roles']|| [] ;
        
//       }
//       console.log("roles",this.roles);
      
//     }
//   }

//   public isInRole(roleName:any) {
//     return this.roles.indexOf(roleName) > -1;
//   }

//   public login() {
//     // Call the show method to display the widget.
//     this.lock.show();
//   }

//   public authenticated() {
//     // Check if there's an unexpired JWT
//     // This searches for an item in localStorage with key == 'token'
//     return tokenNotExpired('token');
//   }

//   public logout() {
//     // Remove token from localStorage
//     localStorage.removeItem('token');
//     localStorage.removeItem('profile');
//     this.profile = {};
//     this.roles = [];
//   }


constructor() {    
    this.readUserFromLocalStorage();

    this.lock.on("authenticated", (authResult) => this.onUserAuthenticated(authResult));
  }

  private onUserAuthenticated(authResult:any) {
      console.log(authResult);
    localStorage.setItem('token', authResult.accessToken);

    this.lock.getUserInfo(authResult.accessToken, (error, profile) => {
      if (error)
        throw error;

      localStorage.setItem('profile', JSON.stringify(profile));

      this.readUserFromLocalStorage();
    });
  }

  private readUserFromLocalStorage() {
    this.profile = JSON.parse((String)(localStorage.getItem('profile')));

    var token = localStorage.getItem('token');
    if (token) {
      var jwtHelper = new JwtHelper();
      var decodedToken = jwtHelper.decodeToken(token);
      this.roles = decodedToken['https://vega.com/roles'] || [];
    }
  }

  public isInRole(roleName:any) {
    return this.roles.indexOf(roleName) > -1;
  }

  public login() {
    // Call the show method to display the widget.
    this.lock.show();
  }

  public authenticated() {
    // Check if there's an unexpired JWT
    // This searches for an item in localStorage with key == 'token'
    return tokenNotExpired('token');
  }

  public logout() {
    // Remove token from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('profile');
    this.profile = null;
    this.roles = [];
  }


}