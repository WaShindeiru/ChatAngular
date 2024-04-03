import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {map, Observable, take} from "rxjs";
import {User} from "./User";
import {inject} from "@angular/core";
import {AuthenticationService} from "./authentication.service";

export const unauthenticatedGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree => {

  const router: Router = inject(Router);

  return  inject(AuthenticationService).currentUser.pipe(take(1), map((user: User) => {
    if(user === null) {
      return router.createUrlTree(["/login"]);
    } else {
      return true;
    }
  }));
}

