import {User} from '../../components/common/user/user.model';


export class Article {
  public id: number;
  public title: string;
  public body: string;
  // tslint:disable-next-line:variable-name
  public user_id: number;

  // tslint:disable-next-line:variable-name
  constructor(id: number, title: string, body: string, user_id: number) {
    this.title = title;
    this.body = body;
    this.user_id = user_id;
    this.id = id;
  }
}
