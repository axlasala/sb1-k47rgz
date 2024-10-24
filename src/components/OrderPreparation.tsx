import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Order, OrderItem } from '../types/order';
import { LocationMap } from './LocationMap';
import toast from 'react-hot-toast';

interface OrderPreparationProps {
  order: Order;
  onUpdateOrder: (order: Order) => Promise<void>;
}

export const OrderPreparation: React.FC<OrderPreparationProps> = ({ order, onUpdateOrder }) => {
  const [items, setItems] = useState(order.items);
  const [showMap, setShowMap] = useState(false);

  const handleItemCheck = async (itemId: string, checked: boolean) => {
    const updatedItems = items.map(item =>
      item.id === itemId ? { ...item, checked } : item
    );
    setItems(updatedItems);
    
    const updatedOrder = { ...order, items: updatedItems };
    await onUpdateOrder(updatedOrder);
    
    toast.success(`Artículo ${checked ? 'marcado' : 'desmarcado'}`);
  };

  const handleQuantityChange = async (itemId: string, quantity: number) => {
    const updatedItems = items.map(item =>
      item.id === itemId ? { ...item, quantity } : item
    );
    setItems(updatedItems);
    
    const updatedOrder = { ...order, items: updatedItems };
    await onUpdateOrder(updatedOrder);
    
    toast.success('Cantidad actualizada');
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">
          Pedido #{order.id}
        </h2>
        <button
          onClick={() => setShowMap(!showMap)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          {showMap ? 'Ocultar Mapa' : 'Ver Mapa'}
        </button>
      </div>

      {showMap && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mb-6"
        >
          <LocationMap items={items} />
        </motion.div>
      )}

      <div className="space-y-4">
        {items.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center space-x-4">
              <input
                type="checkbox"
                checked={item.checked}
                onChange={(e) => handleItemCheck(item.id, e.target.checked)}
                className="h-5 w-5 text-blue-500 rounded"
              />
              <div>
                <p className="font-medium text-gray-900">{item.name}</p>
                <p className="text-sm text-gray-500">Ubicación: {item.location}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <input
                type="number"
                value={item.quantity}
                onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                min="1"
                className="w-20 px-3 py-2 border rounded-lg"
              />
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                item.status === 'ready' ? 'bg-green-100 text-green-800' :
                item.status === 'prepared' ? 'bg-blue-100 text-blue-800' :
                item.status === 'found' ? 'bg-yellow-100 text-yellow-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {item.status}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};