import {CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, Column} from 'typeorm'

export class Audit {   
    @CreateDateColumn() 
    created_at: Date
    
    @UpdateDateColumn()
    updated_at: Date    
}