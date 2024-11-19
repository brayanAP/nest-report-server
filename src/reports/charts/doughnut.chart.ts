import * as Utils from '../../helpers/chart-utils';

interface DonutEntry {
  label: string;
  value: number;
}

type DonutOptions = {
  position?: 'left' | 'right' | 'top' | 'bottom';
  entries: DonutEntry[];
};

export const getDonutChart = async ({
  entries,
  position = 'left',
}: DonutOptions) => {
  const data = {
    labels: entries.map((entry) => entry.label),
    datasets: [
      {
        label: 'Dataset',
        data: entries.map((entry) => entry.value),
        backgroundColor: Object.values(Utils.CHART_COLORS),
      },
    ],
  };

  const config = {
    type: 'doughnut',
    data,
    options: {
      legend: {
        position,
      },
      plugins: {
        datalabels: {
          color: 'white',
          font: {
            weight: 'bold',
            size: 14,
          },
        },
      },
    },
  };

  return Utils.chartJsToImage(config);
};
