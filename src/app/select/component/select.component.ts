import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'select-lang',
  templateUrl: './select.component.html',
})
export class SelectLangComponent implements OnInit {
  constructor(public translate: TranslateService) {
    this.translate.setDefaultLang('PT-BR');
    translate.addLangs(['PT-BR', 'EN-US']);
    localStorage.setItem('selectTranslate', JSON.stringify(this.translate.langs));
    this.translate.use(localStorage.getItem('lang') || 'PT-BR');
  }

  ngOnInit() {}

  switchLang(lang: string) {
    let languages: string = "";
    languages = JSON.parse(localStorage.getItem('selectTranslate') as string);
    let index = languages.indexOf(lang);
    localStorage.setItem('lang', languages[index]);
    window.location.reload();
  }
}
