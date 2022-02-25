/**
 * Created by Liu.Jun on 2019/9/29 18:58.
 */

// 基础组件
import componentPackInput from '../viewComponents/Input';
import componentPackColor from '../viewComponents/Color';
import componentPackInputNumber from '../viewComponents/InputNumber';
import componentPackSlider from '../viewComponents/Slider';

// 是否 Boolean
import componentPackBooleanSwitch from '../viewComponents/SelectBoolean/elSwitch';
import componentPackBooleanCheckbox from '../viewComponents/SelectBoolean/elCheckbox';
import componentPackBooleanSelect from '../viewComponents/SelectBoolean/elSelect';
import componentPackBooleanRadio from '../viewComponents/SelectBoolean/elRadio';

// 单多选
import componentPackRadio from '../viewComponents/SingleSelect/elRadio';
import componentPackRadioSelect from '../viewComponents/SingleSelect/elSelect';

import componentPackMultiSelect from '../viewComponents/MultiSelect/elSelect';
import componentPackMultiCheckbox from '../viewComponents/MultiSelect/elCheckbox';

// 上传
import componentPackUpload from '../viewComponents/Upload';
import componentPackMultiUpload from '../viewComponents/MultiUpload';

// 时间 日期
import componentPackTime from '../viewComponents/Time';

// 日期
import componentPackDateString from '../viewComponents/Date/string';

// 日期时间
import componentPackDateTimeString from '../viewComponents/DateTime/string';


// 布局 Object Array
import componentPackObject from '../viewComponents/Object';
import componentPackArray from '../viewComponents/Array';

/**
 * hidden 隐藏，不显示在工具栏
 * maxNum Number 最大可配置数
 * topDisplay Bool 最顶部显示
 * bottomDisplay Bool 最底部显示
 * onlyCanConfig Bool 是否只能配置数据，不能删除 copy
 * @type {*[]}
 */
const tools = [
    {
        groupName: '布局组件',
        componentList: [{
            title: 'Object',
            btnClass: 'w100',
            componentPack: componentPackObject
        }, {
            title: 'Array',
            btnClass: 'w100',
            componentPack: componentPackArray
        }],
        hidden: true
    },
    {
        groupName: '基础组件',
        componentList: [{
            title: '输入框',
            componentPack: componentPackInput
        }, {
            title: '数字(slider)', // 这里顺便必须在 componentPackInputNumber 前，导入匹配的时候优先匹配
            componentPack: componentPackSlider
        }, {
            title: '数字输入框',
            componentPack: componentPackInputNumber
        }, {
            title: '颜色选择',
            componentPack: componentPackColor
        }]
    },
    {
        groupName: '是否Bool',
        componentList: [{
            title: '是否(Switch)',
            componentPack: componentPackBooleanSwitch
        }, {
            title: '是否(Checkbox)',
            componentPack: componentPackBooleanCheckbox
        }, {
            title: '是否(Select)',
            componentPack: componentPackBooleanSelect
        }, {
            title: '是否(Radio)',
            componentPack: componentPackBooleanRadio
        }]
    },
    {
        groupName: '单选/多选',
        componentList: [{
            title: '单选(Radio)',
            componentPack: componentPackRadio
        }, {
            title: '单选(Select)',
            componentPack: componentPackRadioSelect
        }, {
            title: '多选(Select)',
            componentPack: componentPackMultiSelect
        }, {
            title: '多选(Checkbox)',
            componentPack: componentPackMultiCheckbox
        }]
    },
    {
        groupName: '文件上传',
        componentList: [{
            title: '单文件',
            componentPack: componentPackUpload
        }, {
            title: '多个文件',
            componentPack: componentPackMultiUpload
        }]
    },
    {
        groupName: '时间日期',
        componentList: [{
            title: 'Date(字符串)',
            componentPack: componentPackDateString
        }, {
            title: 'DateTime(字符串)',
            componentPack: componentPackDateTimeString
        }, {
            title: 'Time(字符串)',
            componentPack: componentPackTime
        }]
    }
];

export default tools;
