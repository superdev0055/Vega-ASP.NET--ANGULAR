import { Auth } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(protected auth:Auth) { }

    canActivate(){
        if (this.auth.authenticated())
            return true;

        window.location.href = 'https://vega-project.au.auth0.com/login?client=HsbQuJeWGFoNaE6EvRA4S65i6yuAE5Bl';
        return false;   
    }
}