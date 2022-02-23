import baseData from './index';

export default {
    viewSchema: {
        ...baseData.viewSchema,
        title: 'Date(字符串)',
        type: 'string'
    },
    propsSchema: baseData.propsSchema
};
