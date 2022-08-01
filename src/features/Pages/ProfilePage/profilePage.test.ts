import {changeInfoProfileAC, profileReducer, setProfileDataAC} from "./profilePageReducer";

test('the data should set correctly', () => {

    let startState = {
        name: "",
        email: "",
        avatar: "avatar",
        _id: ""
    }

    const endState = profileReducer(startState, setProfileDataAC("test name", "test@email.com", "test avatar", ""))

    expect(endState.name).toBe("test name");
    expect(endState.email).toBe("test@email.com");
    expect(endState.avatar).toBe("test avatar");
});

test('the data should change correctly', () => {

    let startState = {
        name: "",
        email: "",
        avatar: "avatar",
        _id: ""
    }

    const endState = profileReducer(startState, changeInfoProfileAC("Test name", "New avatar"))

    expect(endState.name).toBe("Test name");
    expect(endState.avatar).toBe("New avatar");
});