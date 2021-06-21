import { Body, Controller, Get, HttpCode, Param, Post, Req } from "@nestjs/common";
import { Request } from 'express'
import { CreateCatDto } from "./create-cat.dto";
import { CatsService } from "./cats/cats.service";

@Controller('cats')
export class CatsController {
    constructor(private catService: CatsService) {
    }

    @Get()
    findAll() {
        return this.catService.findAll()
    }

    @Post()
    create(@Body() createCatDto: CreateCatDto) {
        this.catService.create(createCatDto)
    }
}