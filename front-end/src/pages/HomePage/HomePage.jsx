import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { useNavigate } from "react-router-dom";
import './HomePage.css';
import { VietNamMap } from '../../components/VietNamMap';
import { Item } from '../../components/Item';
import { HSTS } from '../../assets/images/map';
import { Card } from '../../components/Card';
import { ConfirmedDialog } from '../../components/ConfirmedDialog';
import { adventure } from '../../assets/images/navbar-icons';
import vietnamMap from "@highcharts/map-collection/countries/vn/vn-all.geo.json";
import { getProvinceColor, getProvinceIds } from '../../utils/getProvinceUtil';
import { getLandMarkGameplay } from '../../utils/getLandmarkUtil';
import { provinces, rawData } from '../../constants';
import { ProvinceDetails } from '../../components/ProvinceDetails';
import { getPlayerMission } from '../../api/getPlayerMission.service';
import { getAllowedProvinces } from '../../api/province.service';
import { getPlayerItem } from '../../api/playerItem.service';
import { getGameplayByUserIdAndProvinceId } from '../../api/gamePlay.service';
//for testing
const player_id = "US002";

export const HomePage = () => {
  const navigate = useNavigate();

  const [chartOptions, setChartOptions] = useState();
  const [latestGameplay, setLatestGameplay] = useState([]);
  const [gamePlay, setGamePlay] = useState([]);
  const [allowedProvinces, setAllowedProvinces] = useState([]);
  const [currentProvince, setCurrentProvince] = useState("");
  const [item, setItem] = useState({});
  const [selectedLandmarkId, setSelectedLandmarkId] = useState("");
  const [mission, setMission] = useState({});

  const fetchData = useCallback(async () => {
    try {
      const responseProvinces = await getAllowedProvinces(player_id);
      setAllowedProvinces(responseProvinces.data);

      const itemResponse = await getPlayerItem(player_id);
      setItem(itemResponse.data[0]);

      const missionResponse = await getPlayerMission(player_id);
      setMission(missionResponse.data[0]);

      const latestGameplayResponse = await getGameplayByUserIdAndProvinceId(responseProvinces.data[responseProvinces.data.length - 1].province_id, player_id)
      setLatestGameplay(latestGameplayResponse.data);
      

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [])

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleResetZoom = () => {
    setCurrentProvince("")
    setChartOptions(mapData);
  }

  const mappedData = useMemo(() => {
    return rawData.map(([key, value]) => ({
      'hc-key': key,
      value,
      name: provinces[key] || key,
      color: getProvinceColor(getProvinceIds(allowedProvinces), key),
    }));
  }, [allowedProvinces]);

  const mapData = useMemo(() => ({
    chart: {
      map: vietnamMap,
      style: { fontFamily: 'Nunito' },
      width: 500,
      height: 650,
    },
    title: {
      text: 'Bản đồ Việt Nam',
      style: { fontSize: '18px' },
    },
    mapNavigation: {
      enabled: false,
      enableDoubleClickZoom: false,
      enableDoubleClickZoomTo: false,
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
    colorAxis: { min: 0 },
    series: [
      {
        name: "Tỉnh/Thành",
        data: mappedData,
        joinBy: 'hc-key',
        states: {
          hover: { color: "#2a7a4d" },
        },
        dataLabels: { enabled: false },
        point: {
          events: {
            click: function () {
              const clickedKey = this['hc-key'];
  
              if (!getProvinceIds(allowedProvinces).includes(clickedKey)) {
                alert("Tỉnh chưa được mở khóa");
                return;
              }
  
              setCurrentProvince(clickedKey);
  
              const filteredMapData = {
                ...vietnamMap,
                features: vietnamMap.features.filter(f => f.properties['hc-key'] === clickedKey),
              };
  
              const filteredRawData = mappedData.filter((item) => item["hc-key"]);
  
              setChartOptions(prev => ({
                ...prev,
                chart: { ...prev.chart, map: filteredMapData },
                series: [{ ...prev.series[0], data: filteredRawData }],
                title: { text: `Bản đồ: ${provinces[clickedKey] || clickedKey}` },
              }));
            },
          },
        },
      },
    ],
  }), [allowedProvinces]);

  if (!allowedProvinces.length) return;

  const onClose = () => {
    setSelectedLandmarkId("");
  }

  const onPlay = () => {
    navigate(`/landmark/${selectedLandmarkId}`);
    
  }

  return (
    <div className="home-page">
      {
        selectedLandmarkId && 
          <ConfirmedDialog
            landmark={getLandMarkGameplay(gamePlay, selectedLandmarkId)}
            onClose={onClose}
            onPlay={onPlay}
          />
      }
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
                <span>Tỉnh {allowedProvinces[allowedProvinces.length - 1].province_name}</span>
              </div>
              <ul className="discovery-list">
                {latestGameplay?.map((landmark, index) => (
                  <li key={index} className={`discovery-item ${landmark.is_completed ? 'completed' : ''}`}>
                    <input style={{accentColor: "green"}} type="checkbox" checked={landmark.is_completed} disabled/>
                    {landmark.landmark_name}
                  </li>
                ))}
              </ul>
            </Card>
          </div>
          {/* Mission */}
        </div>
      }
      {
        currentProvince &&
        <ProvinceDetails
          gamePlay={gamePlay}
          setGamePlay={setGamePlay}
          allowedProvince={allowedProvinces}
          currentProvince={currentProvince}
          handleResetZoom={handleResetZoom}
          setSelectedLandmarkId={setSelectedLandmarkId}
        />
      }
    </div>
  )
}
