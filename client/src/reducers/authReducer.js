import {FETCH_USER} from "../actions/types";

export default function (state = null, action, payload = action.payload) {


    //receive data from actions`
    console.log("oot action",action);
    switch (action.type) {
        case FETCH_USER:
           return payload || false;
        default:
            return state;

    }


}