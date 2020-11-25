$(document).ready(() => {


    $('form.productForm').submit(async (event) => {
        event.preventDefault();

        var formData = new FormData();
        formData.append('name', $('#name').val())
        formData.append('precio', $('#precio').val())
        formData.append('imagen', $('#imagen')[0].files[0])

        
        let res = await $.ajax({
            url: '/admin/products/new',
            type: 'post',
            enctype: 'multipart/form-data',
            processData: false,  // Important!
            contentType: false,
            cache: false,
            data: formData

        })



        if (res.errors) {
            console.log(1)
            $('.error').empty()
            res.errors.forEach(error => {
                switch (error.param) {
                    case 'name':
                        $('#nameError').text(error.msg)
                        break;
                    case 'precio':
                        $('#precioError').text(error.msg)
                        break;
                    case 'precio':
                        $('#precioError').text(error.msg)
                        break;

                }
            });

        }



    })

    console.log(1)
})