export const factories = [{
  id: 1,
  label: 'Фабрика А',
  filterOptionIndex: 1,
  backgroundColor: 'red',
}, {
  id: 2,
  label: 'Фабрика Б',
  filterOptionIndex: 2,
  backgroundColor: 'blue',
}]

export const filterOptions = [
  { 
    label: 'Все продукты', 
    value: 'All',
  },
  {
    label: 'Продукт 1',
    value: 'Product 1',
    key: 'product1'
  },
  {
    label: 'Продукт 2',
    value: 'Product 2',
    key: 'product2'
  }
]

export const MONTHS = {
  1: 'Янв',
  2: 'Фев',
  3: 'Мар',
  4: 'Апр',
  5: 'Май',
  6: 'Июн',
  7: 'Июл',
  8: 'Авг',
  9: 'Сен',
  10: 'Окт',
  11: 'Ноя',
  12: 'Дек',
}

export const MONTHS_KEYS = Object.keys(MONTHS);