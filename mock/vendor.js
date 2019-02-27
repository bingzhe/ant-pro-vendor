import { parse } from 'url';

const vendorListDataSource = [];

for (let i = 0; i < 60; i += 1) {
    vendorListDataSource.push({
        key: i,
        vendor_name: `vendor${i}`,
        vendor_num: `VEN${i}`,
        aisle_num: 15,
        ownership: "赛领",
        vendor_status: Math.floor(Math.random() * 10) % 4 + 1,
        create_time: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
        sell_goods_type: `收货类型${i}`,
        vendor_model: `型号V${i}`
    });
}


function getVendorList(req, res, u) {
    let url = u;

    if (!url || Object.prototype.toString.call(url) !== '[object String]') {
        url = req.url; // eslint-disable-line
    }

    const params = parse(url, true).query;

    let dataSource = vendorListDataSource;

    let pageSize = 10;
    if (params.pageSice) {
        pageSize = params.pageSize * 1;
    }

    if (params.name) {
        dataSource = dataSource.filter(data => data.vendor_name.indexOf(params.name) > -1);
    }
    if (params.vendorStatus) {
        dataSource = dataSource.filter(data => parseInt(data.vendor_status, 10) === parseInt(params.vendorStatus, 10));
    }

    const result = {
        list: dataSource,
        pagination: {
            total: dataSource.length,
            pageSize,
            current: parseInt(params.currentPage, 10) || 1,
        }
    }


    return res.json(result);

}

export default {
    'GET /api/vendor': getVendorList
};