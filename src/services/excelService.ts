import * as XLSX from 'xlsx';
import { Order, OrderItem } from '../types/order';

export class ExcelService {
  private workbook: XLSX.WorkBook | null = null;
  private readonly filePath: string;

  constructor(filePath: string) {
    this.filePath = filePath;
  }

  async connect() {
    try {
      const response = await fetch(this.filePath);
      const data = await response.arrayBuffer();
      this.workbook = XLSX.read(data);
      return true;
    } catch (error) {
      console.error('Error connecting to Excel:', error);
      return false;
    }
  }

  async getOrders(): Promise<Order[]> {
    if (!this.workbook) throw new Error('Not connected to Excel file');
    
    const sheet = this.workbook.Sheets[this.workbook.SheetNames[0]];
    const rawData = XLSX.utils.sheet_to_json(sheet);
    
    return rawData.map(this.mapToOrder);
  }

  async updateOrder(order: Order): Promise<boolean> {
    if (!this.workbook) throw new Error('Not connected to Excel file');
    
    try {
      const sheet = this.workbook.Sheets[this.workbook.SheetNames[0]];
      const orders = XLSX.utils.sheet_to_json(sheet);
      
      const updatedOrders = orders.map(o => 
        (o as any).id === order.id ? this.mapOrderToRow(order) : o
      );
      
      const newSheet = XLSX.utils.json_to_sheet(updatedOrders);
      this.workbook.Sheets[this.workbook.SheetNames[0]] = newSheet;
      
      return true;
    } catch (error) {
      console.error('Error updating order:', error);
      return false;
    }
  }

  private mapToOrder(row: any): Order {
    return {
      id: row.id,
      createdAt: new Date(row.createdAt),
      status: row.status,
      items: JSON.parse(row.items),
      assignedTo: row.assignedTo,
      priority: row.priority,
      zone: row.zone
    };
  }

  private mapOrderToRow(order: Order): any {
    return {
      id: order.id,
      createdAt: order.createdAt.toISOString(),
      status: order.status,
      items: JSON.stringify(order.items),
      assignedTo: order.assignedTo,
      priority: order.priority,
      zone: order.zone
    };
  }
}