import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, LayersControl, GeoJSON } from 'react-leaflet';
import L from 'leaflet';


import './Map.module.css';
import 'leaflet/dist/leaflet.css';
import "antd/dist/antd.css";
import { Select } from 'antd';
import geoJsonMalaysia from "../Malaysia-coordinates/malaysia-level-1.geo.json";
// import geoJsonMalaysiaByStates from "../Malaysia-coordinates/malaysia-level-2.geo.json";


import { GeoJsonService } from '../services/geoJsonService';
import ShowHospitals from './hospitals-points';



const defaultCenter: any = [1.5574127, 110.3439862];
const defaultZoom = 6;



const MapContainerLeaflet: React.FC = () => {
    const defaultCoor: any = geoJsonMalaysia
    const { Option } = Select;

    // List of States and Distincts
    const [stateNamesList, setStateNamesList] = useState([] as string[]);
    const [distinctNamesList, setDistinctnamesList] = useState([] as string[]);

    // Selected State and Distict from combobox
    const [selectedState, setSelectedState] = useState("" as string);
    const [selectedDistrict, setSelectedDistrict] = useState();

    // Current geoJson to draw on the leaflet map
    const [geoJson, setGeoJson] = useState(defaultCoor);
    const [geoJsonKey, setGeoJsonKey] = useState("");  // => hack for leaflet to force to redraw the geoJson

    const mapRef: any = React.createRef();
    const arrGeoJson = [[2.0229012,103.3147721],[5.8098265,100.6715035],[5.4021302,102.0635972]]
  

    const geoJsonRef: any  = React.createRef();

    let geoJsonService = new GeoJsonService();
    useEffect(() => {
        (async () => {
            let state = await geoJsonService.getState();
            setStateNamesList(state[0])
            setGeoJson(state[1]);
         
        })();
    }, []);

    useEffect(() => {
        (async () => {
            let states = await geoJsonService.getStates(selectedState);
            setDistinctnamesList(states[0]);
            setGeoJson(states[1]);
        })();
    }, [selectedState]);

    

    const onStateChanged = (value: any) => {
        setSelectedState(value);
        setGeoJsonKey(value);

        mapRef.current.flyTo(arrGeoJson[value], 8, {
            duration: 3
        });
    };

    const onDistrictChanged = (value: any) => {
        setSelectedDistrict(value);
        setGeoJsonKey(value)
    };




    return (

        <div style={{ display: "flex" }}>
            <MapContainer style={{ width: "70vw", height: "100vh" }} ref={mapRef} center={defaultCenter} zoom={defaultZoom} scrollWheelZoom={true}>
                <LayersControl position="topright">
                    <LayersControl.BaseLayer name="CartoDB.VoyagerLabelsUnder">
                        <TileLayer
                            url='https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png'
                        />
                    </LayersControl.BaseLayer>
                    <LayersControl.BaseLayer name="CartoDB.Positron">
                        <TileLayer
                            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}/"
                        />
                    </LayersControl.BaseLayer>
                    <LayersControl.BaseLayer name="OpenStreetMap.BZH">
                        <TileLayer
                            url="https://tile.openstreetmap.bzh/br/{z}/{x}/{y}.png"
                        />
                    </LayersControl.BaseLayer>
                    <LayersControl.BaseLayer checked name="OpenStreetMap.Mapnik">
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                    </LayersControl.BaseLayer>
                    <LayersControl.BaseLayer name="Stadia.AlidadeSmooth">
                        <TileLayer
                            url='https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png'
                        />
                    </LayersControl.BaseLayer>
                    <LayersControl.BaseLayer name="Stadia.AlidadeSmoothDark">
                        <TileLayer
                            url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
                        />
                    </LayersControl.BaseLayer>
                </LayersControl>

                <GeoJSON key={geoJsonKey} data={geoJson[selectedState]} />
                <ShowHospitals/>
            </MapContainer>
            <div className="sidebar">
                <h1 className="sidebar-title">Malaysia </h1>
                <div style={{ display: "flex", padding: "2em" }}>
                    <h5 style={{ marginRight: "30px" }}>Select to states:</h5>
                    <Select
                        showSearch
                        placeholder="Select the State"
                        optionFilterProp="children"
                        onChange={onStateChanged}
                        style={{ width: 200 }}
                    >
                        {stateNamesList.map((item, index) => (
                            <Option value={index}>{item}</Option>
                        ))}
                    </Select>
                </div>
                <div style={{ display: "flex", padding: "2em", marginTop: "-30px" }}>
                    <h5 style={{ marginRight: "22px" }}>Select to district:</h5>
                    <Select
                        showSearch
                        placeholder="Select to district"
                        optionFilterProp="children"
                        onChange={onDistrictChanged}
                        style={{ width: 200 }}
                    >
                        {distinctNamesList.map((item, index) => (
                            <Option value={index}>{item}</Option>
                        ))}
                    </Select>
                </div>

            </div>

        </div>


    );
}

export default MapContainerLeaflet;
