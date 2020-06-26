import { User } from './../../models/user';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.scss']
})
export class TablaComponent implements OnInit {

  displayedColumns: string[] = ['name', 'age', 'username', 'accion'];
  dataSource;
  User: User ;
  newUserForm: FormGroup;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private userService: UserService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.newform();
    this.getUsers();
  }
  newform() {
    this.newUserForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      age: [0, [Validators.required]],
      username: ['', [Validators.required]]
  }, {});
  }
  SelectUser(User) {
    this.newUserForm = this.formBuilder.group({
      name: [User.name, [Validators.required]],
      age: [User.age, [Validators.required]],
      username: [User.username, [Validators.required]],
      id: [User.id, [Validators.required]]
  }, {});
  }
  getUsers() {
    this.userService.getUsers()
    .subscribe(
        data => {
          this.dataSource = new MatTableDataSource<User>(data);
          this.dataSource.paginator = this.paginator;
        },
        error => {
          console.log(error);
        });
  }
  getUserbyId(id: number) {
    this.userService.getUserbyId(id)
    .subscribe(
        data => {
          return data;
        },
        error => {
          console.log(error);
        });
  }
  createUserby() {
     // Stop if the form validation has failed
    if (this.newUserForm.invalid) {
        return;
    }
    this.userService.CreateUser(this.frm.name.value, this.frm.age.value, this.frm.username.value)
    .subscribe(
        data => {
          this.getUsers();
          this.newform();
        },
        error => {
          console.log(error);
        });
  }
  updatetUser() {
    // Stop if the form validation has failed
    if (this.newUserForm.invalid) {
      return;
  }
    this.userService.UpdateUserbyId(this.frm.name.value, this.frm.age.value, this.frm.username.value, this.frm.id.value)
    .subscribe(
        data => {
          this.getUsers();
          this.newform();
        },
        error => {
          console.log(error);
        });
  }
  deleteUserbyId(id: number) {
    this.userService.DeleteUserbyId(id)
    .subscribe(
        data => {
          this.getUsers();
        },
        error => {
          console.log(error);
        });
  }
  get frm() { return this.newUserForm.controls; }
}

