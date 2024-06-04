import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/service/prisma.service";
import { UserCommand } from "./user.command";
import { hashPassword } from "src/util/utils";

@Injectable()
export class UserService {
    constructor(
        private prismaService: PrismaService
    ) {}

    async getUsers() : Promise<any[]> {
        return (await this.prismaService.user.findMany()).map(user => ({
            id: user.id,
            name: user.name,
            email: user.email,
            created_at: new Date().toISOString()
        }));
    }

    async saveUser(user: UserCommand) {
        const password = (await hashPassword(user.password));
        return await this.prismaService.user.create({
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
                password: password
            }
        });
    }

    async updateUser(user: UserCommand, userId: string) {
        const password = (await hashPassword(user.password));
        return await this.prismaService.user.update({
            where: {
                id: userId
            },
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
                password: password
            }
        });
    }

    async deleteUser(userId: string) {
        await this.prismaService.user.delete({
            where: {
                id: userId
            }
        })
    }

    async getUser(id: string) : Promise<any> {
        return (await this.prismaService.user.findFirst({
            where: {
                id: id
            }
        }));
    }
}