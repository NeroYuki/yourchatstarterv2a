const crypto = require('crypto')
require('dotenv').config()

module.exports = function checkout(purchaseInfo) {

    const SERVER_ENDPOINT = 'http://www.yourchatstarter.xyz'
    //TODO: Move some property to a separated config.json
    const ENDPOINT = "https://sandbox.nganluong.vn:8088/nl35/checkout.php"
    let paymentInfo = {
        merchant_site_code: "50226",
        return_url: `${SERVER_ENDPOINT}/payment_success`,
        receiver: "neroyuki241@gmail.com",
        transaction_info: "Test",
        order_code: purchaseInfo.order_id,
        price: purchaseInfo.amount,
        currency: "VND",
        quantity: 1,
        tax: 0,
        discount: 0,
        fee_cal: 0,
        fee_shipping: 0,
        order_description: `A test purchase for yourchatstarter ${purchaseInfo.plan_name} subscribe`,
        buyer_info: `${purchaseInfo.name}*|*${purchaseInfo.email}*|*${purchaseInfo.phone_number}*|*${purchaseInfo.address}`,
        affiliate_code: "", 
        lang: "vi",
        secure_code: "",
        cancel_url: `${SERVER_ENDPOINT}/payment_failure`,
        notify_url: `${SERVER_ENDPOINT}/api/payment/confirm_payment`,
        time_limit: "",
    }
    
    let secure_string = paymentInfo['merchant_site_code'] 
    + ' ' + paymentInfo['return_url']
    + ' ' + paymentInfo['receiver']
    + ' ' + paymentInfo['transaction_info']
    + ' ' + paymentInfo['order_code']
    + ' ' + paymentInfo['price']
    + ' ' + paymentInfo['currency']
    + ' ' + paymentInfo['quantity']
    + ' ' + paymentInfo['tax']
    + ' ' + paymentInfo['discount']
    + ' ' + paymentInfo['fee_cal']
    + ' ' + paymentInfo['fee_shipping']
    + ' ' + paymentInfo['order_description']
    + ' ' + paymentInfo['buyer_info']
    + ' ' + paymentInfo['affiliate_code']
    + ' ' + process.env.NL_TOKEN_SB;

    paymentInfo.secure_code = crypto.createHash('md5').update(secure_string).digest('hex');

    let paymentLink = ENDPOINT + "?"
    Object.keys(paymentInfo).forEach((key) => {
        paymentLink += key + "=" + paymentInfo[key] + "&"
    }) 

    return paymentLink.slice(0, paymentLink.lastIndexOf('&'))
}
