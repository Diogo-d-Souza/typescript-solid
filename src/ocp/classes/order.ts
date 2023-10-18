import { Messaging } from '../services/message';
import { Persistency } from '../services/persistency';
import { OrderStatus } from './interfaces/order-status';
import { ShoppingCart } from './shopping-cart';

export class Order {
  private _orderStatus: OrderStatus = 'open';

  get orderStatus(): OrderStatus {
    return this._orderStatus;
  }

  constructor(
    private readonly cart: ShoppingCart,
    private readonly messaging: Messaging,
    private readonly persistency: Persistency,
  ) {}

  checkout(): void {
    if (this.cart.isEmpty()) {
      console.log('Your cart is empty');
      return;
    }
    this._orderStatus = 'closed';
    this.messaging.sendMessage(
      `Your order with a total of ${this.cart.totalWithDiscount()} has been received`,
    );
    this.persistency.saveOrder();
    this.cart.clear();
  }
}
