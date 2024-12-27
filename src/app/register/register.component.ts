import { Component } from '@angular/core';
import {FormService} from '../_services/form.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  userForm : FormGroup

  constructor(private formService: FormService, private router : Router, private fb : FormBuilder ) {
    this.userForm = this.fb.group({
      username : ['', [Validators.required,Validators.minLength(6)]],
      password : ['',Validators.required]
    })
  }

  get userExistvar() {
    return this.formService.userExist
  }

  onCreate() {
    const username = this.userForm.get('username')?.value;
    const password = this.userForm.get('password')?.value;
    this.formService.create(username,password).subscribe({
      next: (res) => {
        console.log(res)
        this.formService.userExist = false
        this.formService.username = username;
        this.router.navigate(['/home']);
      },
      error:(error) => {
        console.log(error)
        this.formService.userExist = true
        console.log(this.formService.userExist)
      }
    })
  }
}
