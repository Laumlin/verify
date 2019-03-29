const FormData = require('form-data');

createFormData = (obj) => {
    let formData = new FormData();
    Object.keys(obj).forEach(key => {
        formData.append(key, obj[key]);
    });
    return formData
}

module.exports = createFormData