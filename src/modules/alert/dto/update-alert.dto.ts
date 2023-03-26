import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsInt, IsNumber, IsPositive, Min } from "class-validator";

export class UpdateAlertDto {
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
        description: 'The user id of the person who is acknowledging',
    })
    @Transform(({ value }) => Number(value))
    @IsNumber({ maxDecimalPlaces: 0 })
    @IsInt()
    @IsPositive()
    @Min(1)
    acknowledgedBy: number;
}
