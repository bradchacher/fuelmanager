import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
//import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private afAuth: AngularFireAuth
  ) {}

  canActivate() : Observable<boolean> {
    return this.afAuth.authState.pipe(map(auth => {
      if(!auth) {
        this.router.navigate(['/login']);
      } else {
        return true;
      }
    }))
  }
  
}
