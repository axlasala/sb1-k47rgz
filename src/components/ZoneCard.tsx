import React from 'react';
import { motion } from 'framer-motion';
import { ZoneAnalytics } from '../types/order';

interface ZoneCardProps {
  zone: ZoneAnalytics;
}

export const ZoneCard: React.FC<ZoneCardProps> = ({ zone }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      className="bg-white p-4 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold">
            {zone.zone}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">Zona {zone.zone}</p>
            <p className="text-xs text-gray-500">{zone.count} pedidos</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm font-semibold text-gray-900">
            {zone.efficiency.toFixed(1)}%
          </div>
          <div className="text-xs text-gray-500">eficiencia</div>
        </div>
      </div>
      <div className="mt-3">
        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${zone.efficiency}%` }}
            transition={{ duration: 1 }}
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-600"
          />
        </div>
      </div>
    </motion.div>
  );
};