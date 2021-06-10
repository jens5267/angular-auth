import { Router } from '@angular/router';
import { CrudService } from './../../services/crud.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css'],
})
export class CrudComponent implements OnInit {
  people: any;

  message: any;
  type: any;

  agepattern = /^\d*(\.)?(\d{0,2})?$/;

  personaddform!: FormGroup;
  personupform!: FormGroup;

  constructor(
    private api: CrudService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.api.getPersons().subscribe(
      (res: any) => {
        this.people = res;
      },
      (err: any) => {
        this.message = err;
        this.type = 'danger';
      }
    );
    this.InitFormValidators();
  }
  showModal(id: number) {
    let fields = [this.first_name_up, this.last_name_up, this.age_up];
    let data: any = this.getFields(id);
    //@ts-ignore
    this.find('person_id')?.innerText = id;
    for (let i in fields) {
      fields[i]?.setValue(data[i]?.innerText);
    }
    this.openUpdateModal();
  }
  InitFormValidators() {
    this.personaddform = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      age: ['', Validators.required],
    });
    this.personupform = this.formBuilder.group({
      first_name_up: ['', Validators.required],
      last_name_up: ['', Validators.required],
      age_up: ['', Validators.required],
    });
  }
  // CRUD functions

  // Create
  addPerson() {
    if (this.personaddform.valid) {
      this.api.addPerson(this.personaddform.getRawValue()).subscribe(
        (res: any) => {
          window.location.reload();
          console.log(res);
        },
        (err: any) => {
          console.log(err);
        }
      );
    }
  }
  // Update
  updatePerson() {
    if (this.personupform.valid) {
      let id = parseInt(document.getElementById('person_id')?.innerText!);
      let data = this.getUpdateFormData();
      this.api.updatePerson(id, data).subscribe(
        (res: any) => {
          window.location.reload();
          console.log(res);
        },
        (err: any) => {
          console.log(err);
        }
      );
    }
  }

  // Delete
  deletePerson(id: number) {
    this.api.deletePerson(id).subscribe(
      (res: any) => {
        window.location.reload();
        console.log(res);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
  openUpdateModal() {
    document.getElementById('openModalButton')?.click();
  }
  find(id: any) {
    return document.getElementById(id);
  }

  // get ...
  getUpdateFormData() {
    return {
      first_name: this.personupform.getRawValue()['first_name_up'],
      last_name: this.personupform.getRawValue()['last_name_up'],
      age: this.personupform.getRawValue()['age_up'],
    };
  }
  getFields(id: number) {
    return [
      this.find(`data_${id}_first`),
      this.find(`data_${id}_last`),
      this.find(`data_${id}_age`),
    ];
  }
  get first_name_up() {
    return this.personupform.get('first_name_up');
  }
  get last_name_up() {
    return this.personupform.get('last_name_up');
  }
  get age_up() {
    return this.personupform.get('age_up');
  }
  get first_name() {
    return this.personaddform.get('first_name');
  }
  get last_name() {
    return this.personaddform.get('last_name');
  }
  get age() {
    return this.personaddform.get('age');
  }
}
