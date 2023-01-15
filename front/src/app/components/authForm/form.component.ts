import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Schtroumpf } from 'src/app/models/Schtroumpf.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  authForm!: FormGroup;
  isSignupPage = false;
  formPreview$!: Observable<Schtroumpf>;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private _authService: AuthService,
    private _tokenService: TokenService
  ) { }

  ngOnInit() {
    if (this.router.url == "/signup") this.isSignupPage = true;

    this.authForm = this.formBuilder.group({
      name: ["", Validators.required],
      role: "",
      password: ["", Validators.required]
    })

    this.formPreview$ = this.authForm.valueChanges.pipe(
      map((formValue) => ({
        ...formValue,
        id: 0,
      }))
    )

  }

  closeError() {
    const divErros = document.querySelector('.errors');
    if (!divErros) return;

    divErros.classList.remove('show');
  }

  erros(err: any) {
    {
      const errors = err;
      const divErros = document.querySelector('.errors');
      const divErrosP = document.querySelector('.errors  span');

      if (!divErros || !divErrosP) return;

      divErrosP.innerHTML = `${errors}`;
      divErros.classList.add('show');

    }
  }

  onSubmit() {
    if (this.authForm.invalid) {
      let ceQuiEstInvalide = "";
      const errorName: any = this.authForm.controls['name'].invalid ? 'Le nom est requis' : '';
      const errorPassword: any = this.authForm.controls['password'].invalid ? 'Le mot de passe est requis' : '';
      const bothEmpty: any = this.authForm.controls['name'].invalid && this.authForm.controls['password'].invalid ? 'Les deux champs sont requis' : '';

      if (errorName) ceQuiEstInvalide += errorName;
      if (errorPassword) ceQuiEstInvalide += errorPassword;
      if (bothEmpty) ceQuiEstInvalide = bothEmpty;

     return this.erros(ceQuiEstInvalide);
    };

    this.authForm.value.name = this.authForm.value.name.toLowerCase();

    switch (this.router.url) {

      case "/signup":

        this._authService.signup(this.authForm.value).subscribe(
          () => {
            this._authService.login(this.authForm.value).subscribe(
              (res: any) => {
                this._tokenService.saveToken(res.token);
                localStorage.setItem("userId", res.userId);
                this.router.navigate(['/']);
                this._authService.changeAuthStatus(true); /* On va changer le status de l'observable. */
              },
              (err) => this.erros(err.error.message)
            )
          },
          (err) => this.erros(err.error.message)
        )
        break;

      case "/login":

        this._authService.login(this.authForm.value).subscribe(
          (res: any) => {
            this._tokenService.saveToken(res.token);
            localStorage.setItem("userId", res.userId);
            this.router.navigate(['/']);
            this._authService.changeAuthStatus(true); /* On va changer le status de l'observable. */
          },
          (err) => this.erros(err.error.message)
        )
        break;

      default:
        break;
    }

  }

}
