import { CometChat } from "@cometchat-pro/chat";

const loginCometChatUser = async (uid) => {
    try {
        const user = await CometChat.login(
            uid,
            process.env.REACT_APP_COMETCHAT_AUTH_KEY
        );
        console.log('login Successful: ', { user });
    } catch(error){
        console.log('Login failed with exception: ', { error });
    }
}

const logoutCometChatUser = async () => {
    try {
        await CometChat.logout();
        console.log('Logout Successful: ');
    } catch(error){
        console.log('Login failed with exception: ', { error })
    }
};

const registerCometChatUser = async (uid, name) => {
    var user = new CometChat.User(uid);
    user.setName(name);
    try {
        const createdUser = await CometChat.createUser(
            user,
            process.env.REACT_APP_COMETCHAT_AUTH_KEY
        );
        console.log('user created', createdUser)
    } catch(error){
        console.log('Register failed with exception: ', { error })
    }
};

const addCometChatGroup = async (GUID, name, icon, participants) => {
    let membersList = participants.map(
        (participant) =>
            new CometChat.GroupMember(
                participant,
                CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT
        )
    );
    
    var group = new CometChat.Group(
        GUID,
        name,
        CometChat.GROUP_MEMBER_PRIVATE,
        '',
        icon
    )
    try{
        const createGroup = await CometChat.createGroup(group);
        console.log('Group created successfully: ', createGroup);
        const response = await CometChat.addMembersToGroup(
            createGroup.getGuid(),
            membersList,
            []
        );
        console.log('response: ', response);
    } catch (error){
        console.log('Group created failed with exception: ', error);
    }
};

export { CometChat, loginCometChatUser, registerCometChatUser, addCometChatGroup, logoutCometChatUser }