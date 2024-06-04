import { Profit } from "src/analytics/profit.model";
import * as crypto from 'bcrypt';

export function extractProfit(data: string): Profit {
    let row: string[] = data.split(/[^\d]/);
    let prefix = row[0].substring(0, 3);
    let contact = row[0].substring(3, row[0].length);
    let sell_price = parseInt(row[1]);
    let cost_price = parseInt(row[2]);
    let profit = sell_price - cost_price;
    return {
        prefix: prefix,
        contact: contact,
        profit: profit,
        sell_price: sell_price,
        cost_price: cost_price
    };
}


export function parseDataFromCsv(data: string) {
    return data.split('\r\n')
            .filter(csv => csv !== '')
            .slice(1, data.length);
}


export async function hashPassword(password: string): Promise<string> {
    return (await crypto.hash(password, 12));
}