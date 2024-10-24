export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  location: string;
  status: 'pending' | 'found' | 'prepared' | 'ready';
  checked: boolean;
}

export interface Order {
  id: string;
  createdAt: Date;
  status: 'pending' | 'in-progress' | 'completed';
  items: OrderItem[];
  assignedTo: string;
  priority: 'low' | 'medium' | 'high';
  zone: string;
}

export interface EmployeeMetrics {
  name: string;
  efficiency: number;
  averageTime: number;
  totalOrders: number;
  completionRate: number;
}

export interface ZoneAnalytics {
  zone: string;
  count: number;
  efficiency: number;
  activeOrders: number;
}

export interface WarehouseLocation {
  id: string;
  zone: string;
  aisle: string;
  shelf: string;
  position: string;
  items: string[];
}