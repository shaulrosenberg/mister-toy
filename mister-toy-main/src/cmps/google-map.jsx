import { React, useState } from "react";
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div style={{ fontSize: '2rem' }}>{text}</div>;

export function GoogleMap({ branches }) {
    const [coordinates, setCoordinates] = useState({ lat: 32.0853, lng: 34.7818 })
    const zoom = 11

    function handleClick({ lat, lng }) {
        setCoordinates({ lat, lng })
    }

    return (
        // Important! Always set the container height explicitly
        <section>
            <div className="branch-btns">
                {branches && branches.map(branch => <button key={branch._id} onClick={() => handleClick({ ...branch.coordinates })}>{branch.name}</button>)}
            </div>
            <div style={{ height: '60vh', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: "" }}
                    defaultCenter={{ lat: 32.0853, lng: 34.7818 }}
                    defaultZoom={zoom}
                    center={coordinates}
                >
                    {branches && branches.map(branch => {
                        return <AnyReactComponent
                            key={branch._id}
                            {...branch.coordinates}
                            text={'🏪'}
                        />
                    })}
                </GoogleMapReact>
            </div>
        </section>

    );
}