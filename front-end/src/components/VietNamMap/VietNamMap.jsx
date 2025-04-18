import React, { useEffect, useState } from "react";
import "./VietNamMap.css";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highmaps";



export const VietNamMap = ({ mapData, setCurrentProvince, allowedProvinces, chartOptions, setChartOptions }) => {
  const chartRef = React.useRef(null);
  

  
  const resetZoom = () => {
    const chart = chartRef.current?.chart;
    if (chart) {
      chart.mapZoom(1);
    }
  };

  useEffect(() => {
    setChartOptions(mapData);
    resetZoom();
  }, [])

  return (
    <>
      {chartOptions && (
        <HighchartsReact
          highcharts={Highcharts}
          options={chartOptions}
          constructorType={"mapChart"}
          updateArgs={[true, true, true]}
          ref={chartRef}
        />
      )}
    </>
  );
};
