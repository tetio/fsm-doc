import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { FsmDocReceiver } from 'src/entities/fsm-doc-receiver.entity';

@Injectable()
export class ReceiverService {
    constructor(@InjectRepository(FsmDocReceiver) private fsmDocReceiverRepository: Repository<FsmDocReceiver>) { }

    async getReceivers(fsmDocReceiver: FsmDocReceiver): Promise<FsmDocReceiver[]> {
        return await this.fsmDocReceiverRepository.find()
    }
}
