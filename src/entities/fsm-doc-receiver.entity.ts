import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { Audit } from './audit.entity'
import { FsmDoc } from './fsm-doc.entity'

@Entity({ name: 'fsm_doc_receiver' })
export class FsmDocReceiver extends Audit {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    receiver: string

    @ManyToOne(Type => FsmDoc, fsmDoc => fsmDoc.receivers)
    fsmDoc: FsmDoc
}
