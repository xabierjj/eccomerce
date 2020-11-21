

$(document).ready(() => {
    $('form.signinForm').submit(async (event) => {
        event.preventDefault();
        console.log('suit')
        const user = $('form.signinForm').serialize()
        let res = await $.ajax({
            url: '/signup',
            type: 'post',
            data: user
        })

       

        if (res.errors) {

            $('.error').empty()
            res.errors.forEach(error => {
                switch (error.param) {
                    case 'email':
                        $('#emailError').text(error.msg)
                        break;
                    case 'password':
                        $('#passwordError').text(error.msg)
                        break;
                    case 'passwordConfirmation':
                        console.log(error.msg)
                        $('#passwordConfirmationError').text(error.msg)
                        break;
                    
                }
            });

        }



    })

})