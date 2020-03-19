import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm'

@Entity({name: 'fsm_msg'})
export class FsmMsg {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    key: string
    @Column({name: 'msg_function'})
    msgFunction: string
    @Column({name: 'doc_num'})
    docNum: string
    @Column({name: 'doc_ver'})
    docVer: string
    @Column()
    sender: string
    @Column()
    receiver: string
    @Column({name: 'doc_type'})
    docType: string
    @Column({name: 'track_id'})
    trackId: string
    @Column({name: 'msg_num'})
    msgNum: string
    @Column({name: 'msg_date'})
    msgDate: Date
    @Column()
    state: string
    @Column()
    reprocessed: boolean
    @Column({name: 'doc_ref_num'})
    docRefNum: string
    @Column({name: 'doc_ref_ver'})
    docRefVer: string
    @Column({name: 'doc_ref_type'})
    docRefType: string
}
