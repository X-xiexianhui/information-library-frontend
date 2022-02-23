import genSchema from '../genSchema.js';

const viewSchema = {
    title: '是否选择(Checkbox)',
    type: 'boolean',
    'ui:widget': 'el-checkbox'
};

export default {
    viewSchema,
    propsSchema: genSchema({
        options: {
            type: 'object',
            title: '选项',
            properties: {
                uiOptions: {
                    type: 'object',
                    properties: {
                        label: {
                            title: '标签文案',
                            type: 'string',
                            default: '是否'
                        }
                    }
                }
            }
        }
    })
};
