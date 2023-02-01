import User from "../model/userModel";

const validateToken = async (tokenEmail: string, tokenID: number,  userID: number): Promise<boolean> => {
    const user: User | null = await User.findOne({ where: { id: userID } });
    if(user) {
        if(tokenEmail === user.email && tokenID === user.id) {
            return true;
        }
    }
    return false;
}

export default validateToken;