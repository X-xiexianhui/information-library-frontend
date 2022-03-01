import { VXETable } from 'vxe-table';

export async function removeEvent(ref) {
    const selectRecords = ref.getCheckboxRecords();
    if (selectRecords.length) {
        const type = await VXETable.modal.confirm('您确定要删除选中的数据吗?');
        if (type === 'confirm') {
            await ref.removeCheckboxRow();
        }
    } else {
        await VXETable.modal.message({ content: '请至少选择一条数据', status: 'error' });
    }
}
