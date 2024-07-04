import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../../../../infraestructure/driven-adapter/login/auth.service';
import { LoginRequest } from '../../../../../../domain/models/login/login-request';
import { CommonModule } from '@angular/common';
import { AlertaLoginComponent } from '../../../../../shareds/components/organisms/alerts/alerta-login/alerta-login.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AlertaLoginComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  loginError:string="";

  loginForm=this.formBuilder.group({
    username:['',[Validators.required]],
    password: ['',Validators.required],
  })

  constructor(private formBuilder:FormBuilder, private router:Router, private loginService: AuthService) { }

  ngOnInit(): void {
  }

  get email(){
    return this.loginForm.controls.username;
  }

  get password()
  {
    return this.loginForm.controls.password;
  }

  login(){
    if(this.loginForm.valid){
      this.loginError="";
      this.loginService.login(this.loginForm.value as LoginRequest).subscribe({
        next: (userData: any) => {

        },
        error: (errorData:any) => {
          this.loginError=errorData;
        },
        complete: () => {
          console.info("Login completo");
          this.router.navigateByUrl('/home');
          this.loginForm.reset();
        }
      })

    }
    else{
      this.loginForm.markAllAsTouched();
      alert("Error al ingresar los datos.");
    }
  }

  alertaServer: boolean = false
  showEstado () {
    this.alertaServer = !this.alertaServer
  }
}
