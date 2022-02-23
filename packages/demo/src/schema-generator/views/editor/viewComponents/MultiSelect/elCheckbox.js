import baseMulti from './index';

export default {
    viewSchema: {
        ...baseMulti.viewSchema,
        title: '多选(Checkbox)',
        'ui:widget': 'CheckboxesWidget'
    },
    propsSchema: baseMulti.propsSchema
};
