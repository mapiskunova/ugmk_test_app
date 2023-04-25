import { filterOptions, MONTHS, MONTHS_KEYS } from "./constants";

const getMsByDateString = (dateString) => {
  const [day, mon, year] = dateString.split('/');
  return new Date(year, mon - 1, day).getTime();
}

export const getLabels = (products) => {
  const filteredProducts = products.filter((product) => product.date);
  const productsSortedByDate = filteredProducts.sort(({ date: dateA }, { date: dateB }) => {
      const aMilliseconds = getMsByDateString(dateA);
      const bMilliseconds = getMsByDateString(dateB);
      return aMilliseconds - bMilliseconds;
    });

  const monthLabels = productsSortedByDate.reduce((labels, product) => {
    const [, monthNumber] = product.date.split('/');
    const monthLabel = MONTHS[monthNumber];

    if (labels.at(-1) !== monthLabel) labels.push(monthLabel);

    return labels;
  }, []);

  return monthLabels;
}

export const getMonthNumber = (month) => {
  return MONTHS_KEYS.find((key) => MONTHS[key] === month)
}

export const getData = ({
  factoryId,
  productType,
  products,
}) => {
  const currentMonths = getLabels(products);
  const isAllProducts = productType === 'All';

  const productTypeKey = isAllProducts
    ? ''
    : filterOptions.find((fo) => fo.value === productType)?.key || '';

  const filteredProductValues = products.filter((product) => product.factory_id === factoryId && product.date);

  const calculatedProducts = filteredProductValues
    .map((product) => {
      let productWeight = product[productTypeKey];
      if (isAllProducts) {
        productWeight = product.product1 + product.product2 + product.product3;
      }

      const productWeightInTon = productWeight / 1000;

      return {
        date: product.date,
        value: productWeightInTon,
      };
    });

  return currentMonths.map((month) => {
    const monthNumber = getMonthNumber(month);

    return ({
      month: month,
      value: calculatedProducts.reduce((sum, current) => {
        if (current.date.split('/')[1] === monthNumber) sum += current.value;
        return +sum.toFixed(2)
      }, 0)
    })
  })
}

