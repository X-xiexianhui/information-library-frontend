import baseRadio from './index';

const viewSchema = {
    title: '单选(Select)',
    type: 'string',
    'ui:widget': 'SelectWidget'
};

export default {
    viewSchema,
    propsSchema: baseRadio.propsSchema
};
