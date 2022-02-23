import baseMulti from './index';

export default {
    viewSchema: {
        ...baseMulti.viewSchema,
        title: '多选(Select)',
        'ui:widget': 'SelectWidget'
    },
    propsSchema: baseMulti.propsSchema
};
