import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MessagesService } from './../shared/services/messages.service';
import { AuthService} from "./../shared/services/auth.service";
import { Router } from '@angular/router';

  @Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  credentials = {username: '', password: ''};

  constructor(
    private fb: FormBuilder,
    private msgService: MessagesService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.buildForm();

  }

  buildForm(){
    this.loginForm = this.fb.group({
      userName: ['eve.holt@reqres.in',[
        Validators.required
    ]],
      userPass: ['',[
        Validators.required,
      ]
    ]
    });
  }

  login(){ 
    this.authService.login(this.loginForm.get('userName').value, this.loginForm.get('userPass').value)
      .subscribe(       
        () => {
          this.msgService.setMessage({
            type: 'success',
            body: `${this.loginForm.get('userName').value}, Вы успешно вошли в систему!`
          });
          setTimeout( () => {this.router.navigate(['/persons'])}, 2000);
        },

        (err) =>{
          this.msgService.setMessage({
            type: 'danger',
            body: err.error.error
          });
        }
        
      )

  } 
}

