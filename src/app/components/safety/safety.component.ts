import { Component, OnInit, ElementRef } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-safety',
  templateUrl: './safety.component.html',
  styleUrls: ['./safety.component.css']
})
export class SafetyComponent implements OnInit {

  public safetyArr = [];
  public title: string;
  constructor(private myService: DataService, private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.myService.getData()
      .then(res => {
        res.item.map(item => {
          if (item.category === "בטיחות") {
            this.safetyArr.push(item);
          }
        });
        this.createQuestion();
      });
  }

  public createQuestion(): void {
    const randomNum = +this.getRandomItem();
    const myTitle = this.safetyArr[randomNum].title.slice(5, this.safetyArr[randomNum].title.length);
    if(myTitle){
      this.title = myTitle;
    }
    let str = this.safetyArr[randomNum].description;
    const n = str.search("<div style=");
    str = str.substring(0, n) + str.substring(str.length - 6, str.length)
    document.getElementById('safetyDiv').innerHTML = str;
    this.safetyArr.splice(randomNum,1);
    if(this.elementRef.nativeElement.querySelector('img')){
      this.elementRef.nativeElement.querySelector('img').after(this.elementRef.nativeElement.querySelector('ul'));
    }
    let elementList = this.elementRef.nativeElement.querySelectorAll('li');
      for (let i = 0; i < elementList.length; i++) {
        elementList[i].addEventListener('click', this.checkAnswer.bind(this));
      }
  }
  public checkAnswer(obj) {
    if (obj.path[0].parentNode.nodeName === 'LI') {
      if(obj.path[0].hasAttribute('id')){
        obj.path[0].parentNode.style.background = 'green';
        setTimeout(() => {
          this.createQuestion();
        }, 1000);
      } else {
        obj.path[0].parentNode.style.background = 'red';
      }
    }
    if (obj.path[0].nodeName === 'LI') {
      if (obj.path[0].childNodes[0].hasAttribute('id')) {
        obj.path[0].style.background = 'green';
        setTimeout(() => {
          this.createQuestion();
        }, 1000);
      } else {
        obj.path[0].style.background = 'red';
      }

    }
  }
  public getRandomItem(): number {
    return Math.floor(Math.random() * this.safetyArr.length + 1);
  }

}
