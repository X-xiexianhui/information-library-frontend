import baseData from './index';

export default {
    viewSchema: {
        ...baseData.viewSchema,
        title: 'DateTime(字符串)',
        type: 'string'
    },
    propsSchema: baseData.propsSchema
};
