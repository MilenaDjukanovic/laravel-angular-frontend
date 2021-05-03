export class User {
  public id: number;
  public name: string;
  public email: string;
  public password: string;
  // tslint:disable-next-line:variable-name
  public api_token: string;

  // tslint:disable-next-line:variable-name
  constructor(id: number, name: string, email: string, password: string, api_token: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.api_token = api_token;
  }
}
