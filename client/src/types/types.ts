export interface IData {
  id?: number
  title: string
  link: string
  description: string
  tags: string
  setData: any
  data: IData[]
}

export interface IArrTagID {
  id: number
  tags: string[]
}

// React.Dispatch<React.SetStateAction<IData[]>>