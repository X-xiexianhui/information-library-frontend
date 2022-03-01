import { VXETable } from 'vxe-table';

export async function revertEvent(ref) {
    const type = await VXETable.modal.confirm('您确定要还原数据吗?');
    if (type === 'confirm') {
        ref.revertData();
    }
}
