const get_stockmarket = require('../../info_module/get_stockmarket')

module.exports.run = (entities, option, context, isLocal = false) => {
    const permitted_tier = ["standard", "premium", "lifetime"]
    return new Promise(async (resolve, reject) => {
        let response = ""
        if (option.isPaid && permitted_tier.includes(option.plan)) {
            if (isLocal) {
                let stock_code = entities.find((val) => val.entity === "stock_code")
                if (!stock_code) {
                    response = "Bạn có thể nói rõ mã cổ phiếu là gì được không?"
                }
                else {
                    let code = stock_code.option
                    await get_stockmarket(code)
                        .then(
                        (stock_res) => {response = `Mã cổ phiếu ${code} đang được niêm yết ở mức ${stock_res.stockIndex} điểm ở sàn NASDAQ nhé`},
                        (e) => response = `Mình không thể tìm được mã cổ phiếu này :(`)
                }
            }
            else {
                if (!entities['stock_code:stock_code']) {
                    response = "Bạn có thể nói rõ mã cổ phiếu là gì được không?"
                }
                else {
                    let code = entities['stock_code:stock_code'][0].body
                    await get_stockmarket(code)
                        .then(
                        (stock_res) => {response = `Mã cổ phiếu ${code} đang được niêm yết ở mức ${stock_res.stockIndex} điểm ở sàn NASDAQ nhé`},
                        (e) => response = `Mình không thể tìm được mã cổ phiếu này :(`)
                }   
            }
        }
        else {
            response = "Chức năng này là chỉ dành cho khách hàng hạng tiêu chuẩn trở lên nhé :D"
        }
        resolve([response, context, {}])
    })
}


module.exports.name = "ask_stock"

module.exports.isEnable = true