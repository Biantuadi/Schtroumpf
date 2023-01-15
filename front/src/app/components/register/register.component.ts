import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      // récupérer la valeur de returnUrl
      const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
      // rediriger l'utilisateur vers la page d'où il venait
      this.router.navigate([returnUrl]);
    }
  }

}
