import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/IProduct';
import { BehaviorSubject, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class User {
  baseUrl = 'https://api.escuelajs.co/api/v1/users/';

  private _email: string = '';
  private _name: string = '';
  private _createdAt: string = '';
  private _updatedAt: string = '';
  private _role: string = '';

  private users: IUser[] = [];

  $filteredUsers = new BehaviorSubject<IUser[]>([]);

  constructor(private http: HttpClient) {
    this.refresh();
  }

  private refresh() {
    this.getAll().subscribe();
  }

  getAll() {
    return this.http.get(this.baseUrl).pipe(
      tap((response) => {
        this.users = response as IUser[];
        this.applyFilter();
      })
    );
  }

  get(userId: number) {
    return this.http.get(this.baseUrl + userId);
  }

  add(user: IUser) {
    const body = user;
    return this.http
      .post(this.baseUrl, body, {
        headers: { 'Content-Type': 'application/json' },
      })
      .pipe(
        tap(() => {
          this.refresh();
        })
      );
  }
  delete(user: IUser) {
    //return this.http.delete()
    return of(true).pipe(
      tap(() => {
        this.refresh();
      })
    );
  }
  update(user: IUser) {
    const { id, ...body } = user;
    return this.http.put(this.baseUrl + id, body).pipe(
      tap(() => {
        this.refresh();
      })
    );
  }

  checkMailAvailable(email: string) {
    const body = {
      email,
    };
    return this.http.post(
      this.baseUrl + 'is-available',
      body
    ); /**isAvailable:false|true */
  }

  applyFilter() {
    if (!this.email && !this.name && !this.role) {
      this.$filteredUsers.next(this.users);
    } else {
      let filteredUsers = this.users.filter((u: IUser) => {
        const matchesEmail =
          !this.email ||
          u.email?.toLowerCase().includes(this.email.toLowerCase());
        const matchesName =
          !this.name || u.name?.toLowerCase().includes(this.name.toLowerCase());

        const matchesRole =
          !this.role || u.role?.toLowerCase().includes(this.role.toLowerCase());

        return matchesEmail && matchesName && matchesRole;
      });
      this.$filteredUsers.next(filteredUsers);
    }
  }
  clearFilter() {
    this.email = '';
    this.name = '';
    this.createdAt = '';
    this.updatedAt = '';
    this.role = '';
    this.applyFilter();
  }

  // email
  get email(): string {
    return this._email;
  }
  set email(value: string) {
    this._email = value;
    this.applyFilter();
  }

  // name
  get name(): string {
    return this._name;
  }
  set name(value: string) {
    this._name = value;
    this.applyFilter();
  }

  // createdAt
  get createdAt(): string {
    return this._createdAt;
  }
  set createdAt(value: string) {
    this._createdAt = value;
    this.applyFilter();
  }

  // updatedAt
  get updatedAt(): string {
    return this._updatedAt;
  }
  set updatedAt(value: string) {
    this._updatedAt = value;
    this.applyFilter();
  }

  // avatar
  get role(): string {
    return this._role;
  }
  set role(value: string) {
    this._role = value;
    this.applyFilter();
  }
}
