export interface AccountData {
  id: string;
  name: string;
  dependent?: string;
  people?: number;
  totalQuantity: number;
  totalAmount: number;
  created: string;
  type: {
    denomination: string;
  };
  orders: Order[];
  divisaAmount: Currency[];
  mappedTaxsDiscounts: TaxDiscount[];
  table?: {
    name: string;
  };
}

export interface Order {
  id: string;
  quantity: number;
}

export interface Currency {
  id: string;
  name: string;
  amount: number;
}

export interface TaxDiscount {
  id: string;
  name: string;
  amount: number;
}
