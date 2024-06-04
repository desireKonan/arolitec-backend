import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/service/prisma.service";
import { extractProfit, parseDataFromCsv } from "src/util/utils";
import { Stream } from "stream";
import { Profit } from "./profit.model";
import { ProfitCountry } from "./profit-country.model";
import { profit_countries } from "./profit-country.data";

@Injectable()
export class ProfitService {
    constructor(
        private prismaService: PrismaService
    ) {}

    async extractProfitsFromCSV(fileStream: Stream): Promise<void> {
        //Methode allow to process large volume of Data from CSV File
        var profits: ProfitCountry[] = profit_countries;
        var profitCSVFile: string = '';

        fileStream
            .on('data', (data) => {
                profitCSVFile += data; 
            }).on('end', () => {
                let csvRows: string[] = parseDataFromCsv(profitCSVFile);
                csvRows.map(row => {
                    const profit:Profit = extractProfit(row);
                    var profitCountry = profits.find(profitCountry => profitCountry.prefix === profit.prefix);
                    if(profitCountry) {
                        profitCountry.profit += profit.profit;
                    } 
                });
                console.log(`Profits totaux: ${profits}`);
                this.prismaService.profit_country.createMany({
                    data: profits
                }).then(profit => console.log(profit));
                console.log('file has been read completely');
            });
    }

    getProfits(): Promise<any> {
        return this.prismaService.$queryRaw`SELECT country, prefix, SUM(profit)::numeric as profit FROM profit_country GROUP BY 
                    country, 
                    prefix, 
                    to_char(created_at, 'YYYY');
        `;
    }
}