import { Component, OnInit, Output } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @Output() registerChange = new EventEmitter();

  loginForm: FormGroup;
  error_messages = {
    email: [
      { type: 'required', message: 'El correo es necesario' },
      { type: 'minLength', mesaage: 'El correo no cumple con los caracteres' },
      { type: 'maxLength', message: 'El correo tiene muchos caracteres' },
      { type: 'pattern', message: 'Ingresa un correo valido' },
    ],
    password: [
      { type: 'required', message: 'La contraseña es necesaria' },
      { type: 'minLength', mesaage: 'La contraseña tiene bajos caracteres' },
      { type: 'maxLength', message: 'La contraseña a pasado el limite de los caracteres' },
      { type: 'pattern', message: 'Ingresa una contraseña valida' },
    ]
  };

  constructor(public formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group(
      {
        password: new FormControl('', Validators.compose(
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(30),
          ]
        )),
        email: new FormControl('', Validators.compose(
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(50),
            Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'),
          ]
        ))
      }
    );

   }

  ngOnInit() {
  }

  tryLogin(value) {
    console.log(value);
  }

}
