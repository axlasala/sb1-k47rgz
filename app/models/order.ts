import { Observable } from '@nativescript/core';

export interface OrderPreparation {
  id: string;
  startTime: Date;
  endTime: Date;
  employeeId: string;
  status: 'pending' | 'in-progress' | 'completed';
  items: number;
  zone: string;
}

export class OrderAnalyticsModel extends Observable {
  private _preparations: OrderPreparation[] = [];
  
  constructor() {
    super();
  }

  addPreparation(preparation: OrderPreparation) {
    this._preparations.push(preparation);
    this.notifyPropertyChange('preparations', this._preparations);
  }

  getEfficiencyMetrics(employeeId: string) {
    const employeeOrders = this._preparations.filter(p => p.employeeId === employeeId);
    const totalTime = employeeOrders.reduce((acc, order) => {
      return acc + (order.endTime.getTime() - order.startTime.getTime());
    }, 0);
    
    return {
      averageTime: totalTime / employeeOrders.length / 1000, // in seconds
      totalOrders: employeeOrders.length,
      itemsPerHour: (employeeOrders.reduce((acc, order) => acc + order.items, 0) / totalTime) * 3600000
    };
  }

  getZoneAnalytics() {
    const zoneMap = new Map<string, number>();
    this._preparations.forEach(prep => {
      zoneMap.set(prep.zone, (zoneMap.get(prep.zone) || 0) + 1);
    });
    return Object.fromEntries(zoneMap);
  }
}