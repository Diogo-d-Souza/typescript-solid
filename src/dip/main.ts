import { EnterpriseCustomer } from './classes/customer';
import { NoDiscount } from './classes/discount';
import { Order } from './classes/order';
import { Product } from './classes/product';
import { ShoppingCart } from './classes/shopping-cart';
import { Messaging } from './services/message';
import { Persistency } from './services/persistency';

// const fiftyPercentDiscount = new FiftyPercentDiscount();
// const tenPercentDiscount = new TenPercentDiscount();
const noDiscount = new NoDiscount();
const shoppingCart = new ShoppingCart(noDiscount);
const messaging = new Messaging();
const persistency = new Persistency();
// const individualCustomer = new IndividualCustomer('Didas', 'Souza', '11111111');
const enterpriseCustomer = new EnterpriseCustomer('Didas LTDA', '22222222222');

// class MessagingMock implements MessagingProtocol {
//   sendMessage(): void {
//     console.log('Message sent from mock');
//   }
// }

// const messageMock = new MessagingMock();

const order = new Order(
  shoppingCart,
  messaging,
  persistency,
  enterpriseCustomer,
);

shoppingCart.addItem(new Product('Shorts', 30));
shoppingCart.addItem(new Product('Tshirt', 49));
shoppingCart.addItem(new Product('Boots', 100));

console.log(shoppingCart.items);
console.log(shoppingCart.total());
console.log(shoppingCart.totalWithDiscount());
console.log(order.orderStatus);
order.checkout();
console.log(order.orderStatus);
