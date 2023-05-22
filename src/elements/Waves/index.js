import './style.css';
import React from 'react';
import Plot from 'react-plotly.js';
import COLORSETS from '../../constants/colorset.js';

import Wave from 'react-wavify';

function Waves() {
    function addAlpha(color, opacity) {
        var _opacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
        return color + _opacity.toString(16).toUpperCase();
    }

    const opacity = 1

    const morning = addAlpha(COLORSETS["morning"][0], opacity)
    const day = addAlpha(COLORSETS["day"][0], opacity)
    const night = addAlpha(COLORSETS["night"][0], opacity)

    return (
        <div className='wave-box'>
            <div className='fix-morning'>
                <Wave fill={morning}
                    paused={false}
                    options={{
                    height: 60,
                    amplitude: 40,
                    speed: 0.20,
                    points: 8
                    }}
                />
            </div>
            <div className='fix-day'>
                <Wave fill={day}
                    paused={false}
                    options={{
                    height: 60,
                    amplitude: 40,
                    speed: 0.3,
                    points: 3
                    }}
                />
            </div>
            <div className='fix-night'>
                <Wave fill={night}
                        paused={false}
                        options={{
                        height: 60,
                        amplitude: 40,
                        speed: 0.3,
                        points: 5
                        }}
                />
            </div>
        </div>
        
    );
}

export default Waves;


