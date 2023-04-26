import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Bar, getDatasetAtEvent, getElementAtEvent } from 'react-chartjs-2';

import { factories, filterOptions } from '../constants';
import { getData, getLabels, getMonthNumber } from '../utils';

const initialProductType = localStorage.getItem('productType') || 'All';

function serializeProducts(products, productType) {
  return {
    labels: getLabels(products),
    datasets: factories.map(({ backgroundColor, id, label }) => ({
      backgroundColor,
      label,
      data: getData({ factoryId: id, productType, products }).map(({ value }) => value),
    })),
  }
}

const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      grid: {
        display: false
      }
    },
    y: {
      grid: {
        display: false
      }
    }
  },
  plugins: {
    legend: {
      position: 'bottom',
    },
    datalabels: {
      display: false
    }
  }
}

function MainPage() {
  const navigate = useNavigate();

  const chartRef = useRef();

  const [chartData, setChartData] = useState(null);
  const [productType, setProductType] = useState(initialProductType);
  
  const products = useSelector((store) => store.products.products);

  useEffect(() => {
    const serializedProducts = serializeProducts(products, productType);
    setChartData(serializedProducts);
  }, [products, productType])

  const onChangeProductType = (event) => {
    setProductType(event.target.value);
    localStorage.setItem('productType', event.target.value);
  }

  const getFactory = (dataset) => {
    if (!dataset.length) return;

    const datasetIndex = dataset[0].datasetIndex;
    return chartData.datasets[datasetIndex].label;
  };

  const getMonth = (element) => {
    if (!element) return;

    const { index } = element;
    return chartData.labels[index];
  };

  const onClick = (event) => {
    const { current: chart } = chartRef;
    if (!chart) return;
    
    const [interactionItem] = getElementAtEvent(chart, event);
    if (!interactionItem) return;
    
    const interactionItems = getDatasetAtEvent(chart, event);
    const factoryLabel = getFactory(interactionItems);
    
    const month = getMonth(interactionItem);

    const factory = factories.find(({ label }) => label === factoryLabel);
    const monthNumber = getMonthNumber(month);

    navigate(`/details/${factory?.id}/${monthNumber}`);
  }

  return (
    <div className="container">
      <div className="main_wrapper ">
        <div className="main_container__border flex-end">
          <span className="label">Фильтр по типу продукции</span>
          <select
            defaultValue={productType}
            onChange={onChangeProductType}
            name="products"
          >
            {filterOptions.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
        <div className='main_container__border chart'>
          {chartData && (
            <Bar
              ref={chartRef}
              data={chartData}
              onClick={onClick}
              options={options}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default MainPage;