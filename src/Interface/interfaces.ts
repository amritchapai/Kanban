export interface IColumn {
  title: string;
  id: number;
  color: string
}

export interface ITask {
  title: string;
  id: number;
  columnId: number;
}