/**
 * Created by Liu.Jun on 2019/9/29 19:01.
 */

import genSchema from '../genSchema.js';

const viewSchema = {
    title: '单选类型',
    type: 'string'
};

const selectOptionsSchema = {
    enum: {
        title: '配置选项值',
        type: 'array',
        minItems: 1,
        'ui:showIndexNumber': true,
        default: ['1', '2', '3'],
        items: {
            title: '选项值',
            type: 'string'
        },
        'ui:options': {
            addable: false,
            removable: false,
            sortable: false,
        },
        'ui:hidden': true
    },
    enumNames: {
        title: '配置选项名称',
        type: 'array',
        minItems: 1,
        'ui:showIndexNumber': true,
        default: ['一', '二', '三'],
        items: {
            title: '选项名称',
            type: 'string'
        },
        'ui:options': {
            addable: false,
            removable: false,
            sortable: false,
        },
        'ui:hidden': true
    },
};

export {
    selectOptionsSchema
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
                    properties: selectOptionsSchema,
                }
            },
        }
    })
};
