

function getdate(){
    let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let date = new Date ; 
    //day_string = 'Date : '+days[date.getDay()]+' '+date.getDate()+' '+toLocaleString('default', { month: 'long' });
    let day_string = 'Date : '+days[date.getDay()]+' '; 
    document.getElementById('date-js').innerText = day_string+' '+date.getDate()+' '+date.toLocaleString('default', { month: 'long' }).slice(0,3)+' '+date.getHours()+' : '+date.getMinutes();
}

getdate();


let css  = document.querySelectorAll('link[rel=stylesheet]');

function switch_on(){
    let sun = document.getElementById('sun');
    let id = null ;
    let pos = 0 ;

    clearInterval(id);
    id = setInterval(frame,5);
    function frame(){
        if(pos == 360){
            clearInterval(id);
            sun.style.color ='#fff';
            sun.classList.remove('fa-moon');
            sun.className+=' fa-sun';
            sun.removeAttribute('onclick');
            sun.setAttribute('onclick','switch_off()');

        }	else {
            pos++;
            sun.style.transform = 'rotate('+pos+'deg)';
        }			
    }

    css[1].href='main.css';
}

function switch_off(){
    let sun = document.getElementById('sun');
    let id = null ;
    let pos = 0 ;

    clearInterval(id);
    id = setInterval(frame,5);
    function frame(){
        if(pos == 360){
            clearInterval(id);
            sun.style.color = '#000';
            sun.classList.remove('fa-sun');
            sun.className+=' fa-moon';
            sun.removeAttribute('onclick');
            sun.setAttribute('onclick','switch_on()');

        }	else {
            pos++;
            sun.style.transform = 'rotate('+pos+'deg)';
        }			
    }

    css[1].href='light.css';

}

function printer(){
    var table = document.getElementById("table");
    var mywindow = window.open('', 'new div', 'height=400,width=600');
    mywindow.document.write('<html><head><title></title>');
    mywindow.document.write( "<link rel=\"stylesheet\" href=\"main.css\" type=\"text/css\" media=\"print\"/>" );
    mywindow.document.write('</head><body >');
    mywindow.document.write('<style>#table{width:100%}; </style>');
    mywindow.document.write(table.outerHTML);
    mywindow.document.close();
    mywindow.focus();
    setTimeout(function(){mywindow.print();},1000);
}

function close_box() {
    document.getElementById('box-open').style.display='none'; 
}