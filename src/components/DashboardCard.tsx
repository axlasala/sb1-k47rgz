import React from 'react';
import { motion } from 'framer-motion';
import { AnimatedCounter } from './AnimatedCounter';

interface DashboardCardProps {
  title: string;
  value: number;
  subtitle?: string;
  icon?: React.ReactNode;
  formatValue?: (value: number) => string;
}

export const DashboardCard: React.FC<DashboardCardProps> = ({ 
  title, 
  value, 
  subtitle, 
  icon,
  formatValue = (v) => v.toString()
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow"
    >
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <div className="flex items-baseline">
            <div className="text-2xl font-bold text-gray-900">
              <AnimatedCounter value={value} formatValue={formatValue} />
            </div>
            {subtitle && (
              <span className="ml-2 text-sm text-gray-500">{subtitle}</span>
            )}
          </div>
        </div>
        {icon && (
          <div className="text-blue-500 bg-blue-50 p-3 rounded-lg">
            {icon}
          </div>
        )}
      </div>
    </motion.div>
  );
};