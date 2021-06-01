import { AdminUnit, AdminUnitMember } from './admin-unit';
import { UserLogin } from './user-login';

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
  id: number = 0;
  login: string = '';
  password: string = '';
}

export class CompleteProfile {
  profile: PartialProfile = new PartialProfile();
  is_boss = false;
  boss_of_admin_unit: AdminUnit =  new AdminUnit();
  member_of_admin_unit: AdminUnit[] = [];
  memberships: AdminUnitMember[] = [];

  constructor(memberships?: AdminUnitMember[]) {
    if (memberships) {
      memberships.forEach((membership) => {
        this.memberships.push(membership);
        this.profile = membership.profile;
        if (membership.is_boss) {
          this.is_boss = true;
          this.boss_of_admin_unit = membership.admin_unit;
        } else {
          this.member_of_admin_unit.push(membership.admin_unit);
        }
      });
    }
  }
}
