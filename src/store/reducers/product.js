const product = (state={list: []}, action) => {
    switch(action.type) {
        case 'PRODUCT_LOADED': 
            return {...state, ...{list: action.payload.data}};
        default: 
            return state;
    }
}

export default product