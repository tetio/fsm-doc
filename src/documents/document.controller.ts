import { Controller, Body, Get, Post } from '@nestjs/common'
import {DocumentService} from './document.service'
import { FsmDoc } from 'src/entities/fsm-doc.entity'

@Controller('document')
export class DocumentController {
    constructor(private readonly docSrv: DocumentService) {}

    @Get()
    findAll() {
        return this.docSrv.findAll()
    }

    @Post()
    create(@Body() doc) {
        const key = `${doc.sender}#${doc.docType}#${doc.docNum}`
        const internalDoc = {...doc, currentDocVer: doc.docVer, key, state: 'PROCESSING'}
        return this.docSrv.create(internalDoc)
    }
    @Post('/msg/notify')
    msgNotify(@Body() doc) {
        const key = `${doc.sender}#${doc.docType}#${doc.docNum}`
        const internalDoc = {...doc, currentDocVer: doc.docVer, key, state: 'PROCESSING'}
        return this.docSrv.create(internalDoc)
    }
}
