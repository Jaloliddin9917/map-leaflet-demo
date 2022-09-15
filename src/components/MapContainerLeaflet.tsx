import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Polygon, LayersControl, GeoJSON } from 'react-leaflet';
import './MapContainer.module.css';
import 'leaflet/dist/leaflet.css';
import "antd/dist/antd.css";
import { Select } from 'antd';
import malaysiaCoor from "../Malaysia-coordinates/malaysia.geo.json";

import { GeoJsonService } from '../services/geoJsonService';


const defaultCenter: any = [1.5574127, 110.3439862];
const defaultZoom = 6;

const arrState = [[5.4021302, 102.0635972], [2.0229012, 103.3147721]];


const MapContainerLeaflet: React.FC = () => {
    const defaultCoor: any = malaysiaCoor
    const { Option } = Select;
    // const [states, setStates] = useState([] as string[]);
    const [selectedState, setSelectedState] = useState("" as string);
    const [selectedDistrict, setSelectedDistrict] = useState(Number);
    const [districtName, setDistrictName] = useState([] as string[]);
    const [districtCoor, setDistrictCoor] = useState([]);
    const mapRef: any = React.createRef();
    console.log(districtCoor[1], "ddddd");
    console.log(selectedDistrict, "sdsdsds");
    
        
        
    let geoJsonService = new GeoJsonService();
    useEffect(() => {
        
        (async () => {
            let states = await geoJsonService.getStates(selectedState);
            console.log(states, "ggggh");
            
            setDistrictName(states[0]);
            setDistrictCoor(states[1]);
        })();
        
    }, [selectedState])
    
    
    const onStateChanged = (value: string) => {
        setSelectedState(value);

    
        // mapRef.current.flyTo(arrState[value], 8, {
        //     duration: 2
        // });
    };
    const onDistrictChanged = (value: any) => {
        setSelectedDistrict(value)
        console.log(value, "district");
    

        // mapRef.current.flyTo(arrState[value], 8, {
        //     duration: 2
        // });
    };

   
    
  
    return (

        <div style={{ display: "flex" }}>

            <MapContainer style={{ width: "70vw", height: "100vh" }} ref={mapRef} center={defaultCenter} zoom={defaultZoom} scrollWheelZoom={true}>
                <div className='layerControl'>
                    <LayersControl position="topright">
                        <LayersControl.BaseLayer name="CartoDB.VoyagerLabelsUnder">
                            <TileLayer
                                url='https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png'
                            />
                        </LayersControl.BaseLayer>
                        <LayersControl.BaseLayer name="CartoDB.Positron">
                            <TileLayer
                                url='https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
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
                </div>

                {/* <Polygon positions={districtCoor[0]} /> */}
                <GeoJSON data={districtCoor[selectedDistrict]} />  
                {/* <GeoJSON data={defaultCoor} />   */}

            </MapContainer>

            <div className="sidebar">
                <h2 className="sidebar-title">USA</h2>
                <div style={{ display: "flex", padding: "2em" }}>
                    <h5 style={{ marginRight: "30px" }}>Select to states:</h5>
                    <Select
                        showSearch
                        placeholder="Select the State"
                        optionFilterProp="children"
                        onChange={onStateChanged}
                        style={{ width: 200 }}
                    >
                        <Option value={"kelantan"}>KELANTAN</Option>
                        <Option value={"johor"}>JOHOR</Option>

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
                        {
                            districtName.map((item, index) => (
                                <Option value={index}>{item}</Option>
                            ))
                        }
                    </Select>
                </div>

            </div>

        </div>


    );
}

export default MapContainerLeaflet;
