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
    }, { updateOn: 'blur' })

    this.formPreview$ = this.authForm.valueChanges.pipe(
      map((formValue) => ({
        ...formValue,
        id: 0,
      }))
    )

  }

  onSubmit() {
    if (this.authForm.invalid) return;
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
              (err) => console.log(err)
            )
          },
          (err) => console.log(err)
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
          (err) => console.log(err)
        )
        break;

      default:
        break;
    }

  }

}