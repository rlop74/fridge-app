import { client } from '@/services/api/client';
import { ReceiptScanResult } from '@/types/receiptTypes';

export const processImage = async (uri: string) => {
  const formData = new FormData();

  formData.append('image', {
    uri,
    name: 'receipt.jpg',
    type: 'image/jpeg',
  } as any);

  const result = await fetch('http://192.168.74.166:3000/scan-photo', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    body: formData,
  });

  return result;
};

const USE_MOCK_RECEIPT_SCAN = false;

const mockScanReceiptImage = async (
  imageUri: string,
): Promise<ReceiptScanResult> => {
  console.log('Mock scanning receipt image:', imageUri);

  await new Promise((resolve) => setTimeout(resolve, 600));

  return {
    merchantName: 'Mock Grocery Store',
    purchasedAt: new Date().toISOString(),
    rawText: 'Mock OCR text from receipt image',
    items: [
      {
        name: 'Milk',
        quantityPurchased: 1,
        itemTypeName: 'Dairy',
        confidence: 0.95,
      },
      {
        name: 'Bananas',
        quantityPurchased: 6,
        itemTypeName: 'Fruits',
        confidence: 0.88,
      },
    ],
  };
};

const uploadReceiptImageForScan = async (
  imageUri: string,
): Promise<ReceiptScanResult> => {
  const formData = new FormData();

  formData.append('image', {
    uri: imageUri,
    name: 'receipt.jpg',
    type: 'image/jpeg',
  } as any);

  const response = await client.post('/receipts/scan', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const scanReceiptImage = async (
  imageUri: string,
): Promise<ReceiptScanResult> => {
  if (USE_MOCK_RECEIPT_SCAN) {
    return mockScanReceiptImage(imageUri);
  }

  return uploadReceiptImageForScan(imageUri);
};
