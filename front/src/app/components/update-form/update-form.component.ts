import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Schtroumpf } from 'src/app/models/Schtroumpf.model';

@Component({
  selector: 'app-update-form',
  templateUrl: './update-form.component.html',
  styleUrls: ['./update-form.component.scss']
})
export class UpdateFormComponent {
  updateForm!: FormGroup;
  formPreview$!: Observable<Schtroumpf>;

  // @Input() schtroumpfs!: Schtroumpf;*
  @Input() updateFormContainer!: boolean;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    console.log(this.updateForm);

    this.updateForm = this.formBuilder.group({
      name: ["", Validators.required],
      role: "",
      imageUrl: ["", Validators.required],
      bio: ["", Validators.required],
    }, { updateOn: 'blur' });

    this.formPreview$ = this.updateForm.valueChanges.pipe(
      map((formValue) => ({
        ...formValue,
        id: 0,
      }))
    );
  }

  onSubmit() { }

}
