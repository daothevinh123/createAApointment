
var jwt = require('jsonwebtoken');
const {conn , sql} = require('../sql/connect.js')
const Register = require('../model/sqlModel/register.model.js')
const model = new Register;

exports.Register =async  (req , res) => {
  model.createRegister(req.body , function(err , data) {
  
     if(data==='') {
       res.send({result:data , error:err , status:'404' })
     }
    else {
      
      res.send({result:data , error:err  , status:'ok'})
    }
  })



}