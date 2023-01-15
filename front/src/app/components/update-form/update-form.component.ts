import { Component, Input } from '@angular/core';
import { Schtroumpf } from 'src/app/models/Schtroumpf.model';

@Component({
  selector: 'app-update-form',
  templateUrl: './update-form.component.html',
  styleUrls: ['./update-form.component.scss']
})
export class UpdateFormComponent {
  // @Input() schtroumpfs!: Schtroumpf;
  @Input() updateForm!: boolean;

  constructor() { }

  ngOnInit() {
    console.log(this.updateForm);
  }

}
