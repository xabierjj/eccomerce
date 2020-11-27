$(document).ready(async () => {

  $('form.productForm').submit(async function (e) {
    e.preventDefault()
    const productId = $(this).find('button[type="submit"]').attr('id');
    const formData = new FormData();
    formData.append('name', $('#name').val())
    formData.append('precio', $('#precio').val())
    formData.append('imagen', $('#imagen')[0].files[0])




    const result = await $.ajax({

      url: `/admin/products/${productId}/edit`,
      data: formData,
      type: 'post',
      enctype: 'multipart/form-data',
      processData: false,  // Important!
      contentType: false,
      cache: false,


    })

    console.log(result)

  })

  $('.products').on('click', '.button-edit', async function () {
    console.log()
    const productId = $(this).parent().parent().attr('id');



    let productInfo = await $.ajax({
      url: `/admin/products/${productId}/edit`
    })

    $("#name").val(productInfo.name)
    $("#precio").val(productInfo.precio)
    $('button[type="submit"]').attr('id', productInfo.id)

    $(".modal").modal();
    console.log(productInfo)
  })

  $('.products').on('click', '.button-borrar', async function () {
    
    const productId = $(this).parent().parent().attr('id');
    console.log(productId)
    let productInfo = await $.ajax({
      url: `/admin/products/${productId}/delete`,
      type:'post'
    })



  })



  let res = await $.ajax({
    url: '/admin/products/get',
    type: 'get',


  })

  console.log(res)

  if (res) {

    const renderedProducts = res.map(product => {
      return `
            <tr id ='${product.id}'>
              <td>${product.name}</td>
              <td>${product.precio}</td>
              <td>
               
                  <button class="button-edit" >
                    Editar
                  </button>
               
              </td>
              <td>
                <button class="button-borrar" href="">Borrar</button>
              </td>
            </tr>
          `
    }).join('')

    console.log(renderedProducts)

    $(".products").append(renderedProducts)

  }
})



