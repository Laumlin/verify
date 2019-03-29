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

        // let data = new FormData();
        // data.append('api_key', config.api_key)
        // data.append('api_secret', config.api_secret)

        // let data = {
        //     api_key: 'TszcN4_TbA6GZIZrB7QwHHpUtZlk_VdT',
        //     api_secret: 't7mGwAocrnyQlUqIlZZzGKSZISu54oeQ'
        // }
 
        await axios.post(config.baseURL, data, { headers:{'Content-Type': 'multipart/form-data'}})
            .then(res => {
                console.log('ok')
                ctx.response.body = res.data;
            })
            .catch(err => {
                // console.log(err)
                ctx.response.body = err.response.data.error_message
            })

    }
}

module.exports = Verify
