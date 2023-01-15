import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Schtroumpf } from 'src/app/models/Schtroumpf.model';
import { SchtroumpfService } from 'src/app/services/schtroumpf/schtroumpf.service';

@Component({
  selector: 'app-update-form',
  templateUrl: './update-form.component.html',
  styleUrls: ['./update-form.component.scss']
})
export class UpdateFormComponent {
  updateForm!: FormGroup;
  formPreview$!: Observable<Schtroumpf>;
  urlRegex!: RegExp;

  // @Input() schtroumpfs!: Schtroumpf;*
  @Input() updateFormContainer!: boolean;
  @Output() updateFormContainerChange = new EventEmitter<boolean>();

  constructor(
    private formBuilder: FormBuilder,
    private stroumpfService: SchtroumpfService,
  ) { }

  ngOnInit() {

    this.urlRegex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/;

    this.updateForm = this.formBuilder.group({
      name: "",
      role: "",
      imageUrl: ["", Validators.pattern(this.urlRegex)],
      bio: "",
    });

    this.formPreview$ = this.updateForm.valueChanges.pipe(
      map((formValue) => ({
        ...formValue,
        id: 0,
      }))
    );
  }

  closeForm() {
    this.updateFormContainer = false;
    this.updateFormContainerChange.emit(this.updateFormContainer);

    const container = document.querySelector('.container_schtroumpf');
    if (!container) return;

    container.classList.remove('blur');
  }

  onSubmit() {
    const formValue = this.updateForm.value;
    const userId = localStorage.getItem('userId');

    if (!userId) return;

    this.stroumpfService.updateSchtroumpf(userId, formValue).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => console.log(err)
    )


    this.closeForm();
  }

}
