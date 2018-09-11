require('dotenv').config()

require('../helpers/sendEmail')('TEST', 'TEST')
.then(_=>console.log('email sent.'))
.catch(err=>console.error(err.stack))