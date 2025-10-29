import { Component, NgModule, ViewChild } from '@angular/core';
import { User } from '../../shared/services/user';
import { ToastService } from '../../shared/services/toast';
import { AsyncPipe } from '@angular/common';
import { FallbackImagePipe } from '../../shared/pipes/fallback-image-pipe';
import { ShortenPipe } from '../../shared/pipes/shorten-pipe';
import {
  FormControl,
  FormGroup,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Modal } from '../modal/modal';
import { IUser } from '../../shared/interfaces/IProduct';
import { isValidImage } from '../../shared/validators/is-valid-image.validator';
import { passwordPatternValidator } from '../../shared/validators/password-pattern.validator';
import { passwordMatchValidator } from '../../shared/validators/password-match.validator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelect, MatOption } from '@angular/material/select';
import { MatIcon } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialog } from '../confirm-dialog/confirm-dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-users',
  imports: [
    AsyncPipe,
    FallbackImagePipe,
    ShortenPipe,
    FormsModule,
    Modal,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatSelect,
    MatOption,
    MatIcon,
    MatTableModule,
    MatPaginatorModule,
  ],
  templateUrl: './users.html',
  styleUrl: './users.scss',
})
export class Users {
  filterName = '';
  filterEmail = '';
  filterRole = '';

  editMode = false;
  isDeleteConfirmShow = false;
  isAddModalShow = false;
  selectedUser!: IUser | undefined;

  userForm!: FormGroup;

  displayedColumns: string[] = [
    'id',
    'avatar',
    'name',
    'email',
    'password',
    'role',

    'actions',
  ];
  dataSource!: MatTableDataSource<IUser>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    public userService: User,
    private toastService: ToastService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.userService.$filteredUsers.subscribe((users) => {
      this.dataSource = new MatTableDataSource(users);
      this.dataSource.paginator = this.paginator;
    });

    this.createForm();
  }

  createForm(user?: IUser) {
    this.userForm = new FormGroup(
      {
        name: new FormControl(user ? user.name : '', [Validators.required]),
        email: new FormControl(user ? user.email : '', [
          Validators.required,
          Validators.email,
        ]),
        avatar: new FormControl(
          user ? user?.avatar : '',
          [Validators.required],
          isValidImage()
        ),
        password: new FormControl(user ? user.password : '', [
          Validators.required,
          passwordPatternValidator(),
        ]),
        password2: new FormControl(user ? user.password : '', [
          Validators.required,
          passwordPatternValidator(),
        ]),
      },
      { validators: passwordMatchValidator('password', 'password2') }
    );
  }

  openConfirmDialog(user: IUser) {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      data: {
        title: 'Törlés megerősítése',
        itemName: user.name,
        message: 'Biztosan törölni szeretnéd ?',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.userService.delete(user).subscribe({
          next: (response) => {
            this.snackBar.open('Sikeres termék törlés', 'snackbar-success');
          },
          error: (err) => {
            this.snackBar.open('Hiba a termék törlésekor', 'snackbar-error');
          },
        });
      }
    });
  }

  openDeleteConfirmModal(user: IUser) {
    this.selectedUser = user;
    this.isDeleteConfirmShow = true;
  }

  deleteConfirmEvt(state: boolean) {
    if (state) {
      //delete user
      this.userService.delete(this.selectedUser!).subscribe(() => {
        this.toastService.show(
          'Sikeresen törölted a felhasználót',
          'bg-success',
          3000
        );
        this.selectedUser = undefined;
        this.isDeleteConfirmShow = false;
      });
    } else {
      this.selectedUser = undefined;
      this.isDeleteConfirmShow = false;
    }
  }
  openAddDialog(user?: IUser) {}
  openAddModal(user?: IUser) {
    if (user) {
      this.createForm(user);
      this.selectedUser = user;
      this.editMode = true;
      this.isAddModalShow = true;
    } else {
      this.createForm();
      this.editMode = false;
      this.isAddModalShow = true;
    }
  }
  addConfirmEvt(state: boolean) {
    this.userForm.markAllAsTouched();
    if (state) {
      //user mentése
      if (this.userForm.valid) {
        const user = this.userForm.value;
        if (this.editMode) {
          //update
          user.id = this.selectedUser?.id;
          this.userService.update(user).subscribe({
            next: (response) => {
              this.toastService.show(
                'Sikeresn módosítottad a felhasználó adatait!',
                'bg-success',
                3000
              );
              this.editMode = false;
              this.selectedUser = undefined;
              this.isAddModalShow = false;
            },
            error: (err) => {
              this.toastService.show('Valami hiba történ!', 'bg-danger', 3000);
              this.editMode = false;
              this.selectedUser = undefined;
              this.isAddModalShow = false;
            },
          });
        } else {
          //add
          this.userService.add(user).subscribe({
            next: (response) => {
              this.toastService.show(
                'Sikeresen hozzáadtad a felhasználót!',
                'bg-success',
                3000
              );
              this.isAddModalShow = false;
            },
            error: (err) => {
              this.toastService.show(
                'Hiba a felhasználó hozzáadásakor!',
                'bg-danger',
                3000
              );
              this.isAddModalShow = false;
              console.error(err);
            },
          });
        }
      }
    } else {
      this.isAddModalShow = false;
      this.selectedUser = undefined;
      this.editMode = false;
    }
  }
}
