import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { LoginRequest } from '../../../domain/models/login/login-request';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData: BehaviorSubject<String> =new BehaviorSubject<String>("");
  currentUserNombre: BehaviorSubject<String> =new BehaviorSubject<String>("");
  currentUserIdClient: BehaviorSubject<number> =new BehaviorSubject<number>(0);

  constructor(private http: HttpClient) {
    this.currentUserLoginOn=new BehaviorSubject<boolean>(sessionStorage.getItem("jwt")!=null);
    this.currentUserData=new BehaviorSubject<String>(sessionStorage.getItem("jwt") || "");
  }

  login(credentials:LoginRequest):Observable<any>{
    return this.http.post<any>(environment.api+"/Login",credentials).pipe(
      tap( (userData) => {
        console.log("SERVICIO LOGIN:", userData);
        sessionStorage.setItem("jwt", userData.jwt);
        this.currentUserData.next(userData.jwt);
        this.currentUserIdClient.next(userData.cliente);
        this.currentUserNombre.next(userData.cliente_razon);
        this.currentUserLoginOn.next(true);
      }),
      map((userData)=> userData.token),
      catchError(this.handleError)
    );
  }

  logout():void{
    sessionStorage.removeItem("token");
    this.currentUserLoginOn.next(false);
  }

  private handleError(error:HttpErrorResponse){
    if(error.status===0){
      console.error('Se ha producio un error ', error.error);
    }
    else{
      console.error('Backend retornó el código de estado ', error);
    }
    return throwError(()=> new Error('Algo falló. Por favor intente nuevamente.'));
  }

  get userData():Observable<String>{
    return this.currentUserData.asObservable();
  }

  get userLoginOn(): Observable<boolean>{
    return this.currentUserLoginOn.asObservable();
  }

  get userToken():String{
    return this.currentUserData.value;
  }
}
