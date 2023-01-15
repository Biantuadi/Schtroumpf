import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!: FormGroup;

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
