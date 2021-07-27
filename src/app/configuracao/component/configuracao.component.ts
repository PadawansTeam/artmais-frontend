import { Component, OnInit } from '@angular/core';
import { Configuracao } from '../service/configuracao';
import { ConfiguracaoService } from '../service/configuracao.service';

@Component({
  selector: 'app-configuracao',
  templateUrl: './configuracao.component.html',
  styleUrls: ['./configuracao.component.css']
})
export class ConfiguracaoComponent implements OnInit {

  information!: Configuracao;

  userInfo: any = {
    name: null,
    username: null,
    userPicture: null,
    birthDate: null,
    mainPhone: null,
    secundaryPhone: null,
    thirdPhone: null,
    userTwitter: null,
    userFacebook: null,
    userInstagram: null
  }

  userPass: any = {
    oldPassword: null, 
    newPassword: null,
    password: null,
  }

  userDescription: any = {
    description: null, 
  }

  userContact: any = {
    facebook: null,
    instagram: null,
    twitter: null,
    mainPhone: null,
    secundaryPhone: null,
    thirdPhone: null,
  }

  userAddress: any = {
    street: null,
    number: null,
    complement: null,
    neighborhood: null,
    zipCode:null
  }

  constructor(
    public configService: ConfiguracaoService
  ) { }

  ngOnInit(): void {
    this.configService.getUserInfo().subscribe(
      (response: Configuracao) => {
        this.information = response;
        this.userInfo = response;
        this.userContact = response;
        console.log(response.birthDate)
        this.configService.getAddress().subscribe(
          (response) => {
            this.userAddress = response;
          },
          (err) => {
            throw err;
          }
        )
      },
      (err) => {
        throw err;
      }
    )
  }

  updateUserInfo(){
    this.configService.updateUserInfo(
      this.userInfo.name,
      this.userInfo.username,
      this.userInfo.userPicture,
      this.userInfo.birthDate,
      this.userInfo.mainPhone,
      this.userInfo.secundaryPhone,
      this.userInfo.thirdPhone
    ).subscribe(
      (response) => {
        return response;
      },
      (err) => {
        throw err;
      }
    );
  }

  updatePassword(){
    this.configService.updatePassword(
      this.userPass.oldPassword,
      this.userPass.newPassword,
      this.userPass.password,
    ).subscribe(
      (response) => {
        return response;
      },
      (err) => {
        throw err;
      }
    );
  }

  updateDescription(){
    this.configService.updateDescription(
      this.userDescription.description
    ).subscribe(
      (response) => {
        return response;
      },
      (err) => {
        throw err;
      }
    );
  }

  updateContact(){
    this.configService.updateContact(
      this.userContact.facebook, 
      this.userContact.instagram, 
      this.userContact.twitter, 
      this.userContact.mainPhone, 
      this.userContact.secundaryPhone, 
      this.userContact.thirdPhone, 
    ).subscribe(
      (response) => {
        return response;
      },
      (err) => {
        throw err;
      }
    );
  }

  updateAddress(){
    this.configService.updateAddress(
      this.userAddress.street, 
      this.userAddress.number, 
      this.userAddress.complement, 
      this.userAddress.neighborhood, 
      this.userAddress.zipCode,
    ).subscribe(
      (response) => {
        return response;
      },
      (err) => {
        throw err;
      }
    );
  }
}
