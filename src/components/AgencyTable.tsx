import React, { useState } from 'react';
import { esaAgencies } from '../data/esa-agencies';
import { ExternalLink, Building2 } from 'lucide-react';

export default function AgencyTable() {
  const [sortField, setSortField] = useState<keyof typeof esaAgencies[0]>('country');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (field: keyof typeof esaAgencies[0]) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedAgencies = [...esaAgencies].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <div className="w-full overflow-x-auto bg-white border-2 border-gray-900 shadow-[8px_8px_0px_0px_rgba(17,24,39,1)]">
      <table className="w-full text-left text-sm text-gray-900">
        <thead className="bg-gray-50 text-xs font-bold uppercase tracking-widest text-gray-900 border-b-2 border-gray-900">
          <tr>
            <th 
              scope="col" 
              className="px-6 py-5 cursor-pointer hover:bg-gray-100 transition-colors border-r border-gray-200"
              onClick={() => handleSort('country')}
            >
              Country
            </th>
            <th 
              scope="col" 
              className="px-6 py-5 cursor-pointer hover:bg-gray-100 transition-colors border-r border-gray-200"
              onClick={() => handleSort('agencyName')}
            >
              Agency
            </th>
            <th 
              scope="col" 
              className="px-6 py-5 cursor-pointer hover:bg-gray-100 transition-colors border-r border-gray-200"
              onClick={() => handleSort('city')}
            >
              City
            </th>
            <th scope="col" className="px-6 py-5 border-r border-gray-200">
              Address
            </th>
            <th scope="col" className="px-6 py-5 text-right">
              Coordinates
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {sortedAgencies.map((agency) => (
            <tr 
              key={agency.id} 
              className="hover:bg-gray-50 transition-colors group"
            >
              <td className="px-6 py-5 font-bold text-gray-900 whitespace-nowrap border-r border-gray-200">
                <div className="flex items-center gap-3">
                  <img 
                    src={`https://flagcdn.com/w40/${agency.countryCode}.png`} 
                    srcSet={`https://flagcdn.com/w80/${agency.countryCode}.png 2x`} 
                    width="24" 
                    alt={`${agency.country} flag`} 
                    className="border border-gray-300 grayscale group-hover:grayscale-0 transition-all duration-300" 
                  />
                  <span className="uppercase tracking-wider">{agency.country}</span>
                </div>
              </td>
              <td className="px-6 py-5 border-r border-gray-200">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white flex items-center justify-center overflow-hidden shrink-0 border-2 border-gray-900 relative">
                    <Building2 className="w-6 h-6 text-gray-300 absolute z-0" />
                    <img 
                      src={agency.customLogoUrl || `https://www.google.com/s2/favicons?domain=${agency.logoDomain}&sz=128`} 
                      alt={`${agency.acronym} logo`}
                      className="w-full h-full object-contain p-2 grayscale group-hover:grayscale-0 transition-all duration-300 relative z-10 bg-white"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = `https://ui-avatars.com/api/?name=${agency.acronym}&background=ffffff&color=111827&bold=true&font-size=0.4`;
                      }}
                    />
                  </div>
                  <div>
                    <a 
                      href={agency.website} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="font-black text-lg text-gray-900 hover:text-red-600 transition-colors flex items-center gap-1.5 group/link uppercase tracking-tight"
                    >
                      {agency.acronym}
                      <ExternalLink className="w-4 h-4 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                    </a>
                    <div className="text-sm text-gray-700 mt-1 font-bold leading-snug">
                      {agency.agencyName}
                    </div>
                    {agency.nativeName !== agency.agencyName && (
                      <div className="text-xs text-gray-500 mt-0.5 font-medium leading-snug">
                        {agency.nativeName}
                      </div>
                    )}
                  </div>
                </div>
              </td>
              <td className="px-6 py-5 whitespace-nowrap font-bold uppercase tracking-wider text-gray-700 border-r border-gray-200">
                {agency.city}
              </td>
              <td className="px-6 py-5 text-gray-600 text-sm max-w-xs border-r border-gray-200">
                {agency.address}
              </td>
              <td className="px-6 py-5 text-right whitespace-nowrap">
                <div className="font-mono text-xs font-bold text-gray-900 bg-gray-100 px-2 py-1 inline-block border border-gray-300">
                  {agency.latitude.toFixed(4)}&deg;N<br/>
                  {agency.longitude.toFixed(4)}&deg;E
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
