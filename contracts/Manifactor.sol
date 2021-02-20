pragma solidity ^0.5.16;
pragma experimental ABIEncoderV2;

/** 
 * @title Ballot
 * @dev Implements voting process along with vote delegation
 */
contract Mainifactors {
   
    struct User {
        uint userid; // weight is accumulated by delegation
        bool deleted;  // if true, that person already voted
        string username; 
        string password;  // index of the voted proposal
        string name;
    }
    
    User[] public users;
    uint _userid;
    constructor() public{
        if(users.length==0){
            users.push(User({
                userid:0,
                deleted:false,
                name:"null",
                username:"admin",
                password:"admin"
            }));
            _userid=1;
        }
    }
    
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