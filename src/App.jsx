import React, { useState, useEffect } from 'react';

export default function App() {
  const [ciudad, setCiudad] = useState('Bogota');
  const [clima, setClima] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');
  const [historial, setHistorial] = useState([]);

  useEffect(() => {
    buscarClima('Bogota');
  }, []);

  const buscarClima = async (nombreCiudad) => {
    setCargando(true);
    setError('');

    try {
      const resGeo = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(nombreCiudad)}&count=1&language=es&format=json`);
      const dataGeo = await resGeo.json();

      if (!dataGeo.results || dataGeo.results.length === 0) {
        throw new Error("Ciudad no encontrada.");
      }

      const { latitude, longitude, name, country } = dataGeo.results[0];

      const resClima = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
      const dataClima = await resClima.json();

      const temp = dataClima.current_weather.temperature;
      const viento = dataClima.current_weather.windspeed;

      let descripcion = "";
      if (temp > 25) {
        descripcion = "Temperatura cálida. Condiciones secas registradas.";
      } else if (temp < 12) {
        descripcion = "Temperatura baja. Ambiente frío.";
      } else {
        descripcion = "Temperatura estable y moderada.";
      }

      const nuevoRegistro = {
        id: Date.now(),
        lugar: `${name}, ${country || ''}`,
        temperatura: temp,
        viento: viento,
        analisis: descripcion,
        hora: new Date().toLocaleTimeString()
      };

      setClima(nuevoRegistro);
      setHistorial(prev => [nuevoRegistro, ...prev]);

    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (ciudad.trim() !== '') {
      buscarClima(ciudad.trim());
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-xl mx-auto bg-white p-6 rounded shadow border border-gray-200">
        
        <h1 className="text-xl font-bold text-gray-800 mb-1">Módulo 2 - Consulta Meteorológica</h1>
        <p className="text-sm text-gray-600 mb-6">Aplicación web con React, Tailwind y API REST externa.</p>

        <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="Ingrese el nombre de la ciudad"
            value={ciudad}
            onChange={(e) => setCiudad(e.target.value)}
            className="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
          />
          <button
            type="submit"
            disabled={cargando}
            className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 disabled:opacity-50"
          >
            {cargando ? 'Consultando...' : 'Consultar'}
          </button>
        </form>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}


        {clima && (
          <div className="border border-gray-200 p-4 rounded mb-6 bg-gray-50">
            <h2 className="font-semibold text-gray-800 text-base mb-2">{clima.lugar}</h2>
            <p className="text-sm text-gray-700 mb-1">Temperatura: {clima.temperatura} °C</p>
            <p className="text-sm text-gray-700 mb-1">Viento: {clima.viento} km/h</p>
            <p className="text-sm text-gray-600 mt-2 pt-2 border-t border-gray-200">Análisis: {clima.analisis}</p>
          </div>
        )}

        {historial.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Historial de consultas</h3>
            <ul className="space-y-1 text-sm text-gray-600">
              {historial.map((item) => (
                <li key={item.id} className="p-2 border border-gray-100 rounded flex justify-between">
                  <span>{item.lugar}</span>
                  <span className="font-medium">{item.temperatura} °C</span>
                </li>
              ))}
            </ul>
          </div>
        )}

      </div>
    </div>
  );
}