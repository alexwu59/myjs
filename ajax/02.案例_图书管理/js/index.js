/**
 * 目标1：渲染图书列表
 *  1.1 获取数据
 *  1.2 渲染数据
 */

window.addEventListener('DOMContentLoaded',function () {

    let bookTable = document.querySelector("tbody");
    axios({
        url: "https://hmajax.itheima.net/api/books",
        params: {
            creator: "d"
        }
    }).then(res => {
        let {data : books} = res.data
        bookTable.innerHTML = buildBooks(books)
    }).catch(error => {
        console.log(error.response)
    })
})


function buildBooks(books) {
   return  books.map(b => {
       return `<tr><td>${b.id}</td>
          <td>${b.bookname}</td>
          <td>${b.author}</td>
          <td>${b.publisher}</td>
          <td>
            <span class="del">删除</span>
            <span class="edit">编辑</span>
          </td></tr>`
    }).join("")
}