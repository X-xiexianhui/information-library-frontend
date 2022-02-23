import { formatFormLabelWidth } from '../../common/editorData';


const schema = {
    type: 'object',
    required: [],
    properties: {
        formProps: {
            title: '表单配置',
            type: 'object',
            required: ['formName', 'dataBase'],
            properties: {
                dataBase: {
                    title: '数据库',
                    type: 'string',
                    enum: [],
                    enumNames: []
                },
                formName: {
                    title: '表单名称',
                    type: 'string',
                },
                layoutColumn: {
                    title: '布局',
                    type: 'number',
                    default: 1,
                    enum: [
                        1,
                        2,
                        3
                    ],
                    enumNames: [
                        '一行一列',
                        '一行二列',
                        '一行三列'
                    ],
                    'ui:widget': 'SelectWidget'
                },
                labelPosition: {
                    title: '标签对其方式',
                    type: 'string',
                    default: 'top',
                    enum: [
                        'left',
                        'right',
                        'top'
                    ],
                    enumNames: [
                        'Left',
                        'Right',
                        'Top'
                    ],
                },
                labelWidth: {
                    title: '标签宽度',
                    type: 'number',
                    default: 25, // 4倍像素
                    'ui:widget': 'ElSlider',
                    'ui:options': {
                        formatTooltip(val) {
                            return formatFormLabelWidth(val);
                        }
                    }
                },
                labelSuffix: {
                    title: '表单项后缀',
                    type: 'string',
                    default: ':'
                }
            }
        },
        formFooter: {
            title: '表单Footer配置',
            type: 'object',
            properties: {
                show: {
                    type: 'boolean',
                    title: '是否显示底部',
                    default: true
                },
                okBtn: {
                    type: 'string',
                    title: '确认按钮文字',
                    default: '保存'
                },
                cancelBtn: {
                    type: 'string',
                    title: '取消按钮文字',
                    default: '取消'
                }
            }
        }
    }
};

async function helloAsync() {
    // eslint-disable-next-line no-return-await
    return await new Promise(resolve => setTimeout(() => resolve(['1', '2', '3'])));
}

helloAsync().then((res) => {
    schema.properties.formProps.properties.dataBase.enum = res;
    schema.properties.formProps.properties.dataBase.enumNames = res;
});

export default schema;
