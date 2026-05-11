// Discriminated union for a checkout state machine.
// Each variant has a `step` literal that lets TS narrow.

type CartItem = { id: string; name: string; qty: number; price: number };
type Address = { line1: string; city: string; postal: string };

type Checkout =
  | { step: 'cart';         items: CartItem[] }
  | { step: 'shipping';     items: CartItem[]; address: Address }
  | { step: 'payment';      items: CartItem[]; address: Address; method: 'card' | 'paypal' }
  | { step: 'confirmation'; orderId: string };

// Functions that only accept specific states ---------------------------------
function totalCents(state: Checkout & { items: CartItem[] }) {
  return state.items.reduce((sum, i) => sum + i.qty * i.price, 0);
}

function payable(state: Checkout): state is Extract<Checkout, { step: 'payment' }> {
  return state.step === 'payment';
}

function describe(state: Checkout): string {
  switch (state.step) {
    case 'cart':         return `Cart with ${state.items.length} items`;
    case 'shipping':     return `Shipping to ${state.address.city}`;
    case 'payment':      return `Paying via ${state.method}`;
    case 'confirmation': return `Order #${state.orderId} placed`;
  }
}

// TODO: write transition functions: addToCart, setAddress, choosePayment, confirm.
// Each must return the next state, and TS should reject invalid transitions.

const s: Checkout = { step: 'cart', items: [{ id: '1', name: 'Mug', qty: 2, price: 1200 }] };
console.log(describe(s), 'total:', totalCents(s));
