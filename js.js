class Book {
    constructor(date,authName,email,title,type,price,lang){
        this.date     = date ;
        this.authName = authName; 
        this.email    = email ;
        this.title    = title ; 
        this.price    = price ; 
        this.type     = type ;
        this.lang     = lang ; 
    }
        info(){

                return 'The '+this.title+' book is a '+this.type+' in the '+this.lang+' witten by '+this.authName+' and published on the '+this.date+'. The price of '+this.title+' is '+this.price+' $ .' ;
        }
}



let book_list = []  ;

book_list = JSON.parse(localStorage.getItem('book_list'));
if(book_list == null){
    book_list = [] ;
}
else {
    book_list = JSON.parse(localStorage.getItem('book_list'));
}
document.getElementById('submit').addEventListener('click',()=>{
    // asign Defaults 
    document.getElementById('set-error').innerText = '';
    let title = document.getElementById('title');
    let authName = document.getElementById('Auth-name');
    let email = document.getElementById('email');
    let price = document.getElementById('price');
    let date =  document.getElementById('date');
    let radio = document.querySelector('input[name="radio"]:checked');
    let lang = document.getElementById('lang');
    let table = document.getElementById('table');



    // validation
    function validate(elem,reg){ // valdiation function
        let regEX= RegExp(reg,'g');
        if(!regEX.test(elem.value)){
            err.push('error');
            elem.style.border = '1px solid red';
        }
        else {elem.style.border ='none';}
    }

    let err = []; // push errors to list 
    validate(title,'\\S+');
    validate(authName,'\\S+');
    validate(date,'\\d{1,4}-\\d{1,2}-\\d{1,4}');
    validate(lang,'\\w');
    validate(email,'(\\S+@[aA-zZ]+\\.\\w+)');
    validate(price,'(^(\\d{1,5},\\d{1,2})$)|(^(\\d{1,5})$)');
    if(radio == null){
        err.push('error');
        alert('Please select a type');
    }
// end validatin

    if (!err.length==0){
        document.getElementById('set-error').innerText = 'Please Enter a Valid value !';
    }else {
       
        let book = new Book(date.value,authName.value,email.value,title.value,radio.value,price.value+' $',lang.value); 
        book_list.push(book);
        localStorage.setItem('book_list',JSON.stringify(book_list)); 
        // remove all the rows from the table when clicked 
        function removeRows(parent){
            count = parent.rows.length;
            for(let i = count -1 ; i> 0 ; i--){
                parent.deleteRow(i);
            }
        }
        removeRows(table); 
        
        
        function createIcons(){
            let td = document.createElement('td');
            let edit =  document.createElement('i');
            let info =  document.createElement('i');
            let trash =  document.createElement('i');
            edit.className +='fa fa-edit';
            edit.setAttribute('onclick','edit(this)')
            info.className +='fas fa-info-circle';
            info.setAttribute('onclick','info(this)')
            trash.className+='fa fa-trash';
            trash.setAttribute('onclick','remove(this)')
            td.appendChild(edit);
            td.appendChild(info);
            td.appendChild(trash);
            tr.appendChild(td);
        }
        // create new rows
        let tr ; 
        function createTd(content){
            let td = document.createElement('td');
            td.appendChild(document.createTextNode(content));
            tr.appendChild(td);
        }

            book_list.sort((a,b)=>(a.date > b.date)?1:-1); // sort the list by date
            //        Object.keys(array[0]);
            let keys = Object.keys(book_list[0]); // get the keys ['title' , 'authName']... 
            for (let book of book_list){   // 
                tr = document.createElement('tr');  // create a tr for each key
                for (let key of keys){
                    createTd(book[key]);
                }
                createIcons(); 
                table.appendChild(tr);              // append everything to table 
            }
    
        }
        console.log(book_list)

});

let edit = (element)=>{
    parent = element.parentElement.parentElement.children;
    
    for (let child of parent){
        child.setAttribute('contenteditable','true');
    }
    for (let i = 0 ; i < parent.length -1 ;i++){
        parent[i].setAttribute('contenteditable','true');
    }
    element.removeAttribute('onclick');
    element.classList.remove('fa-edit');
    element.className +=' fa-check';
    element.setAttribute('onclick','check(this)');
}

let info = (element)=>{
    document.getElementById('box-open').style.display='flex';
    let p = document.getElementById('book-information');
    parent = element.parentElement.parentElement;
    rowIndex = parent.rowIndex - 1;
    p.innerText= book_list[rowIndex].info();
}

let remove = (element)=>{
    parent = element.parentElement.parentElement;
    rowIndex = parent.rowIndex - 1;
    localStorage.removeItem(book_list[rowIndex]);
    book_list.splice(rowIndex,1);
    element.parentElement.parentElement.remove();
    book_list.sort((a,b)=>(a.date > b.date)?1:-1); // sort the list by date
    localStorage.setItem('book_list',JSON.stringify(book_list)); // synchronize the local storage again
    console.log(book_list)
}

let check = (element)=>{
    parent = element.parentElement.parentElement.children;
    
    function validateTd(regEx,str){
        let strReg = new RegExp(regEx,'g');
        if (!strReg.test(str)){
            err_list.push('error');
            console.log(str);
        }
    }

    parent = element.parentElement.parentElement;
    rowIndex = parent.rowIndex - 1;      // Get row index 
    let err_list = [] ;
    
    book_list[rowIndex].date = parent.children[0].innerText;
    book_list[rowIndex].authName = parent.children[1].innerText;
    book_list[rowIndex].email = parent.children[2].innerText;
    book_list[rowIndex].title = parent.children[3].innerText;
    book_list[rowIndex].price = parent.children[4].innerText;
    book_list[rowIndex].type = parent.children[5].innerText;
    book_list[rowIndex].lang = parent.children[6].innerText;
    validateTd('\\d{1,4}-\\d{1,2}-\\d{1,2}',book_list[rowIndex].date);
    validateTd('\\S+',book_list[rowIndex].authName);
    validateTd('(\\S+@[aA-zZ]+\\.\\w+)',book_list[rowIndex].email);
    validateTd('\\S+',book_list[rowIndex].title);
    validateTd('\\d{1,5}',book_list[rowIndex].price);
    validateTd('\\w',book_list[rowIndex].type);
    validateTd('\\w',book_list[rowIndex].lang);
    if(!err_list.length==0){
        alert('Plase Fill all the inputs');
    }else {
        for (let child of parent.children){
            child.setAttribute('contenteditable','false')
        } 
        element.removeAttribute('onclick');
        element.classList.remove('fa-check');
        element.className +=' fa-edit';
        element.setAttribute('onclick','edit(this)');
        localStorage.setItem('book_list',JSON.stringify(book_list)); // synchronize the local storage again
        book_list.sort((a,b)=>(a.date > b.date)?1:-1); // sort the list by date
    }
}

