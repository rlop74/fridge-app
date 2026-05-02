export type ReceiptItemTypeName =
  | 'Dairy'
  | 'Meat'
  | 'Vegetables'
  | 'Fruits'
  | 'Grains'
  | 'Beverages'
  | 'Snacks'
  | 'Other';

export type ParsedReceiptItem = {
  name: string;
  quantityPurchased: number;
  itemTypeName: ReceiptItemTypeName;
  confidence: number;
};

export type ReceiptScanResult = {
  merchantName?: string;
  purchasedAt?: string;
  items: ParsedReceiptItem[];
  rawText?: string;
};

export type EditableReceiptItem = ParsedReceiptItem & {
  localId: string;
  selected: boolean;
};
