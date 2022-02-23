import { Item } from "./item";

export interface Invoice {



  _id: String,
  number: number,
  taxes: Number,
  total: Number,
  items: Array<Item>,
  status: Number,
}
