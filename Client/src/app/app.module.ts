import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from './app-routing.module';
import { LayoutComponent } from './components/layout/layout.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { SignsComponent } from './components/signs/signs.component';
import { RulesComponent } from './components/rules/rules.component';
import { SafetyComponent } from './components/safety/safety.component';
import { GetKnowCarComponent } from './components/get-know-car/get-know-car.component';
import { TestComponent } from './components/test/test.component';

@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    HomeComponent,
    SignsComponent,
    RulesComponent,
    SafetyComponent,
    GetKnowCarComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [LayoutComponent]
})
export class AppModule { }
