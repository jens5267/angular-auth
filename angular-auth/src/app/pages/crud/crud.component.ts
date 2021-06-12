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
  form_loading: boolean = false;
  loading: boolean = true;
  constructor(
    private api: CrudService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.api.getPersons().subscribe(
      (res: any) => {
        this.loading = false;
        this.people = res;
        console.log(this.people);
      },
      (err: any) => {
        this.loading = false;
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
  closeModal(id: string) {
    this.find(id)?.click();
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
      this.form_loading = true;
      this.api.addPerson(this.personaddform.getRawValue()).subscribe(
        (res: any) => {
          this.form_loading = false;
          this.closeModal('close_add');
          let person = this.personaddform.getRawValue();
          person['id'] = res['id'];
          this.people.push(person);
        },
        (err: any) => {
          this.form_loading = false;
          console.log(err);
        }
      );
    }
  }
  // Update
  updatePerson() {
    if (this.personupform.valid) {
      this.form_loading = true;
      let id = parseInt(document.getElementById('person_id')?.innerText!);
      let data = this.getUpdateFormData();
      this.api.updatePerson(id, data).subscribe(
        (res: any) => {
          this.form_loading = false;
          console.log(data);
          this.people = this.update(id, data);
          this.closeModal('close_up');
        },
        (err: any) => {
          this.form_loading = false;
          console.log(err);
        }
      );
    }
  }

  // Delete
  deletePerson(id: number) {
    if (confirm('Delete this person ?')) {
      this.api.deletePerson(id).subscribe(
        (res: any) => {
          this.people = this.remove(id);
          console.log(res);
        },
        (err: any) => {
          console.log(err);
        }
      );
    }
  }
  // Some helper functions

  // for removing person from array by id
  remove(id: number) {
    this.people = this.people.filter((value: any, index: any, arr: any) => {
      return value['id'] != id;
    });

    return this.people;
  }

  // for updating spec data in array by id
  update(id: number, data: any) {
    data['id'] = id;
    for (let i in this.people) {
      if (this.people[i]['id'] == id) {
        console.log(this.people[i]);
        this.people[i] = data;
        break;
      }
    }
    return this.people;
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
