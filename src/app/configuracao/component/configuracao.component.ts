import { Component, OnInit } from '@angular/core';
import { Configuracao } from '../service/configuracao';
import { ConfiguracaoService } from '../service/configuracao.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-configuracao',
  templateUrl: './configuracao.component.html',
  styleUrls: ['./configuracao.component.css'],
})
export class ConfiguracaoComponent implements OnInit {
  information!: Configuracao;
  selectedProfileFiles: FileList | undefined;
  urlImagem!: any;
  formConfig!: FormGroup;

  userInfo: any = {
    userID: null,
    name: null,
    username: null,
    userPicture: null,
    backgroundPicture: null,
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

  constructor(
    public configService: ConfiguracaoService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.configService.getUserInfo().subscribe(
      (response: Configuracao) => {
        this.information = response;
        this.userInfo = response;
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
      name: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z]{4,}(?: [a-zA-Z]+){0,2}$')
      ])),
      phone: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[0-9]{13}$')
      ])),
      secondPhone: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[0-9]{13}$')
      ])),
      thirdPhone: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[0-9]{13}$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')
      ])),
      confirmPassword: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')
      ])),
      zipcode: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('/^\d{5}-?\d{3}$/')
      ])),
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
          return response;
        },
        (err) => {
          throw err;
        }
      );
  }

  updateDescription() {
    this.configService
      .updateDescription(this.userDescription.description)
      .subscribe(
        (response) => {
          return response;
        },
        (err) => {
          throw err;
        }
      );
  }

  updateContact() {
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
        (response) => {
          return response;
        },
        (err) => {
          throw err;
        }
      );
  }

  updateAddress() {
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
        (response) => {
          return response;
        },
        (err) => {
          throw err;
        }
      );
  }

  async uploadProfile(userID: number) {
    const file = this.selectedProfileFiles?.item(0);
    if (file == undefined) this.urlImagem = this.userInfo.userPicture;
    else this.urlImagem = await this.configService.uploadProfileFile(file!, userID);
    this.configService
      .updateUserInfo(
        this.userInfo.name,
        this.userInfo.username,
        this.urlImagem,
        this.userInfo.backgroundPicture,
        this.userInfo.birthDate,
        this.userInfo.mainPhone,
        this.userInfo.secundaryPhone,
        this.userInfo.thirdPhone
      )
      .subscribe(
        (response) => {
          return response;
        },
        (err) => {
          throw err;
        }
      );
  }

  selectProfileFile(event: any) {
    this.selectedProfileFiles = event.target.files;
  }
}
