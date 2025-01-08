import {Entity, model, property} from '@loopback/repository';
import {Role} from './role.enum';
import {FormattedDate} from './formatted-date.decorator';

@model()
export class User extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  user_id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      enum: Object.values(Role),
    },
  })
  role: Role;

  // @FormattedDate()
  // @property({
  //   type: 'string',
  //   required: false,
  // })
  // createdOn?: string;

  // @FormattedDate()
  // @property({
  //   type: 'string',
  //   required: false,
  // })
  // modifiedOn?: string;


  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
