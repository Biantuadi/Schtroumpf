import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLogged = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authService.isLoggedInSource$.subscribe(    /* D'abord, on s'abonne à l'observable qui veut dire que quand il y a un changement, on va exécuter la fonction qui est dans le subscribe. */
      (res: boolean) => {                            /* On va recevoir le résultat de l'observable et on va le stocker dans la variable res. */
        this.isLogged = res;                  /* On va stocker le résultat de l'observable dans la variable isAuthenticated. */
      }
    )

    if (!localStorage.getItem('token')) return;
    this.authService.changeAuthStatus(true);

  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}