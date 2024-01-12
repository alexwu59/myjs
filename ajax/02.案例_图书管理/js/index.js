/**
 * 目标1：渲染图书列表
 *  1.1 获取数据
 *  1.2 渲染数据
 */
let bookTable = document.querySelector("tbody");
window.addEventListener('DOMContentLoaded',function () {


    render()
})

function render() {
    axios({
        url: "https://hmajax.itheima.net/api/books",
        params: {
            creator: "a"
        }
    }).then(res => {
        let {data : books} = res.data
        bookTable.innerHTML = buildBooks(books)
    }).catch(error => {
        console.log(error.response)
    })
}


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

let saveBtn = document.querySelector(".add-btn");
let formDiv = document.querySelector(".add-form");

saveBtn.addEventListener('click',function () {
    let bookData = serialize(formDiv,{hash: true,empty:true});
    bookData.creator = 'a'
    save(bookData)

})
let add = document.querySelector(".add-modal");
const myModalAlternative = new bootstrap.Modal(add)
function save(bookData) {
    axios({
        url: "https://hmajax.itheima.net/api/books",
        method: "POST",
        data :bookData
    }).then(r => {
        if (r.data.message === '添加图书成功') {

            myModalAlternative.hidden = true
            render()
        } else {
            alert("失败:" + r.data.message)
        }
    }).catch(e => {
        alert("失败:" + e.response)
    })
}

let deleteBtn = document.querySelector(".list");
deleteBtn.addEventListener('click',function (e) {
    if (e.target.tagName === 'div' || e.target.className === 'del') {
        let childNode = e.target.parentNode.parentNode.children[0];
        del(childNode.innerHTML)
    }
})

function del(id) {
    axios({
        url: "https://hmajax.itheima.net/api/books/" + id,
        method: "DELETE",

    }).then(r => {
        if (r.data.message === '删除图书成功') {
            render()
        } else {
            alert("失败:" + r.data.message)
        }
    }).catch(e => {
        alert("失败:" + e.response)
    })
}