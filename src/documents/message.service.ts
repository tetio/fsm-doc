import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { FsmMsg } from '../entities/fsm-msg.entity'

@Injectable()
export class MessageService {
    constructor(@InjectRepository(FsmMsg) private fsmMsgRepository: Repository<FsmMsg>) { }

    findOneById(id: number) {
        return this.fsmMsgRepository.findByIds([id])
    }

    findByKey(key: string) {
        return this.fsmMsgRepository.findOneOrFail({ key })
    }

    findBySenderAndDocTypeAndDocNumAndDocVer(sender: string, docType: string, docNum: string, docVer: string) {
        return this.fsmMsgRepository.find({ where: { sender, docType, docNum, docVer } })
    }

    create(msg: FsmMsg) {
        return this.fsmMsgRepository.save(msg)
    }

    update(msg: FsmMsg): Promise<FsmMsg> {
        return this.fsmMsgRepository.save(msg)
    }
}