import { Component, OnInit } from '@angular/core';
import { Configuracao } from '../service/configuracao';
import { ConfiguracaoService } from '../service/configuracao.service';
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { RecommendationService } from 'src/app/homepage/service/recommendation.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-configuracao',
  templateUrl: './configuracao.component.html',
  styleUrls: ['./configuracao.component.css'],
})
export class ConfiguracaoComponent implements OnInit {
  selectedProfileFiles: FileList | undefined;
  urlImagem!: FormData;
  formConfig!: FormGroup;
  isDateValid: boolean = true;
  roleUser: boolean = true;

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

  userInfo: any = {
    userID: null,
    name: null,
    username: null,
    birthDate: null,
    mainPhone: null,
    secundaryPhone: null,
    thirdPhone: null,
    userTwitter: null,
    userFacebook: null,
    userInstagram: null,
  };

  userPass: any = {
    oldPassword: null,
    newPassword: null,
    password: null,
  };

  userDescription: any = {
    description: null,
  };

  userContact: any = {
    facebook: null,
    instagram: null,
    twitter: null,
    mainPhone: null,
    secundaryPhone: null,
    thirdPhone: null,
  };

  userAddress: any = {
    street: null,
    number: null,
    complement: null,
    neighborhood: null,
    zipCode: null,
    city: null,
    state: null,
  };

  invalidField: boolean = false;

  statesList = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'ES', 'GO', 'MA', 
  'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 
  'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];

  constructor(
    public recommendationService: RecommendationService,
    public configService: ConfiguracaoService,
    private formBuilder: FormBuilder,
    private router: Router,
    public datepipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.configService.ngOnInit();
    this.roleIfClient();
    this.configService.getValidation().subscribe(
      (response) => {}, 
      (err) => {
        if (err.status == 401) {
          this.router.navigate(['']);
        }else if(err.status == 500){
          this.router.navigate(['/erro']);
        }
      }
    );
    this.configService.getUserInfo().subscribe(
      (response: Configuracao) => {
        this.userInfo = response;
        this.userInfo.birthDate = this.datepipe.transform(this.userInfo.birthDate, 'MM/dd/YYYY');
      },
      (err) => {
        throw err;
      }
    ),
      this.configService.getAddress().subscribe(
        (response) => {
          this.userAddress = response;
        },
        (err) => {
          throw err;
        }
      ),
      this.configService.getContactInfo().subscribe(
        (response) => {
          this.userContact = response;
        },
        (err) => {
          throw err;
        }
      );
    this.formConfig = this.formBuilder.group({
      name: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Zà-úÀ-Ú]{4,}(?: [a-zA-Zà-úÀ-Ú]+){0,2}$'),
        ])
      ),
      phone: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[0-9]{13}$'),
        ])
      ),
      secondPhone: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[0-9]{13}$'),
        ])
      ),
      thirdPhone: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[0-9]{13}$'),
        ])
      ),
      password: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(
            '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
          ),
        ])
      ),
      confirmPassword: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(
            '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
          ),
        ])
      ),
      zipcode: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('[0-9]{5}-?[0-9]{3}'),
        ])
      ),
    });
  }

  updatePassword() {
    this.configService
      .updatePassword(
        this.userPass.oldPassword,
        this.userPass.newPassword,
        this.userPass.password
      )
      .subscribe(
        (response) => {
          this.Toast.fire({
            icon: 'success',
            title:
              localStorage.getItem('lang') === 'pt-BR'
                ? 'Dados salvos com sucesso!'
                : 'Information saved with success!',
          });
          return response;
        },
        (err) => {
          this.Toast.fire({
            icon: 'error',
            title:
              localStorage.getItem('lang') === 'pt-BR'
                ? 'Erro ao salvar os dados!'
                : 'Failed to save information!',
            text:
              localStorage.getItem('lang') === 'pt-BR'
                ? 'Tente novamente mais tarde!'
                : 'Try again later!',
          });
          throw err;
        }
      );
  }

  updateDescription() {
    this.configService
      .updateDescription(this.userDescription.description)
      .subscribe(
        async (response) => {
          await this.Toast.fire({
            icon: 'success',
            title:
              localStorage.getItem('lang') === 'pt-BR'
                ? 'Dados salvos com sucesso!'
                : 'Information saved with success!',
          });
          this.routeUpdateEvent();
          return response;
        },
        (err) => {
          this.Toast.fire({
            icon: 'error',
            title:
              localStorage.getItem('lang') === 'pt-BR'
                ? 'Erro ao salvar os dados!'
                : 'Failed to save information!',
            text:
              localStorage.getItem('lang') === 'pt-BR'
                ? 'Tente novamente mais tarde!'
                : 'Try again later!',
          });
          throw err;
        }
      );
  }

  updateContact() {

    if((this.userContact.facebook || this.userContact.facebook == '') &&
      (this.userContact.instagram || this.userContact.instagram == '') &&
      (this.userContact.twitter || this.userContact.twitter == '') &&
      (/^[0-9]{13}$/.test(this.userContact.mainPhone) || this.userContact.mainPhone == '') &&
      (/^[0-9]{13}$/.test(this.userContact.secundaryPhone) || this.userContact.secundaryPhone == '') &&
      (/^[0-9]{13}$/.test(this.userContact.thirdPhone) || this.userContact.thirdPhone == ''))
      {
    this.configService
      .updateContact(
        this.userContact.facebook,
        this.userContact.instagram,
        this.userContact.twitter,
        this.userContact.mainPhone,
        this.userContact.secundaryPhone,
        this.userContact.thirdPhone
      )
      .subscribe(
        async (response) => {
          await this.Toast.fire({
            icon: 'success',
            title:
              localStorage.getItem('lang') === 'pt-BR'
                ? 'Dados salvos com sucesso!'
                : 'Information saved with success!',
          });
          this.routeUpdateEvent();
          return response;
        },
        (err) => {
          this.Toast.fire({
            icon: 'error',
            title:
              localStorage.getItem('lang') === 'pt-BR'
                ? 'Erro ao salvar os dados!'
                : 'Failed to save information!',
            text:
              localStorage.getItem('lang') === 'pt-BR'
                ? 'Tente novamente mais tarde!'
                : 'Try again later!',
          });
          throw err;
        }
      );
    } else {
      this.invalidField = true;
    }
  }

  updateAddress() {

    if((this.userAddress.street || this.userAddress.street == '') &&
      (this.userAddress.complement || this.userAddress.complement == '') &&
      (this.userAddress.neighborhood || this.userAddress.neighborhood == '') &&
      (this.userAddress.city || this.userAddress.city == '') &&
      (this.userAddress.state || this.userAddress.state == '') &&
      (/^[0-9]{5}-?[0-9]{3}$/.test(this.userAddress.zipCode) || this.userAddress.zipCode == '') &&
      (/^\d+$/.test(this.userAddress.number) || this.userAddress.number == null)
      )
    {
      this.configService
        .updateAddress(
          this.userAddress.street,
          this.userAddress.number,
          this.userAddress.complement,
          this.userAddress.neighborhood,
          this.userAddress.zipCode,
          this.userAddress.city,
          this.userAddress.state
        )
        .subscribe(
          async (response) => {
            await this.Toast.fire({
              icon: 'success',
              title:
                localStorage.getItem('lang') === 'pt-BR'
                  ? 'Dados salvos com sucesso!'
                  : 'Information saved with success!',
            });
            this.routeUpdateEvent();
            return response;
          },
          (err) => {
            this.Toast.fire({
              icon: 'error',
              title:
                localStorage.getItem('lang') === 'pt-BR'
                  ? 'Erro ao salvar os dados!'
                  : 'Failed to save information!',
              text:
                localStorage.getItem('lang') === 'pt-BR'
                  ? 'Tente novamente mais tarde!'
                  : 'Try again later!',
            });
            throw err;
          }
        );
      } else {
        this.invalidField = true;
      }
  }

  async uploadProfile() {
    const file = this.selectedProfileFiles?.item(0);

    if (file == undefined) {
      return await this.uploadProfileServiceCall();
    } else {
      let formData: FormData = new FormData();
      formData.append(file.name, file);
      await this.uploadUserPicture(formData);
      return await this.uploadProfileServiceCall();
    }
  }

  async uploadProfileServiceCall() {

    if ((this.userInfo.name || this.userInfo.name == '') &&
      (this.userInfo.username || this.userInfo.username == '') &&
      (this.userInfo.backgroundPicture || this.userInfo.backgroundPicture == '') &&
      (this.userInfo.birthDate || this.userInfo.birthDate == '') &&
      (/^[0-9]{13}$/.test(this.userInfo.mainPhone) || this.userInfo.mainPhone == '') &&
      (/^[0-9]{13}$/.test(this.userInfo.secundaryPhone) || this.userInfo.secundaryPhone == '') &&
      (/^[0-9]{13}$/.test(this.userInfo.thirdPhone) || this.userInfo.thirdPhone == ''))
    {
      this.configService
        .updateUserInfo(
          this.userInfo.name,
          this.userInfo.username,
          this.userInfo.backgroundPicture,
          this.userInfo.birthDate,
          this.userInfo.mainPhone,
          this.userInfo.secundaryPhone,
          this.userInfo.thirdPhone
        )
        .subscribe(
          async (response) => {
            await this.Toast.fire({
              icon: 'success',
              title:
                localStorage.getItem('lang') === 'pt-BR'
                  ? 'Dados salvos com sucesso!'
                  : 'Information saved with success!',
            });
            this.routeUpdateEvent();
            return response;
          },
          (err) => {
            this.Toast.fire({
              icon: 'error',
              title:
                localStorage.getItem('lang') === 'pt-BR'
                  ? 'Erro ao salvar os dados!'
                  : 'Failed to save information!',
              text:
                localStorage.getItem('lang') === 'pt-BR'
                  ? 'Tente novamente mais tarde!'
                  : 'Try again later!',
            });
            throw err;
          }
        );
    } else {
      this.invalidField = true;
    }

  }

  async uploadUserPicture(formData: FormData) {
    this.configService.updateUserPicture(formData).subscribe();
  }

  selectProfileFile(event: any) {
    this.selectedProfileFiles = event.target.files;
  }

  routeUpdateEvent() {
    location.reload();
  }

  public verifyAge() {
    let input = new Date(this.userInfo.birthDate);
    let today = new Date();

    //@ts-ignore
    let mills = today - input;
    let years = Math.floor(mills / 31556952000);

    if (years <= 100 && years >= 18) {
      this.isDateValid = true;
    } else {
      this.isDateValid = false;
    }
  }

  roleIfClient(){    
    this.recommendationService.getRole().subscribe(
    (response) => {
      console.warn('response Client',response.role);
      if(response.role === 'Client'){
        this.roleUser = true;
      } else {
        this.roleUser = false;
      }
     }
  );
  }
}