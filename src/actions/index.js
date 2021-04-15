export const SET_DATA = 'fetch_data';
export const ADD_MEMBER = 'add_member';
export const SET_LOCATION = 'set_location'
export const CREATE_FOLDER = 'create_folder'

// default function to display redux action format
export function setData(data) {
    // action object format being return to a reducer
    return {
        type: SET_DATA,
        payload: data
    }
}


export function setLocation(id) {
    // action object format being return to a reducer
    return {
        type: SET_LOCATION,
        payload: id,
    }
}


export function createFolder(data) {
    // action object format being return to a reducer
    return {
        type: CREATE_FOLDER,
        payload: data,
    }
}
