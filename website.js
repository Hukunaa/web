let button = document.getElementById("mint-button");
let account = document.getElementById('account-text');
account.innerHTML = "Connect Metamask";
let accountWeb3;
let web3;
var contract;
const init = async() =>
{
account.innerHTML = "Connecting to Metamask";
let provider = window.ethereum;
if(typeof provider !== 'undefined')
{
    account.innerHTML = "Ethereum provider is installed!";
    web3 = new Web3(provider);
    const accs = await ethereum.request({method:'eth_requestAccounts'});
    accountWeb3 = accs[0];
    //web3.eth.getAccounts().then(e => accountWeb3 = e[0]);
    account.innerHTML = accountWeb3;
    //web3.eth.getAccounts().then(e => accountWeb3 = e[0]);
    provider.on('accountsChanged', function(accounts)
                {
    const accs = ethereum.request({method:'eth_requestAccounts'});
    accountWeb3 = accs[0];
    account.innerHTML = accountWeb3;
    })
    
    let url = "https://ipfs.io/ipfs/QmPaHTgR6SWVnK12uXNmFobEX542jimGNVy5p9kTsopbcU?filename=jsonSpatiovery.json";
    fetch(url).then(res => res.json()).then((out) => 
                                            {
    console.log(out.abi);
    const networkID = web3.eth.net.getId();
    //contract = new web3.eth.Contract(out.abi, out.networks[networkID].address);
    contract = new web3.eth.Contract(out.abi, '0x57A352B88863e5ee6f57FbDb6dbA05439A60Bc3c');
    //console.log(contract.address);
    }).catch(err => {console.log(err);});
    
    httpGetAsync('https://sheets.googleapis.com/v4/spreadsheets/1TFSXPhOoIvrK_F5A9AxtFOUPZQMhOKV15snlKzmcebY/values/A1:A4000?key=AIzaSyD_L9vb_20lmWOzRndCwIKCmrm8O0-Dz18',httpResponse)
}
else
{
    account.innerHTML = "Ethereum provider is not installed!";
}
}

function httpResponse(text)
{
let foundUser = -1;
let data = text.toUpperCase();
foundUser = data.search(accountWeb3.toUpperCase());
console.log("Data from google retrieved");
let x = document.getElementById("whitelist-form");
let y = document.getElementById("whitelist-valid");
if(foundUser != -1)
{
    x.style.display = "none";
}
else
{
    x.style.display = "block";
}
}

function httpGetAsync(theUrl, callback)
{
var xmlHttp = new XMLHttpRequest();
xmlHttp.onreadystatechange = function() 
{ 
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
        callback(xmlHttp.responseText);
}
xmlHttp.open("GET", theUrl, true); // true for asynchronous 
xmlHttp.send(null);
}
//button.onClick = addToPresale();
async function addToPresale()
{
contract.methods.addPresaler(accountWeb3).send({from: accountWeb3});
}
/*button.addEventListener('click', (event) => 
{
event.preventDefault();
addToPresale();
});*/
init();
  
(function () {

    var deadline = '2021/12/08 14:30';

    function pad(num, size) {
        var s = "0" + num;
        return s.substr(s.length - size);
    }

    // fixes "Date.parse(date)" on safari
    function parseDate(date) {
        const parsed = Date.parse(date);
        if (!isNaN(parsed)) return parsed
        return Date.parse(date.replace(/-/g, '/').replace(/[a-z]+/gi, ' '));
    }

    function getTimeRemaining(endtime) {
        let total = parseDate(endtime) - Date.parse(new Date())
        let seconds = Math.floor((total / 1000) % 60)
        let minutes = Math.floor((total / 1000 / 60) % 60)
        let hours = Math.floor((total / (1000 * 60 * 60)) % 24)
        let days = Math.floor(total / (1000 * 60 * 60 * 24))

        return { total, days, hours, minutes, seconds };
    }

    function clock(id, endtime) {
        let days = document.getElementById(id + '-days')
        let hours = document.getElementById(id + '-hours')
        let minutes = document.getElementById(id + '-minutes')
        let seconds = document.getElementById(id + '-seconds')

        var timeinterval = setInterval(function () {
            var time = getTimeRemaining(endtime);

            if (time.total <= 0) {
                clearInterval(timeinterval);
            } else {
                days.innerHTML = pad(time.days, 2);
                hours.innerHTML = pad(time.hours, 2);
                minutes.innerHTML = pad(time.minutes, 2);
                seconds.innerHTML = pad(time.seconds, 2);
            }
        }, 1000);
    }

    clock('js-clock', deadline);
})();
