import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN || 'pk.eyJ1IjoiZXZlcmVzdDE4IiwiYSI6ImNtYnAydnExdjAwNnAyb3EwaTJjcTZiNnIifQ.55IMlqQsnOCLflDblrQGKw';

const PropertyMapEnhanced = ({ properties = [], onPropertySelect, selectedProperty }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapStyle, setMapStyle] = useState('satellite');
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [showClusters, setShowClusters] = useState(true);
  const markers = useRef([]);

  const sampleProperties = [
    {
      id: 1,
      type: 'foreclosure',
      coordinates: [-80.6081, 28.0836],
      properties: {
        address: '1307 Babcock St, Melbourne, FL 32901',
        price: 112199,
        sqft: 1200,
        bedrooms: 3,
        bathrooms: 2,
        year_built: 1995,
        auction_date: '2025-09-15',
        opening_bid: 89000,
        estimated_value: 145000,
        roi_estimate: '18.5%'
      }
    },
    {
      id: 2,
      type: 'tax_deed',
      coordinates: [-80.5890, 27.9506],
      properties: {
        address: '2456 Malabar Rd, Palm Bay, FL 32905',
        price: 95000,
        sqft: 1100,
        bedrooms: 3,
        bathrooms: 2,
        year_built: 1988,
        auction_date: '2025-09-22',
        opening_bid: 75000,
        estimated_value: 125000,
        roi_estimate: '22.1%'
      }
    },
    {
      id: 3,
      type: 'foreclosure',
      coordinates: [-80.7431, 28.3922],
      properties: {
        address: '789 Clearlake Rd, Cocoa, FL 32922',
        price: 135000,
        sqft: 1450,
        bedrooms: 4,
        bathrooms: 2,
        year_built: 2001,
        auction_date: '2025-09-18',
        opening_bid: 108000,
        estimated_value: 165000,
        roi_estimate: '16.8%'
      }
    },
    {
      id: 4,
      type: 'foreclosure',
      coordinates: [-80.8077, 28.6155],
      properties: {
        address: '1234 Garden St, Titusville, FL 32796',
        price: 89000,
        sqft: 980,
        bedrooms: 2,
        bathrooms: 1,
        year_built: 1985,
        auction_date: '2025-09-25',
        opening_bid: 70000,
        estimated_value: 110000,
        roi_estimate: '25.3%'
      }
    },
    {
      id: 5,
      type: 'tax_deed',
      coordinates: [-80.5951, 28.1834],
      properties: {
        address: '567 Ocean Ave, Satellite Beach, FL 32937',
        price: 245000,
        sqft: 1800,
        bedrooms: 3,
        bathrooms: 3,
        year_built: 2005,
        auction_date: '2025-09-20',
        opening_bid: 195000,
        estimated_value: 285000,
        roi_estimate: '14.2%'
      }
    }
  ];

  const activeProperties = properties.length > 0 ? properties : sampleProperties;

  useEffect(() => {
    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/satellite-v9',
      center: [-80.6081, 28.0836],
      zoom: 10
    });

    map.current.on('load', () => {
      setMapLoaded(true);
      addPropertyMarkers();
      
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
      
      map.current.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true
          },
          trackUserLocation: true,
          showUserHeading: true
        }),
        'top-right'
      );
    });

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, []);

  const addPropertyMarkers = () => {
    markers.current.forEach(marker => marker.remove());
    markers.current = [];

    activeProperties.forEach(property => {
      const markerElement = document.createElement('div');
      markerElement.className = 'custom-marker';
      markerElement.style.cssText = \`
        width: 30px;
        height: 30px;
        border-radius: 50%;
        border: 2px solid white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 12px;
        color: white;
        cursor: pointer;
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        background-color: \${property.type === 'foreclosure' ? '#ef4444' : '#8b5cf6'};
      \`;
      markerElement.textContent = property.type === 'foreclosure' ? 'F' : 'T';

      const popupContent = \`
        <div style="padding: 10px; max-width: 250px;">
          <h3 style="margin: 0 0 8px 0; font-size: 14px; font-weight: bold;">
            \${property.properties.address}
          </h3>
          <div style="margin-bottom: 8px;">
            <span style="background: \${property.type === 'foreclosure' ? '#ef4444' : '#8b5cf6'}; 
                         color: white; padding: 2px 6px; border-radius: 4px; font-size: 11px;">
              \${property.type === 'foreclosure' ? 'Foreclosure' : 'Tax Deed'}
            </span>
          </div>
          <div style="font-size: 12px; line-height: 1.4;">
            <div><strong>Price:</strong> $\${property.properties.price.toLocaleString()}</div>
            <div><strong>Size:</strong> \${property.properties.sqft} sqft</div>
            <div><strong>Beds/Baths:</strong> \${property.properties.bedrooms}/\${property.properties.bathrooms}</div>
            <div><strong>Built:</strong> \${property.properties.year_built}</div>
            <div><strong>Auction:</strong> \${property.properties.auction_date}</div>
            <div><strong>Est. ROI:</strong> <span style="color: #16a34a; font-weight: bold;">\${property.properties.roi_estimate}</span></div>
          </div>
          <button onclick="window.selectProperty(\${property.id})" 
                  style="margin-top: 8px; padding: 4px 8px; background: #3b82f6; 
                         color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 11px;">
            View Details
          </button>
        </div>
      \`;

      const popup = new mapboxgl.Popup({
        offset: 25,
        closeButton: true,
        closeOnClick: false
      }).setHTML(popupContent);

      const marker = new mapboxgl.Marker(markerElement)
        .setLngLat(property.coordinates)
        .setPopup(popup)
        .addTo(map.current);

      markers.current.push(marker);

      markerElement.addEventListener('click', () => {
        if (onPropertySelect) {
          onPropertySelect(property);
        }
      });
    });

    window.selectProperty = (propertyId) => {
      const property = activeProperties.find(p => p.id === propertyId);
      if (property && onPropertySelect) {
        onPropertySelect(property);
      }
    };
  };

  const changeMapStyle = (style) => {
    if (!map.current) return;
    
    const styleUrl = style === 'satellite' 
      ? 'mapbox://styles/mapbox/satellite-v9'
      : 'mapbox://styles/mapbox/streets-v12';
    
    map.current.setStyle(styleUrl);
    setMapStyle(style);
    
    map.current.once('styledata', () => {
      addPropertyMarkers();
    });
  };

  const toggleHeatmap = () => {
    if (!map.current || !mapLoaded) return;
    
    if (showHeatmap) {
      if (map.current.getLayer('property-heatmap')) {
        map.current.removeLayer('property-heatmap');
      }
      if (map.current.getSource('property-heatmap')) {
        map.current.removeSource('property-heatmap');
      }
    } else {
      const heatmapData = {
        type: 'FeatureCollection',
        features: activeProperties.map(property => ({
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: property.coordinates
          },
          properties: {
            weight: property.properties.price / 10000
          }
        }))
      };

      map.current.addSource('property-heatmap', {
        type: 'geojson',
        data: heatmapData
      });

      map.current.addLayer({
        id: 'property-heatmap',
        type: 'heatmap',
        source: 'property-heatmap',
        paint: {
          'heatmap-weight': ['get', 'weight'],
          'heatmap-intensity': 1,
          'heatmap-color': [
            'interpolate',
            ['linear'],
            ['heatmap-density'],
            0, 'rgba(33,102,172,0)',
            0.2, 'rgb(103,169,207)',
            0.4, 'rgb(209,229,240)',
            0.6, 'rgb(253,219,199)',
            0.8, 'rgb(239,138,98)',
            1, 'rgb(178,24,43)'
          ],
          'heatmap-radius': 20,
          'heatmap-opacity': 0.7
        }
      });
    }
    
    setShowHeatmap(!showHeatmap);
  };

  const toggleClusters = () => {
    setShowClusters(!showClusters);
  };

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} className="w-full h-full" />
      
      <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-2 space-y-2">
        <button
          onClick={() => changeMapStyle('satellite')}
          className={\`px-3 py-2 rounded text-sm font-medium transition-colors \${
            mapStyle === 'satellite'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }\`}
        >
          🛰️ Satellite
        </button>
        <button
          onClick={() => changeMapStyle('streets')}
          className={\`px-3 py-2 rounded text-sm font-medium transition-colors \${
            mapStyle === 'streets'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }\`}
        >
          🗺️ Streets
        </button>
        <button
          onClick={toggleHeatmap}
          className={\`px-3 py-2 rounded text-sm font-medium transition-colors \${
            showHeatmap
              ? 'bg-orange-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }\`}
        >
          🔥 Heatmap
        </button>
        <button
          onClick={toggleClusters}
          className={\`px-3 py-2 rounded text-sm font-medium transition-colors \${
            showClusters
              ? 'bg-purple-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }\`}
        >
          📍 Clusters
        </button>
      </div>

      <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-4">
        <h3 className="text-sm font-semibold mb-2">Property Statistics</h3>
        <div className="space-y-1 text-xs">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
            <span>Foreclosures: {activeProperties.filter(p => p.type === 'foreclosure').length}</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
            <span>Tax Deeds: {activeProperties.filter(p => p.type === 'tax_deed').length}</span>
          </div>
          <div className="text-gray-600">
            Total Properties: {activeProperties.length}
          </div>
        </div>
      </div>

      {!mapLoaded && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin text-4xl mb-2">🗺️</div>
            <div className="text-gray-600">Loading Interactive Map...</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyMapEnhanced;
