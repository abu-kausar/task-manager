export interface Todo {
  id: string;
  title: string;
  description: string;
  status: 'New' | 'Ongoing' | 'Done';
  createdAt: Date;
  dueDate: Date;
}