const fetch = require('node-fetch');
const axios = require('axios');
const config = require('../config');
const fs = require('fs');
const path = require('path');
const createFormData = require('../utils');

class Verify {
    static async verifyResult (ctx) {
        const { idcard_name, idcard_number } = ctx.request.body;
        let image = fs.createReadStream(path.resolve(__dirname, '../images/images.jpeg'));
        
        let formData =  {'api_key': config.api_key, 'api_secret': config.api_secret, 'comparison_type': '1', 'idcard_name': idcard_name, 
        'idcard_number': idcard_number, 'face_image_type': 'raw_image', 'image':  image};
        
        let data = createFormData(formData)
        
        // 方法一使用fetch
        // await fetch('http://localhost:8000/verify', { method: 'POST', body: data })
        //     .then(res => {
        //         return res.json();
        //     })
        //     .then(json => {
        //         ctx.response.body = json
        //         if (json && json.error_message) {
        //             ctx.status = 400
        //             ctx.response.body = json.error_message
        //         }
        //         ctx.response.body = json
        //     })

        // 方法二使用axios
        await axios.post(config.baseURL, data, { headers: data.getHeaders() })
            .then(res => {
                ctx.response.body = res.data
            })
            .catch(err => {
                ctx.status = 400
                ctx.response.body = err.response.data
            })

    }
}

module.exports = Verify
