import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SignsComponent } from './components/signs/signs.component';
import { RulesComponent } from './components/rules/rules.component';
import { SafetyComponent } from './components/safety/safety.component';
import { GetKnowCarComponent } from './components/get-know-car/get-know-car.component';
import { TestComponent } from './components/test/test.component';


const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "signs", component: SignsComponent },
  { path: "road-rules", component: RulesComponent },
  { path: "safety", component: SafetyComponent },
  { path: "get-know-car", component: GetKnowCarComponent },
  { path: "test", component: TestComponent },
  { path: "", redirectTo: "/home", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
