export class UsersEntity {
  constructor(
    public username: string,
    public password: string,
    public firstName: string,
    public lastName: string,
    public phone: string,
    public email: string,
    public role: string,
    public id?: number
  ) {}
}
