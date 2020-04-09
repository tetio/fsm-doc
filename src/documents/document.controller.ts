import { Controller, Body, Get, Post, Logger } from '@nestjs/common'
import { DocumentService } from './document.service'
import { MessageService } from './message.service'
import { MsgNotifyDto } from './msg-notify.dto'
import { FsmDoc } from 'src/entities/fsm-doc.entity'
import { FsmMsg } from 'src/entities/fsm-msg.entity'
import { FsmResultDto } from './fsm-result.dto'

@Controller('document')
export class DocumentController {
    constructor(private readonly docSrv: DocumentService, private readonly msgSrv: MessageService) { }

    @Get()
    findAll() {
        return this.docSrv.findAll()
    }

    @Post()
    create(@Body() msg: MsgNotifyDto) {
        const docKey = this.makeDocKey(msg.sender, msg.docType, msg.docNum)
        const internalDoc: FsmDoc = { ...msg, currentDocVer: msg.docVer, key: docKey, state: 'PROCESSING', id: undefined, created_at: undefined, updated_at: undefined }
        return this.docSrv.create(internalDoc)
    }

    @Post('/notify')
    async notify(@Body() msgDto: MsgNotifyDto) {
        const msg = await this.getFsmMsg(msgDto)
        return this.prepareNotify(msg)
    }

    makeMsgKey = (trackId: string, msgId: string) => `${trackId}###${msgId}`

    makeDocKey = (sender: string, docType: string, docNum: string) => `${sender}###${docType}###${docNum}`

    async getFsmMsg(msgPayload: MsgNotifyDto): Promise<FsmMsg> {
        const msgKey = this.makeMsgKey(msgPayload.trackId, msgPayload.msgNum)
        try {
            const msg = await this.msgSrv.findByKey(msgKey)
            // reprocessing a message
            const modMsg: FsmMsg = { ...msg, reprocessed: true }
            return this.msgSrv.update(modMsg)
        }
        catch (reason) {
            // first time message
            const msg_1: FsmMsg = { ...msgPayload, key: msgKey, id: undefined, msgDate: msgPayload.when, state: MSG_STATE.PROCESSING, reprocessed: false, docRefNum: undefined, docRefVer: undefined, docRefType: undefined, updated_at: undefined, created_at: undefined }
            return this.msgSrv.create(msg_1)
        }
    }

    async prepareNotify(msg: FsmMsg): Promise<FsmResultDto> {
        try {
            return await this.prepareDocument(msg)
        } catch (error) {
            // Caused by: org.postgresql.util.PSQLException: ERROR: duplicate key value violates unique constraint "uk_hq0ox5o2fsu70lvamkq04ht3g"
            // Detail: Key (key)=(ESA787878###COPINOE04###23383073) already exists.
            // Race condition, no doc existed and at least two messages tried to create the new document simultaneously
            const s = JSON.stringify(error)
            if (s.includes("duplicate key")) {
                this.prepareNotify(msg)
            }
        }
    }


    async prepareDocument(msg: FsmMsg): Promise<FsmResultDto> {
        const key = this.makeDocKey(msg.sender, msg.docType, msg.docNum)
        const doc = await this.docSrv.findByKey(key).then(
            (doc: FsmDoc) => this.processDocument(key, msg, doc),
            (reason: any) => this.processNewDocument(key, msg)
        )
        return doc
    }


    processDocument(key: string, msg: FsmMsg, doc: FsmDoc): Promise<FsmResultDto> {
        return undefined
    }

    processNewDocument(key: string, msg: FsmMsg): FsmResultDto {
        if (msg.msgFunction === MSG_FUNCTION.ORIGINAL) {
            const doc: FsmDoc = {...msg, id:undefined, key, currentDocVer: msg.docVer}
            this.docSrv.create(doc)
             // TODO FsmDocReceiver    
            return <FsmResultDto>{status: RESULT_STATE.SUCCESS, info: "New document created"}
        } else if (msg.msgFunction === MSG_FUNCTION.ORIGINAL || msg.msgFunction === MSG_FUNCTION.REPLACEMENT)  {
            return <FsmResultDto>{status: RESULT_STATE.ON_HOLD, info: "Message it's a replacement or cancellation and no original message has been found. it must be put on hold"}
        }
        return <FsmResultDto>{status: RESULT_STATE.UNKNOWN_DOCUMENT_FUNCTION, info: "Message function is unknown"}
    }
}


enum MSG_FUNCTION {
    CANCELLATION = "1",
    ORIGINAL = "9",
    REPLACEMENT = "5"
}

enum MSG_STATE {
    PROCESSING = "PROCESSING",
    DELIVERED = "DELIVERED",
    CONFIRMED = "CONFIRMED",
    ACKNOWLEDGED = "ACKNOWLEDGED",
    ERROR = "ERROR",
    ON_HOLD = "ON_HOLD"  
}

enum DOC_STATE {
    PROCESSING = "PROCESSING",
    DELIVERED = "DELIVERED",
    CONFIRMED = "CONFIRMED",
    ACKNOWLEDGED = "ACKNOWLEDGED",
    ERROR = "ERROR",
    ACCEPTED = "ACCEPTED",
    REJECTED = "REJECTED",
    CANCELLED = "CANCELLED"
}

enum APERAK_STATE {
    APERAK_ERROR = "963",
    APERAK_RESPONSE = "962",
    REJECTED = "27",
    ACCEPTED = "44",
    NOTIFIED = "55",
    ACKNOWLEDGED = "11"
}

enum RESULT_STATE {
    SUCCESS = "SUCCESS",
    OUT_OF_SEQUENCE = "OUT_OF_SEQUENCE", // doc already exists, so another 'original' msg is out of sequence
    ON_HOLD = "ON_HOLD",
    ERROR = "ERROR",
    UNKNOWN_DOCUMENT_FUNCTION = "UNKNOWN_DOCUMENT_FUNCTION",
    CANCELLED = "CANCELLATION",
    MISSING_MANDATORY_DATA = "MISSING_MANDATORY_DATA"
}