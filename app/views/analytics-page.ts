import { EventData, Page, Observable } from '@nativescript/core';
import { OrderAnalyticsModel } from '../models/order';

export class AnalyticsViewModel extends Observable {
  private analyticsModel: OrderAnalyticsModel;

  constructor() {
    super();
    this.analyticsModel = new OrderAnalyticsModel();
    this.loadMockData(); // En producción, cargar datos reales
    this.updateMetrics();
  }

  private loadMockData() {
    const mockData = [
      {
        id: '1',
        startTime: new Date(2024, 2, 1, 10, 0),
        endTime: new Date(2024, 2, 1, 10, 15),
        employeeId: 'E001',
        status: 'completed',
        items: 5,
        zone: 'A1'
      },
      // Más datos de ejemplo...
    ];

    mockData.forEach(data => this.analyticsModel.addPreparation(data));
  }

  private updateMetrics() {
    const employees = ['E001', 'E002', 'E003'];
    const employeeMetrics = employees.map(id => {
      const metrics = this.analyticsModel.getEfficiencyMetrics(id);
      return {
        name: `Empleado ${id}`,
        efficiency: Math.round(metrics.itemsPerHour * 100) / 100
      };
    });

    this.set('employeeMetrics', employeeMetrics);
    this.set('zoneAnalytics', this.analyticsModel.getZoneAnalytics());
  }

  onNewRecord() {
    // Implementar lógica para nuevo registro
    console.log('Nuevo registro');
  }

  onExport() {
    // Implementar lógica de exportación
    console.log('Exportando informe');
  }
}

export function onNavigatingTo(args: EventData) {
  const page = <Page>args.object;
  page.bindingContext = new AnalyticsViewModel();
}