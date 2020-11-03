import { Model, STRING, BOOLEAN, UUIDV4, UUID  } from "sequelize";
import sequelize from './_index'
import { Language } from './Languages'

export class AppUser extends Model {

}

export class AppUserModel {
    id: string
    name: string
    password: string
    isDeleted: boolean
    createdAt: Date
    updatedAt: Date
}

AppUser.init(
    {
        id: {
            type: UUID,
            primaryKey: true,
            defaultValue: UUIDV4
        },
        name: STRING(50),
        password: STRING(50),
        languageId: UUID,
        isDeleted: {
            type: BOOLEAN,
            defaultValue: false
        }
    },
    { sequelize, modelName: "AppUser" }
)

AppUser.belongsTo(Language, {
    foreignKey: "languageId"
})

