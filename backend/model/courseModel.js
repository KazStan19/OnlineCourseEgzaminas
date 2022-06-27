const mongoose = require('mongoose')

const courseSchema = mongoose.Schema({

    user:{

        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'

    },
    categorie:{

        type:mongoose.Schema.Types.ObjectId,
        required: [true,'please choose the catagory'],
        ref: 'Categorie'

    },
    desc:{

        type:String,
        required:[true,'add a description']

    },
    title:{

        type:String,
        required:[true,'add title']

    },
    price:{

        type: Number,
        required: true

    },likes:[{

        type:mongoose.Schema.Types.ObjectId,
        ref: 'Users'

    }]


},{

    timestamps:true

})

module.exports = mongoose.model('Courses',courseSchema)