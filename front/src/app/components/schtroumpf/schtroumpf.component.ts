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

  updateForm: boolean = false;
  userId!: string;

  constructor(
    private schtroumpfService: SchtroumpfService,
  ) { }

  ngOnInit() {

    if (!localStorage.getItem('token')) return;

    this.schtroumpfService.getschtroumpfs().subscribe(
      (res: any) => {
        this.schtroumpfs = res;

        const userId = localStorage.getItem('userId');
        if (!userId) return;

        this.schtroumpfs.sort((a, b) => (a._id.toString() === userId) ? -1 : (b._id.toString() === userId) ? 1 : 0);

      },
      (err) => console.log(err)
    )

    const userId = localStorage.getItem('userId');
    if (!userId) return;

    this.userId = userId;

  }

  onSelect() {
    this.updateForm = true;

    const container = document.querySelector('.container_schtroumpf');
    if (!container) return;

    container.classList.add('blur');

  }

  onUpdateFormContainerChange(updateFormContainer: boolean) {
    this.updateForm = updateFormContainer;
  }

}
