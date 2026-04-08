import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { esaAgencies, Agency } from '../data/esa-agencies';
import { ExternalLink, Building2 } from 'lucide-react';

const createCustomIcon = (agency: Agency) => {
  const logoUrl = agency.customLogoUrl || `https://www.google.com/s2/favicons?domain=${agency.logoDomain}&sz=128`;
  const fallbackUrl = `https://ui-avatars.com/api/?name=${agency.acronym}&background=ffffff&color=111827&bold=true&font-size=0.4`;
  
  return L.divIcon({
    className: 'custom-agency-marker',
    html: `
      <div class="w-10 h-10 rounded-full bg-white border-2 border-gray-900 shadow-[4px_4px_0px_0px_rgba(17,24,39,1)] flex items-center justify-center overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(239,68,68,1)] hover:border-red-600 group relative">
        <img src="${logoUrl}" class="w-6 h-6 object-contain grayscale group-hover:grayscale-0 transition-all duration-300 relative z-10" onerror="this.onerror=null; this.src='${fallbackUrl}';" />
      </div>
    `,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -24],
  });
};

export default function AgencyMap() {
  return (
    <div className="h-[600px] w-full relative z-0 bg-gray-100">
      <MapContainer 
        center={[49.0, 10.0]} 
        zoom={4} 
        scrollWheelZoom={true}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        {esaAgencies.map((agency) => (
          <Marker 
            key={agency.id} 
            position={[agency.latitude, agency.longitude]}
            icon={createCustomIcon(agency)}
          >
            <Popup className="custom-popup">
              <div className="p-2 min-w-[240px]">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 bg-white flex items-center justify-center overflow-hidden shrink-0 border-2 border-gray-900 relative">
                    <Building2 className="w-6 h-6 text-gray-300 absolute z-0" />
                    <img 
                      src={agency.customLogoUrl || `https://www.google.com/s2/favicons?domain=${agency.logoDomain}&sz=128`} 
                      alt={`${agency.acronym} logo`}
                      className="w-full h-full object-contain p-2 relative z-10 bg-white"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = `https://ui-avatars.com/api/?name=${agency.acronym}&background=ffffff&color=111827&bold=true&font-size=0.4`;
                      }}
                    />
                  </div>
                  <div className="pt-1">
                    <h3 className="font-black text-gray-900 text-xl tracking-tight leading-none uppercase">
                      {agency.acronym}
                    </h3>
                    <div className="flex items-center gap-2 mt-2">
                      <img 
                        src={`https://flagcdn.com/w20/${agency.countryCode}.png`} 
                        width="16" 
                        alt={`${agency.country} flag`} 
                        className="border border-gray-300"
                      />
                      <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">{agency.country}</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-sm font-bold text-gray-900 mb-1 leading-snug">{agency.agencyName}</p>
                {agency.nativeName !== agency.agencyName && (
                  <p className="text-xs text-gray-500 font-medium mb-3 leading-snug">{agency.nativeName}</p>
                )}
                
                <div className="mt-4 pt-4 border-t-2 border-gray-100 space-y-1">
                  <p className="text-xs text-gray-900 font-bold uppercase tracking-wider">{agency.city}</p>
                  <p className="text-xs text-gray-600 leading-snug">{agency.address}</p>
                </div>
                
                <div className="mt-4 pt-4 border-t-2 border-gray-900 flex items-center justify-between">
                  <a 
                    href={agency.website} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-xs text-red-600 hover:text-red-700 flex items-center gap-1 font-bold uppercase tracking-wider transition-colors"
                  >
                    Website <ExternalLink className="w-3 h-3" />
                  </a>
                  <div className="text-[10px] text-gray-900 font-mono font-bold">
                    {agency.latitude.toFixed(2)}&deg;N, {agency.longitude.toFixed(2)}&deg;E
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
