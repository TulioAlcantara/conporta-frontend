import { UserLogin } from "./user-login";

export class PartialProfile {
  id: number = 0;
  name: string = '';
  email: string = '';
  is_active: boolean = false;
  user: number = 0;

  public constructor(init?: Partial<PartialProfile>) {
    Object.assign(this, init);
  }
}
export class Profile {
  id: number = 0;
  name: string = '';
  email: string = '';
  is_active: boolean = false;
  user: User = new User();
}

export class User {
  id: number = 0
  login: string = ''
  password: string = ''
}
