import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { FsmDocReceiver } from 'src/entities/fsm-doc-receiver.entity';

@Injectable()
export class ReceiverService {
    constructor(@InjectRepository(FsmDocReceiver) private fsmDocReceiverRepository: Repository<FsmDocReceiver>) { }

    create(receiver: FsmDocReceiver) {
        return this.fsmDocReceiverRepository.save(receiver)
    }
    
    add(receiver: FsmDocReceiver) {
        return this.fsmDocReceiverRepository.save(receiver)
    }

    deleteByDocId(fsmDocId: number) {
        return this.fsmDocReceiverRepository.createQueryBuilder()
        .delete()
        .from(FsmDocReceiver)
        .where("fsmDocId = :id", { id: fsmDocId })
        .execute()
    }
    // async getReceivers(fsmDocReceiver: FsmDocReceiver): Promise<FsmDocReceiver[]> {
    //     return await this.fsmDocReceiverRepository.find()
    // }
}
