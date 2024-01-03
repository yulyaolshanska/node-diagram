import { Edge, Node } from 'reactflow'

export interface IOption {
  value: string
  label: string
}

export interface SelectOption {
  value: string
  label: string
}

export interface INodes extends Node {
  data: {
    placeholder: string
    selectedValues: string[]
  }
}

export interface IinitialState {
  nodes: INodes[]
  edges: Edge[]
}
