import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm'

export class FsmDocReceiver {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    receiver: string
    @Column({name: 'fsm_doc_id'})
    docId: number
}
