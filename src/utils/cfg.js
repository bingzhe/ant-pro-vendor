/**
 * 售货机设备状态
 */
export const VENDOR_STATUS = {
    NORMAL: 1,
    DAMAGE: 2,
    LACK: 3,
    SHORT: 4,
    code: {
        1: "正常",
        2: "故障",
        3: "缺货",
        4: "断货",
    },
    toString(code) {
        code = parseInt(code || 0, 10);
        return this.code[code] || `未知[${code}]`;
    }
}