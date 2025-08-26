import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';

// Mapbox access token
const MAPBOX_TOKEN = 'pk.eyJ1IjoiZXZlcmVzdDE4IiwiYSI6ImNtYnAydnExdjAwNnAyb3EwaTJjcTZiNnIifQ.55IMlqQsnOCLflDblrQGKw';

// Sample property data (simplified for initial deployment)
const SAMPLE_PROPERTIES = [
  {
    id: 1,
    address: '1307 Babcock St',
    city: 'Melbourne',
    state: 'FL',
    zip: '32901',
    price: 112199,
    bedrooms: 5,
    bathrooms: 2,
    sqft: 1739,
    status: 'foreclosure',
    coordinates: { lat: 28.0836, lng: -80.6081 },
    case_number: '2024-FC-001234',
    plaintiff: 'Wells Fargo Bank',
    auction_date: 'August 21, 2025'
  },
  {
    id: 2,
    address: '765 Babcock St',
    city: 'Melbourne',
    state: 'FL',
    zip: '32901',
    price: 115214,
    bedrooms: 5,
    bathrooms: 2,
    sqft: 2365,
    status: 'foreclosure',
    coordinates: { lat: 28.0845, lng: -80.6075 },
    case_number: '2024-FC-001235',
    plaintiff: 'Bank of America',
    auction_date: 'August 21, 2025'
  },
  {
    id: 3,
    address: '3520 Wickham Rd',
    city: 'Melbourne',
    state: 'FL',
    zip: '32935',
    price: 118327,
    bedrooms: 5,
    bathrooms: 1,
    sqft: 3078,
    status: 'foreclosure',
    coordinates: { lat: 28.0892, lng: -80.6234 },
    case_number: '2024-FC-001236',
    plaintiff: 'Chase Bank',
    auction_date: 'August 21, 2025'
  }
];

export default function PropertyMapEnhanced({ filters }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const markers = useRef([]);
  const [isLoading, setIsLoading] = useState(true);
  const [mapError, setMapError] = useState(null);
  const [mapStyle, setMapStyle] = useState('streets');

  // Debug logging
  const debugLog = (message, data = null) => {
    console.log(`[PropertyMapEnhanced] ${message}`, data);
  };

  // Get marker color based on property status
  const getMarkerColor = (status) => {
    const colors = {
      'foreclosure': '#dc2626',
      'tax-deed': '#ea580c',
      'auction': '#7c3aed',
      'available': '#16a34a',
      'cancelled': '#6b7280'
    };
    return colors[status] || '#6b7280';
  };

  // Create property popup content
  const createPropertyPopup = (property) => {
    const statusColor = getMarkerColor(property.status);
    const pricePerSqft = property.sqft ? Math.round(property.price / property.sqft) : 'N/A';
    
    return `
      <div class="property-popup" style="min-width: 300px; font-family: system-ui, -apple-system, sans-serif;">
        <!-- Header -->
        <div style="background: ${statusColor}; color: white; padding: 12px; margin: -12px -12px 12px -12px; border-radius: 6px 6px 0 0;">
          <h3 style="margin: 0; font-size: 16px; font-weight: bold;">${property.address}</h3>
          <p style="margin: 4px 0 0 0; font-size: 13px; opacity: 0.9;">${property.city}, ${property.state} ${property.zip || ''}</p>
        </div>

        <!-- Price and Status -->
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <div style="font-size: 20px; font-weight: bold; color: #059669;">
            $${property.price.toLocaleString()}
          </div>
          <div style="background: ${statusColor}; color: white; padding: 4px 8px; border-radius: 12px; font-size: 10px; text-transform: uppercase; font-weight: 600;">
            ${property.status.replace('-', ' ')}
          </div>
        </div>

        <!-- Property Details -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 12px; font-size: 13px;">
          <div style="background: #f8fafc; padding: 6px; border-radius: 4px; text-align: center;">
            <div style="font-weight: bold;">${property.bedrooms || 'N/A'}</div>
            <div style="font-size: 10px; color: #6b7280;">Bedrooms</div>
          </div>
          <div style="background: #f8fafc; padding: 6px; border-radius: 4px; text-align: center;">
            <div style="font-weight: bold;">${property.bathrooms || 'N/A'}</div>
            <div style="font-size: 10px; color: #6b7280;">Bathrooms</div>
          </div>
          <div style="background: #f8fafc; padding: 6px; border-radius: 4px; text-align: center;">
            <div style="font-weight: bold;">${property.sqft ? property.sqft.toLocaleString() : 'N/A'}</div>
            <div style="font-size: 10px; color: #6b7280;">Sq Ft</div>
          </div>
          <div style="background: #f8fafc; padding: 6px; border-radius: 4px; text-align: center;">
            <div style="font-weight: bold;">$${pricePerSqft}</div>
            <div style="font-size: 10px; color: #6b7280;">Per Sq Ft</div>
          </div>
        </div>

        <!-- Legal Information -->
        ${property.case_number ? `
        <div style="background: #fef3c7; padding: 8px; border-radius: 6px; margin-bottom: 12px; border-left: 3px solid #eab308;">
          <div style="font-weight: bold; margin-bottom: 4px; color: #92400e; font-size: 12px;">⚖️ Legal Information</div>
          <div style="font-size: 11px; margin-bottom: 2px;"><strong>Case #:</strong> ${property.case_number}</div>
          ${property.plaintiff ? `<div style="font-size: 11px; margin-bottom: 2px;"><strong>Plaintiff:</strong> ${property.plaintiff}</div>` : ''}
          ${property.auction_date ? `<div style="font-size: 11px;"><strong>Auction Date:</strong> ${property.auction_date}</div>` : ''}
        </div>
        ` : ''}

        <!-- Action Buttons -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin-bottom: 8px;">
          <button onclick="window.open('https://brevard.realforeclose.com/' )" style="background: #059669; color: white; border: none; padding: 8px; border-radius: 4px; font-size: 11px; cursor: pointer; font-weight: 600;">
            🔗 Bid Now
          </button>
          <button onclick="alert('Property details for ID: ${property.id}')" style="background: #2563eb; color: white; border: none; padding: 8px; border-radius: 4px; font-size: 11px; cursor: pointer; font-weight: 600;">
            📋 Details
          </button>
        </div>

        <!-- Footer -->
        <div style="text-align: center; padding-top: 6px; border-top: 1px solid #e5e7eb; font-size: 9px; color: #6b7280;">
          Property ID: ${property.id} | Source: Brevard County Clerk
        </div>
      </div>
    `;
  };

  // Add property markers to map
  const addPropertyMarkers = () => {
    if (!map.current) return;

    // Clear existing markers
    markers.current.forEach(marker => marker.remove());
    markers.current = [];

    debugLog('Adding property markers', { count: SAMPLE_PROPERTIES.length });

    // Add markers for properties
    SAMPLE_PROPERTIES.forEach((property) => {
      if (!property.coordinates) return;

      // Create custom marker element
      const markerElement = document.createElement('div');
      markerElement.style.cssText = `
        width: 28px;
        height: 28px;
        border-radius: 50%;
        background: ${getMarkerColor(property.status)};
        border: 2px solid white;
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 11px;
        font-weight: bold;
        color: white;
        transition: transform 0.2s ease;
      `;
      markerElement.textContent = property.id;

      // Add hover effect
      markerElement.addEventListener('mouseenter', () => {
        markerElement.style.transform = 'scale(1.1)';
      });
      markerElement.addEventListener('mouseleave', () => {
        markerElement.style.transform = 'scale(1)';
      });

      // Create popup
      const popup = new mapboxgl.Popup({ 
        offset: 25,
        closeButton: true,
        closeOnClick: false,
        maxWidth: '350px'
      }).setHTML(createPropertyPopup(property));

      const marker = new mapboxgl.Marker(markerElement)
        .setLngLat([property.coordinates.lng, property.coordinates.lat])
        .setPopup(popup)
        .addTo(map.current);

      markers.current.push(marker);
    });

    // Fit map bounds to show all markers
    if (SAMPLE_PROPERTIES.length > 0) {
      const bounds = new mapboxgl.LngLatBounds();
      SAMPLE_PROPERTIES.forEach(property => {
        if (property.coordinates) {
          bounds.extend([property.coordinates.lng, property.coordinates.lat]);
        }
      });
      
      map.current.fitBounds(bounds, {
        padding: { top: 50, bottom: 50, left: 50, right: 50 },
        maxZoom: 14
      });
    }

    debugLog('Property markers added and bounds fitted');
  };

  // Initialize map
  useEffect(() => {
    if (map.current) return;

    debugLog('Starting map initialization');

    if (!mapContainer.current) {
      setMapError('Map container not found');
      setIsLoading(false);
      return;
    }

    try {
      mapboxgl.accessToken = MAPBOX_TOKEN;
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [-80.7081, 28.2639], // Brevard County center
        zoom: 10,
        attributionControl: true
      });

      // Add navigation controls
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
      map.current.addControl(new mapboxgl.FullscreenControl(), 'top-right');

      // Handle map load
      map.current.on('load', () => {
        setIsLoading(false);
        setMapError(null);
        debugLog('Map loaded successfully');
        
        setTimeout(() => {
          if (map.current) {
            map.current.resize();
            addPropertyMarkers();
          }
        }, 100);
      });

      // Handle map errors
      map.current.on('error', (e) => {
        setMapError('Map failed to load');
        setIsLoading(false);
        console.error('Map error:', e);
      });

    } catch (error) {
      setMapError('Failed to initialize map');
      setIsLoading(false);
      console.error('Map initialization error:', error);
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  // Handle style changes
  const changeMapStyle = (style) => {
    if (!map.current) return;
    
    const styleUrls = {
      streets: 'mapbox://styles/mapbox/streets-v12',
      satellite: 'mapbox://styles/mapbox/satellite-streets-v12'
    };
    
    map.current.setStyle(styleUrls[style]);
    setMapStyle(style);
    
    // Re-add markers after style change
    map.current.once('styledata', () => {
      addPropertyMarkers();
    });
  };

  // Error state
  if (mapError) {
    return (
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Property Map</h2>
        <div className="w-full h-96 rounded-lg border flex items-center justify-center bg-red-50">
          <div className="text-center">
            <div className="text-red-600 text-lg mb-2">⚠️ Map Error</div>
            <p className="text-red-700">{mapError}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-3 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Refresh Page
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-semibold">Enhanced Property Map</h2>
        {isLoading && (
          <div className="flex items-center text-sm text-gray-600">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
            Loading map...
          </div>
        )}
      </div>
      
      {/* Map Controls */}
      <div className="mb-4 flex space-x-2">
        <button
          onClick={() => changeMapStyle('streets')}
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            mapStyle === 'streets' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          🗺️ Streets
        </button>
        <button
          onClick={() => changeMapStyle('satellite')}
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            mapStyle === 'satellite' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          🛰️ Satellite
        </button>
      </div>
      
      <div className="relative">
        <div 
          ref={mapContainer} 
          className="w-full rounded-lg overflow-hidden border"
          style={{ 
            height: '500px',
            minHeight: '500px',
            opacity: isLoading ? 0.5 : 1
          }}
        />
        
        {/* Map Legend */}
        <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-lg border max-w-xs">
          <h4 className="font-medium text-sm mb-2">🗺️ Property Status</h4>
          <div className="space-y-1 text-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-red-600 mr-2"></div>
                <span>Foreclosure</span>
              </div>
              <span className="text-gray-500">{SAMPLE_PROPERTIES.filter(p => p.status === 'foreclosure').length}</span>
            </div>
          </div>
          <div className="mt-2 pt-2 border-t border-gray-200 text-xs text-gray-500">
            Total: {SAMPLE_PROPERTIES.length} properties
          </div>
        </div>
      </div>
    </div>
  );
}
