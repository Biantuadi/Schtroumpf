import { Component, Input } from '@angular/core';
import { Schtroumpf } from 'src/app/models/Schtroumpf.model';

@Component({
  selector: 'app-schtroumpf',
  templateUrl: './schtroumpf.component.html',
  styleUrls: ['./schtroumpf.component.scss']
})
export class SchtroumpfComponent {
  @Input() schtroumpf: Schtroumpf = {
    _id: 0,
    name: "",
    password: "",
    role: "",
    imageUrl: "",
    bio: ""
  }

}
