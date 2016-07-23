import * as moment from 'moment';
import { Component } from '@angular/core';
import {DurationPipe} from 'angular2-moment';
import {TranslateService, TranslatePipe } from 'ng2-translate/ng2-translate';

@Component({
  selector: 'days',
  template: `
  <div class="container">
    <div class="panel panel-calc panel-danger">
      <div class="panel-heading">
        <h2 class="text-center">{{ 'TITLE' | translate}}</h2>
      </div>
      <div class="panel-body">
        <p [innerHTML]="'WELCOME' | translate:{value: diffDays()}" ></p>
        <input type="text" (keyup)="onKey($event)" placeholder="{{ 'PLACEHOLDER' | translate }}" name="field-data" id="field-data" class="form-control" />
        <br />
        <div *ngIf="result" class="box-result">
          <p [innerHTML]="msg | translate:{value: msgDiff}" class="big-txt"></p>
          <br>
          <a *ngIf="buttonOk" class="twitter-share-button"
              href="https://twitter.com/intent/tweet?text=Hello%20world"
              data-size="large">
            {{'SHARE' | translate}}</a>
        </div>
      </div>
    </div>
  `,
  pipes: [TranslatePipe]
})



export class AppComponent {
    myDate: moment.Moment;
    startDate: moment.Moment;
    finishDate: moment.Moment;
    msg: string;
    result: boolean;
    dfDays: number;
    userLang: string;
    msgDiff: number;
    buttonOk: boolean;

    constructor(public translate: TranslateService) {
        this.startDate = moment('1989-02-12');
        this.finishDate = moment('2016-07-28');
        this.myDate = moment([]);
        this.msg = '';
        this.result = false;
        this.buttonOk = false;
        this.userLang = navigator.language.split('-')[0];
        this.userLang = /(pt|en)/gi.test(this.userLang) ? this.userLang : 'pt';
        translate.use(this.userLang);
    }

    diffDays() {
        return this.finishDate.diff(this.myDate, 'days');
    }

    onKey(event:any) {
        if(this.userLang === 'en') {
            var date = moment(event.target.value, "MM/DD/YYYY", true);
        } else if(this.userLang === 'pt') {
            var date = moment(event.target.value, "DD/MM/YYYY", true);
        } else {
            this.result = true;
            this.buttonOk = false;
            this.msg = 'Desculpe não reconhecemos a língua do seu navegador, caso queira ajudar na tradução...';
            return;
        }

        if( date.isValid() ) {
            if(date > this.finishDate) {
                this.result = true;
                this.buttonOk = true;
                this.msg = 'MSG_ERROR_DATA';
            } else {
                var diffDate = date.diff(this.startDate, 'days');
                this.msgDiff = diffDate;
                this.result = true;
                this.buttonOk = false;
                this.msg = 'MSG_DAYS';
            }
        } else {
            this.msg = 'INVALID_FORMAT_DATE';
            this.result = false;
            this.buttonOk = false;
        }
    }
}
