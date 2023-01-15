import { Component, Input } from '@angular/core';
import { Schtroumpf } from 'src/app/models/Schtroumpf.model';
import { SchtroumpfService } from 'src/app/services/schtroumpf.service';

@Component({
  selector: 'app-schtroumpf',
  templateUrl: './schtroumpf.component.html',
  styleUrls: ['./schtroumpf.component.scss']
})
export class SchtroumpfComponent {
  schtroumpfs!: Schtroumpf[];

  updateForm: boolean = true;
  isAuthore: boolean = false;

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

    // if (localStorage.getItem('userId') !== this.schtroumpf._id.toString()) return;
    // this.isAuthore = true

  }

  onSelect() {
    console.log('selected')
  }

}
