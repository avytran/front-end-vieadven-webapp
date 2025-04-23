import React, { useCallback, useEffect, useState } from 'react';
import './HomePage.css';
import { VietNamMap } from '../../components/VietNamMap';
import { Item } from '../../components/Item';
import { HSTS } from '../../assets/images/map';
import { Card } from '../../components/Card';
import { adventure } from '../../assets/images/navbar-icons';
import vietnamMap from "@highcharts/map-collection/countries/vn/vn-all.geo.json";
import { getProvinceColor } from '../../utils/getProvinceColorUtil';
import { provinces, rawData } from '../../constants';
import { ProvinceDetails } from '../../components/ProvinceDetails';
import { getLandMarks } from '../../api/landMark.service';
import { getProvinceById } from '../../api/province.service';
import { getPlayerItem } from '../../api/playerItem.service';

const allowedProvinces = [
  'vn-hg',
  'vn-cb',
  'vn-ls',
];

export const HomePage = () => {
  const [currentProvince, setCurrentProvince] = useState("");
  const [chartOptions, setChartOptions] = useState();
  const [latestLandmark, setLatestLandmark] = useState(null);
  const [landmarks, setLandmarks] = useState([]);
  const [provinceName, setProvinceName] = useState("");
  const [item, setItem] = useState({});

  const fetchData = async () => {
    try {
      const responseItem = await getPlayerItem("IM001", "US001");
      setItem(responseItem.data);
      const responseProvince = await getProvinceById(allowedProvinces[allowedProvinces.length - 1]);
      setProvinceName(responseProvince.data.province_name);
      const responseLandmarks = await getLandMarks(allowedProvinces[allowedProvinces.length - 1]);
      setLatestLandmark(responseLandmarks.data);


      if (!currentProvince) return;
      const response = await getLandMarks(currentProvince);
      setLandmarks(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentProvince, landmarks, provinceName, item]);

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
      <div className="map">
        <VietNamMap
          mapData={mapData}
          chartOptions={chartOptions}
          setChartOptions={setChartOptions}
        />
      </div>
      {
        !currentProvince &&
        <div className="homepage-info">
          <div className="item-container">
            <Item item={item} />
          </div>
          <div className="discovery-list-container">
            <Card>
              <h4 className="discovery-list-title">Hành trình khám phá</h4>
              <div className="province-name">
                <img src={adventure} alt="" />
                <span>Tỉnh {provinceName}</span>
              </div>
              <ul className="discovery-list">
                {latestLandmark?.map((landmark, index) => (
                  <li key={index} className={`discovery-item ${landmark.is_completed ? 'completed' : ''}`}>
                    {landmark.landmark_name}
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      }
      {
        currentProvince &&
        <ProvinceDetails
          landmarks={landmarks}
          provinceName={provinceName}
          handleResetZoom={handleResetZoom}
        />
      }
    </div>
  )
}
