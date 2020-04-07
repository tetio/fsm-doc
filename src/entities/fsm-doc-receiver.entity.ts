import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { Audit } from './audit.entity'

@Entity({ name: 'fsm_doc_receiver' })
export class FsmDocReceiver extends Audit {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    receiver: string
    @Column({ name: 'fsm_doc_id' })
    docId: number
}
