import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UserService } from "./user.service";
import { User } from "./user.data";
import { UserCommand } from "./user.command";

@Controller('/user')
@ApiTags('User')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) {}

    @Get('/:id')
    @ApiOperation({
        summary: 'Get Users',
        description: 'Get Users',
    })
    @ApiResponse({
        status: 200,
    })
    async getUser(@Param('id') id: string): Promise<any> {
        return this.userService.getUser(id);
    }


    @Post()
    @ApiOperation({
        summary: 'Save User',
        description: 'Save User',
    })
    @ApiBody({
        type: UserCommand,
    })
    @ApiResponse({
        status: 200,
    })
    async saveUser(@Body() user: UserCommand) {
        this.userService.saveUser(user);
    }


    @Put("/:id")
    @ApiOperation({
        summary: 'Update User',
        description: 'Update User',
    })
    @ApiBody({
        type: UserCommand,
    })
    @ApiResponse({
        status: 200,
    })
    async updateUser(@Body() user: UserCommand, @Param("id") id: string) {
        this.userService.updateUser(user, id);
    }


    @Get()
    @ApiOperation({
        summary: 'Get Users',
        description: 'Get Users',
    })
    @ApiResponse({
        status: 200,
    })
    async getUsers(): Promise<any[]> {
        return this.userService.getUsers();
    }


    @Delete("/:id")
    @ApiOperation({
        summary: 'Delete User',
        description: 'Delete User',
    })
    @ApiResponse({
        status: 200,
    })
    async deleteUser(@Param("id") userId: string) {
        this.userService.deleteUser(userId);
    }

}