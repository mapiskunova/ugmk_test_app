import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Pie } from 'react-chartjs-2';

import { factories, filterOptions, MONTHS } from '../constants';
import { getData, getMonthNumber } from '../utils';

function serializeProducts(data) {
  return {
    labels: [filterOptions[1].label, filterOptions[2].label],
    datasets: [
      {
        label: 'value',
        data,
        backgroundColor: ['#007413', '#ff9a23'],
      }
    ],
  }
}

const options = {
  plugins: {
    legend: {
      position: 'bottom',
    },
    datalabels: {
      color: ({ dataIndex, dataset: { backgroundColor } }) => backgroundColor[dataIndex],
      anchor: 'end',
      align: 'end',
      formatter: (v) => v.value,
      labels: {
        value: 'value'
      }
    }
  }
}

function DetailsPage() {
  const { factory_id, month_number } = useParams();

  const [chartData, setChartData] = useState(null);

  const products = useSelector((store) => store.products.products);

  useEffect(() => {
    const productsData = factories.map(({ filterOptionIndex }) => getData({
      factoryId: Number(factory_id),
      productType: filterOptions[filterOptionIndex].value,
      products,
    }));

    const filteredProductsData = productsData
      .map((data) => data.filter(({ month }) => getMonthNumber(month) === month_number));

    setChartData(serializeProducts(filteredProductsData.flat(1)));
  }, [products])
  
  return (
    <div className="container">
      <div className='details_wrapper'>
        <h1>Статистика по продукции фабрики {factory_id === 1 ? 'А' : 'Б'} за {MONTHS[month_number]}</h1>
        {chartData && <Pie data={chartData} options={options} />}
      </div>
    </div>
  )
}

export default DetailsPage;