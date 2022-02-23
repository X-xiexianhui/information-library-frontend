import genSchema from '../genSchema.js';
import { selectOptionsSchema } from '../SingleSelect';

const viewSchema = {
    // title: '多选类型',
    type: 'array',
    uniqueItems: true,
    items: {
        type: 'string'
    }
};

export default {
    viewSchema,
    propsSchema: genSchema({
        options: {
            type: 'object',
            title: '选项',
            description: '请到选项管理修改选项值',
            required: [],
            properties: {
                schemaOptions: {
                    type: 'object',
                    properties: {
                        uniqueItems: {
                            type: 'boolean',
                            'ui:widget': 'hidden',
                            default: true
                        },
                        items: {
                            type: 'object',
                            properties: {
                                type: {
                                    type: 'string',
                                    default: 'string',
                                    'ui:hidden': true,
                                },
                                ...selectOptionsSchema,
                            }
                        },
                    }
                }
            }
        }
    }, 'array', true)
};
