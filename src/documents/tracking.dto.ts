import { IsString } from 'class-validator'

export class TrackingDto {
    @IsString()
    trackId: string
    
    @IsString()
    msgNum: string
}