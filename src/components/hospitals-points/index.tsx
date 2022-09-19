import React, { useCallback, useEffect, useState } from "react";
import L from "leaflet";


import {
    Marker,
    LayerGroup,
    LayersControl
} from "react-leaflet";

import hospitals from "../../Malaysia-coordinates/malaysia-hospitals-points/hospitals.geo.json";


const cuffs = new L.Icon({
    iconUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAaVBMVEX///8AAACqqqri4uIdHR329vZpaWmOjo6/v79PT0+ysrJCQkLy8vLn5+fs7Oy1tbUMDAwvLy+goKBgYGDMzMyAgIBUVFS8vLw7OzuZmZlHR0cXFxenp6eGhobV1dUaGhrb29t3d3czMzNZA0MvAAAC9ElEQVR4nO3d63KiMBiAYQ/FA2o91NYjbe39X+SOTrILaYKBzScE3/efIiHPtKMpRe31iIiIiIiIiIiIiEK2HLSs82dg4brftjaBhfumQb9CiBBh84UWdv+51PJ6eFaHOom9VqYHdYhj+nvjd2ChLXX4F7kjLNQhRnKHKCuRFw4RyoYwQAiFQxgghMIhDBBC4RAGCKFwCAOEUDiEAUIoHMIAIRQOYYAQCocwQAiFQxgghMIhDBBC4RAGKCZhUuHef0UkHPftDct3QygcwnwIHSEUDmE+LVydbn11VzhRtz86K9yp2whVCIVDmA+hoxYLk+Ei3+u7Q7hdFDOGabFw0rdnCs2MYRAKhxAhwl7UwmlnhPu3Qh9btT0r3v+2ilZ48BzrBWEjIUSYD+F/TrVmCG9TW6b5Bvov3kla7BSt0EyvaY6O7cYwEQu7vy5FqEIoHMJuC4eHTSEtMoXj4sPMBUKLhWauc97mKWCjDgjjPatvhtARQuG6L6zySVgtuBbjMxtXLashHKl919WE+8qTG2fmtatpv3YPuCaqTggrhBAhwpo9WJg59m1A+D7xbllB+L2zDrG784YLLZxu/af1c0c48JiuqqXvmZkh9B8KYYAQ2kL4PMLDcerqqPZtQDiZOWc1098G4SvUl7zamjcmLFt56YuR4hYuXVNCiBBhlMJLK4Uhn0vnC3e9xoRJyay0iDUNwlwIA4TQFsLnEWb9latG1zTuWbFqQ1hHmPgXp7BsOo4hESJEmBd61IDQJ4QIcyHUwnPJGD+dEJZ9JeoaoZxw/upOPaQBYXJ/Vo88IywgbNl/1wSELV21IUSIsFPCkM+lAa42ERCGvNrEo8jXNB4hRHgNIUJLCBHmQojwGkKElhAizIUQ4bUHCvV00gpj3RHuPISuN3yqFiGEg1vpRd1/SQe+ndUup6V1898hR+4hU/15iRv75oPafPSfVap/Lc7qDv2D6G4I4w9h/CGMv573C02sVVgsEBERERERERER0VP3B4eRds/RK7usAAAAAElFTkSuQmCC",
    iconSize: [25, 25],
});

function ShowHospitals() {
    const data = hospitals;

 

    return (
        <>
            <LayersControl position="topright">
                <LayersControl.Overlay name="Hospitals">
                    <LayerGroup>
                        { data.features.map((item: any) => {         
                            //  const [longitude, latitude] = item.geometry.coordinates;
                              
                            return (
                                <Marker
                                position={item}
                                    icon={cuffs}
                                >
                                </Marker>
                            )
                        })}
                    </LayerGroup>
                </LayersControl.Overlay>
            </LayersControl>
        </>
    );
}

export default ShowHospitals;