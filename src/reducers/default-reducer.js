// default reducer
// Note: You can remove this reducer and create your own reducer

import { SET_DATA, SET_LOCATION, CREATE_FOLDER, DELETE_FOLDER } from '../actions';


const initialState = {
    data: {},
    items: [],
    location: [],
}

export default (state = initialState, action) => {



    switch (action.type) {
        case SET_DATA:
            var initialItems = action.payload.map((item, i) => { return { id: i.toString(), name: item.name, type: item.type }; });
            return {
                ...state,
                data: { children: action.payload },
                items: initialItems,
                location: [],
            }
        case SET_LOCATION:
            return setLocation(state, state.data, action);
        case CREATE_FOLDER:
            var updatedData = createFolderUtil(action.payload.currLocationId, [], action.payload.name, state.data)
            return setLocation(state, updatedData, { payload: action.payload.currLocationId });
        case DELETE_FOLDER:
            var updatedData = deleteFolderUtil(action.payload.currLocationId, [], action.payload.id, state.data)
            return setLocation(state, updatedData, { payload: action.payload.currLocationId });
        default:
            return state;
    }


}


let setLocation = (state, data, action) => {
    if (!action.payload) {
        var initialItems = data.children.map((item, i) => { return { id: i.toString(), name: item.name, type: item.type }; });
        return {
            ...state,
            items: initialItems,
            location: [],
        }
    }

    var idArr = action.payload.split(".");
    var tempData = data;
    var location = [];
    var currId = "";
    for (let i = 0; i < idArr.length; i++) {
        let id = idArr[i];
        tempData = tempData.children[parseInt(id, 10)];
        if (tempData.type !== 'folder') {
            return { ...state };
        }
        currId = idArr.slice(0, i + 1).join(".");
        location.push({ id: currId, name: tempData.name, type: tempData.type });
    }
    var nextItems = tempData.children.map((item, i) => { return { id: action.payload + "." + i, name: item.name, type: item.type }; });
    return {
        ...state,
        items: nextItems,
        location
    }
}

let createFolderUtil = (locationId, locationArr, name, data) => {
    var currId = locationArr.join(".");
    if (currId === locationId || (currId === "" && locationId === null)) {
        data.children.push({ id: currId + "." + data.children.length.toString(), name, type: 'folder', children: [] });
        return data;
    }

    if (data.type === 'file') {
        return data;
    }

    var updatedData = data;
    updatedData.children = data.children.map((child, i) => {
        let tempLocationArr = [...locationArr];
        tempLocationArr.push(i);
        return createFolderUtil(locationId, tempLocationArr, name, child);
    });
    return updatedData;
}

let deleteFolderUtil = (locationId, locationArr, folderId, data) => {
    var currId = locationArr.join(".");
    if (currId === locationId || (currId === "" && locationId === null)) {
        let idx = data.children.findIndex(curr => curr.id === folderId)

        data.children.splice(idx, 1);
    }

    if (data.type === 'file') {
        return data;
    }

    var updatedData = data;
    updatedData.children = data.children.map((child, i) => {
        let tempLocationArr = [...locationArr];
        tempLocationArr.push(i);
        return deleteFolderUtil(locationId, tempLocationArr, folderId, child);
    });
    return updatedData;
}

