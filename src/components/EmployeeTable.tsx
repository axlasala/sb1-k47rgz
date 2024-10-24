import React from 'react';
import { motion } from 'framer-motion';
import { EmployeeMetrics } from '../types/order';

interface EmployeeTableProps {
  employees: EmployeeMetrics[];
}

export const EmployeeTable: React.FC<EmployeeTableProps> = ({ employees }) => {
  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Empleado
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Eficiencia
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Tiempo Promedio
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Pedidos Totales
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {employees.map((employee, index) => (
            <motion.tr
              key={employee.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="hover:bg-gray-50 transition-colors"
            >
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white font-medium">
                    {employee.name.charAt(0)}
                  </div>
                  <span className="ml-3 font-medium text-gray-900">{employee.name}</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(employee.efficiency / 100) * 100}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className="h-full bg-blue-500"
                    />
                  </div>
                  <span className="ml-3 text-sm text-gray-900">
                    {employee.efficiency.toFixed(1)} ped/hora
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">
                {employee.averageTime.toFixed(1)} min
              </td>
              <td className="px-6 py-4">
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  {employee.totalOrders} pedidos
                </span>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};