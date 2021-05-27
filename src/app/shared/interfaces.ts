export interface Item {
  id: number
  parentId: null | number
  name: string
  children?: Item[]
}

export interface ItemInfo {
  id: number
  description: string
  size: string
  relation: string
  visibility: string
  color: string
}

export interface Dictionary {
  id: string
  description: string
  size: string
  relation: string
  visibility: string
  color: string
}

export interface TableItemInfo {
  key: string
  value: string
  mappedKey: string
}
