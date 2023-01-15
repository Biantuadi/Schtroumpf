import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Schtroumpf } from 'src/app/models/Schtroumpf.model';

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

  onSubmit() { }

}
