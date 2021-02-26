interface Store {
  address: string
  deliver (pizza: object): void
  bake (pizza: object): void
}

export {
  Store
}
