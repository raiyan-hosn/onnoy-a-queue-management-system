charfeed = Array(
    'a','b','c','d','e','f','g','h','i','j','k','l','m',
    'n','o','p','q','r','s','t','u','v','w','x','y','z'
     );
function createKey(){
    var milisec= new Date().getTime();
    var str='';
    
    while(milisec!=0){
        str+= charfeed[parseInt(milisec)%26];
        milisec= parseInt(milisec)/26;  
    }
    str= addChar(str,3,"-");
    str= addChar(str,8,"-");
    
    let key="";
    for(let i=str.length-1;i>=0;i--){
        key+=str[i];
    }
    return key;
}

function addChar(str, index,char)
{
    return str.substr(0, index) + char + str.substr(index);
}
