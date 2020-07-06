import { Component, OnInit, ElementRef } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  public questions = [];
  public title: string;
  public minutes: number = 39;
  public seconds: number = 60;
  public numberOfQuestion = 0;
  public wrongQuestions = [];
  public testDone:boolean = false;
  public resultOfTest:boolean;
  constructor(private myService: DataService, private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.myService.getData()
      .then(res => {
         for (let i = 0; i < 30; i++) {
          const randomNum = Math.floor(Math.random() * res.item.length + 1);
          this.questions.push(res.item[randomNum]);
        }
        this.createQuestion();
        this.timerFunction();
      });
  }

  public createQuestion(): void {
    if(this.numberOfQuestion === this.questions.length){
      this.finishTest();
      return;
    }
    const myTitle = this.questions[this.numberOfQuestion].title.slice(5, this.questions[this.numberOfQuestion].title.length);
    if (myTitle) {
      this.title = myTitle;
    }
    let str = this.questions[this.numberOfQuestion].description;
    const n = str.search("<div style=");
    str = str.substring(0, n) + str.substring(str.length - 6, str.length)
    document.getElementById('testDiv').innerHTML = str;
    if (this.elementRef.nativeElement.querySelector('img')) {
      this.elementRef.nativeElement.querySelector('img').after(this.elementRef.nativeElement.querySelector('ul'));
    }
    let elementList = this.elementRef.nativeElement.querySelectorAll('li');
    for (let i = 0; i < elementList.length; i++) {
      elementList[i].addEventListener('click', this.checkAnswer.bind(this));
    }
  }
  public checkAnswer(obj):void {
    const answer = (this.elementRef.nativeElement.querySelector('[id^=correctAnswer]').childNodes[0]);
    if (obj.path[0].parentNode.nodeName === 'LI') {
      console.log()
      if (!obj.path[0].hasAttribute('id')) {
        const wrongAnswer = obj.path[0].childNodes[0];
        if (this.elementRef.nativeElement.querySelector('img')) {
        this.wrongQuestions.push({name:this.title ,rightAnswer: answer , userAnswer: wrongAnswer ,img: this.elementRef.nativeElement.querySelector('img').src});
        } else {
          this.wrongQuestions.push({name:this.title ,rightAnswer: answer , userAnswer: wrongAnswer});
        }
      }
    }
    if (obj.path[0].nodeName === 'LI') {
      const wrongAnswer = obj.path[0].childNodes[0].childNodes[0];
     if(!obj.path[0].childNodes[0].hasAttribute('id')) {
        if (this.elementRef.nativeElement.querySelector('img')) {
          this.wrongQuestions.push({name:this.title ,rightAnswer: answer , userAnswer: wrongAnswer ,img: this.elementRef.nativeElement.querySelector('img').src});
          } else {
            this.wrongQuestions.push({name:this.title ,rightAnswer: answer , userAnswer: wrongAnswer});
          }
      }
    }
    //end of function
    this.numberOfQuestion ++;
    this.createQuestion();
  }

  public getRandomQuestion(): number {
    return Math.floor(Math.random() * this.questions.length + 1);
  }
  public timerFunction():void{
    const myTimer = setInterval(() => {
      this.seconds --;
      if(this.seconds === 0 && this.minutes !== 0){
        this.minutes --;
        this.seconds = 60;
      }
      if(this.minutes === 0 && this.seconds === 0){
        console.log('done');
        clearInterval(myTimer);
      }
    },1000);
  }

  public finishTest():void {
    this.testDone = true;
    this.wrongQuestions.length > 4 ? this.resultOfTest = false : this.resultOfTest = true;
  }
}
