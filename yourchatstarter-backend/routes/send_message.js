const express = require('express')
const router = express.Router()
const db = require('../database/database_interaction')
const chatbot = require('../chatbot_engine')

function checkIsPaid(token) {
    return new Promise(async (resolve, reject) => {
        if (!token) {
            resolve(false)
            return
        }
        let tokenQuery = {
            token: token
        }

        let query_result = await db.queryRecord("session", tokenQuery)
        if (query_result.length == 0) {
            resolve(false)
            return
        }
        else {
            if (query_result[0].is_paid) resolve(true)
            else resolve(false)
            return
        }
    })
}

router.post('/', async (req, res) => {
    let input = req.body;
    let message = input.post;
    let context = input.context;
	let token = (input.token)? input.token : "";

    let option = {
      isPaid: false
    }

    option.isPaid = await checkIsPaid(token)
    let response, updated_context;
    [response, updated_context] = await chatbot.get_response(message, option, context)
    res.send({
      response: response,
      context: updated_context
    });
});

module.exports = router