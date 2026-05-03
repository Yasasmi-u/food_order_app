export interface User {
  id: number;
  username: string;
  role: 'ADMIN' | 'CUSTOMER';
}

export interface Category {
  id: number;
  name: string;
}

export interface FoodItem {
  id: number;
  name: string;
  price: number;
  status: 'AVAILABLE' | 'OUT_OF_STOCK';
  category: Category;
}

export interface CartItem {
  id: number;
  quantity: number;
  foodItem: FoodItem;
}

export interface Cart {
  id: number;
  cartItems: CartItem[];
}

export interface OrderItem {
  id: number;
  quantity: number;
  foodItem: FoodItem;
}

export interface Order {
  id: number;
  status: 'PLACED' | 'PREPARING' | 'DELIVERED' | 'CANCELLED';
  orderItems: OrderItem[];
}

export interface Payment {
  id: number;
  status: 'PENDING' | 'COMPLETED' | 'FAILED';
  order: Order;
}