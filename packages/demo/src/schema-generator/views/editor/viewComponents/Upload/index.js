import genSchema from '../genSchema.js';

const viewSchema = {
    title: '单文件',
    type: 'string',
    'ui:widget': 'UploadWidget',
};
export default {
    viewSchema,
    propsSchema: genSchema({
        options: {
            type: 'object',
            title: '选项',
            required: [],
            properties: {
                uiOptions: {
                    type: 'object',
                    required: ['action'],
                    properties: {
                        btnText: {
                            title: '上传按钮文案',
                            type: 'string'
                        }
                    }
                }
            }
        }
    })
};
