import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PasswordChangeService } from '../service/password-change.service';

@Component({
  selector: 'app-passwordchange',
  templateUrl: './passwordchange.component.html',
  styleUrls: ['./passwordchange.component.css'],
})
export class PasswordchangeComponent implements OnInit {
  form: any = {
    newPassword: null,
    newPasswordConfirmation: null,
  };
  formPasswordChange!: FormGroup;
  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });

  constructor(
    private passwordChangeService: PasswordChangeService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formPasswordChange = this.formBuilder.group({
      newPassword: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(
            '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
          ),
        ])
      ),
      newPasswordConfirmation: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(
            '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
          ),
        ])
      ),
    });
  }

  updatePassword() {
    let userId = localStorage.getItem('userId');

    if (userId == null) {
      this.router.navigateByUrl('/homepage');
    }

    this.passwordChangeService
      .updatePassword(
        userId,
        this.form.newPassword,
        this.form.newPasswordConfirmation
      )
      .subscribe(
        (response) => {
          this.Toast.fire({
            icon: 'success',
            title:
              localStorage.getItem('lang') === 'en-US'
                ? 'Password changed successfully!'
                : 'Senha alterada com sucesso!',
          });
          this.router.navigateByUrl('/login');
          return response;
        },
        (err) => {
          if (err.status == 400) {
            this.Toast.fire({
              icon: 'error',
              title:
                localStorage.getItem('lang') === 'en-US'
                  ? 'Invalid password!'
                  : 'Senha inválida!',
              text:
                localStorage.getItem('lang') === 'en-US'
                  ? 'Invalid and/or different passwords!'
                  : 'Senhas inválidas e/ou diferentes!',
            });
            throw err;
          }
          if (err.status == 500) {
            this.Toast.fire({
              icon: 'error',
              title:
                localStorage.getItem('lang') === 'en-US'
                  ? 'Unknown error!'
                  : 'Erro desconhecido',
              text:
                localStorage.getItem('lang') === 'en-US'
                  ? 'Try again later!'
                  : 'Tente novamente mais tarde!',
            });
            throw err;
          }
        }
      );
  }
}
