import React, { useState } from 'react';
import './HomePage.css';
import { VietNamMap } from '../../components/VietNamMap';
import { HSTS } from '../../assets/images/map';
import vietnamMap from "@highcharts/map-collection/countries/vn/vn-all.geo.json";
import { getProvinceColor } from '../../utils/getProvinceColorUtil';

const allowedProvinces = [
  'vn-hg',
  'vn-cb',
  'vn-ls',
];

const provinces = {
  'vn-hg': 'Hà Giang',
  'vn-cb': 'Cao Bằng',
  'vn-ls': 'Lạng Sơn',
  'vn-qn': 'Quảng Ninh',
  'vn-307': 'Bắc Cạn',
  'vn-ty': 'Thái Nguyên',
  'vn-tq': 'Tuyên Quang',
  'vn-pt': 'Phú Thọ',
  'vn-bg': 'Bắc Giang',
  'vn-bn': 'Bắc Ninh',
  'vn-lo': 'Lào Cai',
  'vn-yb': 'Yên Bái',
  'vn-li': 'Lai Châu',
  'vn-db': 'Điện Biên',
  'vn-311': 'Sơn La',
  'vn-ho': 'Hòa Bình',
  'vn-318': 'Hà Nội',
  'vn-vc': 'Vĩnh Phúc',
  'vn-317': 'Hưng Yên',
  'vn-hd': 'Hải Dương',
  'vn-3623': 'Hải Phòng',
  'vn-nd': 'Nam Định',
  'vn-tb': 'Thái Bình',
  'vn-hm': 'Hà Nam',
  'vn-nb': 'Ninh Bình',
  'vn-th': 'Thanh Hóa',
  'vn-na': 'Nghệ An',
  'vn-328': 'Hà Tĩnh',
  'vn-qb': 'Quảng Bình',
  'vn-qt': 'Quảng Trị',
  'vn-tt': 'Thừa Thiên - Huế',
  'vn-da': 'Đà Nẵng',
  'vn-300': 'Quảng Nam',
  'vn-qg': 'Quảng Ngãi',
  'vn-299': 'Kon Tum',
  'vn-724': 'Gia Lai',
  'vn-bd': 'Bình Định',
  'vn-py': 'Phú Yên',
  'vn-723': 'Đắk Lắk',
  'vn-6365': 'Đắk Nông',
  'vn-kh': 'Khánh Hòa',
  'vn-nt': 'Ninh Thuận',
  'vn-ld': 'Lâm Đồng',
  'vn-bu': 'Bình Thuận',
  'vn-bp': 'Bình Phước',
  'vn-tn': 'Tây Ninh',
  'vn-bi': 'Bình Dương',
  'vn-331': 'Đồng Nai',
  'vn-hc': 'Hồ Chí Minh City',
  'vn-bv': 'Bà Rịa - Vũng Tàu',
  'vn-la': 'Long An',
  'vn-tg': 'Tiền Giang',
  'vn-br': 'Bến Tre',
  'vn-tv': 'Trà Vinh',
  'vn-vl': 'Vĩnh Long',
  'vn-dt': 'Đồng Tháp',
  'vn-ag': 'An Giang',
  'vn-333': 'Cần Thơ',
  'vn-337': 'Hậu Giang',
  'vn-kg': 'Kiên Giang',
  'vn-st': 'Sóc Trăng',
  'vn-bl': 'Bạc Liêu',
  'vn-cm': 'Cà Mau'
};


const rawData = [
  ['vn-3655', 10], ['vn-qn', 11], ['vn-kh', 12], ['vn-tg', 13],
  ['vn-bv', 14], ['vn-bu', 15], ['vn-hc', 16], ['vn-br', 17],
  ['vn-st', 18], ['vn-pt', 19], ['vn-yb', 20], ['vn-hd', 21],
  ['vn-bn', 22], ['vn-317', 23], ['vn-nb', 24], ['vn-hm', 25],
  ['vn-ho', 26], ['vn-vc', 27], ['vn-318', 28], ['vn-bg', 29],
  ['vn-tb', 30], ['vn-ld', 31], ['vn-bp', 32], ['vn-py', 33],
  ['vn-bd', 34], ['vn-724', 35], ['vn-qg', 36], ['vn-331', 37],
  ['vn-dt', 38], ['vn-la', 39], ['vn-3623', 40], ['vn-337', 41],
  ['vn-bl', 42], ['vn-vl', 43], ['vn-tn', 44], ['vn-ty', 45],
  ['vn-li', 46], ['vn-311', 47], ['vn-hg', 48], ['vn-nd', 49],
  ['vn-328', 50], ['vn-na', 51], ['vn-qb', 52], ['vn-723', 53],
  ['vn-nt', 54], ['vn-6365', 55], ['vn-299', 56], ['vn-300', 57],
  ['vn-qt', 58], ['vn-tt', 59], ['vn-da', 60], ['vn-ag', 61],
  ['vn-cm', 62], ['vn-tv', 63], ['vn-cb', 64], ['vn-kg', 65],
  ['vn-lo', 66], ['vn-db', 67], ['vn-ls', 68], ['vn-th', 69],
  ['vn-307', 70], ['vn-tq', 71], ['vn-bi', 72], ['vn-333', 73]
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
