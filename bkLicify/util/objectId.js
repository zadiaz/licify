import mongoose from "mongoose";

const toObjectId = (id) => {
    var ObjectId = mongoose.Types.ObjectId;
    return new ObjectId(id);
}

export default toObjectId