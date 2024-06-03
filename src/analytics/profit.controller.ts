import { Controller, Get, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ProfitService } from "./profit.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { createReadStream } from "fs";

@Controller('/profit')
@ApiTags('Profit')
export class ProfitController {
    constructor(
        private readonly profitService: ProfitService
    ) {}

    @Post('/upload')
    @ApiOperation({
        summary: 'Processing CSV File',
        description: 'Processing CSV File',
    })
    @ApiResponse({
        status: 201,
    })
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
          type: 'object',
          properties: {
            file: {
              type: 'string',
              format: 'binary',
            },
          },
        },
    })
    @UseInterceptors(FileInterceptor('file'))
    async processingCSVFile(
       @UploadedFile('file') file: Express.Multer.File
    ): Promise<void> {
        const readableStream = createReadStream(file.path, 'utf-8');
        await this.profitService.extractProfitsFromCSV(readableStream);
    }


    @Get('/countries')
    @ApiOperation({
        summary: 'Get Profit by Country',
        description: 'Get Profit by Country',
    })
    @ApiResponse({
        status: 200,
    })
    async getProfits(): Promise<any[]> {
        return this.profitService.getProfits();
    }
}