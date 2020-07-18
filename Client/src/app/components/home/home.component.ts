import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private myService: DataService) { }

  ngOnInit(): void {
    const tmpArr = [];
    this.myService.getData()
      .then(res => {
        res.item.map(item => {
          const check = tmpArr.find(tmp => tmp === item.category);
          if(check){return;}
          tmpArr.push(item.category)
        });
        console.log(tmpArr)
      });
      
  }

}
