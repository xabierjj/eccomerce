$(document).ready(() => {
    $('form.logInForm').submit(async (event) => {
        event.preventDefault();
      
        const user = $('form.logInForm').serialize()
        let res = await $.ajax({
            url: '/login',
            type: 'post',
            data: user
        })

  

        if (res.errors) {
            console.log(1)
            $('.error').empty()
            res.errors.forEach(error => {
                switch (error.param) {
                    case 'email':
                        $('#emailError').text(error.msg)
                        break;
                    case 'password':
                        $('#passwordError').text(error.msg)
                        break;
                   
                    
                }
            });

        }

        if (res.error===false) {
            location.href = '/admin/products'
        }



    })

})