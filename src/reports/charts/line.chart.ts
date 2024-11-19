import * as Utils from '../../helpers/chart-utils';

interface LineEntry {
  label: string;
  value: number;
}

type LineOptions = {
  entries: LineEntry[];
};

export const getLineChart = async ({ entries }: LineOptions) => {
  const data = {
    labels: entries.map((entry) => entry.label),
    datasets: [
      {
        label: 'Movimiento de inventario',
        data: entries.map((entry) => entry.value),
        borderColor: Utils.NAMED_COLORS.blue,
        backgroundColor: Utils.transparentize(Utils.NAMED_COLORS.blue, 0.5),
        pointStyle: 'circle',
        pointRadius: 5,
      },
    ],
  };

  const config = {
    type: 'line',
    data,
  };

  return Utils.chartJsToImage(config);
};
