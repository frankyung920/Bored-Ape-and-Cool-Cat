const Contract = require('web3-eth-contract');
Contract.setProvider(process.env.INFURA);

const BAYCAbi = require('../abi/BAYC.json');
const COOLAbi = require('../abi/COOL.json');
const MultiCallAbi = require('../abi/MultiCall.json');
const { BAYC, COOL } = require('../constant')

BAYCContract = new Contract(BAYCAbi, process.env.BAYC_CONTRACT_ADDRESS);
COOLContract = new Contract(COOLAbi, process.env.COOL_CONTRACT_ADDRESS);
MultiCallContract = new Contract(MultiCallAbi, process.env.MULTI_CALL_CONTRACT_ADDRESS);

const getTotalSupply = async(contractObj) => {
    const { contract } = contractObj;
    const supply = await contract.methods.totalSupply().call();
    return supply;
}

const getOwnerListFromContract = async(contractObj, supply) => {
    const { contract, address } = contractObj;
    let id = 0;
    let ownerList = [];
    let multiCallArr = [];
    while (id < supply) {
        multiCallArr.push({
            target: address,
            callData: contract.methods.ownerOf(id).encodeABI()
        })
        if (multiCallArr.length == process.env.MULTI_CALL_NO_OF_ADDRESS_PER_CALL || id == supply - 1) {
            const result = await MultiCallContract.methods.aggregate(
                multiCallArr
            ).call();
            const list = result.returnData;

            ownerList = ownerList.concat(list.map(x => {
                return x.replace('0x000000000000000000000000', '0x');
            }));
            multiCallArr = [];
        }
        id++;
    }
    return ownerList;
}

const getContractAddressByTokenLabel = (label) => {
    if (label == BAYC) {
        return {
            contract: BAYCContract,
            address: process.env.BAYC_CONTRACT_ADDRESS
        };
    } else if (label == COOL) {
        return {
            contract: COOLContract,
            address: process.env.COOL_CONTRACT_ADDRESS
        };
    }
    return {};
}

exports.getOwnerList = async(nftToken) => {
    const contractObj = getContractAddressByTokenLabel(nftToken); //get contract address by label
    if (contractObj == {}) {
        return [];
    }

    const supply = await getTotalSupply(contractObj); //get total supply of the NFT

    const owners = await getOwnerListFromContract(contractObj, supply); //get owner list of the NFT

    return owners.filter(function(elem, index, self) { //remove duplicates in the list
        return index === self.indexOf(elem);
    });
}