import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Schtroumpf } from 'src/app/models/Schtroumpf.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SchtroumpfService } from 'src/app/services/schtroumpf/schtroumpf.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-schtroumpf',
  templateUrl: './schtroumpf.component.html',
  styleUrls: ['./schtroumpf.component.scss']
})
export class SchtroumpfComponent {
  schtroumpfs!: Schtroumpf[];

  updateForm: boolean = false;
  userId!: string;
  isAdmin!: boolean;

  constructor(
    private schtroumpfService: SchtroumpfService,
    private tokenService: TokenService,
  ) { }

  ngOnInit() {

    if (!localStorage.getItem('token')) return;

    this.tokenService.isAdmin() ? this.isAdmin = true : this.isAdmin = false;

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

  deleteSchtroumpf(id: any) {
    const confirmDelete = confirm('Voulez-vous vraiment supprimer votre compte ?');
    if (!confirmDelete) return;

    this.schtroumpfService.deleteSchtroumpf(id).subscribe(
      (res) => {
        this.schtroumpfs = this.schtroumpfs.filter(schtroumpf => schtroumpf._id !== id);
        localStorage.clear();
        window.location.reload();
      }, 
      (err) => console.log(err)
    )
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
