export interface IData {
  id?: number
  title: string
  link: string
  description: string
  tags: string[]
}

export interface IInputs {
  nameLabel: string
  type: string
  onchange?: (e: any) => void
}