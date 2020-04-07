import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { FsmDoc } from 'src/entities/fsm-doc.entity';

@Injectable()
export class DocumentService {
    constructor(@InjectRepository(FsmDoc) private fsmDocsRepository: Repository<FsmDoc>,) { }

    async findAll() {
        return await this.fsmDocsRepository.find() 
    }

    async create(doc: FsmDoc) {
        await this.fsmDocsRepository.save(doc)
    }


    async getFsmDocs(fsmDoc: FsmDoc): Promise<FsmDoc[]> {
        return await this.fsmDocsRepository.find()
    }
}
