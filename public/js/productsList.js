$(document).ready(async () => {



    $('.products').on('click','.button-edit',  async function()  {
        console.log()
        const productId = $(this).attr('id');

        let productInfo = await $.ajax({
            url:`/admin/products/${productId}/edit`
        })

        console.log(productInfo)
    })


    let res = await $.ajax({
        url: '/admin/products/get',
        type: 'get',


    })

    console.log(res)

    if (res) {

        const renderedProducts = res.map(product => {
            return `
            <tr>
              <td>${product.name}</td>
              <td>${product.precio}</td>
              <td>
               
                  <button class="button-edit" id ='${product.id}'>
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