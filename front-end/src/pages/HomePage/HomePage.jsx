import React, { useState } from 'react';
import './HomePage.css';
import { VietNamMap } from '../../components/VietNamMap';
import { HSTS } from '../../assets/images/map';
import vietnamMap from "@highcharts/map-collection/countries/vn/vn-all.geo.json";
import { getProvinceColor } from '../../utils/getProvinceColorUtil';
import { provinces, rawData } from '../../constants';

const allowedProvinces = [
  'vn-hg',
  'vn-cb',
  'vn-ls',
];

export const HomePage = () => {
  const [currentProvince, setCurrentProvince] = useState(""); 
  const [chartOptions, setChartOptions] = useState();
  
  const handleResetZoom = () => {
    setCurrentProvince("")
    setChartOptions(mapData);
  }

  const mappedData = rawData.map(([key, value]) => ({
    'hc-key': key,
    value,
    name: provinces[key] || key,
    color: getProvinceColor(allowedProvinces, key),
  }));

  const mapData = {
    chart: {
      map: vietnamMap,
      style: {
        fontFamily: 'Nunito',
      },
      width: 500, 
      height: 650, 
    },
    title: {
      text: 'Bản đồ Việt Nam',
      style: {
        fontSize: '18px',
      },
    },
    mapNavigation: {
      enabled: false,
      enableDoubleClickZoom: false,       
      enableDoubleClickZoomTo: false      
    },
    tooltip: {
      useHTML: true,
      formatter: function () {
        return `<b>${this.point.name}</b>`;
      },
      style: {
        fontFamily: 'Nunito',
        fontSize: '14px',
      },
    },
    colorAxis: {
      min: 0,
    },
    series: [
      {
        name: "Tỉnh/Thành",
        data: mappedData,
        joinBy: 'hc-key',
        states: {
          hover: {
            color: "#2a7a4d",
          },
        },
        dataLabels: {
          enabled: false,
        },
        point: {
          events: {
            click: function () {
              const clickedKey = this['hc-key'];

              if (!allowedProvinces.includes(clickedKey)) {
                alert("Tỉnh chưa được mở khóa");
                return;
              }

              setCurrentProvince(clickedKey);
            
              const filteredMapData = {
                ...vietnamMap,
                features: vietnamMap.features.filter(f => f.properties['hc-key'] === clickedKey),
              };
            
              const filteredRawData = mappedData.filter((item) => {
                return item["hc-key"];
              });
              
              setChartOptions(prev => ({
                ...prev,
                chart: {
                  ...prev.chart,
                  map: filteredMapData,
                },
                series: [
                  {
                    ...prev.series[0],
                    data: filteredRawData,
                  }
                ],
                title: {
                  text: `Bản đồ: ${provinces[clickedKey] || clickedKey}`,
                }
              }));
            },
          },
        },
      }
    ],

  };
  
  return (
    <div className="home-page">
      {!currentProvince && <img className="background" src={HSTS} alt="" />}
      {
        currentProvince &&
        <button onClick={handleResetZoom}>Quay lại toàn bản đồ</button>
      }
      <div className="map">
        <VietNamMap 
          mapData={mapData}
          setCurrentProvince={setCurrentProvince}
          allowedProvinces={allowedProvinces}
          chartOptions={chartOptions}
          setChartOptions={setChartOptions}
        />
      </div>
    </div>
  )
}
