import genSchema from '../genSchema.js';

const viewSchema = {
    title: 'Array',
    type: 'array',
    items: {
        type: 'object',
        required: [],
        properties: {},
        'ui:order': []
    }
};

export default {
    viewSchema,
    propsSchema: genSchema({}, 'array')
};
