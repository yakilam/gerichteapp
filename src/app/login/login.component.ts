import { Component } from '@angular/core';
import { LoginService } from './services/login.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
import { MatButtonModule} from '@angular/material/button';
import { MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  authForm!: FormGroup;

  constructor(private loginservice: LoginService, private fb: FormBuilder, private snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    this.loginservice.isLoggedInChanged.subscribe(value => {
      if(value == true){
        this.router.navigate(['/','profil']);
      } else{
        this.snackBar.open("Erfolgreich ausgeloggt!", "OK", {
          duration: 3000
        });
        this.router.navigate(['/','login']);
      }
    });

    this.loginservice.isUnknownUserChanged.subscribe(value => {
      if(value == true){
        localStorage.removeItem("token");
        this.snackBar.open("Unbekannte Kombination aus Username und Passwort!", "OK", {
            duration: 3000
        });
      }
    });

    this.loginservice.isRegisteredChanged.subscribe(value => {
        this.snackBar.open(value, "OK", {
            duration: 3000
        });
    });

    this.authForm = this.fb.group({
      userName: [''],
      password: ['']
    });
  }

  try_login() {
    this.loginservice.login(this.authForm.value);
  }

  try_register(){
    this.loginservice.register(this.authForm.value);
  }

}
