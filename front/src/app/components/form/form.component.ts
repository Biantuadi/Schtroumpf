import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  loginForm!: FormGroup;
  isSignupPage = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    if (this.router.url == "/signup") this.isSignupPage = true;

    this.loginForm = this.formBuilder.group({

    })


  }

  onSubmit() { }

}
