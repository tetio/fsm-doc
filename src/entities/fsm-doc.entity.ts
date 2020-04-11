import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { Audit } from './audit.entity'
import { FsmDocReceiver } from './fsm-doc-receiver.entity'

@Entity({ name: 'fsm_doc' })
export class FsmDoc extends Audit {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    key: string
    @Column({ name: 'doc_type' })
    docType: string
    @Column({ name: 'doc_num' })
    docNum: string
    @Column({ name: 'current_doc_ver' })
    currentDocVer: string
    @Column()
    sender: string
    @Column()
    state: string

    @OneToMany(type => FsmDocReceiver, receiver => receiver.fsmDoc)
    receivers: FsmDocReceiver[]
}