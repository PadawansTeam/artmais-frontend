import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'select-lang',
  templateUrl: './select.component.html',
})
export class SelectLangComponent implements OnInit {
  constructor(public translate: TranslateService) {
    this.translate.setDefaultLang('pt-BR');
    translate.addLangs(['pt-BR', 'en-US']);
    localStorage.setItem('selectTranslate', JSON.stringify(this.translate.langs));
    this.translate.use(localStorage.getItem('lang') || 'pt-BR');
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
