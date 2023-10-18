import { CustomerOrder } from './interfaces/customer-protocol';
import { MessagingProtocol } from './interfaces/messaging-protocol';
import { OrderStatus } from './interfaces/order-status';
import { PersistencyProtocol } from './interfaces/persistency-protocol';
import { ShoppingCartProtocol } from './interfaces/shopping-cart-protocol';

export class Order {
  private _orderStatus: OrderStatus = 'open';

  get orderStatus(): OrderStatus {
    return this._orderStatus;
  }

  constructor(
    private readonly cart: ShoppingCartProtocol,
    private readonly messaging: MessagingProtocol,
    private readonly persistency: PersistencyProtocol,
    private readonly customer: CustomerOrder,
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
    console.log('Client: ', this.customer.getName(), this.customer.getIDN());
  }
}
