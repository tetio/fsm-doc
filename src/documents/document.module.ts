import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm'
import { DocumentService } from './document.service';
import { ReceiverService } from './receiver.service';
import { DocumentController } from './document.controller';
import {FsmDoc} from '../entities/fsm-doc.entity'
import {FsmMsg} from '../entities/fsm-msg.entity'
import {FsmDocReceiver} from '../entities/fsm-doc-receiver.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([FsmDoc]),
    TypeOrmModule.forFeature([FsmMsg]),
    TypeOrmModule.forFeature([FsmDocReceiver])
  ],
  providers: [
    DocumentService, 
    ReceiverService
  ],
  controllers: [DocumentController]
})
export class DocumentModule {}
