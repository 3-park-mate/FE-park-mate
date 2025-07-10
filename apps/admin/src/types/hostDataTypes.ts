export interface DailySales {
  date: string;
  amount: number;
}

export interface parkingStatisticsDataType {
  parkingLotUuid: string;
  parkingLotName: string;
  dailySalesList: DailySales[];
}
