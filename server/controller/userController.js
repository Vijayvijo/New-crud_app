import User from "../model/userModel.js"

export const create = async (req, res) => {
    try {
        const newUser = new User(req.body);
        const { email } = newUser;
        const userExist = await User.findOne({ email })
        if (userExist) {
            return res.status(400).json({ message: "User Already exists" })

        }

        const savedData = await newUser.save();
        res.status(200).json(savedData);

    } catch (error) {
        res.status(500).json({ errorMessage: error.message })
    }
}

export const getAllUsers = async (req, res) => {
    try {
        const userData = await User.find();
        if (!userData || userData.length === 0) {
            // console.log(res.json())
            return res.status(404).json({ message: "User data not found" });

        }
        res.status(200).json(userData)

    } catch (error) {
        res.status(500).json({ errorMessage: error.message })
    }
}


export const getUserByID = async (req, res) => {
    try {
        const id = req.params.id;
        const userExists = await User.findById(id);
        if (!userExists) {
            return res.status(404).json({ message: "User  not found" });

        }
        res.status(200).json(userExists)
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });

    }
}


export const update = async (req, res) => {
    try {
        const id = req.params.id;
        const userExists = await User.findById(id);
        if (!userExists) {
            return res.status(404).json({ message: "User not found" })
        }

        const UpdatedData = await User.findByIdAndUpdate(id, req.body, { new: true })
        res.status(200).json(UpdatedData)

    } catch (error) {
        res.status(500).json({ errorMessage: error.message })
    }

}


export const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const userExists = await User.findById(id);
        if (!userExists) {
            return res.status(404).json({ message: "User not found" })
        }

        await User.findByIdAndDelete(id);
        res.status(200).json({message : "User Deleted successfully"})
    } catch (error) {
        res.status(500).json({ message: error.message })
        console.log(error)
    }
}