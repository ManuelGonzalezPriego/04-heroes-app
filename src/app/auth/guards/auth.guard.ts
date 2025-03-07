import { ActivatedRouteSnapshot, Route, Router, RouterStateSnapshot, UrlSegment } from "@angular/router";
import { Observable, tap } from "rxjs";
import { AuthService } from "../services/auth.service";
import { inject } from "@angular/core";

const checkAuthStatus=():Observable<boolean>=>{
  const authService:AuthService=inject(AuthService);
  const router:Router=inject(Router);

  return authService.checkAuthentication()
    .pipe(
      tap(isAutheticated=>console.log('Aunthenticated',isAutheticated)),
      tap(isAutheticated=>{
        if(!isAutheticated){
          router.navigate(['/auth/login'])
        }
      })
    )
}

export const canMatchGuard=( // Tipado CanMatchFN
  route:Route,
  segments:UrlSegment[]
)=>{
  console.log('CanMatch');
  console.log({route,segments})

  return true
};

export const canActivateGuard=(
  route:ActivatedRouteSnapshot,
  state:RouterStateSnapshot
)=>{
  console.log('CanActivate');
  console.log({route,state})

  return true
};
