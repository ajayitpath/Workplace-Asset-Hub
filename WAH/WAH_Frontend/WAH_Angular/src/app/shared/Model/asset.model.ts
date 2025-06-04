export interface ApiAssetResponse {
  AssetId: string;
  AssetName: string;
  AssetCode: string;
  CategoryId: string;
  Brand: string;
  Model: string;
  Specification: string;
  QuantityTotal: number;
}

export interface Asset {
  assetId: string;
  assetName: string;
  assetCode: string;
  categoryId: string;
  brand: string;
  model: string;
  specification: string;
  quantityTotal: number;
  categoryName?: string; // Add optional
}