"use client"
import React, { useState } from 'react';
import { Map, Marker } from 'pigeon-maps';

export type MapContainerType = {
    height: number,
    location: [number, number],
    zoom: number,
    markerWidth: number
}

function MapContainer({ height, location, zoom, markerWidth }: MapContainerType) {
    const [center, setCenter] = useState(location)

    
    return (
        <Map height={height} center={center} zoom={zoom} animate={true} >
            <Marker
                width={markerWidth}
                anchor={center}
            />
        </Map>
    );
}

export default MapContainer;