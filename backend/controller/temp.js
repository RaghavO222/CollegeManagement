const Temp = require('../model/tempuserModel')

const createTemp = async(req,res) => {
    const {username,email,password,type} = req.body

    try{
        const temps = await Temp.create({username,email,password,type})
        res.status(200).json(temps)
    }catch(error){
        res.status(400).json({error:error.message})
    }

}

const getTemp = async(req,res) => {
    try{
        const temps = await Temp.find()
        res.status(200).json(temps)
    }catch(error){
        res.status(400).json({error:error.message})
    }
}

const deleteTemp = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await Temp.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({ error: 'Temporary user not found' });
        }

        res.status(200).json({ message: 'Temporary user deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    createTemp,
    getTemp,
    deleteTemp
};