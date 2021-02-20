// SPDX-License-Identifier: MIT
pragma solidity ^0.5.16;

pragma experimental ABIEncoderV2;

/** 
 * @title Ballot
 * @dev Implements voting process along with vote delegation
 */
contract Pharmacy {
   
    struct Medicien {
        uint id; // weight is accumulated by delegation
        string name; 
        string serial;  // index of the voted proposal
        uint productiondate;
        uint expiredate;
        uint manfiactorid;
        uint parmacyid;
    }
    
    struct Order{
        uint orderid;
        uint medicienid;
        bool confirmed;
        uint manfiactorid;
        uint parmacyid;
    }
    struct User {
        uint userid; // weight is accumulated by delegation
        bool deleted;  // if true, that person already voted
        string username; 
        string password;  // index of the voted proposal
        string name;
    }
    
    User[] public users;
    
    
    Medicien[] public mediciences;
    Medicien[] public _Seachmedi;
    Order[] public orders;
    Order[] public _SearchOrders;
    uint _userid;
    uint _medid;
    uint _orderid;
    constructor()public{
        _medid=1;
        _orderid=1;
        _userid=1;
    }
    /////////////////////////////////////////////////////////Order////////////////////////////////////
    function getOrderbypharma(uint _pharmaid) public {
        delete _SearchOrders;
        for (uint i = 0; i < orders.length; i++) {
            if(orders[i].parmacyid==_pharmaid){
                _SearchOrders.push( orders[i]);
            }
        }
    }
    function getOrderbymanfi(uint _manficid) public {
        delete _SearchOrders;
        for (uint i = 0; i < orders.length; i++) {
            if(mediciences[i].manfiactorid==_manficid){
                _SearchOrders.push( orders[i]);
            }
        }
    }
    
     function addOrder(uint medicienid,uint manfiactorid,uint parmacyid)public{
            orders.push(Order({
                orderid:_orderid,
                medicienid:medicienid,
                manfiactorid:manfiactorid,
                parmacyid:parmacyid,
                confirmed:false
            }));
            _orderid++;
    }
    
    function confirmOrder(uint orderid)public{
        for (uint i = 0; i < orders.length; i++) {
            if(orders[i].orderid==orderid){
                orders[i].confirmed=true;
            }
        }
    }
    
     function returnSearchedOrderData() public view returns(Order[] memory _medicien){
         return _SearchOrders;
     }
     
     //////////////////////////////////////////////////////////medicien///////////////////////////////////////////
     function getmedicienbyPharma(uint _pharmaid) public {
        delete _Seachmedi;
        for (uint i = 0; i < mediciences.length; i++) {
            if(mediciences[i].parmacyid==_pharmaid){
                _Seachmedi.push(mediciences[i]);
            }
        }
    }
     function returnSearchedMedicienData() public view returns(Medicien[] memory _medicien){
         return _Seachmedi;
     }
    
    function getmedicien(uint id) public view returns(Medicien memory _medicien){
        for (uint i = 0; i < mediciences.length; i++) {
            if(mediciences[i].id==id){
                return(mediciences[i]);
            }
        }
        return Medicien({
            name:"null",
            id:0,
            serial:"null",
            productiondate:0,
            expiredate:0,
            manfiactorid:0,
            parmacyid:0
        });
    }
    
    function getmedicien_serial(string memory seial) public view returns(Medicien memory _medicien){
        for (uint i = 0; i < mediciences.length; i++) {
            if(uint(keccak256(abi.encodePacked((mediciences[i].serial))))==uint(keccak256(abi.encodePacked((seial))))){
                return(mediciences[i]);
            }
        }
        return Medicien({
            name:"null",
            id:0,
            serial:"null",
            productiondate:0,
            expiredate:0,
            manfiactorid:0,
            parmacyid:0
        });
    }
    
    function addmedicen(string memory _name,string memory _serial,uint profuction,uint expire,uint manfiactorid,uint pharma)public{
        Medicien memory med=getmedicien_serial(_serial);
        if(med.id==0){
            mediciences.push(Medicien({
                id:_medid,
                name:_name,
                serial:_serial,
                productiondate:profuction,
                expiredate:expire,
                manfiactorid:manfiactorid,
                parmacyid:pharma
            }));
            _medid++;
        }
    }
    
    
    
    //////////////////////////////////////////////////////User///////////////////////////////////////////
      function login(string memory  username,string memory  password) public view returns(User memory user){
        bool find=false;
        for (uint i = 0; i < users.length; i++) {
            if(uint(keccak256(abi.encodePacked((users[i].username))))==uint(keccak256(abi.encodePacked((username)))) && uint(keccak256(abi.encodePacked((users[i].password)))) ==uint(keccak256(abi.encodePacked((password)))) && users[i].deleted==false){
                find=true;
                return users[i];
            }
        }
        
        if(find==false)
            return User({
                userid:0,
                deleted:true,
                name:"null",
                username:"null",
                password:"null"
            });
    }
    
    function regiter(string memory username,string memory password,string memory name)public{
        User memory user=login(username,password);
        if(user.deleted==true){
            users.push(User({
                userid:_userid,
                deleted:false,
                name:name,
                username:username,
                password:password
            }));
            _userid++;
        }
    }
}