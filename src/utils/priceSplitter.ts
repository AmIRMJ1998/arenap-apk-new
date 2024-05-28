 const priceSplitter = (number : number) => {
    return  number ?  number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")  : ""
};


export default priceSplitter