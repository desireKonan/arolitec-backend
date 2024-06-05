import { ApiProperty } from "@nestjs/swagger";

export class AuthDto {
    @ApiProperty({
        description: 'Role',
        required: false,
    })
    email: string;

    @ApiProperty({
        description: 'Role',
        required: false,
    })
    password: string;
}