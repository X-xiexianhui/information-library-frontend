import genSchema from '../genSchema.js';

const viewSchema = {
    title: 'Object',
    type: 'object',
    required: [],
    properties: {},
    'ui:order': []
};

export default {
    viewSchema,
    propsSchema: genSchema({}, 'object')
};
