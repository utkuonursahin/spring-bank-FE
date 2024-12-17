import { AccountDto } from "./AccountDto"
import { StockDto } from "./StockDto"

export type AccountStockDto = {
    id: string;
    account: AccountDto;
    stock: StockDto;
    quantity: number;
    value: number;
} 