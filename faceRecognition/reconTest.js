let recon = require('./recon')

let url = 'http://ip-vm-wg4.showroom.local/nxn/workgroup/preview?path=file%3A%2F%2FIP-VM-WG4%2FWG_Database%24%2FAvidWG%2F_PropertyStore%2F2017-214%2F64365_StreamedProperty_Screenshot1073806343-0.prp&width=640&height=360';

recon(url).then((d)=>{
    console.log(d)
}).catch((d)=>{
    console.log(d)
})