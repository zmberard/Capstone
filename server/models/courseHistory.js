// Load model
const Model = require('./base')

// A little different syntax than the other models
// does the same thing within the db
class CourseHistory extends Model{
    static get tableName(){
        return 'coursehistory'
    }

    static get idColumn() {
        return 'id'
    }

    static get jsonSchema(){
        return{
            type: 'object',
            required: ['name', 'hours', 'grade', 'semester', 'complete']
        }
    }

    static get relationMappings(){
        const User = require('./user')

        return {
            events: {
                relation: Model.HasManyRelation,
                modelClass: Event,
                join: {
                    from: 'coursehistory.id',
                    to: 'users.id'
                },
            },
        }
    }
}