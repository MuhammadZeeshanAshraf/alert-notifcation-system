import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty, IsNumber, IsPositive, IsString, Min } from 'class-validator';

export class CreateAlertDto {
    @ApiProperty({
        description: 'The Identifier of the Monitored Service',
    })
    @Transform(({ value }) => Number(value))
    @IsNumber({ maxDecimalPlaces: 0 })
    @IsInt()
    @IsPositive()
    @Min(1)
    serviceId: number;

    @ApiProperty({
        description: 'The Alert Message',
        example: 'Database Usage Percentage is above 90%',
    })
    @IsNotEmpty()
    @IsString()
    message: string;
}
