import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Output() updateFormContainerChange = new EventEmitter<boolean>();

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
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

  closeForm(){
    this.updateFormContainer = false;
    this.updateFormContainerChange.emit(this.updateFormContainer);

    const container = document.querySelector('.container_schtroumpf');
    if (!container) return;
    
      container.classList.remove('blur');
}

  onSubmit() { }

}
