import { IsString, IsDateString } from 'class-validator'

export class MsgNotifyDto {
    @IsString()
    msgFunction: string
    
    @IsString()
    docNum: string
    
    @IsString()
    docVer: string
    
    @IsString()
    sender: string
    
    @IsString()
    docType: string
    
    @IsString()
    receiver: string
    
    @IsString()
    trackId: string
    
    @IsString()
    msgNum: string

    @IsDateString()
    when: Date
}