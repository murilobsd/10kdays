"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var moment = require('moment');
var core_1 = require('@angular/core');
var ng2_translate_1 = require('ng2-translate/ng2-translate');
var AppComponent = (function () {
    function AppComponent(translate) {
        this.translate = translate;
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
    AppComponent.prototype.diffDays = function () {
        return this.finishDate.diff(this.myDate, 'days');
    };
    AppComponent.prototype.onKey = function (event) {
        if (this.userLang === 'en') {
            var date = moment(event.target.value, "MM/DD/YYYY", true);
        }
        else if (this.userLang === 'pt') {
            var date = moment(event.target.value, "DD/MM/YYYY", true);
        }
        else {
            this.result = true;
            this.buttonOk = false;
            this.msg = 'Desculpe não reconhecemos a língua do seu navegador, caso queira ajudar na tradução...';
            return;
        }
        if (date.isValid()) {
            if (date > this.finishDate) {
                this.result = true;
                this.buttonOk = true;
                this.msg = 'MSG_ERROR_DATA';
            }
            else {
                var diffDate = date.diff(this.startDate, 'days');
                this.msgDiff = diffDate;
                this.result = true;
                this.buttonOk = false;
                this.msg = 'MSG_DAYS';
            }
        }
        else {
            this.msg = 'INVALID_FORMAT_DATE';
            this.result = false;
            this.buttonOk = false;
        }
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'days',
            template: "\n  <div class=\"container\">\n    <div class=\"panel panel-calc panel-danger\">\n      <div class=\"panel-heading\">\n        <h2 class=\"text-center\">{{ 'TITLE' | translate}}</h2>\n      </div>\n      <div class=\"panel-body\">\n        <p [innerHTML]=\"'WELCOME' | translate:{value: diffDays()}\" ></p>\n        <input type=\"text\" (keyup)=\"onKey($event)\" placeholder=\"{{ 'PLACEHOLDER' | translate }}\" name=\"field-data\" id=\"field-data\" class=\"form-control\" />\n        <br />\n        <div *ngIf=\"result\" class=\"box-result\">\n          <p [innerHTML]=\"msg | translate:{value: msgDiff}\" class=\"big-txt\"></p>\n          <br>\n          <a *ngIf=\"buttonOk\" class=\"twitter-share-button\"\n              href=\"https://twitter.com/intent/tweet?text=Hello%20world\"\n              data-size=\"large\">\n            {{'SHARE' | translate}}</a>\n        </div>\n      </div>\n    </div>\n  ",
            pipes: [ng2_translate_1.TranslatePipe]
        }), 
        __metadata('design:paramtypes', [ng2_translate_1.TranslateService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map