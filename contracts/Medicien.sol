// SPDX-License-Identifier: MIT
pragma solidity ^0.5.16;

pragma experimental ABIEncoderV2;

/** 
 * @title Ballot
 * @dev Implements voting process along with vote delegation
 */
contract Mediciences {
   
    struct Medicien {
        uint id; // weight is accumulated by delegation
        string name; 
        string serial;  // index of the voted proposal
        uint productiondate;
        uint expiredate;
        uint manfiactorid;
        bool delivired;
    }
    
    Medicien[] public mediciences;
    Medicien[] public _Searchmedicien;
    uint _id;
    constructor()public{
        _id=1;
    }
    
    function getmedicienbymanf(uint _manfiactorid) public {
        delete _Searchmedicien;
        for (uint i = 0; i < mediciences.length; i++) {
            if(mediciences[i].delivired==false&&mediciences[i].manfiactorid==_manfiactorid){
                _Searchmedicien.push( mediciences[i]);
            }
        }
    }
     function returnSearchedData() public view returns(Medicien[] memory _medicien){
         return _Searchmedicien;
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
            delivired:false
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
            delivired:false
        });
    }
    
    function addmedicen(string memory _name,string memory _serial,uint profuction,uint expire,uint manfiactorid)public{
        Medicien memory med=getmedicien_serial(_serial);
        if(med.id==0){
            mediciences.push(Medicien({
                id:_id,
                name:_name,
                serial:_serial,
                productiondate:profuction,
                expiredate:expire,
                manfiactorid:manfiactorid,
                delivired:false
            }));
            _id++;
        }
    }
}