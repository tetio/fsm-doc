import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm'

@Entity({name: 'fsm_doc'})
export class FsmDoc {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    key: string
    @Column({name: 'doc_type'})
    docType: string
    @Column({name: 'doc_num'})
    docNum: string
    @Column({name: 'current_doc_ver'})
    currentDocVer: string
    @Column()
    sender: string
    @Column()
    state: string    
}