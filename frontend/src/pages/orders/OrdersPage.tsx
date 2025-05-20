import { useOrders } from '../../hooks/useOrders';
import { Order } from '../../types/order';

export function OrdersPage() {
  const { data: orders, isLoading, error } = useOrders();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      <ul className="space-y-4">
        {orders?.map((order: Order) => (
          <li key={order.id} className="border p-4 rounded shadow">
            <p>Order #{order.id}</p>
            <p>Total: ${order.total.toFixed(2)}</p>
            <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
            <ul className="ml-4 mt-2 list-disc">
              {order.items.map(item => (
                <li key={item.id}>
                  {item.product.name} x{item.quantity} – ${item.price}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
