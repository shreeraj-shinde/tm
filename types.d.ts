interface User {
  id?: string;
  name: string;
  email: string;
  Group?: Group[];
  Task?: Task[];
  type: string;
}

interface Group {
  id: string;
  name: string;
  Task?: Task[];
  users?: User[];
  type: string;
}

interface Task {
  id?: string;
  title: string;
  assignedToGroup?: Group[];
  assignedTo?: User[];
  createdAt?: Date;
  updatedAt?: Date;
  type: string;
}

interface Context {
  users: User[];
  setUsers: (users: User[]) => void;
  groups: Group[];
  setGroups: (groups: Group[]) => void;
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
}
export type { User, Group, Task, Context };
