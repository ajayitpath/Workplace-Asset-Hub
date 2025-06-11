export interface AssetRequestDto {
  requestId: string;
  assetId: string;
  assetName: string;
  userId: string;
  userName: string;
  quantityRequested: number;
  status: string;
  requestedAt: Date;
}

export interface AssetRequestCreateDto {
  assetId: string;
  userId: string;
  quantityRequested: number;
}
export interface AssetStatusDto {
  statusId: string;
  statusName: string;
}

