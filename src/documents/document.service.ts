import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { FsmDoc } from 'src/entities/fsm-doc.entity';

@Injectable()
export class DocumentService {
    constructor(@InjectRepository(FsmDoc) private fsmDocsRepository: Repository<FsmDoc>, ) { }

    findAll() {
        return this.fsmDocsRepository.find()
    }

    findByKey(key: string) {
        return this.fsmDocsRepository.findOneOrFail({ key })
    }

    create(doc: FsmDoc) {
        return this.fsmDocsRepository.save(doc)
    }

    update(doc: FsmDoc) {
        return this.fsmDocsRepository.save(doc)
    }

    getFsmDocs(fsmDoc: FsmDoc): Promise<FsmDoc[]> {
        return this.fsmDocsRepository.find()
    }
}
