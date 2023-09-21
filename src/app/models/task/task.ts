import {User} from "../user/user";

export class Task {
  id='';
  title='';
  description='';
  completed:boolean=true;
  dueDate=Date();

  assignedUsers:User[]=[];
}
