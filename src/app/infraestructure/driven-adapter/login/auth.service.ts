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
  currentUserData: BehaviorSubject<String> = new BehaviorSubject<String>("");
  currentUserNombre: BehaviorSubject<String> = new BehaviorSubject<String>("");
  currentUserIdClient: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient) {
    const token = sessionStorage.getItem("jwt");
    const clienteId = sessionStorage.getItem("clienteId");
    const clienteNombre = sessionStorage.getItem("clienteNombre");
    this.currentUserNombre = new BehaviorSubject<String>(clienteNombre || "");
    this.currentUserIdClient = new BehaviorSubject<number>(clienteId ? Number(clienteId) : 0)
    this.currentUserLoginOn = new BehaviorSubject<boolean>(sessionStorage.getItem("jwt") != null);
    this.currentUserData = new BehaviorSubject<String>(sessionStorage.getItem("jwt") || "");

    if (token) {
      this.currentUserLoginOn.next(true);
      this.currentUserData.next(token);
      if (clienteId) {
        this.currentUserIdClient.next(Number(clienteId));
      }
      if (clienteNombre) {
        this.currentUserNombre.next(clienteNombre);
      }
    }
  }

  login(credentials: LoginRequest): Observable<any> {
    return this.http.post<any>(environment.api + "/Login", credentials).pipe(
      tap((userData) => {
        sessionStorage.setItem("jwt", userData.jwt);
        sessionStorage.setItem("clienteId", userData.cliente.toString());
        sessionStorage.setItem("clienteNombre", userData.cliente_razon);
        this.currentUserData.next(userData.jwt);
        this.currentUserIdClient.next(userData.cliente);
        this.currentUserNombre.next(userData.cliente_razon);
        this.currentUserLoginOn.next(true);
      }),
      map((userData) => userData.token),
      catchError(this.handleError)
    );
  }

  logout(): void {
    console.log('Logging out...');
    sessionStorage.removeItem("jwt");
    sessionStorage.removeItem("clienteId");
    sessionStorage.removeItem("clienteNombre");
    this.currentUserData.next("");
    this.currentUserIdClient.next(0);
    this.currentUserNombre.next("");
    this.currentUserLoginOn.next(false);
    console.log("Logout completed. Current state:");
    console.log("currentUserData:", this.currentUserData.value);
    console.log("currentUserIdClient:", this.currentUserIdClient.value);
    console.log("currentUserNombre:", this.currentUserNombre.value);
    console.log("currentUserLoginOn:", this.currentUserLoginOn.value);

  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('Se ha producio un error ', error.error);
    }
    else {
      console.error('Backend retornó el código de estado ', error);
    }
    return throwError(() => new Error('Algo falló. Por favor intente nuevamente.'));
  }

  get userData(): Observable<String> {
    return this.currentUserData.asObservable();
  }
  get IdClient(): Observable<number> {
    return this.currentUserIdClient.asObservable();
  }

  get IdValue(): number {
    return this.currentUserIdClient.value;
  }

  get userLoginOn(): Observable<boolean> {
    return this.currentUserLoginOn.asObservable();
  }

  get userToken(): String {
    return this.currentUserData.value;
  }
}
