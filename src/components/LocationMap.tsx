import React from 'react';
import { motion } from 'framer-motion';
import { OrderItem } from '../types/order';

interface LocationMapProps {
  items: OrderItem[];
}

export const LocationMap: React.FC<LocationMapProps> = ({ items }) => {
  const zones = Array.from(new Set(items.map(item => item.location.split('-')[0])));

  return (
    <div className="bg-gray-50 p-6 rounded-xl">
      <h3 className="text-lg font-semibold mb-4">Mapa de Ubicaciones</h3>
      <div className="grid grid-cols-3 gap-4">
        {zones.map((zone) => (
          <motion.div
            key={zone}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-4 rounded-lg shadow"
          >
            <h4 className="font-medium text-gray-900 mb-2">Zona {zone}</h4>
            <ul className="space-y-2">
              {items
                .filter(item => item.location.startsWith(zone))
                .map(item => (
                  <li
                    key={item.id}
                    className="text-sm text-gray-600 flex justify-between items-center"
                  >
                    <span>{item.name}</span>
                    <span className="text-gray-400">{item.location}</span>
                  </li>
                ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
};