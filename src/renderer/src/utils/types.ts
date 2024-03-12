export enum Language {
  ru = 'ru',
  uz = 'uz'
}

export enum Printers {
  main = 'main'
}

export interface ProductTypes {
  groups: [
    {
      status: number
      id: string
      code: string
      category: null | string
      created_at: string
      name: string
      description: string
      num: string
      parent_id: null | string
      updated_at: null | string
    }
  ]
  products: [
    {
      product_type: string
      name: string
      num: string
      parent_id: null | string
      total_price: number
      status: number
      updated_at: null | string
      code: string
      id: string
      price: number
      main_unit: string
      amount_left: null | number
      created_at: string
    }
  ]
}
