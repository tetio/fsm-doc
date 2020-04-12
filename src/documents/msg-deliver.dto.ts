import { IsString, IsDateString } from 'class-validator'

export class MsgDeliverDto {
    @IsString()
    trackId: string
    
    @IsString()
    msgNum: string
}
    