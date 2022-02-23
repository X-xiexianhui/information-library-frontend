import baseData from './index';

export default {
    viewSchema: {
        ...baseData.viewSchema,
        title: 'Date范围(字符串)',
        items: {
            type: 'string'
        }
    },
    propsSchema: baseData.propsSchema
};
