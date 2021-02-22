// SPDX-License-Identifier: MIT
pragma solidity ^0.5.16;

pragma experimental ABIEncoderV2;

/**
 * @title Ballot
 * @dev Implements voting process along with vote delegation
 */
contract Mediciences {
    struct Medicien {
        uint256 id; // weight is accumulated by delegation
        string name;
        string serial; // index of the voted proposal
        uint256 productiondate;
        uint256 expiredate;
        uint256 manfiactorid;
        bool delivired;
        bool ordered;
    }

    Medicien[] public mediciences;
    Medicien[] public _Searchmedicien;
    uint256 _id;

    constructor() public {
        _id = 1;
    }

    function getmedicienbymanf(uint256 _manfiactorid) public {
        delete _Searchmedicien;
        for (uint256 i = 0; i < mediciences.length; i++) {
            if (
                mediciences[i].manfiactorid == _manfiactorid
            ) {
                _Searchmedicien.push(mediciences[i]);
            }
        }
    }

    function get_nonorderd_nonconfirmed_medicien() public {
        delete _Searchmedicien;
        for (uint256 i = 0; i < mediciences.length; i++) {
            if (
                mediciences[i].delivired == false &&mediciences[i].ordered == false
            ) {
                _Searchmedicien.push(mediciences[i]);
            }
        }
    }

    function returnSearchedData()
        public
        view
        returns (Medicien[] memory _medicien)
    {
        return _Searchmedicien;
    }

    function getmedicien(uint256 id)
        public
        view
        returns (Medicien memory _medicien)
    {
        for (uint256 i = 0; i < mediciences.length; i++) {
            if (mediciences[i].id == id) {
                return (mediciences[i]);
            }
        }
        return
            Medicien({
                name: "null",
                id: 0,
                serial: "null",
                productiondate: 0,
                expiredate: 0,
                manfiactorid: 0,
                delivired: false,
                ordered:false
            });
    }

    function getmedicien_serial(string memory seial)
        public
        view
        returns (Medicien memory _medicien)
    {
        for (uint256 i = 0; i < mediciences.length; i++) {
            if (
                uint256(keccak256(abi.encodePacked((mediciences[i].serial)))) ==
                uint256(keccak256(abi.encodePacked((seial))))
            ) {
                return (mediciences[i]);
            }
        }
        return
            Medicien({
                name: "null",
                id: 0,
                serial: "null",
                productiondate: 0,
                expiredate: 0,
                manfiactorid: 0,
                delivired: false,
                ordered:false
            });
    }

    function addmedicen(
        string memory _name,
        string memory _serial,
        uint256 profuction,
        uint256 expire,
        uint256 manfiactorid
    ) public {
        Medicien memory med = getmedicien_serial(_serial);
        if (med.id == 0) {
            mediciences.push(
                Medicien({
                    id: _id,
                    name: _name,
                    serial: _serial,
                    productiondate: profuction,
                    expiredate: expire,
                    manfiactorid: manfiactorid,
                    delivired: false,
                    ordered:false
                })
            );
            _id++;
        }
    }

    function OrderMedicien(uint256 _medid) public {
        for (uint256 i = 0; i < mediciences.length; i++) {
            if (mediciences[i].ordered == false) {
                mediciences[i].ordered = true;
            }
        }
    }
    function deleiverMedicien(uint256 _medid) public {
        for (uint256 i = 0; i < mediciences.length; i++) {
            if (mediciences[i].delivired == false) {
                mediciences[i].delivired = true;
            }
        }
    }
}
