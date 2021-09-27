
//Đối tượng
function Validator(options) {

    var selectorRules = {}

//thực hiện validate
    function validate (inputElement,rule) {
        var errorMessage = rule.test(inputElement.value)
        var errorElement = inputElement.parentElement.querySelector(options.errMessage);

        if(errorMessage) {
            errorElement.innerHTML = errorMessage;
            inputElement.parentElement.classList.add('invalid')
        }else {
            errorElement.innerHTML = ''
            inputElement.parentElement.classList.remove('invalid')
        }
    }

    var formElement = document.querySelector(options.form)

    if(formElement) {
        formElement.onsubmit = function (e) {
            e.preventDefault();

            var isValid = true;
        }
    }

    if(formElement) {
        options.rules.forEach(function (rule) {

            var inputElement = formElement.querySelector(rule.selector)
            
            if(inputElement) {
                //Xử lí blur ra khỏi input
                inputElement.onblur = function () {
                    validate (inputElement,rule) 
                }

                //Xử li mỗi khi gõ vào
                inputElement.oninput = function () {
                    // validate (inputElement,rule)
                }


            }
        })
    }
}




//Định ngĩa các rules(điều luật)

//Nguyên tắc của các rules
//1.Khi có lỗi => Trả ra message lỗi
//2.Khi hợp lệ => undefined
Validator.isRequired = function (selector) {
    return {
        selector: selector,
        test: function (value) {
            return value.trim() ? undefined : 'Vui lòng nhập tên đầy đủ của bạn'
        }
    }
}  

Validator.isEmail = function (selector) {
    return {
        selector: selector,
        test: function (value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            return regex.test(value) ? undefined : 'Vui lòng nhập đúng email'
        }
    }
} 

Validator.minLengthPassword = function (selector, min) {
    return {
        selector: selector,
        test: function (value) {
           return value.length >= min ? undefined : `Vui lòng nhập tối thiểu ${min} kí tự`
        }
    }
} 

Validator.checkPassword = function (selector) {
    return {
        selector: selector,
        test: function (value) {
           return value === document.querySelector('#form-1 #password').value?undefined:'Nhập lại mật khẩu không đúng'
        }
    }
} 

