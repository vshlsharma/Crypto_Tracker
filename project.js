const form=document.querySelector('#search');
const res=document.querySelector('#result');
var upd;
form.addEventListener('submit',(e)=>{
   e.preventDefault();
   if(upd){
    clearTimeout(upd);
}
    const ctype=form.elements.Cointype.value;
    fetchPrice(ctype);
});
const fetchPrice = async(ctype) =>{
    const r = await axios.get(`https://api.coinstats.app/public/v1/coins/${ctype}?currency=INR`);
    const price = r.data.coin.price;
    const vol = r.data.coin.volume;
    const change = r.data.coin.priceChange1d;
    const coin = r.data.coin.name;
    const curr='INR';
    var col= "green";
    if(change<0){
        col="red";
    }
    res.innerHTML= `<thead><tr class="bg-primary" style="background-color:blue; color:white; font-weight:700">
    <td>
        Property
    </td>
    <td>
        value
    </td>
</tr>
</thead>
<tbody>
<tr>
    <td>
    ${coin}
    </td>
    <td style="color:${col};" > <span style="font-size: 1.3em;">${price} </span>${curr}</td>
</tr>
<tr>
    <td>
        Volume
    </td>
    <td>${vol}</td>
</tr>
<tr>
    <td>
        Change
    </td>
    <td style="color:${col};">${change} ${curr}</td>
</tr></tbody>`;

upd = setTimeout(()=>fetchPrice(ctype),10000);
};


