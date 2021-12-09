import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { VerificationCodeService } from '../service/verification-code.service';
import { LoginService } from 'src/app/login/service/login.service';

@Component({
  selector: 'app-verificationcode',
  templateUrl: './verificationcode.component.html',
  styleUrls: ['./verificationcode.component.css'],
})
export class VerificationcodeComponent {
  form: any = {
    verificationCode: null,
  };
  formVerificationCode!: FormGroup;
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
    private verificationCodeService: VerificationCodeService,
    private router: Router,
    private formBuilder: FormBuilder,
    private loginService: LoginService
  ) {}

  ngOnInit() {
    this.formVerificationCode = this.formBuilder.group({
      verificationCode: new FormControl('', Validators.required),
    });
  }

  validateAuthenticationCode() {
    let userId = localStorage.getItem('userId');

    if (userId == null) {
      this.router.navigateByUrl('/homepage');
    }

    this.verificationCodeService
      .validateVerificationCode(userId, this.form.verificationCode)
      .subscribe(
        (response) => {
          this.router.navigateByUrl('/trocasenha');
          return response;
        },
        (err) => {
          if (err.status == 400) {
            this.Toast.fire({
              icon: 'error',
              title:
                localStorage.getItem('lang') === 'en-US'
                  ? 'Invalid code!'
                  : 'Código inválido!',
              text:
                localStorage.getItem('lang') === 'en-US'
                  ? 'Verification code expired and/or invalid!'
                  : 'Código de verificação expirado e/ou inválido!',
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

  sendForgotPasswordMail(): void {
    let email = localStorage.getItem('email');

    if (email == null) {
      this.router.navigateByUrl('/homepage');
    }

    this.loginService.passwordRecovery(email).subscribe(
      (response) => {
        this.Toast.fire({
          icon: 'success',
          title:
            localStorage.getItem('lang') === 'en-US'
              ? 'Successfully resent!'
              : 'Reenviado com sucesso!',
        });
        return response;
      },
      (err) => {
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
    );
  }
}
