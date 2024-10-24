import React from 'react';
import { motion } from 'framer-motion';
import { DashboardCard } from '../components/DashboardCard';
import { EmployeeTable } from '../components/EmployeeTable';
import { ZoneCard } from '../components/ZoneCard';
import { ClockIcon, UserGroupIcon, MapIcon } from '@heroicons/react/24/outline';
import { useMockData } from '../hooks/useMockData';
import toast from 'react-hot-toast';

export const Dashboard: React.FC = () => {
  const { metrics, employees, zones } = useMockData();

  const handleNewRecord = () => {
    toast.success('Nuevo registro iniciado', {
      icon: '📝',
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    });
  };

  const handleExport = () => {
    toast.success('Informe exportado correctamente', {
      icon: '📊',
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-gray-900 mb-8 text-center"
        >
          Análisis de Eficiencia de Preparación
        </motion.h1>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-8">
          <DashboardCard
            title="Tiempo Promedio de Preparación"
            value={metrics.averageTime}
            subtitle="minutos"
            icon={<ClockIcon className="w-6 h-6" />}
            formatValue={(v) => v.toFixed(1)}
          />
          <DashboardCard
            title="Eficiencia General"
            value={metrics.efficiency}
            subtitle="ped/hora"
            icon={<UserGroupIcon className="w-6 h-6" />}
            formatValue={(v) => v.toFixed(1)}
          />
          <DashboardCard
            title="Zonas Activas"
            value={zones.length}
            icon={<MapIcon className="w-6 h-6" />}
            formatValue={(v) => v.toString()}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Rendimiento por Empleado
              </h2>
              <EmployeeTable employees={employees} />
            </motion.div>
          </div>

          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Análisis por Zona
              </h2>
              <div className="space-y-4">
                {zones.map((zone) => (
                  <ZoneCard key={zone.zone} zone={zone} />
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleNewRecord}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all"
          >
            Nuevo Registro
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleExport}
            className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all"
          >
            Exportar Informe
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};