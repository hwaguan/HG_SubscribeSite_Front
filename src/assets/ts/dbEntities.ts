import { defineStore } from 'pinia'

export const dbEntities = defineStore({
    id: 'dbEntities',
    state: () => ({
        adminManagerEntity: {
            admID: Number,
            admName: String,
            admCorp: String,
            admDep: String,
            admMail: String,
            admExt: String,
            admAccount: String,
            admPassword: String,
            admGroup: Number,
            admAuthority: String,
            admEnabled: Number,
            admCreateDate: String,
            admLastModify: String
        },
    })
})