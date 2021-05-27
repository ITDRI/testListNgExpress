import {Dictionary, Item, ItemInfo, TableItemInfo} from './interfaces';

export const mockDictionary: Dictionary = {
  id: 'test dictionary id',
  description: 'test dictionary description',
  size: 'test dictionary size',
  relation: 'test dictionary relation',
  visibility: 'test dictionary visibility',
  color: 'test dictionary color'
}

export const mockItemInfo: TableItemInfo[] = [
  {key: 'id', value: '1', mappedKey: mockDictionary['id']},
  {key: 'description', value: 'test description', mappedKey: mockDictionary['description']},
  {key: 'size', value: 'test size', mappedKey: mockDictionary['size']},
  {key: 'relation', value: 'test relation', mappedKey: mockDictionary['relation']},
  {key: 'visibility', value: 'test visibility', mappedKey: mockDictionary['visibility']},
  {key: 'color', value: 'test color', mappedKey: mockDictionary['color']},
]

export const mockHttpItemsWithsOneRoot: Item[] = [
  {id: 1, parentId: null, name: 'some group A'},
  {id: 2, parentId: 1, name: 'some name B'},
  {id: 3, parentId: 1, name: 'some name C'},
  {id: 4, parentId: 2, name: 'some name D'},
  {id: 5, parentId: 1, name: 'some name E'},
  {id: 6, parentId: 4, name: 'some name F'},
]

export const expectedItemsWithsOneRoot: Item[] = [
  {
    id: 1, parentId: null, name: 'some group A', children: [
      {
        id: 2, parentId: 1, name: 'some name B', children: [
          {id: 4, parentId: 2, name: 'some name D', children: [{id: 6, parentId: 4, name: 'some name F', children: []}]}
        ]
      },
      {id: 3, parentId: 1, name: 'some name C', children: []},
      {id: 5, parentId: 1, name: 'some name E', children: []}
    ]
  },

]

export const mockHttpItemsWithSomeRoots: Item[] = [
  {id: 1, parentId: null, name: 'some group A'},
  {id: 2, parentId: null, name: 'some group B'},
  {id: 3, parentId: 1, name: 'some child C'},
  {id: 4, parentId: 2, name: 'some child D'},
  {id: 5, parentId: 1, name: 'some child E'},
  {id: 6, parentId: 4, name: 'some child F'},
  {id: 7, parentId: null, name: 'some group G'},
  {id: 8, parentId: 7, name: 'some child H'},
  {id: 9, parentId: 7, name: 'some child J'},
  {id: 10, parentId: 8, name: 'some child K'},
]

export const expectedItemsWithSomeRoots: Item[] = [
  {
    id: 1, parentId: null, name: 'some group A', children: [
      {id: 3, parentId: 1, name: 'some child C', children: []},
      {id: 5, parentId: 1, name: 'some child E', children: []}
    ]
  },
  {
    id: 2, parentId: null, name: 'some group B', children: [
      {id: 4, parentId: 2, name: 'some child D', children: [{id: 6, parentId: 4, name: 'some child F', children: []}]}
    ]
  },
  {
    id: 7, parentId: null, name: 'some group G', children: [
      {id: 8, parentId: 7, name: 'some child H', children: [{id: 10, parentId: 8, name: 'some child K', children: []}]},
      {id: 9, parentId: 7, name: 'some child J', children: []}
    ]
  }
]

export const rootStructure = {
  children: [
    {text: 'some group A'},
    {text: 'some group B'},
    {text: 'some group G'}
  ]
}

export const firstRootExpandedStructure = {
  children: [
    {
      text: 'some group A',
      children: [
        {text: 'some child C'},
        {text: 'some child E'}
      ]
    },
    {text: 'some group B'},
    {text: 'some group G'}
  ]
}

export const mockHttpItemsWithAllroots: Item[] = [
  {id: 1, parentId: null, name: 'some name A'},
  {id: 2, parentId: null, name: 'some name B'},
  {id: 3, parentId: null, name: 'some name C'},
  {id: 4, parentId: null, name: 'some name D'},
  {id: 5, parentId: null, name: 'some name E'},
  {id: 6, parentId: null, name: 'some name F'},
]

export const expectedItemsWithAllroots: Item[] = [
  {id: 1, parentId: null, name: 'some name A', children: []},
  {id: 2, parentId: null, name: 'some name B', children: []},
  {id: 3, parentId: null, name: 'some name C', children: []},
  {id: 4, parentId: null, name: 'some name D', children: []},
  {id: 5, parentId: null, name: 'some name E', children: []},
  {id: 6, parentId: null, name: 'some name F', children: []},
]

export const mockHttpItemInfoData: ItemInfo = {
  id: 1, description: 'test description', size: 'test size', relation: 'test relation', visibility: 'test visibility', color: 'test color'
}

export const expectedItemsFromMethod: Item[] =
  [
    {
      id: 1, parentId: null, name: 'test name 1', children: [
        {id: 2, parentId: 1, name: 'test name 2', children: []}
      ]
    },
    {id: 3, parentId: null, name: 'test name 3', children: []}
  ]

export const mockHttpItemsDataToMethod: Item[] = [
  {id: 1, parentId: null, name: 'test name 1'},
  {id: 2, parentId: 1, name: 'test name 2'},
  {id: 3, parentId: null, name: 'test name 3'}
]

export const mockHttpInfoDataToMethod: ItemInfo = {
  id: 1, description: 'test description', size: 'test size', relation: 'test relation', visibility: 'test visibility', color: 'test color'
}
