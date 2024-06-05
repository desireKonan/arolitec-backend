import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/service/prisma.service";
import { UserCommand } from "./user.command";
import { hashPassword } from "src/util/utils";
import { User } from "./user.data";

@Injectable()
export class UserService {
    constructor(
        private prismaService: PrismaService
    ) {}

    async getUsers() : Promise<User[]> {
        return (await this.prismaService.user.findMany()).map(user => ({
            id: user.id,
            name: user.name,
            email: user.email,
            password: user.password,
            role: user.role,
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
                password: password,
                role: user.role
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
                password: password,
                role: user.role
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

    async findUser(email: string) : Promise<any> {
        return (await this.prismaService.user.findFirst({
            where: {
                email: email
            }
        }));
    }
}