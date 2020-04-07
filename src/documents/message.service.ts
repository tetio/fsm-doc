import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { FsmMsg } from '../entities/fsm-msg.entity'

@Injectable()
export class MessageService {
    constructor(@InjectRepository(FsmMsg) private fsmMsgRepository: Repository<FsmMsg>) { }

    async findOneById(id: number) {
        return await this.fsmMsgRepository.findByIds([id])
    }

    async findByKey(key: string) {
        return await this.fsmMsgRepository.findOneOrFail({ key })
    }

    async findBySenderAndDocTypeAndDocNumAndDocVer(sender: string, docType: string, docNum: string, docVer: string) {
        return await this.fsmMsgRepository.find({ where: { sender, docType, docNum, docVer } })
    }

    async create(msg: FsmMsg) {
        await this.fsmMsgRepository.save(msg)
    }

}