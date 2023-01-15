import { Component, Renderer2 } from '@angular/core';
import { SchtroumpfService } from 'src/app/services/schtroumpf.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  schtroumpfs: any = [];

  constructor(
    private schtroumpfService: SchtroumpfService,
  ) { }

  ngOnInit() {

    if (!localStorage.getItem('token')) return;

    this.schtroumpfService.getschtroumpfs().subscribe(
      (res: any) => {
        this.schtroumpfs = res;
      },
      (err) => console.log(err)
    )

  }

}
