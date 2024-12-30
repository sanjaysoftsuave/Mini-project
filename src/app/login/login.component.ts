import { Component, OnInit } from '@angular/core';
import { NgControl, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FormService } from '../_services/form.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public username = this.formService.username;
  public password = this.formService.password;
  public invalidPassword = this.formService.invalidPassword;

  constructor(private router: Router, private formService : FormService) {

  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.authenticate()
    }
  }

  authenticate() {
    this.formService.login(this.username, this.password).subscribe({
      next:(res) => {
          this.formService.setUsername(this.username)
          sessionStorage.setItem("jwt", res.token);
          this.invalidPassword = false;
          this.router.navigate(['/home']);
      },
      error:(error) => {
        this.invalidPassword = true;
        console.error('Login failed: Invalid credentials');
      }
    }
    )
  }

  ngOnInit(): void {

  }
}
