import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";

const KMeansClustering = () => {
  const [plotData, setPlotData] = useState([]);
  const [nSamples, setNSamples] = useState(5000);

  useEffect(() => {
    const getRandomColor = () =>
      `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)})`;

    const centers = [
      [4, 4],
      [-2, -1],
      [2, -3],
      [1, 1],
    ];
    const cluster_std = 0.9;

    const X = [];
    const kMeansLabels = [];

    centers.forEach((center, centerIdx) => {
      for (let i = 0; i < Math.floor(nSamples / centers.length); i++) {
        const point = [
          center[0] + cluster_std * Math.random(),
          center[1] + cluster_std * Math.random(),
        ];
        X.push(point);
        kMeansLabels.push(
          centerIdx * Math.floor(nSamples / centers.length) + i
        );
      }
    });

    const kMeansClusterCenters = [
      [2.5, 3.5],
      [0.5, 1.5],
      [-1, -2],
      [3, 2],
      // ... Add more cluster centers as needed
    ];

    const colors = kMeansLabels.map(() => getRandomColor());

    const scatterData = kMeansLabels.map((label, idx) => {
      if (X[idx]) {
        return {
          type: "scatter",
          mode: "markers",
          x: [X[idx][0]],
          y: [X[idx][1]],
          marker: {
            color: colors[label],
            size: 8,
          },
        };
      } else {
        return null;
      }
    });

    const centerData = kMeansClusterCenters.map((center, idx) => {
      return {
        type: "scatter",
        mode: "markers",
        x: [center[0]],
        y: [center[1]],
        marker: {
          color: colors[idx],
          size: 12,
          symbol: "diamond",
          line: {
            width: 2,
          },
        },
      };
    });

    setPlotData([...scatterData, ...centerData]);
  }, [nSamples]);

  const handleNSamplesChange = (event) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value)) {
      setNSamples(value);
    }
  };

  return (
    <div>
      <div>
        <label>
          Number of Samples:
          <input
            type="number"
            value={nSamples}
            onChange={handleNSamplesChange}
          />
        </label>
      </div>
      <Plot
        data={plotData}
        layout={{
          title: "KMeans",
          showlegend: false,
          xaxis: {
            showgrid: false,
            zeroline: false,
            showticklabels: false,
          },
          yaxis: {
            showgrid: false,
            zeroline: false,
            showticklabels: false,
          },
        }}
      />
    </div>
  );
};

export default KMeansClustering;
