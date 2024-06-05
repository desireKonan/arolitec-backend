import { ApiProperty } from "@nestjs/swagger";

export class UserCommand {
    @ApiProperty({
        description: 'Id',
        required: false,
    })
    id?: string;

    @ApiProperty({
        description: 'Email',
        required: false,
    })
    email!: string;

    @ApiProperty({
        description: 'Name',
        required: false,
    })
    name!: string;

    @ApiProperty({
        description: 'Password',
        required: false,
    })
    password!: string;

    @ApiProperty({
        description: 'Role',
        required: false,
    })
    role!: string;

}