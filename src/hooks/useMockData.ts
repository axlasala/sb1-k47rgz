import { useState, useEffect } from 'react';
import { EmployeeMetrics, ZoneAnalytics } from '../types/order';

interface Metrics {
  averageTime: number;
  efficiency: number;
}

export const useMockData = () => {
  const [metrics, setMetrics] = useState<Metrics>({ averageTime: 0, efficiency: 0 });
  const [employees, setEmployees] = useState<EmployeeMetrics[]>([]);
  const [zones, setZones] = useState<ZoneAnalytics[]>([]);

  useEffect(() => {
    // Simular datos de métricas generales
    setMetrics({
      averageTime: 12.5,
      efficiency: 85.3,
    });

    // Simular datos de empleados
    setEmployees([
      {
        name: 'Empleado 1',
        efficiency: 92.5,
        averageTime: 10.2,
        totalOrders: 145,
      },
      {
        name: 'Empleado 2',
        efficiency: 88.3,
        averageTime: 11.5,
        totalOrders: 132,
      },
      {
        name: 'Empleado 3',
        efficiency: 78.9,
        averageTime: 13.8,
        totalOrders: 98,
      },
    ]);

    // Simular datos de zonas
    setZones([
      { zone: 'A1', count: 45, efficiency: 92.5 },
      { zone: 'B2', count: 38, efficiency: 88.3 },
      { zone: 'C1', count: 32, efficiency: 85.7 },
    ]);
  }, []);

  return { metrics, employees, zones };
};