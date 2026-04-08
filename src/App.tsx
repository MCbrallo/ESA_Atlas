import React from 'react';
import AgencyMap from './components/AgencyMap';
import AgencyTable from './components/AgencyTable';

export default function App() {
  return (
    <div className="min-h-screen bg-[#f4f4f0] text-gray-900 font-sans selection:bg-red-600 selection:text-white">
      {/* Header */}
      <header className="border-b-4 border-gray-900 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-gray-900 uppercase leading-none">
              ESA Atlas
            </h1>
            <p className="text-sm md:text-base font-bold tracking-widest uppercase text-gray-500 mt-4">
              European Space Network Directory
            </p>
          </div>
          <div className="flex items-center gap-6 text-sm font-bold uppercase tracking-widest">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></span>
              Live Data
            </div>
            <div className="text-gray-400 border-l-2 border-gray-300 pl-6">
              22 Member States
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
        
        {/* Intro Section */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-4">
            <h2 className="text-xl font-bold tracking-widest uppercase border-t-4 border-gray-900 pt-3">
              Overview
            </h2>
          </div>
          <div className="md:col-span-8 text-xl md:text-2xl text-gray-700 leading-relaxed font-medium">
            A comprehensive geographical and administrative directory of the 22 member states comprising the European Space Agency (ESA). This atlas provides exact coordinates, headquarters information, and official links for national space agencies across the continent.
          </div>
        </section>

        {/* Map Section */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b-4 border-gray-900 pb-4">
            <h3 className="text-2xl md:text-3xl font-black tracking-tighter uppercase">
              Geographical Distribution
            </h3>
            <span className="text-sm font-bold tracking-widest uppercase text-gray-400">Fig. 1</span>
          </div>
          <div className="bg-white p-2 border-2 border-gray-900 shadow-[8px_8px_0px_0px_rgba(17,24,39,1)]">
            <AgencyMap />
          </div>
        </section>

        {/* Table Section */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b-4 border-gray-900 pb-4">
            <h3 className="text-2xl md:text-3xl font-black tracking-tighter uppercase">
              Agency Directory
            </h3>
            <span className="text-sm font-bold tracking-widest uppercase text-gray-400">Index</span>
          </div>
          <AgencyTable />
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t-4 border-gray-900 bg-white mt-20 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-bold uppercase tracking-widest text-gray-500">
          <p>&copy; {new Date().getFullYear()} ESA Atlas</p>
          <p>Designed for Clarity</p>
        </div>
      </footer>
    </div>
  );
}
