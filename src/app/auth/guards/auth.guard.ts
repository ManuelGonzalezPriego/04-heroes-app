import { ActivatedRouteSnapshot, Route, RouterStateSnapshot, UrlSegment } from "@angular/router";

export const canMatchGuard=( // Tipado CanMatchFN
  route:Route,
  segments:UrlSegment[]
)=>{
  console.log('CanMatch');
  console.log({route,segments})

  return false
};

export const canActivateGuard=(
  route:ActivatedRouteSnapshot,
  state:RouterStateSnapshot
)=>{
  console.log('CanActivate');
  console.log({route,state})

  return false
};
