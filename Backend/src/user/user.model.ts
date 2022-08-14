"use strict";

export interface IUser extends Document {
  user_id : number;
  name: string;
  lastname: string;
  password: string;
  email: string;
}