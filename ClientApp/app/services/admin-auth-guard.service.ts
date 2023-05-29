import { AuthGuard } from './auth.guard.service';
import { Auth } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable()
export class AdminAuthGuard extends AuthGuard {

    constructor(auth:Auth) { super(auth); }

    canActivate(){
        var isAuthenticated = super.canActivate();
        return isAuthenticated ? this.auth.isInRole('Admin'): false;
    }
}