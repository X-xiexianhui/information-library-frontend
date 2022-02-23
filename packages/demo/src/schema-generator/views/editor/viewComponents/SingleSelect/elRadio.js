import baseRadio from './index';

const viewSchema = {
    title: '单选(Radio)',
    type: 'string',
    'ui:widget': 'RadioWidget'
};

export default {
    viewSchema,
    propsSchema: baseRadio.propsSchema
};
