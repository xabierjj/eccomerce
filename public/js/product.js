$(document).ready(()=> {


    $('form.productForm').submit(async (event) => {
        event.preventDefault();
      
        const product = $('form.productForm').serialize()
        let res = await $.ajax({
            url: '/admin/products/new',
            type: 'post',
            data: product
        })

  

        if (res.errors) {
            console.log(1)
            $('.error').empty()
            res.errors.forEach(error => {
                switch (error.param) {
                    case 'name':
                        $('#emailError').text(error.msg)
                        break;
                    case 'precio':
                        $('#passwordError').text(error.msg)
                        break;
                   
                    
                }
            });

        }



    })
})